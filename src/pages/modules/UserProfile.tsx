import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/contexts/AppContext';
import { Shield, Key, User as UserIcon } from 'lucide-react';

const UserProfile: React.FC = () => {
  const { user } = useApp();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(user?.twoFactorEnabled || false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    // FR-1.5.1, FR-1.5.2, FR-1.5.3: Change password logic
    alert('Password changed successfully!');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Profile</h1>
        <p className="text-muted-foreground">Module 1: User Profiling</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="border-2 border-foreground">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="access">Access Control</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card className="border-2 border-foreground">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserIcon size={20} />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input value={user?.username || ''} className="border-2 border-foreground" readOnly />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={user?.email || ''} className="border-2 border-foreground" readOnly />
                </div>
                <div className="space-y-2">
                  <Label>Business Name</Label>
                  <Input value={user?.businessName || ''} className="border-2 border-foreground" readOnly />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-2 border-foreground text-lg px-4 py-1">
                      {user?.role?.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={user?.isVerified ? 'default' : 'destructive'}>
                  {user?.isVerified ? 'Email Verified' : 'Email Not Verified'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          {/* FR-1.5: Change Password */}
          <Card className="border-2 border-foreground">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key size={20} />
                Change Password
              </CardTitle>
              <CardDescription>Update your account password</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                {/* FR-1.5.1: Enter Existing Password */}
                <div className="space-y-2">
                  <Label>Current Password</Label>
                  <Input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    className="border-2 border-foreground"
                  />
                </div>
                {/* FR-1.5.2: Enter New Password */}
                <div className="space-y-2">
                  <Label>New Password</Label>
                  <Input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    className="border-2 border-foreground"
                  />
                </div>
                {/* FR-1.5.3: Confirm New Password */}
                <div className="space-y-2">
                  <Label>Confirm New Password</Label>
                  <Input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    className="border-2 border-foreground"
                  />
                </div>
                <Button type="submit">Update Password</Button>
              </form>
            </CardContent>
          </Card>

          {/* FR-1.6: Two Factor Auth */}
          <Card className="border-2 border-foreground">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield size={20} />
                Two-Factor Authentication
              </CardTitle>
              <CardDescription>Add an extra layer of security</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Enable 2FA</p>
                  <p className="text-sm text-muted-foreground">
                    {/* FR-1.6.1: Time Based OTP */}
                    Use time-based one-time passwords for verification
                  </p>
                </div>
                {/* FR-1.6.2: Enable/Disable 2FA */}
                <Switch
                  checked={twoFactorEnabled}
                  onCheckedChange={setTwoFactorEnabled}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="access" className="space-y-4">
          {/* FR-1.7: Role-Based Access */}
          <Card className="border-2 border-foreground">
            <CardHeader>
              <CardTitle>Role-Based Access Control</CardTitle>
              <CardDescription>Manage user roles and permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* FR-1.7.1, FR-1.7.2, FR-1.7.3 */}
              <div className="grid gap-4">
                <div className="flex items-center justify-between p-4 border-2 border-foreground">
                  <div>
                    <p className="font-medium">Admin</p>
                    <p className="text-sm text-muted-foreground">Full access to all features</p>
                  </div>
                  <Badge>Business Owner</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border-2 border-muted">
                  <div>
                    <p className="font-medium">Accountant</p>
                    <p className="text-sm text-muted-foreground">Access to financial modules</p>
                  </div>
                  <Badge variant="outline">Staff</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border-2 border-muted">
                  <div>
                    <p className="font-medium">Viewer</p>
                    <p className="text-sm text-muted-foreground">Read-only access</p>
                  </div>
                  <Badge variant="secondary">Limited</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;
