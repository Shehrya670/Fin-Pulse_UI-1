import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check, X, ArrowRight, Split, AlertCircle } from 'lucide-react';

const Reconciliation: React.FC = () => {
  const [selectedBank, setSelectedBank] = useState<string[]>([]);
  const [selectedSystem, setSelectedSystem] = useState<string[]>([]);

  // Mock bank statement items
  const bankItems = [
    { id: 'B1', date: '2024-01-15', description: 'ELECTRICITY PAYMENT', amount: 15000, matched: true, confidence: 95 },
    { id: 'B2', date: '2024-01-14', description: 'OFFICE SUPPLIES TRF', amount: 25000, matched: true, confidence: 88 },
    { id: 'B3', date: '2024-01-13', description: 'DEPOSIT - ABC CORP', amount: 150000, matched: true, confidence: 92 },
    { id: 'B4', date: '2024-01-12', description: 'BANK CHARGES', amount: 500, matched: false, confidence: 0 },
    { id: 'B5', date: '2024-01-11', description: 'UNKNOWN TRF', amount: 5000, matched: false, confidence: 45 },
  ];

  // Mock system bills
  const systemItems = [
    { id: 'S1', date: '2024-01-15', description: 'Electricity Bill - January', amount: 15000, matched: true },
    { id: 'S2', date: '2024-01-14', description: 'Office Furniture', amount: 25000, matched: true },
    { id: 'S3', date: '2024-01-13', description: 'Client Payment - Project Alpha', amount: 150000, matched: true },
    { id: 'S4', date: '2024-01-12', description: 'Cloud Hosting - Monthly', amount: 8500, matched: false },
    { id: 'S5', date: '2024-01-10', description: 'Monthly Rent', amount: 30000, matched: false },
  ];

  const matchedCount = bankItems.filter((b) => b.matched).length;
  const totalCount = bankItems.length;
  const reconciliationProgress = (matchedCount / totalCount) * 100;

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 85) return <Badge className="bg-chart-2">{confidence}%</Badge>;
    if (confidence >= 50) return <Badge className="bg-chart-4">{confidence}%</Badge>;
    if (confidence > 0) return <Badge variant="destructive">{confidence}%</Badge>;
    return <Badge variant="secondary">-</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bank Reconciliation</h1>
          <p className="text-muted-foreground">Module 8: Match bank statements with system records</p>
        </div>
        <div className="flex gap-2">
          {/* FR-8.2.3: Accept All high-confidence */}
          <Button variant="outline">
            <Check size={18} className="mr-2" />
            Accept All High-Confidence
          </Button>
          {/* FR-8.7.1: Generate Summary Report */}
          <Button>Finalize Reconciliation</Button>
        </div>
      </div>

      {/* FR-8.1.3: Progress indicator */}
      <Card className="border-2 border-foreground">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Reconciliation Progress</span>
            <span className="text-sm font-medium">{matchedCount}/{totalCount} Items Matched ({Math.round(reconciliationProgress)}%)</span>
          </div>
          <Progress value={reconciliationProgress} className="h-3" />
        </CardContent>
      </Card>

      {/* FR-8.1.1: Split-screen UI */}
      <div className="grid grid-cols-2 gap-4">
        {/* Left: Bank Statement */}
        <Card className="border-2 border-foreground">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Bank Statement</CardTitle>
              <Select defaultValue="hbl">
                <SelectTrigger className="w-40 border-2 border-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hbl">HBL Bank</SelectItem>
                  <SelectItem value="ubl">UBL Bank</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-b-2 border-foreground">
                  <TableHead className="w-10"></TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Confidence</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bankItems.map((item) => (
                  <TableRow
                    key={item.id}
                    className={`border-b border-muted ${item.matched ? 'bg-chart-2/10' : ''} ${
                      selectedBank.includes(item.id) ? 'bg-secondary' : ''
                    }`}
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedBank.includes(item.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedBank([...selectedBank, item.id]);
                          } else {
                            setSelectedBank(selectedBank.filter((id) => id !== item.id));
                          }
                        }}
                        disabled={item.matched}
                      />
                    </TableCell>
                    <TableCell className="text-sm">{item.date}</TableCell>
                    <TableCell className="text-sm font-medium">{item.description}</TableCell>
                    <TableCell className="text-sm">PKR {item.amount.toLocaleString()}</TableCell>
                    {/* FR-8.2.2: Confidence score */}
                    <TableCell>{getConfidenceBadge(item.confidence)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Right: System Bills */}
        <Card className="border-2 border-foreground">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>System Records</CardTitle>
              {/* FR-8.1.2: Filter unreconciled */}
              <Select defaultValue="unreconciled">
                <SelectTrigger className="w-40 border-2 border-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="unreconciled">Unreconciled</SelectItem>
                  <SelectItem value="reconciled">Reconciled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-b-2 border-foreground">
                  <TableHead className="w-10"></TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {systemItems.map((item) => (
                  <TableRow
                    key={item.id}
                    className={`border-b border-muted ${item.matched ? 'bg-chart-2/10' : ''} ${
                      selectedSystem.includes(item.id) ? 'bg-secondary' : ''
                    }`}
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedSystem.includes(item.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedSystem([...selectedSystem, item.id]);
                          } else {
                            setSelectedSystem(selectedSystem.filter((id) => id !== item.id));
                          }
                        }}
                        disabled={item.matched}
                      />
                    </TableCell>
                    <TableCell className="text-sm">{item.date}</TableCell>
                    <TableCell className="text-sm font-medium">{item.description}</TableCell>
                    <TableCell className="text-sm">PKR {item.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      {item.matched ? (
                        <Badge className="bg-chart-2">Matched</Badge>
                      ) : (
                        <Badge variant="outline">Pending</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* FR-8.3: Manual Matching Actions */}
      {(selectedBank.length > 0 || selectedSystem.length > 0) && (
        <Card className="border-2 border-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm">
                  Selected: <strong>{selectedBank.length}</strong> bank items, <strong>{selectedSystem.length}</strong> system items
                </span>
                {/* FR-8.3.2: Validate totals */}
                {selectedBank.length > 0 && selectedSystem.length > 0 && (
                  <Badge variant="outline" className="gap-1">
                    <AlertCircle size={14} />
                    Totals must match
                  </Badge>
                )}
              </div>
              <div className="flex gap-2">
                {/* FR-8.4.2: Split for bank fees */}
                <Button variant="outline">
                  <Split size={18} className="mr-2" />
                  Split (Bank Fee)
                </Button>
                {/* FR-8.3.1: Manual match */}
                <Button>
                  <ArrowRight size={18} className="mr-2" />
                  Match Selected
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* FR-8.5: Unpresented Items */}
      <Card className="border-2 border-foreground">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle size={20} />
            Unpresented Items
          </CardTitle>
          <CardDescription>FR-8.5.1: Unmatched system bills flagged for review</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1 p-4 border-2 border-muted">
              <p className="text-sm text-muted-foreground">Unpresented Cheques</p>
              <p className="text-2xl font-bold">PKR 38,500</p>
              <p className="text-xs text-muted-foreground mt-1">2 items</p>
            </div>
            <div className="flex-1 p-4 border-2 border-muted">
              <p className="text-sm text-muted-foreground">In Transit</p>
              <p className="text-2xl font-bold">PKR 0</p>
              <p className="text-xs text-muted-foreground mt-1">0 items</p>
            </div>
            <div className="flex-1 p-4 border-2 border-muted">
              <p className="text-sm text-muted-foreground">Bank Charges (Unrecorded)</p>
              <p className="text-2xl font-bold">PKR 500</p>
              <p className="text-xs text-muted-foreground mt-1">1 item</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reconciliation;
