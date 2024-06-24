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
import {
  ArrowUpDown,
  CalendarDays,
  ChevronDown,
  MoreHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "pending" | "success" | "success";
  user: string;
  date: string;
};

const data: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    user: "ken99@yahoo.com",
    date: "yesterday",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    user: "Abe45@gmail.com",
    date: "today",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "pending",
    user: "Monserrat44@gmail.com",
    date: "3 days ago",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    user: "Silas22@gmail.com",
    date: "1 month ago",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "success",
    user: "carmella@hotmail.com",
    date: "just now",
  },
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    user: "ken99@yahoo.com",
    date: "yesterday",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    user: "Abe45@gmail.com",
    date: "today",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "pending",
    user: "Monserrat44@gmail.com",
    date: "3 days ago",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    user: "Silas22@gmail.com",
    date: "1 month ago",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "success",
    user: "carmella@hotmail.com",
    date: "just now",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "pending",
    user: "Monserrat44@gmail.com",
    date: "3 days ago",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    user: "Silas22@gmail.com",
    date: "1 month ago",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "success",
    user: "carmella@hotmail.com",
    date: "just now",
  },
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    user: "ken99@yahoo.com",
    date: "yesterday",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    user: "Abe45@gmail.com",
    date: "today",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "pending",
    user: "Monserrat44@gmail.com",
    date: "3 days ago",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    user: "Silas22@gmail.com",
    date: "1 month ago",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "success",
    user: "carmella@hotmail.com",
    date: "just now",
  },
];

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "user",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          User
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="link" className="">
              <div className="font-medium underline">
                {row.getValue("user")}
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit">
            <div className="flex justify-start space-x-4">
              <Avatar>
                <AvatarImage src="https://github.com/vercel.png" />
                <AvatarFallback>BU</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">
                  {row.getValue("user")}
                </h4>
                <div className="flex flex-row items-center gap-4">
                  <span className="font-medium text-xs">Contribution</span>
                  <span>
                    {new Intl.NumberFormat("en-NP", {
                      style: "currency",
                      currency: "NPR",
                    }).format(1200)}
                  </span>
                </div>
                <div className={"flex flex-row items-center gap-4"}>
                  <span className="font-medium text-xs">Balance</span>
                  <span
                    className={-120 < 0 ? "text-red-600" : "text-green-600"}
                  >
                    {new Intl.NumberFormat("en-NP", {
                      style: "currency",
                      currency: "NPR",
                    }).format(-120)}
                  </span>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
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

      return <div className="text-center font-medium text-green-600">{formatted}</div>;
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    id: "actions",
    header: "Action",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function TransactionsTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
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
          placeholder="Filter users..."
          value={(table.getColumn("user")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("user")?.setFilterValue(event.target.value)
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
                  colSpan={columns.length}
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
