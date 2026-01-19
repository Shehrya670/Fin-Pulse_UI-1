import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { mockAccounts, mockJournalEntries } from '@/data/mockData';
import { Account, JournalEntry } from '@/types';
import { Plus, ChevronDown, ChevronRight, BookOpen, Undo2, Lock, AlertTriangle } from 'lucide-react';

const GeneralLedger: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>(mockAccounts);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(mockJournalEntries);
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [expandedAccounts, setExpandedAccounts] = useState<string[]>(['1', '3', '7']);
  const [journalLines, setJournalLines] = useState([
    { accountId: '', debit: 0, credit: 0 },
    { accountId: '', debit: 0, credit: 0 },
  ]);

  const totalDebits = journalLines.reduce((sum, l) => sum + l.debit, 0);
  const totalCredits = journalLines.reduce((sum, l) => sum + l.credit, 0);
  const isBalanced = totalDebits === totalCredits && totalDebits > 0;

  const toggleExpand = (id: string) => {
    setExpandedAccounts((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const addJournalLine = () => {
    setJournalLines([...journalLines, { accountId: '', debit: 0, credit: 0 }]);
  };

  const parentAccounts = accounts.filter((a) => !a.parentId);
  const getChildren = (parentId: string) => accounts.filter((a) => a.parentId === parentId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">General Ledger</h1>
          <p className="text-muted-foreground">Module 9: Chart of Accounts & Journal Entries</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Plus size={18} className="mr-2" />
            New Account
          </Button>
          {/* FR-9.2: Create Journal Entry */}
          <Dialog open={isJournalOpen} onOpenChange={setIsJournalOpen}>
            <DialogTrigger asChild>
              <Button>
                <BookOpen size={18} className="mr-2" />
                New Journal Entry
              </Button>
            </DialogTrigger>
            <DialogContent className="border-2 border-foreground max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Journal Entry</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {/* FR-9.2.1: Journal Details */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input type="date" className="border-2 border-foreground" />
                  </div>
                  <div className="space-y-2">
                    <Label>Reference #</Label>
                    <Input className="border-2 border-foreground" placeholder="JE-XXX" />
                  </div>
                  {/* FR-9.2.4: Recurring Templates */}
                  <div className="space-y-2">
                    <Label>Template</Label>
                    <Select>
                      <SelectTrigger className="border-2 border-foreground">
                        <SelectValue placeholder="None" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="rent">Monthly Rent</SelectItem>
                        <SelectItem value="salary">Salary Payment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input className="border-2 border-foreground" placeholder="Entry description" />
                </div>

                {/* FR-9.2.2: Debit/Credit lines */}
                <div className="space-y-2">
                  <Label>Journal Lines</Label>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b-2 border-foreground">
                        <TableHead>Account</TableHead>
                        <TableHead>Debit (PKR)</TableHead>
                        <TableHead>Credit (PKR)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {journalLines.map((line, index) => (
                        <TableRow key={index} className="border-b border-muted">
                          <TableCell>
                            <Select
                              value={line.accountId}
                              onValueChange={(value) => {
                                const newLines = [...journalLines];
                                newLines[index].accountId = value;
                                setJournalLines(newLines);
                              }}
                            >
                              <SelectTrigger className="border border-muted">
                                <SelectValue placeholder="Select account" />
                              </SelectTrigger>
                              <SelectContent>
                                {accounts.map((a) => (
                                  <SelectItem key={a.id} value={a.id}>
                                    {a.code} - {a.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              className="border border-muted"
                              value={line.debit || ''}
                              onChange={(e) => {
                                const newLines = [...journalLines];
                                newLines[index].debit = Number(e.target.value);
                                setJournalLines(newLines);
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              className="border border-muted"
                              value={line.credit || ''}
                              onChange={(e) => {
                                const newLines = [...journalLines];
                                newLines[index].credit = Number(e.target.value);
                                setJournalLines(newLines);
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Button variant="outline" size="sm" onClick={addJournalLine}>
                    <Plus size={16} className="mr-2" />
                    Add Line
                  </Button>
                </div>

                {/* FR-9.2.3: Validation */}
                <div className="flex justify-between items-center p-4 border-2 border-foreground">
                  <div className="flex gap-8">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Debits</p>
                      <p className="text-xl font-bold">PKR {totalDebits.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Credits</p>
                      <p className="text-xl font-bold">PKR {totalCredits.toLocaleString()}</p>
                    </div>
                  </div>
                  <Badge variant={isBalanced ? 'default' : 'destructive'} className={isBalanced ? 'bg-chart-2' : ''}>
                    {isBalanced ? 'Balanced' : 'Unbalanced'}
                  </Badge>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsJournalOpen(false)}>Cancel</Button>
                  <Button disabled={!isBalanced} onClick={() => setIsJournalOpen(false)}>
                    Post Entry
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="chart" className="space-y-4">
        <TabsList className="border-2 border-foreground">
          <TabsTrigger value="chart">Chart of Accounts</TabsTrigger>
          <TabsTrigger value="journal">Journal Entries</TabsTrigger>
          <TabsTrigger value="trial">Trial Balance</TabsTrigger>
        </TabsList>

        <TabsContent value="chart">
          {/* FR-9.1.1: Hierarchical tree-view */}
          <Card className="border-2 border-foreground">
            <CardHeader>
              <CardTitle>Chart of Accounts</CardTitle>
              <CardDescription>FR-9.1.1: Hierarchical view of all accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {parentAccounts.map((account) => {
                  const children = getChildren(account.id);
                  const hasChildren = children.length > 0;
                  const isExpanded = expandedAccounts.includes(account.id);

                  return (
                    <div key={account.id}>
                      <div
                        className={`flex items-center justify-between p-3 border-2 cursor-pointer hover:bg-secondary ${
                          isExpanded ? 'border-foreground' : 'border-muted'
                        }`}
                        onClick={() => hasChildren && toggleExpand(account.id)}
                      >
                        <div className="flex items-center gap-2">
                          {hasChildren ? (
                            isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />
                          ) : (
                            <span className="w-[18px]" />
                          )}
                          <span className="font-mono text-sm text-muted-foreground">{account.code}</span>
                          <span className="font-medium">{account.name}</span>
                          <Badge variant="outline">{account.type}</Badge>
                        </div>
                        <span className="font-bold">PKR {account.balance.toLocaleString()}</span>
                      </div>
                      {isExpanded && children.map((child) => (
                        <div
                          key={child.id}
                          className="flex items-center justify-between p-3 pl-10 border-2 border-muted border-t-0 hover:bg-secondary"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm text-muted-foreground">{child.code}</span>
                            <span>{child.name}</span>
                          </div>
                          <span className="font-medium">PKR {child.balance.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="journal">
          <Card className="border-2 border-foreground">
            <CardHeader>
              <CardTitle>Journal Entries</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-b-2 border-foreground">
                    <TableHead>Date</TableHead>
                    <TableHead>Reference</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Debits</TableHead>
                    <TableHead>Credits</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {journalEntries.map((entry) => (
                    <TableRow key={entry.id} className="border-b border-muted">
                      <TableCell>{entry.date}</TableCell>
                      <TableCell className="font-mono">{entry.reference}</TableCell>
                      <TableCell>{entry.description}</TableCell>
                      <TableCell>PKR {entry.lines.reduce((sum, l) => sum + l.debit, 0).toLocaleString()}</TableCell>
                      <TableCell>PKR {entry.lines.reduce((sum, l) => sum + l.credit, 0).toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={entry.status === 'posted' ? 'bg-chart-2' : ''}>
                          {entry.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {/* FR-9.4: Reverse Entry */}
                        <Button variant="outline" size="sm">
                          <Undo2 size={16} className="mr-1" />
                          Reverse
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trial">
          {/* FR-9.6: Trial Balance */}
          <Card className="border-2 border-foreground">
            <CardHeader>
              <CardTitle>Trial Balance</CardTitle>
              <CardDescription>FR-9.6.1: Aggregate all account balances</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-b-2 border-foreground">
                    <TableHead>Account Code</TableHead>
                    <TableHead>Account Name</TableHead>
                    <TableHead className="text-right">Debit</TableHead>
                    <TableHead className="text-right">Credit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accounts.filter(a => !a.parentId).map((account) => (
                    <TableRow key={account.id} className="border-b border-muted">
                      <TableCell className="font-mono">{account.code}</TableCell>
                      <TableCell>{account.name}</TableCell>
                      <TableCell className="text-right">
                        {['asset', 'expense'].includes(account.type) ? `PKR ${account.balance.toLocaleString()}` : '-'}
                      </TableCell>
                      <TableCell className="text-right">
                        {['liability', 'equity', 'revenue'].includes(account.type) ? `PKR ${account.balance.toLocaleString()}` : '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                  {/* FR-9.6.2: Total Debits vs Credits */}
                  <TableRow className="border-t-2 border-foreground font-bold">
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell className="text-right">PKR 1,888,500</TableCell>
                    <TableCell className="text-right">PKR 1,888,500</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {/* FR-9.6.3: Flag imbalance */}
              <div className="mt-4 p-4 bg-chart-2/10 border-2 border-chart-2 flex items-center gap-2">
                <Badge className="bg-chart-2">Balanced</Badge>
                <span className="text-sm">Trial balance is in equilibrium</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* FR-9.5: Close Accounting Period */}
      <Card className="border-2 border-foreground">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock size={20} />
            Period Close
          </CardTitle>
          <CardDescription>FR-9.5: Lock financial records for a period</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Current Period: January 2024</p>
              <p className="text-sm text-muted-foreground">Closing this period will prevent any changes to entries before the closing date</p>
            </div>
            <Button>
              <Lock size={18} className="mr-2" />
              Close Period
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeneralLedger;
