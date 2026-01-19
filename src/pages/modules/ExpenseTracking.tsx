import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockExpenseCategories } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['hsl(12, 76%, 61%)', 'hsl(173, 58%, 39%)', 'hsl(197, 37%, 24%)', 'hsl(43, 74%, 66%)', 'hsl(27, 87%, 67%)'];

const ExpenseTracking: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Expense Tracking & Analytics</h1>
        <p className="text-muted-foreground">Module 12: Monitor and analyze spending</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="border-2 border-foreground">
          <CardHeader><CardTitle>Expense Distribution</CardTitle></CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={mockExpenseCategories} dataKey="amount" nameKey="category" cx="50%" cy="50%" outerRadius={80} label={({ category, percentage }) => `${percentage}%`}>
                    {mockExpenseCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `PKR ${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-foreground">
          <CardHeader><CardTitle>Category Thresholds</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {mockExpenseCategories.filter(c => c.threshold).map((cat, i) => {
              const overBudget = cat.amount > (cat.threshold || 0);
              return (
                <div key={i} className={`p-3 border-2 ${overBudget ? 'border-destructive bg-destructive/10' : 'border-muted'}`}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{cat.category}</span>
                    <Badge variant={overBudget ? 'destructive' : 'outline'}>
                      {overBudget ? 'Over' : 'OK'}
                    </Badge>
                  </div>
                  <Progress value={(cat.amount / (cat.threshold || 1)) * 100} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>PKR {cat.amount.toLocaleString()}</span>
                    <span>/ PKR {cat.threshold?.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExpenseTracking;
