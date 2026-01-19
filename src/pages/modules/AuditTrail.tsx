import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockAuditLogs } from '@/data/mockData';
import { Search, Download, Eye } from 'lucide-react';

const AuditTrail: React.FC = () => {
  const getActionBadge = (action: string) => {
    switch (action) {
      case 'create': return <Badge className="bg-chart-2">Create</Badge>;
      case 'update': return <Badge className="bg-chart-4">Update</Badge>;
      case 'delete': return <Badge variant="destructive">Delete</Badge>;
      case 'login': return <Badge variant="outline">Login</Badge>;
      case 'export': return <Badge variant="secondary">Export</Badge>;
      default: return <Badge>{action}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Audit Trail & Change History</h1>
          <p className="text-muted-foreground">Module 14: Track all system activity</p>
        </div>
        <Button variant="outline"><Download size={18} className="mr-2" />Export Report</Button>
      </div>

      <Card className="border-2 border-foreground">
        <CardHeader>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input placeholder="Search logs..." className="pl-10 border-2 border-foreground" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-40 border-2 border-foreground"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="create">Create</SelectItem>
                <SelectItem value="update">Update</SelectItem>
                <SelectItem value="delete">Delete</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-b-2 border-foreground">
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Module</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAuditLogs.map((log) => (
                <TableRow key={log.id} className="border-b border-muted">
                  <TableCell className="text-sm">{new Date(log.timestamp).toLocaleString()}</TableCell>
                  <TableCell>{log.userName}</TableCell>
                  <TableCell>{getActionBadge(log.action)}</TableCell>
                  <TableCell>{log.module}</TableCell>
                  <TableCell>{log.entityId ? `${log.entityType} #${log.entityId}` : '-'}</TableCell>
                  <TableCell className="font-mono text-sm">{log.ipAddress}</TableCell>
                  <TableCell>
                    {(log.beforeSnapshot || log.afterSnapshot) && (
                      <Button variant="outline" size="sm"><Eye size={16} className="mr-1" />View Diff</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditTrail;
