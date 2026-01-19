import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "@/contexts/AppContext";
import MainLayout from "@/components/layout/MainLayout";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import Onboarding from "@/pages/auth/Onboarding";
import Dashboard from "@/pages/modules/Dashboard";
import UserProfile from "@/pages/modules/UserProfile";
import BusinessSetup from "@/pages/modules/BusinessSetup";
import VendorManagement from "@/pages/modules/VendorManagement";
import DocumentUpload from "@/pages/modules/DocumentUpload";
import TransactionManagement from "@/pages/modules/TransactionManagement";
import BillsInvoices from "@/pages/modules/BillsInvoices";
import BankAccountManagement from "@/pages/modules/BankAccountManagement";
import Reconciliation from "@/pages/modules/Reconciliation";
import GeneralLedger from "@/pages/modules/GeneralLedger";
import CashFlowManagement from "@/pages/modules/CashFlowManagement";
import ExpenseTracking from "@/pages/modules/ExpenseTracking";
import AgentCentre from "@/pages/modules/AgentCentre";
import AuditTrail from "@/pages/modules/AuditTrail";
import Reports from "@/pages/modules/Reports";
import Notifications from "@/pages/modules/Notifications";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useApp();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const AppRoutes = () => {
  const { isAuthenticated, onboardingComplete } = useApp();
  
  if (isAuthenticated && !onboardingComplete) {
    return <Routes><Route path="*" element={<Onboarding />} /></Routes>;
  }

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="user-profile" element={<UserProfile />} />
        <Route path="business-setup" element={<BusinessSetup />} />
        <Route path="vendors" element={<VendorManagement />} />
        <Route path="documents" element={<DocumentUpload />} />
        <Route path="transactions" element={<TransactionManagement />} />
        <Route path="bills" element={<BillsInvoices />} />
        <Route path="bank-accounts" element={<BankAccountManagement />} />
        <Route path="reconciliation" element={<Reconciliation />} />
        <Route path="ledger" element={<GeneralLedger />} />
        <Route path="cash-flow" element={<CashFlowManagement />} />
        <Route path="expenses" element={<ExpenseTracking />} />
        <Route path="agent" element={<AgentCentre />} />
        <Route path="audit" element={<AuditTrail />} />
        <Route path="reports" element={<Reports />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
