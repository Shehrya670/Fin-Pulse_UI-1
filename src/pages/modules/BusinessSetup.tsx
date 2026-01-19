import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BusinessSetup: React.FC = () => {
  const { companyProfile } = useApp();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Business Setup & Configuration</h1>
        <p className="text-muted-foreground">Module 2: Company profile and settings</p>
      </div>
      <Card className="border-2 border-foreground">
        <CardHeader><CardTitle>Company Profile</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div><span className="text-muted-foreground">Name:</span> <span className="font-medium">{companyProfile?.name}</span></div>
          <div><span className="text-muted-foreground">Currency:</span> <span className="font-medium">{companyProfile?.currency}</span></div>
          <div><span className="text-muted-foreground">Address:</span> <span className="font-medium">{companyProfile?.address}</span></div>
          <div><span className="text-muted-foreground">Fiscal Year:</span> <span className="font-medium">{companyProfile?.fiscalYearStart}</span></div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessSetup;
