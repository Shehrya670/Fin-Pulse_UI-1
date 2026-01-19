import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Check } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

const Signup: React.FC = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { signup } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    role: '' as 'admin' | 'accountant' | 'viewer' | '',
    businessName: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneCountry: '+1',
    phone: '',
    location: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep((s) => Math.min(3, s + 1));
  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (step < 3) {
      nextStep();
      return;
    }

    // final validation
    if (!formData.terms) {
      alert('Please accept the terms of use to continue.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setLoading(true);
    // call signup (structure may vary depending on backend)
    const success = await signup({
      role: formData.role || 'admin',
      businessName: formData.businessName,
      username: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      password: formData.password,
      meta: {
        phone: `${formData.phoneCountry} ${formData.phone}`,
        location: formData.location,
      },
    } as any);
    setLoading(false);
    if (success) navigate('/onboarding');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 p-4">
      <Card className="w-full max-w-2xl border-0 shadow-xl rounded-xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-8 bg-gradient-to-b from-slate-50 to-white">
            <CardHeader className="p-0 text-left">
              <CardTitle className="text-2xl font-bold">Create your Fin-Pulse account</CardTitle>
              <CardDescription className="text-sm text-muted-foreground mt-1">A quick 2-minute setup to get you started</CardDescription>
            </CardHeader>

            <div className="mt-6">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold ${step===1? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>1</div>
                <div className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold ${step===2? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>2</div>
                <div className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold ${step===3? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>3</div>
                <div className="ml-4 text-sm text-slate-600">Step {step} of 3</div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                {step === 1 && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First name</Label>
                        <Input id="firstName" placeholder="First name" value={formData.firstName} onChange={(e) => handleChange('firstName', e.target.value)} className="border-2 border-gray-200 bg-gradient-to-r from-slate-50 to-blue-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last name</Label>
                        <Input id="lastName" placeholder="Last name" value={formData.lastName} onChange={(e) => handleChange('lastName', e.target.value)} className="border-2 border-gray-200 bg-gradient-to-r from-slate-50 to-blue-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} className="border-2 border-gray-200 bg-gradient-to-r from-slate-50 to-blue-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200" required />
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="grid grid-cols-3 gap-4 items-end">
                      <div className="space-y-2 col-span-1">
                        <Label htmlFor="phoneCountry">Code</Label>
                        <Select value={formData.phoneCountry} onValueChange={(v) => handleChange('phoneCountry', v)}>
                          <SelectTrigger className="border-2 border-gray-200 bg-gradient-to-r from-slate-50 to-blue-50">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="+1">+1 (US)</SelectItem>
                            <SelectItem value="+44">+44 (UK)</SelectItem>
                            <SelectItem value="+92">+92 (PK)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2 col-span-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" placeholder="Phone number" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} className="border-2 border-gray-200 bg-gradient-to-r from-slate-50 to-blue-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Select value={formData.location} onValueChange={(v) => handleChange('location', v)}>
                        <SelectTrigger className="border-2 border-gray-200 bg-gradient-to-r from-slate-50 to-blue-50">
                          <SelectValue placeholder="Please choose an option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="pk">Pakistan</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="businessName">Business name (optional)</Label>
                      <Input id="businessName" placeholder="Business name" value={formData.businessName} onChange={(e) => handleChange('businessName', e.target.value)} className="border-2 border-gray-200 bg-gradient-to-r from-slate-50 to-blue-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Select value={formData.role} onValueChange={(v) => handleChange('role', v)}>
                        <SelectTrigger className="border-2 border-gray-200 bg-gradient-to-r from-slate-50 to-blue-50">
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Business Owner (Admin)</SelectItem>
                          <SelectItem value="accountant">Accountant</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" placeholder="Create a password" value={formData.password} onChange={(e) => handleChange('password', e.target.value)} className="border-2 border-gray-200 bg-gradient-to-r from-slate-50 to-blue-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm password</Label>
                        <Input id="confirmPassword" type="password" placeholder="Confirm password" value={formData.confirmPassword} onChange={(e) => handleChange('confirmPassword', e.target.value)} className="border-2 border-gray-200 bg-gradient-to-r from-slate-50 to-blue-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200" required />
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Checkbox checked={formData.terms} onCheckedChange={(v) => handleChange('terms', v)} id="terms" />
                      <Label htmlFor="terms" className="text-sm">I have read and agree to the <Link to="/terms" className="underline">terms of use</Link>, <Link to="/privacy" className="underline">privacy notice</Link> and offer details.</Label>
                    </div>
                  </>
                )}

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    {step > 1 && (
                      <Button type="button" variant="outline" onClick={prevStep}>Back</Button>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    {step < 3 ? (
                      <Button type="button" onClick={nextStep} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">Continue</Button>
                    ) : (
                      <Button type="submit" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white" disabled={loading}>{loading ? 'Creating account...' : 'Create account'}</Button>
                    )}
                  </div>
                </div>

                <p className="text-center text-sm text-muted-foreground mt-3">
                  Already have an account? <Link to="/login" className="underline">Sign in</Link>
                </p>

              </form>
            </div>
          </div>

          <div className="hidden lg:block bg-gradient-to-b from-blue-600 to-indigo-600 text-white p-8">
            <div className="text-lg font-semibold mb-4">Why choose Fin-Pulse?</div>
            <ul className="space-y-3 text-sm opacity-90">
              <li className="flex items-start gap-3"><Check size={18} className="flex-shrink-0 mt-0.5" /> Easy invoicing and payments</li>
              <li className="flex items-start gap-3"><Check size={18} className="flex-shrink-0 mt-0.5" /> Automated reconciliations</li>
              <li className="flex items-start gap-3"><Check size={18} className="flex-shrink-0 mt-0.5" /> Secure, enterprise-grade protection</li>
            </ul>
            <div className="mt-6 text-xs opacity-90">Join thousands of small businesses using Fin-Pulse to run their finances.</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Signup;
