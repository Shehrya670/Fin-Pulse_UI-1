import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockVendors } from '@/data/mockData';
import { Vendor } from '@/types';
import { Plus, Search, Edit, Archive, Upload, TrendingUp, Users } from 'lucide-react';

const VendorManagement: React.FC = () => {
  const [vendors, setVendors] = useState<Vendor[]>(mockVendors);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  const filteredVendors = vendors.filter(
    (v) =>
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleArchive = (id: string) => {
    setVendors((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: v.status === 'active' ? 'archived' : 'active' } : v))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vendor & Contact Management</h1>
          <p className="text-muted-foreground">Module 3: Manage vendors and employees</p>
        </div>
        <div className="flex gap-2">
          {/* FR-3.5.1: Upload CSV for bulk import */}
          <Button variant="outline">
            <Upload size={18} className="mr-2" />
            Import CSV
          </Button>
          {/* FR-3.1.1: Create new vendor */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus size={18} className="mr-2" />
                Add Vendor
              </Button>
            </DialogTrigger>
            <DialogContent className="border-2 border-foreground">
              <DialogHeader>
                <DialogTitle>Add New Vendor</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Vendor Name</Label>
                  <Input className="border-2 border-foreground" placeholder="Enter vendor name" />
                </div>
                {/* FR-3.1.2: Contact details & bank info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" className="border-2 border-foreground" placeholder="vendor@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input className="border-2 border-foreground" placeholder="+92-XXX-XXXXXXX" />
                  </div>
                </div>
                {/* FR-3.3.1: Define vendor category */}
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger className="border-2 border-foreground">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utility">Utility</SelectItem>
                      <SelectItem value="supplier">Supplier</SelectItem>
                      <SelectItem value="services">Services</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* FR-3.3.2: Default expense category */}
                <div className="space-y-2">
                  <Label>Default Expense Category (GL Account)</Label>
                  <Select>
                    <SelectTrigger className="border-2 border-foreground">
                      <SelectValue placeholder="Select GL account" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utilities">Utilities</SelectItem>
                      <SelectItem value="rent">Rent</SelectItem>
                      <SelectItem value="software">Software</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Bank Account</Label>
                  <Input className="border-2 border-foreground" placeholder="PK45-XXXX-XXXX-XXXX" />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button onClick={() => setIsDialogOpen(false)}>Save Vendor</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="vendors" className="space-y-4">
        <TabsList className="border-2 border-foreground">
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
        </TabsList>

        <TabsContent value="vendors">
          <Card className="border-2 border-foreground">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    placeholder="Search vendors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-2 border-foreground"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-b-2 border-foreground">
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Total Spend</TableHead>
                    <TableHead>Avg. Transaction</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVendors.map((vendor) => (
                    <TableRow key={vendor.id} className="border-b border-muted">
                      <TableCell className="font-medium">{vendor.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{vendor.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{vendor.email}</p>
                          <p className="text-muted-foreground">{vendor.phone}</p>
                        </div>
                      </TableCell>
                      {/* FR-3.4.2: Total spend */}
                      <TableCell>PKR {vendor.totalSpend.toLocaleString()}</TableCell>
                      {/* FR-3.4.3: Avg transaction value */}
                      <TableCell>PKR {vendor.avgTransactionValue.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={vendor.status === 'active' ? 'default' : 'secondary'}>
                          {vendor.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {/* FR-3.1.3: Edit vendor */}
                          <Button variant="outline" size="icon">
                            <Edit size={16} />
                          </Button>
                          {/* FR-3.4.1: View analytics/history */}
                          <Button variant="outline" size="icon">
                            <TrendingUp size={16} />
                          </Button>
                          {/* FR-3.1.4: Archive vendor */}
                          <Button variant="outline" size="icon" onClick={() => handleArchive(vendor.id)}>
                            <Archive size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="employees">
          {/* FR-3.2: Manage Employee Profiles */}
          <Card className="border-2 border-foreground">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users size={20} />
                Employee Directory
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Users size={48} className="mx-auto mb-4 opacity-50" />
                <p>No employees added yet.</p>
                <Button className="mt-4">
                  <Plus size={18} className="mr-2" />
                  Add Employee
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VendorManagement;
