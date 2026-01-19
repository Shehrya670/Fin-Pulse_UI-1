import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useApp } from '@/contexts/AppContext';
import { Bell, Check, Filter } from 'lucide-react';

const Notifications: React.FC = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead, unreadCount } = useApp();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'financial': return '💰';
      case 'security': return '🔒';
      case 'agent': return '🤖';
      default: return '⚙️';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notification System</h1>
          <p className="text-muted-foreground">Module 16: Manage all alerts and notifications</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="destructive">{unreadCount} Unread</Badge>
          <Button variant="outline" onClick={markAllNotificationsRead}>
            <Check size={18} className="mr-2" />Mark All Read
          </Button>
        </div>
      </div>

      <Card className="border-2 border-foreground">
        <CardHeader>
          <div className="flex gap-4">
            <Select defaultValue="all">
              <SelectTrigger className="w-48 border-2 border-foreground"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="financial">Financial</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="agent">Agent</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start gap-4 p-4 border-2 cursor-pointer transition-colors ${
                notification.isRead ? 'border-muted' : 'border-foreground bg-secondary'
              }`}
              onClick={() => markNotificationRead(notification.id)}
            >
              <span className="text-2xl">{getCategoryIcon(notification.category)}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`font-medium ${!notification.isRead ? 'font-bold' : ''}`}>
                    {notification.title}
                  </span>
                  <Badge variant={notification.priority === 'high' ? 'destructive' : 'outline'}>
                    {notification.priority}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {new Date(notification.timestamp).toLocaleString()}
                </p>
              </div>
              {!notification.isRead && <div className="w-3 h-3 bg-destructive rounded-full" />}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
