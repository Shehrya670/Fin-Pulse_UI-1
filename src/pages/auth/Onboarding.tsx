import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useApp } from '@/contexts/AppContext';
import { chartOfAccountTemplates } from '@/data/mockData';
import { CompanyProfile } from '@/types';
import { Check } from 'lucide-react';

const Onboarding: React.FC = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  const [formData, setFormData] = useState<CompanyProfile>({
    name: '',
    address: '',
    phone: '',
    email: '',
    fiscalYearStart: '',
    currency: 'PKR',
    chartOfAccountsTemplate: 'services',
    openingCashBalance: 0,
    openingBankBalance: 0,
  });
  const { completeOnboarding } = useApp();
  const navigate = useNavigate();

  const handleChange = (field: keyof CompanyProfile, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = () => {
    completeOnboarding(formData);
    navigate('/dashboard');
  };

  const progress = (step / totalSteps) * 100;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-lg border-2 border-foreground shadow-md">
        <CardHeader>
          {/* FR-2.1.1: Display onboarding flow */}
          <div className="mb-4">
            <Progress value={progress} className="h-2" />
            <p className="mt-2 text-sm text-muted-foreground text-center">
              Step {step} of {totalSteps}
            </p>
          </div>
          <CardTitle className="text-2xl">Business Setup</CardTitle>
          <CardDescription>
            {/* FR-2.1.2: Guide through multi-step setup */}
            {step === 1 && 'Enter your company details'}
            {step === 2 && 'Configure fiscal year settings'}
            {step === 3 && 'Choose chart of accounts template'}
            {step === 4 && 'Set opening balances'}
            {step === 5 && 'Configure currency'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Step 1: Company Profile - FR-2.2.1, FR-2.2.2, FR-2.2.3 */}
          {step === 1 && (
            <>
              <div className="space-y-2">
                <Label>Business Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Enter business name"
                  className="border-2 border-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label>Business Address</Label>
                <Input
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="Enter business address"
                  className="border-2 border-foreground"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="+92-XXX-XXXXXXX"
                    className="border-2 border-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="info@company.com"
                    className="border-2 border-foreground"
                  />
                </div>
              </div>
            </>
          )}

          {/* Step 2: Fiscal Year - FR-2.3.1, FR-2.3.2 */}
          {step === 2 && (
            <div className="space-y-2">
              <Label>Fiscal Year Start Date</Label>
              <Input
                type="date"
                value={formData.fiscalYearStart}
                onChange={(e) => handleChange('fiscalYearStart', e.target.value)}
                className="border-2 border-foreground"
              />
              <p className="text-sm text-muted-foreground">
                Select the start date of your fiscal year for accounting purposes.
              </p>
            </div>
          )}

          {/* Step 3: Chart of Accounts - FR-2.4.1, FR-2.4.2, FR-2.4.3, FR-2.4.4 */}
          {step === 3 && (
            <div className="space-y-4">
              <Label>Select Chart of Accounts Template</Label>
              <div className="grid gap-3">
                {Object.entries(chartOfAccountTemplates).map(([key, name]) => (
                  <div
                    key={key}
                    className={`flex items-center justify-between p-4 border-2 cursor-pointer transition-colors ${
                      formData.chartOfAccountsTemplate === key
                        ? 'border-foreground bg-secondary'
                        : 'border-muted hover:border-foreground'
                    }`}
                    onClick={() => handleChange('chartOfAccountsTemplate', key as any)}
                  >
                    <span className="font-medium">{name}</span>
                    {formData.chartOfAccountsTemplate === key && <Check size={20} />}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Opening Balances - FR-2.5.1, FR-2.5.2 */}
          {step === 4 && (
            <>
              <div className="space-y-2">
                <Label>Opening Cash in Hand (PKR)</Label>
                <Input
                  type="number"
                  value={formData.openingCashBalance}
                  onChange={(e) => handleChange('openingCashBalance', Number(e.target.value))}
                  placeholder="0"
                  className="border-2 border-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label>Opening Bank Account Balance (PKR)</Label>
                <Input
                  type="number"
                  value={formData.openingBankBalance}
                  onChange={(e) => handleChange('openingBankBalance', Number(e.target.value))}
                  placeholder="0"
                  className="border-2 border-foreground"
                />
              </div>
            </>
          )}

          {/* Step 5: Currency - FR-2.6.1 */}
          {step === 5 && (
            <div className="space-y-2">
              <Label>Default Currency</Label>
              <Select value={formData.currency} onValueChange={(value) => handleChange('currency', value)}>
                <SelectTrigger className="border-2 border-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PKR">PKR - Pakistani Rupee</SelectItem>
                  <SelectItem value="USD">USD - US Dollar</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={handleBack} disabled={step === 1}>
              Back
            </Button>
            {step < totalSteps ? (
              <Button onClick={handleNext}>Next</Button>
            ) : (
              <Button onClick={handleComplete}>Complete Setup</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
