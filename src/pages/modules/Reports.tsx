import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, FileText, BarChart3 } from 'lucide-react';

const Reports: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Exports</h1>
          <p className="text-muted-foreground">Module 15: Generate financial reports</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="border-2 border-foreground cursor-pointer hover:bg-secondary">
          <CardContent className="pt-6 text-center">
            <BarChart3 size={48} className="mx-auto mb-4" />
            <h3 className="font-bold">Profit & Loss</h3>
            <p className="text-sm text-muted-foreground">Income Statement</p>
            <Button className="mt-4 w-full"><Download size={18} className="mr-2" />Generate</Button>
          </CardContent>
        </Card>
        <Card className="border-2 border-foreground cursor-pointer hover:bg-secondary">
          <CardContent className="pt-6 text-center">
            <FileText size={48} className="mx-auto mb-4" />
            <h3 className="font-bold">Balance Sheet</h3>
            <p className="text-sm text-muted-foreground">Assets = Liabilities + Equity</p>
            <Button className="mt-4 w-full"><Download size={18} className="mr-2" />Generate</Button>
          </CardContent>
        </Card>
        <Card className="border-2 border-foreground cursor-pointer hover:bg-secondary">
          <CardContent className="pt-6 text-center">
            <BarChart3 size={48} className="mx-auto mb-4" />
            <h3 className="font-bold">Cash Flow Statement</h3>
            <p className="text-sm text-muted-foreground">Inflows vs Outflows</p>
            <Button className="mt-4 w-full"><Download size={18} className="mr-2" />Generate</Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 border-foreground">
        <CardHeader><CardTitle>Period Comparison</CardTitle></CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Select defaultValue="nov2024"><SelectTrigger className="border-2 border-foreground"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="nov2024">Nov 2024</SelectItem><SelectItem value="oct2024">Oct 2024</SelectItem></SelectContent></Select>
            <span className="self-center">vs</span>
            <Select defaultValue="oct2024"><SelectTrigger className="border-2 border-foreground"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="oct2024">Oct 2024</SelectItem><SelectItem value="sep2024">Sep 2024</SelectItem></SelectContent></Select>
            <Button>Compare</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
