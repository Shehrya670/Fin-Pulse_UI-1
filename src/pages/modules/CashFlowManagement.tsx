import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { mockCashFlowData } from '@/data/mockData';
import { TrendingUp, TrendingDown, DollarSign, AlertTriangle, Download, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const CashFlowManagement: React.FC = () => {
  const [dateRange, setDateRange] = useState('current_month');

  const totalInflow = mockCashFlowData.reduce((sum, d) => sum + d.inflow, 0);
  const totalOutflow = mockCashFlowData.reduce((sum, d) => sum + d.outflow, 0);
  const netCashFlow = totalInflow - totalOutflow;
  const closingBalance = mockCashFlowData[mockCashFlowData.length - 1].balance;
  const openingBalance = 500000;

  // FR-10.3.1: Average Daily Outflow (Burn Rate)
  const avgDailyOutflow = totalOutflow / 30;
  // FR-10.3.2: Runway
  const runway = Math.round(closingBalance / avgDailyOutflow);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cash Flow Management</h1>
          <p className="text-muted-foreground">Module 10: Monitor cash position and trends</p>
        </div>
        <div className="flex gap-2">
          {/* FR-10.1.2: Date range filter */}
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-48 border-2 border-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current_month">Current Month</SelectItem>
              <SelectItem value="last_quarter">Last Quarter</SelectItem>
              <SelectItem value="ytd">Year to Date</SelectItem>
            </SelectContent>
          </Select>
          {/* FR-10.1.3: Export */}
          <Button variant="outline">
            <Download size={18} className="mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* FR-10.1.1: Total Inflows vs Outflows */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="border-2 border-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Inflows</p>
                <p className="text-2xl font-bold text-chart-2">PKR {totalInflow.toLocaleString()}</p>
              </div>
              <ArrowUpRight size={32} className="text-chart-2" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-2 border-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Outflows</p>
                <p className="text-2xl font-bold text-destructive">PKR {totalOutflow.toLocaleString()}</p>
              </div>
              <ArrowDownRight size={32} className="text-destructive" />
            </div>
          </CardContent>
        </Card>
        {/* FR-10.4.1: Net Change */}
        <Card className="border-2 border-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Net Cash Change</p>
                <p className={`text-2xl font-bold ${netCashFlow >= 0 ? 'text-chart-2' : 'text-destructive'}`}>
                  {netCashFlow >= 0 ? '+' : ''}PKR {netCashFlow.toLocaleString()}
                </p>
              </div>
              {/* FR-10.4.2: Color coding */}
              {netCashFlow >= 0 ? (
                <TrendingUp size={32} className="text-chart-2" />
              ) : (
                <TrendingDown size={32} className="text-destructive" />
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="border-2 border-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Closing Balance</p>
                <p className="text-2xl font-bold">PKR {closingBalance.toLocaleString()}</p>
              </div>
              <DollarSign size={32} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FR-10.2.2: Line Chart - Cash Position Trends */}
      <Card className="border-2 border-foreground">
        <CardHeader>
          <CardTitle>Cash Position Trends</CardTitle>
          <CardDescription>FR-10.2.2: Visualize trends using Line Charts (Time vs. Balance)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockCashFlowData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip formatter={(value: number) => `PKR ${value.toLocaleString()}`} />
                <Legend />
                <Line type="monotone" dataKey="inflow" name="Inflows" stroke="hsl(173, 58%, 39%)" strokeWidth={2} />
                <Line type="monotone" dataKey="outflow" name="Outflows" stroke="hsl(0, 84%, 60%)" strokeWidth={2} />
                <Line type="monotone" dataKey="balance" name="Balance" stroke="hsl(0, 0%, 0%)" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* FR-10.3: Burn Rate & Runway */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-2 border-foreground">
          <CardHeader>
            <CardTitle>Burn Rate Analysis</CardTitle>
            <CardDescription>FR-10.3.1: Average Daily Cash Outflow</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Avg. Daily Outflow</span>
              <span className="text-2xl font-bold">PKR {Math.round(avgDailyOutflow).toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Monthly Burn Rate</span>
              <span className="text-xl font-bold">PKR {totalOutflow.toLocaleString()}</span>
            </div>
            {/* FR-10.3.3: Alert if burn rate exceeds threshold */}
            {avgDailyOutflow > 5000 && (
              <div className="flex items-center gap-2 p-3 bg-destructive/10 border-2 border-destructive">
                <AlertTriangle size={20} className="text-destructive" />
                <span className="text-sm">Burn rate exceeds recommended threshold</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-2 border-foreground">
          <CardHeader>
            <CardTitle>Cash Runway</CardTitle>
            <CardDescription>FR-10.3.2: Days remaining until cash reaches 0</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-6xl font-bold">{runway}</p>
              <p className="text-muted-foreground">Days of Runway</p>
            </div>
            <Progress value={Math.min((runway / 365) * 100, 100)} className="h-3" />
            <p className="text-sm text-center text-muted-foreground">
              Based on current burn rate of PKR {Math.round(avgDailyOutflow).toLocaleString()}/day
            </p>
          </CardContent>
        </Card>
      </div>

      {/* FR-10.2.1: Weekly/Monthly Closing Balances */}
      <Card className="border-2 border-foreground">
        <CardHeader>
          <CardTitle>Closing Balances</CardTitle>
          <CardDescription>FR-10.2.1: Closing cash balance for selected intervals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            {mockCashFlowData.map((data, index) => (
              <div key={index} className="p-4 border-2 border-muted text-center">
                <p className="text-sm text-muted-foreground">{data.period}</p>
                <p className="text-xl font-bold">PKR {data.balance.toLocaleString()}</p>
                <p className={`text-sm ${data.inflow - data.outflow >= 0 ? 'text-chart-2' : 'text-destructive'}`}>
                  {data.inflow - data.outflow >= 0 ? '+' : ''}
                  PKR {(data.inflow - data.outflow).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CashFlowManagement;
