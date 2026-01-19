import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockActionCards } from '@/data/mockData';
import { AlertTriangle, Lightbulb, Bell, Check, X, Search, Eye } from 'lucide-react';

const AgentCentre: React.FC = () => {
  const pendingCount = mockActionCards.filter(a => a.status === 'pending').length;

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'border-destructive bg-destructive/10';
      case 'medium': return 'border-chart-4 bg-chart-4/10';
      default: return 'border-muted';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'anomaly': return <AlertTriangle className="text-destructive" />;
      case 'reminder': return <Bell className="text-chart-4" />;
      default: return <Lightbulb className="text-chart-2" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agent Action Centre</h1>
          <p className="text-muted-foreground">Module 13: AI-powered insights and recommendations</p>
        </div>
        <Badge variant="destructive" className="text-lg px-4 py-2">{pendingCount} Pending Actions</Badge>
      </div>

      <div className="grid gap-4">
        {mockActionCards.map((card) => (
          <Card key={card.id} className={`border-2 ${getUrgencyColor(card.urgency)}`}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getTypeIcon(card.type)}
                  <CardTitle className="text-lg">{card.title}</CardTitle>
                  <Badge variant="outline">{card.type}</Badge>
                  <Badge variant={card.urgency === 'high' ? 'destructive' : 'secondary'}>{card.urgency}</Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm"><Eye size={16} className="mr-1" />Investigate</Button>
                  <Button size="sm"><Check size={16} className="mr-1" />Confirm</Button>
                  <Button variant="outline" size="sm"><X size={16} /></Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{card.description}</p>
              {card.flagReason && (
                <p className="text-xs text-destructive mt-2">Flag reason: {card.flagReason}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AgentCentre;
