"use client";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, PenSquareIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ContainerSection from "@/components/partials/ContainerSection";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { GroupInterface } from "@/types/group.types";
import { TransactionInterface } from "@/types/transaction.types";
import { calculateNepaliDateAndTime } from "@/lib/date_calculations";
import { Badge } from "@/components/ui/badge";
import { useGroupSlug } from "@/contexts/group-slug.context";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UpdateTransactionForm from "@/components/forms/UpdateTransactionForm";

export const tableColumns = (
  group: GroupInterface | null,
  getExpenseOfUser: (userId?: string | null | undefined) => {
    groupExpense: number;
    personalExpense: number;
    groupContribution: number;
    balance: number;
  },
  updateTransactionOpen: boolean,
  setUpdateTransactionOpen: React.Dispatch<React.SetStateAction<boolean>>
): ColumnDef<TransactionInterface>[] => {
  return [
    {
      accessorKey: "transactionBy",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Transaction By
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const result = getExpenseOfUser(row.original.transactionBy._id);
        return (
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="link" className="">
                  <div className="font-medium underline">
                    {row.original.transactionBy.displayName}
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-fit">
                <div className="flex justify-start space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={
                        row.original.transactionBy.photo ||
                        "/images/default-user.svg"
                      }
                    />
                    <AvatarFallback>
                      {row.original.transactionBy.displayName}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">
                      {row.original.transactionBy.displayName}
                    </h4>
                    <div className="flex flex-row items-center gap-4">
                      <span className="font-medium text-xs">
                        Group Contribution
                      </span>
                      <span>
                        {new Intl.NumberFormat("en-NP", {
                          style: "currency",
                          currency: "NPR",
                        }).format(result.groupContribution)}
                      </span>
                    </div>
                    <div className={"flex flex-row items-center gap-4"}>
                      <span className="font-medium text-xs">Group Expense</span>
                      <span>
                        {new Intl.NumberFormat("en-NP", {
                          style: "currency",
                          currency: "NPR",
                        }).format(result.groupExpense)}
                      </span>
                    </div>
                    <div className={"flex flex-row items-center gap-4"}>
                      <span className="font-medium text-xs">
                        Personal Expense
                      </span>
                      <span>
                        {new Intl.NumberFormat("en-NP", {
                          style: "currency",
                          currency: "NPR",
                        }).format(result.personalExpense)}
                      </span>
                    </div>
                    <div className={"flex flex-row items-center gap-4"}>
                      <span className="font-medium text-xs">Balance</span>
                      <span
                        className={
                          result.balance < 0 ? "text-red-600" : "text-green-600"
                        }
                      >
                        {new Intl.NumberFormat("en-NP", {
                          style: "currency",
                          currency: "NPR",
                        }).format(result.balance)}
                      </span>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        );
      },
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => <div className="">{row.original.title}</div>,
    },
    {
      accessorKey: "split",
      header: ({ column }) => <div className="w-full text-center">Info</div>,
      cell: ({ row }) => (
        <div className="flex flex-col gap-2 items-center">
          <div className="capitalize text-center">
            {row.getValue("split") ? (
              <Badge variant={"outline"} className="text-green-500">
                Splitted
              </Badge>
            ) : (
              <Badge variant={"outline"} className="text-red-500">
                Not Splitted
              </Badge>
            )}
          </div>
          {(row.original?.exclude?.length || -1) > 0 && (
            <Popover>
              <PopoverTrigger>
                <p className="text-xs underline">
                  {row.original.exclude?.length} excluded
                </p>
              </PopoverTrigger>
              <PopoverContent className="flex flex-col gap-2 justify-center items-start">
                <div className="font-bold">Excluded Members:</div>
                {row.original.exclude?.map((user) => {
                  return (
                    <p key={user._id} className="flex flex-col">
                      <span>{user.displayName}</span>
                      <span className="text-xs">{user.email}</span>
                    </p>
                  );
                })}
              </PopoverContent>
            </Popover>
          )}
        </div>
      ),
    },
    {
      accessorKey: "amount",
      header: ({ column }) => (
        <div className="w-full flex flex-row justify-center items-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Amount
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"));

        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "NPR",
        }).format(amount);

        return (
          <div className="text-center font-medium text-green-600">
            {formatted}
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => (
        <div className="flex flex-col justify-center items-start gap-2">
          <span>
            {calculateNepaliDateAndTime(row.getValue("createdAt")).nepaliDate}
          </span>
          <span>
            {calculateNepaliDateAndTime(row.getValue("createdAt")).time}
          </span>
        </div>
      ),
    },
    {
      id: "actions",
      header: "Action",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <Dialog
            open={updateTransactionOpen}
            onOpenChange={setUpdateTransactionOpen}
          >
            <DialogTrigger>
              {" "}
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <PenSquareIcon className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Transaction</DialogTitle>
              </DialogHeader>
              <UpdateTransactionForm
                setIsDialogOpen={setUpdateTransactionOpen}
                group={group}
              />
            </DialogContent>
          </Dialog>
        );
      },
    },
  ];
};

export function TransactionsTable() {
  const { group, getExpenseOfUser } = useGroupSlug();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
    const [updateTransactionOpen, setUpdateTransactionOpen] =
    React.useState<boolean>(false);

  const table = useReactTable({
    data: group?.transactions || [],
    columns: tableColumns(group, getExpenseOfUser, updateTransactionOpen, setUpdateTransactionOpen),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <ContainerSection className="w-full">
      <h2 className="text-xl text-secondary-color font-bold">Transactions</h2>
      <Separator className="my-4" />
      <div className="flex items-center gap-2 py-4">
        <Input
          placeholder="Filter transactions..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Total {table.getCoreRowModel().rows.length} transactions
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </ContainerSection>
  );
}
