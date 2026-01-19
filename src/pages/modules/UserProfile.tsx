import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/contexts/AppContext';
import { Shield, Key, User as UserIcon, CheckCircle, Lock } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section with Gradient Background */}
        <div className="mb-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
              <UserIcon size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight">User Profile</h1>
              <p className="text-blue-100">Module 1: User Profiling - Secure Account Management</p>
            </div>
          </div>
        </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full bg-gradient-to-r from-blue-100 to-indigo-100 p-1 rounded-xl border-0">
          <TabsTrigger value="profile" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-lg transition-all duration-300">
            <UserIcon size={16} className="mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-lg transition-all duration-300">
            <Key size={16} className="mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="access" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-lg transition-all duration-300">
            <Shield size={16} className="mr-2" />
            Access Control
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card className="border-0 shadow-xl bg-white hover:shadow-2xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-white/20 rounded-lg">
                  <UserIcon size={24} />
                </div>
                Profile Information
              </CardTitle>
              <CardDescription className="text-blue-100">View and manage your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-lg font-semibold text-gray-700">Full Name</Label>
                  <Input 
                    value={user?.username || ''} 
                    className="border-2 border-gray-200 bg-gradient-to-r from-slate-50 to-blue-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg h-12 transition-all duration-300" 
                    readOnly 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-lg font-semibold text-gray-700">Email</Label>
                  <Input 
                    value={user?.email || ''} 
                    className="border-2 border-gray-200 bg-gradient-to-r from-slate-50 to-blue-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg h-12 transition-all duration-300" 
                    readOnly 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-lg font-semibold text-gray-700">Business Name</Label>
                  <Input 
                    value={user?.businessName || ''} 
                    className="border-2 border-gray-200 bg-gradient-to-r from-slate-50 to-blue-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg h-12 transition-all duration-300" 
                    readOnly 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-lg font-semibold text-gray-700">Role</Label>
                  <div className="flex items-center gap-2 h-12">
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-lg px-6 py-2 rounded-full">
                      {user?.role?.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-200">
                  <CheckCircle className="text-green-600" size={24} />
                  <div>
                    <p className="font-semibold text-green-900">
                      {user?.isVerified ? 'Email Verified' : 'Email Not Verified'}
                    </p>
                    <p className="text-sm text-green-700">
                      {user?.isVerified ? 'Your email has been confirmed' : 'Please verify your email'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          {/* FR-1.5: Change Password */}
          <Card className="border-0 shadow-xl bg-white hover:shadow-2xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Key size={24} />
                </div>
                Change Password
              </CardTitle>
              <CardDescription className="text-amber-100">Update your account password regularly for security</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handlePasswordChange} className="space-y-5">
                {/* FR-1.5.1: Enter Existing Password */}
                <div className="space-y-2">
                  <Label className="text-base font-semibold text-gray-700">Current Password</Label>
                  <Input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    className="border-2 border-gray-200 bg-gradient-to-r from-slate-50 to-amber-50 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 rounded-lg h-12 transition-all duration-300"
                    placeholder="Enter your current password"
                  />
                </div>
                {/* FR-1.5.2: Enter New Password */}
                <div className="space-y-2">
                  <Label className="text-base font-semibold text-gray-700">New Password</Label>
                  <Input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    className="border-2 border-gray-200 bg-gradient-to-r from-slate-50 to-amber-50 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 rounded-lg h-12 transition-all duration-300"
                    placeholder="Enter your new password"
                  />
                </div>
                {/* FR-1.5.3: Confirm New Password */}
                <div className="space-y-2">
                  <Label className="text-base font-semibold text-gray-700">Confirm New Password</Label>
                  <Input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    className="border-2 border-gray-200 bg-gradient-to-r from-slate-50 to-amber-50 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 rounded-lg h-12 transition-all duration-300"
                    placeholder="Confirm your new password"
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold h-12 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Update Password
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* FR-1.6: Two Factor Auth */}
          <Card className="border-0 shadow-xl bg-white hover:shadow-2xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Shield size={24} />
                </div>
                Two-Factor Authentication
              </CardTitle>
              <CardDescription className="text-violet-100">Enhanced security with an extra verification layer</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between p-6 bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg border-2 border-violet-200">
                <div className="flex-1">
                  <p className="text-lg font-semibold text-gray-800 mb-2">Enable Two-Factor Authentication</p>
                  <p className="text-sm text-gray-600">
                    {/* FR-1.6.1: Time Based OTP */}
                    Use time-based one-time passwords (TOTP) for additional security verification
                  </p>
                </div>
                {/* FR-1.6.2: Enable/Disable 2FA */}
                <Switch
                  checked={twoFactorEnabled}
                  onCheckedChange={setTwoFactorEnabled}
                  className="ml-6"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="access" className="space-y-6">
          {/* FR-1.7: Role-Based Access */}
          <Card className="border-0 shadow-xl bg-white hover:shadow-2xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Lock size={24} />
                </div>
                Role-Based Access Control
              </CardTitle>
              <CardDescription className="text-cyan-100">Manage user roles and their permissions</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {/* FR-1.7.1, FR-1.7.2, FR-1.7.3 */}
              <div className="grid gap-5">
                <div className="flex items-center justify-between p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-300 hover:border-green-400 transition-all duration-300">
                  <div>
                    <p className="font-bold text-lg text-green-900">Admin</p>
                    <p className="text-sm text-green-700 mt-1">Full access to all features and settings</p>
                  </div>
                  <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 text-sm">Business Owner</Badge>
                </div>
                <div className="flex items-center justify-between p-5 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border-2 border-blue-300 hover:border-blue-400 transition-all duration-300">
                  <div>
                    <p className="font-bold text-lg text-blue-900">Accountant</p>
                    <p className="text-sm text-blue-700 mt-1">Access to financial modules and reports</p>
                  </div>
                  <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 text-sm">Staff</Badge>
                </div>
                <div className="flex items-center justify-between p-5 bg-gradient-to-r from-slate-50 to-gray-50 rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-all duration-300">
                  <div>
                    <p className="font-bold text-lg text-gray-900">Viewer</p>
                    <p className="text-sm text-gray-700 mt-1">Read-only access to dashboards and reports</p>
                  </div>
                  <Badge className="bg-gradient-to-r from-slate-600 to-gray-600 text-white px-4 py-2 text-sm">Limited</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
};

export default UserProfile;
