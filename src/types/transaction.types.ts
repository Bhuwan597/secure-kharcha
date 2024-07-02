export interface TransactionInterface {
  doneBy: string;
  title: string;
  description: string;
  amount: string;
  isSplit: boolean;
  excludedMembers?: string[];
  createdAt: string;
}
