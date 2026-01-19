// User Types
export interface User {
  id: string;
  email: string;
  username: string;
  businessName: string;
  role: 'admin' | 'accountant' | 'viewer';
  isVerified: boolean;
  twoFactorEnabled: boolean;
}

// Vendor/Contact Types
export interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  category: string;
  bankAccount: string;
  address: string;
  defaultCategory: string;
  status: 'active' | 'archived';
  totalSpend: number;
  avgTransactionValue: number;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  status: 'active' | 'inactive';
}

// Transaction Types
export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'debit' | 'credit';
  category: string;
  vendor?: string;
  status: 'pending' | 'approved' | 'reconciled' | 'uncategorized';
  source: 'imported' | 'manual';
  bankAccountId?: string;
}

// Bill/Invoice Types
export interface LineItem {
  id: string;
  description: string;
  category: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Bill {
  id: string;
  vendorId: string;
  vendorName: string;
  issueDate: string;
  dueDate: string;
  reference: string;
  lineItems: LineItem[];
  subtotal: number;
  tax: number;
  total: number;
  amountPaid: number;
  status: 'draft' | 'open' | 'partially_paid' | 'paid' | 'overdue';
  type: 'bill' | 'credit_note';
}

export interface Invoice {
  id: string;
  customerId: string;
  customerName: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  paymentTerms: string;
  lineItems: LineItem[];
  subtotal: number;
  tax: number;
  total: number;
  amountPaid: number;
  status: 'draft' | 'open' | 'partially_paid' | 'paid' | 'overdue';
}

// Bank Account Types
export interface BankAccount {
  id: string;
  institutionName: string;
  accountNumber: string;
  category: 'operating' | 'savings' | 'petty_cash' | 'credit_card';
  openingBalance: number;
  currentBalance: number;
  lastReconciledDate?: string;
  status: 'active' | 'archived';
  reconciliationStatus: 'up_to_date' | 'overdue';
}

// Reconciliation Types
export interface ReconciliationItem {
  id: string;
  bankLineId: string;
  systemLineId: string;
  confidence: number;
  status: 'suggested' | 'matched' | 'unmatched';
}

// General Ledger Types
export interface Account {
  id: string;
  code: string;
  name: string;
  type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
  parentId?: string;
  balance: number;
  status: 'active' | 'inactive';
}

export interface JournalEntry {
  id: string;
  date: string;
  description: string;
  reference: string;
  lines: JournalLine[];
  status: 'draft' | 'posted' | 'reversed';
}

export interface JournalLine {
  id: string;
  accountId: string;
  accountName: string;
  debit: number;
  credit: number;
}

// Cash Flow Types
export interface CashFlowData {
  period: string;
  inflow: number;
  outflow: number;
  balance: number;
}

// Dashboard Types
export interface DashboardWidget {
  id: string;
  type: 'cash_flow' | 'liquidity' | 'top_vendors' | 'expense_breakdown' | 'budget';
  visible: boolean;
}

// Expense Types
export interface ExpenseCategory {
  category: string;
  amount: number;
  percentage: number;
  threshold?: number;
}

// Agent Action Types
export interface ActionCard {
  id: string;
  type: 'anomaly' | 'reminder' | 'optimization';
  title: string;
  description: string;
  urgency: 'high' | 'medium' | 'low';
  transactionId?: string;
  status: 'pending' | 'resolved' | 'dismissed';
  flagReason?: string;
}

// Audit Types
export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: 'login' | 'logout' | 'create' | 'update' | 'delete' | 'export';
  module: string;
  entityId?: string;
  entityType?: string;
  timestamp: string;
  ipAddress: string;
  beforeSnapshot?: any;
  afterSnapshot?: any;
}

// Notification Types
export interface Notification {
  id: string;
  title: string;
  message: string;
  category: 'system' | 'financial' | 'security' | 'agent';
  isRead: boolean;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
}

// Report Types
export interface ReportData {
  title: string;
  period: string;
  data: any;
}

// Company Profile
export interface CompanyProfile {
  name: string;
  address: string;
  phone: string;
  email: string;
  fiscalYearStart: string;
  currency: string;
  chartOfAccountsTemplate: 'retail' | 'services' | 'manufacturing';
  openingCashBalance: number;
  openingBankBalance: number;
}
