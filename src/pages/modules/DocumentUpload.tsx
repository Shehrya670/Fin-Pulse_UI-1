import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Upload, FileText, Check, AlertCircle, Edit, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { bankInstitutions } from '@/data/mockData';

const DocumentUpload: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<any[]>([]);
  const [showReview, setShowReview] = useState(false);

  // Mock extracted transactions
  const mockExtracted = [
    { id: '1', date: '2024-01-15', description: 'ELECTRICITY PAYMENT', amount: 15000, confidence: 95, status: 'high' },
    { id: '2', date: '2024-01-14', description: 'OFFICE SUPPLIES', amount: 25000, confidence: 88, status: 'high' },
    { id: '3', date: '2024-01-13', description: 'DEPOSIT ABC CORP', amount: 150000, confidence: 92, status: 'high' },
    { id: '4', date: '2024-01-12', description: 'UNKNOWN TRF', amount: 5000, confidence: 45, status: 'low' },
    { id: '5', date: '2024-01-11', description: 'BANK CHRGS', amount: 500, confidence: 72, status: 'medium' },
  ];

  const handleFileUpload = () => {
    // FR-4.1.2: Validate file format
    setIsProcessing(true);
    setTimeout(() => {
      setUploadedFile('bank_statement_jan_2024.pdf');
      setExtractedData(mockExtracted);
      setIsProcessing(false);
      setShowReview(true);
    }, 2000);
  };

  const getConfidenceBadge = (confidence: number, status: string) => {
    // FR-4.3.1, FR-4.3.2: Color-coded confidence
    if (status === 'high') return <Badge className="bg-chart-2">{confidence}% High</Badge>;
    if (status === 'medium') return <Badge className="bg-chart-4">{confidence}% Medium</Badge>;
    return <Badge variant="destructive">{confidence}% Low</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Document Upload & Data Extraction</h1>
          <p className="text-muted-foreground">Module 4: Upload bank statements and extract transactions</p>
        </div>
      </div>

      {!showReview ? (
        <div className="grid grid-cols-2 gap-6">
          {/* FR-4.1.1: Upload area */}
          <Card className="border-2 border-foreground">
            <CardHeader>
              <CardTitle>Upload Bank Statement</CardTitle>
              <CardDescription>FR-4.1.1: Drag-and-drop or select PDF file</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="border-4 border-dashed border-muted p-12 text-center cursor-pointer hover:border-foreground transition-colors"
                onClick={handleFileUpload}
              >
                {isProcessing ? (
                  <div className="space-y-4">
                    <div className="animate-pulse">
                      <FileText size={48} className="mx-auto text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">Processing document...</p>
                    <Progress value={65} className="max-w-xs mx-auto" />
                  </div>
                ) : (
                  <>
                    <Upload size={48} className="mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg font-medium">Drop PDF file here</p>
                    <p className="text-sm text-muted-foreground mt-2">or click to browse</p>
                    {/* FR-4.1.2: File format validation */}
                    <p className="text-xs text-muted-foreground mt-4">Accepted: PDF only, max 10MB</p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* FR-4.1.3, FR-4.1.4: Bank selection */}
          <Card className="border-2 border-foreground">
            <CardHeader>
              <CardTitle>Bank Configuration</CardTitle>
              <CardDescription>FR-4.1.3: Automatic bank layout detection</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-secondary border-2 border-muted">
                <p className="text-sm font-medium">Auto-Detection</p>
                <p className="text-xs text-muted-foreground">System will automatically detect bank format</p>
              </div>
              {/* FR-4.1.4: Manual override */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Manual Override (Optional)</label>
                <Select>
                  <SelectTrigger className="border-2 border-foreground">
                    <SelectValue placeholder="Select bank if auto-detect fails" />
                  </SelectTrigger>
                  <SelectContent>
                    {bankInstitutions.map((bank) => (
                      <SelectItem key={bank} value={bank}>{bank}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <>
          {/* FR-4.2.1: Split-screen view */}
          <div className="grid grid-cols-2 gap-4">
            {/* PDF Preview */}
            <Card className="border-2 border-foreground">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText size={20} />
                  Original Document
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-secondary h-96 flex items-center justify-center border-2 border-muted">
                  <div className="text-center">
                    <FileText size={64} className="mx-auto mb-4 text-muted-foreground" />
                    <p className="font-medium">{uploadedFile}</p>
                    <p className="text-sm text-muted-foreground">PDF Preview</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FR-4.2.2, FR-4.2.3: Extracted data grid */}
            <Card className="border-2 border-foreground">
              <CardHeader>
                <CardTitle>Extracted Transactions</CardTitle>
                <CardDescription>FR-4.2.2: Editable grid of extracted data</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-b-2 border-foreground">
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Confidence</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {extractedData.map((row) => (
                      <TableRow
                        key={row.id}
                        className={`border-b border-muted ${
                          row.status === 'high' ? 'bg-chart-2/10' : row.status === 'low' ? 'bg-destructive/10' : 'bg-chart-4/10'
                        }`}
                      >
                        {/* FR-4.4.1: Inline editing */}
                        <TableCell>
                          <Input
                            type="date"
                            defaultValue={row.date}
                            className="h-8 border border-muted"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            defaultValue={row.description}
                            className="h-8 border border-muted"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            defaultValue={row.amount}
                            className="h-8 w-28 border border-muted"
                          />
                        </TableCell>
                        <TableCell>{getConfidenceBadge(row.confidence, row.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {/* FR-4.3.3: Flag anomalies */}
                            {row.status === 'low' && (
                              <Button variant="outline" size="icon" className="h-8 w-8">
                                <AlertCircle size={14} className="text-destructive" />
                              </Button>
                            )}
                            {/* FR-4.4.3: Delete invalid rows */}
                            <Button variant="outline" size="icon" className="h-8 w-8">
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* FR-4.4.2: Add missing rows */}
                <Button variant="outline" size="sm" className="mt-4">
                  + Add Missing Row
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* FR-4.5: Finalize Extraction */}
          <Card className="border-2 border-foreground">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-chart-2">{extractedData.filter(d => d.status === 'high').length}</Badge>
                    <span className="text-sm">High Confidence</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-chart-4">{extractedData.filter(d => d.status === 'medium').length}</Badge>
                    <span className="text-sm">Medium</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive">{extractedData.filter(d => d.status === 'low').length}</Badge>
                    <span className="text-sm">Needs Review</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setShowReview(false)}>
                    Cancel
                  </Button>
                  {/* FR-4.5.2: Batch approve */}
                  <Button variant="outline">
                    <Check size={18} className="mr-2" />
                    Approve All High-Confidence
                  </Button>
                  {/* FR-4.5.3: Transfer to Transaction Management */}
                  <Button>
                    Import to Transactions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default DocumentUpload;
