
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { mockTransactionsData, type Transaction, type PaymentMethod, type OrderStatus as TransactionStatus } from "@/data/mock-data"; 
import { PlusCircle, MoreVertical, Search, ListFilter, Download, Eye, Edit, Trash2, CheckCircle2, XCircle, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePageTitle } from '@/contexts/PageTitleContext';
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const TransactionStatusBadge = ({ status }: { status: TransactionStatus }) => {
  const statusConfig = {
    Paid: { icon: CheckCircle2, color: "text-green-600 dark:text-green-400", bgColor: "bg-green-100 dark:bg-green-500/20", label: "Paid" },
    Pending: { icon: Clock, color: "text-yellow-600 dark:text-yellow-400", bgColor: "bg-yellow-100 dark:bg-yellow-500/20", label: "Pending" },
    Failed: { icon: XCircle, color: "text-red-600 dark:text-red-400", bgColor: "bg-red-100 dark:bg-red-500/20", label: "Failed" },
    Complete: { icon: CheckCircle2, color: "text-green-600 dark:text-green-400", bgColor: "bg-green-100 dark:bg-green-500/20", label: "Paid" }, // Assuming Complete from OrderStatus is 'Paid'
    Canceled: { icon: XCircle, color: "text-red-600 dark:text-red-400", bgColor: "bg-red-100 dark:bg-red-500/20", label: "Failed" }, // Assuming Canceled from OrderStatus is 'Failed'
  };
  const config = statusConfig[status] || { icon: AlertCircle, color: "text-muted-foreground", bgColor: "bg-muted", label: status };
  const Icon = config.icon;

  return (
    <Badge variant="outline" className={cn("capitalize font-normal px-2 py-0.5", config.bgColor, config.color, `border-${config.color.replace('text-','').split('-')[0]}-300 dark:border-${config.color.replace('text-','').split('-')[0]}-600`)}>
      <Icon className="h-3 w-3 mr-1.5" />
      {config.label}
    </Badge>
  );
};

const PaymentMethodDisplay = ({ method }: { method: PaymentMethod }) => {
  return (
    <div className="flex items-center gap-1.5 text-sm">
      <div className={cn("h-2 w-2 rounded-full", 
        method === "UPI" ? "bg-green-500" : 
        method === "Debit Card" ? "bg-blue-500" :
        method === "Credit Card" ? "bg-purple-500" :
        "bg-gray-500" 
      )}></div>
      <span>{method}</span>
    </div>
  )
};


export default function TransactionsPage() {
  const { setPageTitle } = usePageTitle();
  const [currentPage, setCurrentPage] = React.useState(1);
  const transactionsPerPage = 10;
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<TransactionStatus[]>([]);
  const [paymentMethodFilter, setPaymentMethodFilter] = React.useState<PaymentMethod[]>([]);

  React.useEffect(() => {
    setPageTitle("Transactions");
  }, [setPageTitle]);

  const allStatuses = React.useMemo(() => Array.from(new Set(mockTransactionsData.map(t => t.status))), []);
  const allPaymentMethods = React.useMemo(() => Array.from(new Set(mockTransactionsData.map(t => t.paymentMethod))), []);


  const filteredTransactions = React.useMemo(() => {
    return mockTransactionsData.filter(transaction => {
      const matchesSearch = searchTerm === "" ||
        transaction.customerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.amount.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter.length === 0 || statusFilter.includes(transaction.status);
      const matchesPaymentMethod = paymentMethodFilter.length === 0 || paymentMethodFilter.includes(transaction.paymentMethod);

      return matchesSearch && matchesStatus && matchesPaymentMethod;
    });
  }, [searchTerm, statusFilter, paymentMethodFilter]);

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * transactionsPerPage,
    currentPage * transactionsPerPage
  );
  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);

  const getPaginationItems = () => {
    const items = [];
    if (totalPages <= 5) { 
      for (let i = 1; i <= totalPages; i++) items.push(i);
    } else {
      items.push(1); 
      if (currentPage > 3) items.push('ellipsis-start');
      
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <=3) {
        startPage = 2;
        endPage = Math.min(totalPages - 1, 4);
      } else if (currentPage >= totalPages - 2) {
        startPage = Math.max(2, totalPages - 3);
        endPage = totalPages - 1;
      }
      
      for (let i = startPage; i <= endPage; i++) items.push(i);
      
      if (currentPage < totalPages - 2 && endPage < totalPages -1) items.push('ellipsis-end');
      if (totalPages > 1) items.push(totalPages); 
    }
    return items;
  };

  const handleStatusFilterChange = (status: TransactionStatus) => {
    setStatusFilter(prev => 
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
    setCurrentPage(1);
  };

  const handlePaymentMethodFilterChange = (method: PaymentMethod) => {
    setPaymentMethodFilter(prev =>
      prev.includes(method) ? prev.filter(m => m !== method) : [...prev, method]
    );
    setCurrentPage(1);
  };


  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 lg:p-8">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
                <CardTitle>All Transactions</CardTitle>
                <CardDescription>View and manage all recorded transactions.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" /> Export All
                </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-col items-stretch gap-4 p-4 md:flex-row md:items-center md:justify-between border-b">
            <div className="relative w-full md:max-w-sm">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by ID, product, amount..." 
                className="pl-8 w-full" 
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1);}}
              />
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <ListFilter className="mr-2 h-4 w-4" /> Filter Status
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {allStatuses.map(status => (
                    <DropdownMenuCheckboxItem
                      key={status}
                      checked={statusFilter.includes(status)}
                      onCheckedChange={() => handleStatusFilterChange(status)}
                    >
                      {status}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <ListFilter className="mr-2 h-4 w-4" /> Filter Payment
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {allPaymentMethods.map(method => (
                    <DropdownMenuCheckboxItem
                      key={method}
                      checked={paymentMethodFilter.includes(method)}
                      onCheckedChange={() => handlePaymentMethodFilterChange(method)}
                    >
                      {method}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Customer ID</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.id}</TableCell>
                    <TableCell>{transaction.customerId}</TableCell>
                    <TableCell>{transaction.productName}</TableCell>
                    <TableCell>{transaction.orderDate}</TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                    <TableCell><PaymentMethodDisplay method={transaction.paymentMethod} /></TableCell>
                    <TableCell>
                      <TransactionStatusBadge status={transaction.status as TransactionStatus} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => console.log('View transaction', transaction.id)}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View Details</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive/80" onClick={() => console.log('Delete transaction', transaction.id)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete Transaction</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {paginatedTransactions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No transactions found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-end gap-4 border-t p-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => { e.preventDefault(); setCurrentPage(prev => Math.max(1, prev - 1)); }}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : undefined}
                      aria-disabled={currentPage === 1}
                    />
                  </PaginationItem>
                  {getPaginationItems().map((item, index) =>
                    typeof item === 'number' ? (
                      <PaginationItem key={index}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => { e.preventDefault(); setCurrentPage(item); }}
                          isActive={currentPage === item}
                        >
                          {item}
                        </PaginationLink>
                      </PaginationItem>
                    ) : (
                      <PaginationEllipsis key={item + index.toString()} />
                    )
                  )}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => { e.preventDefault(); setCurrentPage(prev => Math.min(totalPages, prev + 1)); }}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : undefined}
                      aria-disabled={currentPage === totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

    