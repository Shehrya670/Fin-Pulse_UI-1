import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { mockBankAccounts, bankInstitutions } from '@/data/mockData';
import { BankAccount } from '@/types';
import { Plus, Landmark, CreditCard, Wallet, PiggyBank, Search, History, Edit, Archive, Eye } from 'lucide-react';

const BankAccountManagement: React.FC = () => {
  const [accounts, setAccounts] = useState<BankAccount[]>(mockBankAccounts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<BankAccount | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'operating':
        return <Landmark size={20} />;
      case 'savings':
        return <PiggyBank size={20} />;
      case 'petty_cash':
        return <Wallet size={20} />;
      case 'credit_card':
        return <CreditCard size={20} />;
      default:
        return <Landmark size={20} />;
    }
  };

  const totalCash = accounts
    .filter((a) => a.category !== 'credit_card' && a.status === 'active')
    .reduce((sum, a) => sum + a.currentBalance, 0);

  const totalCredit = accounts
    .filter((a) => a.category === 'credit_card' && a.status === 'active')
    .reduce((sum, a) => sum + a.currentBalance, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bank Account Management</h1>
          <p className="text-muted-foreground">Module 7: Manage bank accounts and liquidity</p>
        </div>
        {/* FR-7.1: Add Bank Account */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus size={18} className="mr-2" />
              Add Account
            </Button>
          </DialogTrigger>
          <DialogContent className="border-2 border-foreground">
            <DialogHeader>
              <DialogTitle>Add Bank Account</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* FR-7.1.1: Select Bank Institution */}
              <div className="space-y-2">
                <Label>Bank Institution</Label>
                <Select>
                  <SelectTrigger className="border-2 border-foreground">
                    <SelectValue placeholder="Select bank" />
                  </SelectTrigger>
                  <SelectContent>
                    {bankInstitutions.map((bank) => (
                      <SelectItem key={bank} value={bank}>{bank}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* FR-7.1.2: Account Number/IBAN */}
              <div className="space-y-2">
                <Label>Account Number / IBAN</Label>
                <Input className="border-2 border-foreground" placeholder="PK45-XXXX-XXXX-XXXX-XXXX" />
              </div>
              {/* FR-7.1.3: Account Category */}
              <div className="space-y-2">
                <Label>Account Category</Label>
                <Select>
                  <SelectTrigger className="border-2 border-foreground">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="operating">Operating Account</SelectItem>
                    <SelectItem value="savings">Savings Account</SelectItem>
                    <SelectItem value="petty_cash">Petty Cash</SelectItem>
                    <SelectItem value="credit_card">Credit Card</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* FR-7.1.4: Opening Balance */}
              <div className="space-y-2">
                <Label>Opening Balance (PKR)</Label>
                <Input type="number" className="border-2 border-foreground" placeholder="0.00" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsDialogOpen(false)}>Add Account</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* FR-7.2: Monitor Liquidity - Consolidated View */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border-2 border-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Cash Balance</p>
                <p className="text-3xl font-bold">PKR {totalCash.toLocaleString()}</p>
              </div>
              <Wallet size={40} className="text-chart-2" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-2 border-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Credit Card Balance</p>
                <p className="text-3xl font-bold">PKR {totalCredit.toLocaleString()}</p>
              </div>
              <CreditCard size={40} className="text-chart-1" />
            </div>
          </CardContent>
        </Card>
        {/* FR-7.2.3: Cash vs Credit composition */}
        <Card className="border-2 border-foreground">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-2">Cash vs Credit Composition</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Cash</span>
                <span>{Math.round((totalCash / (totalCash + totalCredit)) * 100)}%</span>
              </div>
              <Progress value={(totalCash / (totalCash + totalCredit)) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FR-7.2.1: Card view of all accounts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {accounts.map((account) => (
          <Card key={account.id} className="border-2 border-foreground">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(account.category)}
                  <CardTitle className="text-lg">{account.institutionName}</CardTitle>
                </div>
                {/* FR-7.5.2: Reconciliation status */}
                <Badge
                  variant={account.reconciliationStatus === 'up_to_date' ? 'default' : 'destructive'}
                  className={account.reconciliationStatus === 'up_to_date' ? 'bg-chart-2' : ''}
                >
                  {account.reconciliationStatus === 'up_to_date' ? 'Up to Date' : 'Overdue'}
                </Badge>
              </div>
              <CardDescription className="font-mono text-xs">{account.accountNumber}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Current Balance</span>
                  {/* FR-7.2.2: Dynamic balance */}
                  <span className="text-xl font-bold">PKR {account.currentBalance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Category</span>
                  <Badge variant="outline">{account.category.replace('_', ' ')}</Badge>
                </div>
                {/* FR-7.5.1: Last Reconciled Date */}
                {account.lastReconciledDate && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Last Reconciled</span>
                    <span>{account.lastReconciledDate}</span>
                  </div>
                )}
                <div className="flex gap-2 pt-2">
                  {/* FR-7.3: View Account History */}
                  <Button variant="outline" size="sm" className="flex-1">
                    <History size={16} className="mr-1" />
                    History
                  </Button>
                  {/* FR-7.4.1: Edit account */}
                  <Button variant="outline" size="icon">
                    <Edit size={16} />
                  </Button>
                  {/* FR-7.4.2: Archive account */}
                  <Button variant="outline" size="icon">
                    <Archive size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FR-7.3: Account History View */}
      <Card className="border-2 border-foreground">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History size={20} />
            Recent Account Activity
          </CardTitle>
          <CardDescription>FR-7.3.1: Transaction list for selected account</CardDescription>
        </CardHeader>
        <CardContent>
          {/* FR-7.3.2: Filter by Date Range, Amount, Type */}
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input placeholder="Search transactions..." className="pl-10 border-2 border-foreground" />
            </div>
            <Select>
              <SelectTrigger className="w-40 border-2 border-foreground">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="debit">Debit</SelectItem>
                <SelectItem value="credit">Credit</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="border-b-2 border-foreground">
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-b border-muted">
                <TableCell>2024-01-15</TableCell>
                <TableCell>Electricity Bill Payment</TableCell>
                <TableCell><Badge variant="destructive">Debit</Badge></TableCell>
                <TableCell className="text-destructive">-PKR 15,000</TableCell>
                <TableCell>PKR 695,000</TableCell>
              </TableRow>
              <TableRow className="border-b border-muted">
                <TableCell>2024-01-13</TableCell>
                <TableCell>Client Payment - Project Alpha</TableCell>
                <TableCell><Badge className="bg-chart-2">Credit</Badge></TableCell>
                <TableCell className="text-chart-2">+PKR 150,000</TableCell>
                <TableCell>PKR 710,000</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BankAccountManagement;
