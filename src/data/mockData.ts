import { 
  Vendor, 
  Transaction, 
  Bill, 
  Invoice, 
  BankAccount, 
  Account, 
  JournalEntry, 
  ActionCard, 
  AuditLog, 
  Notification,
  ExpenseCategory,
  CashFlowData
} from '@/types';

export const mockVendors: Vendor[] = [
  { id: '1', name: 'Electric Corp', email: 'billing@electric.com', phone: '+92-300-1234567', category: 'Utility', bankAccount: 'PK45-0001-234', address: 'Islamabad', defaultCategory: 'Utilities', status: 'active', totalSpend: 125000, avgTransactionValue: 12500 },
  { id: '2', name: 'Office Supplies Ltd', email: 'sales@office.com', phone: '+92-300-2345678', category: 'Supplier', bankAccount: 'PK45-0002-345', address: 'Lahore', defaultCategory: 'Office Expenses', status: 'active', totalSpend: 45000, avgTransactionValue: 4500 },
  { id: '3', name: 'Cloud Services Inc', email: 'support@cloud.com', phone: '+92-300-3456789', category: 'Technology', bankAccount: 'PK45-0003-456', address: 'Karachi', defaultCategory: 'Software', status: 'active', totalSpend: 95000, avgTransactionValue: 9500 },
  { id: '4', name: 'Rent Properties', email: 'manager@rent.com', phone: '+92-300-4567890', category: 'Real Estate', bankAccount: 'PK45-0004-567', address: 'Islamabad', defaultCategory: 'Rent', status: 'active', totalSpend: 360000, avgTransactionValue: 30000 },
  { id: '5', name: 'Marketing Agency', email: 'contact@marketing.com', phone: '+92-300-5678901', category: 'Services', bankAccount: 'PK45-0005-678', address: 'Lahore', defaultCategory: 'Marketing', status: 'active', totalSpend: 75000, avgTransactionValue: 25000 },
];

export const mockTransactions: Transaction[] = [
  { id: '1', date: '2024-01-15', description: 'Electricity Bill - January', amount: 15000, type: 'debit', category: 'Utilities', vendor: 'Electric Corp', status: 'approved', source: 'imported', bankAccountId: '1' },
  { id: '2', date: '2024-01-14', description: 'Office Furniture', amount: 25000, type: 'debit', category: 'Office Expenses', vendor: 'Office Supplies Ltd', status: 'approved', source: 'imported', bankAccountId: '1' },
  { id: '3', date: '2024-01-13', description: 'Client Payment - Project Alpha', amount: 150000, type: 'credit', category: 'Revenue', status: 'approved', source: 'imported', bankAccountId: '1' },
  { id: '4', date: '2024-01-12', description: 'Cloud Hosting - Monthly', amount: 8500, type: 'debit', category: 'Software', vendor: 'Cloud Services Inc', status: 'pending', source: 'imported', bankAccountId: '1' },
  { id: '5', date: '2024-01-11', description: 'Unknown Transfer', amount: 5000, type: 'debit', category: '', status: 'uncategorized', source: 'imported', bankAccountId: '1' },
  { id: '6', date: '2024-01-10', description: 'Monthly Rent', amount: 30000, type: 'debit', category: 'Rent', vendor: 'Rent Properties', status: 'approved', source: 'manual', bankAccountId: '1' },
  { id: '7', date: '2024-01-09', description: 'Marketing Campaign', amount: 25000, type: 'debit', category: 'Marketing', vendor: 'Marketing Agency', status: 'reconciled', source: 'imported', bankAccountId: '1' },
  { id: '8', date: '2024-01-08', description: 'Consulting Revenue', amount: 75000, type: 'credit', category: 'Revenue', status: 'approved', source: 'imported', bankAccountId: '1' },
];

export const mockBills: Bill[] = [
  { id: '1', vendorId: '1', vendorName: 'Electric Corp', issueDate: '2024-01-01', dueDate: '2024-01-31', reference: 'BILL-001', lineItems: [{ id: '1', description: 'Electricity charges', category: 'Utilities', quantity: 1, unitPrice: 15000, total: 15000 }], subtotal: 15000, tax: 0, total: 15000, amountPaid: 15000, status: 'paid', type: 'bill' },
  { id: '2', vendorId: '2', vendorName: 'Office Supplies Ltd', issueDate: '2024-01-10', dueDate: '2024-02-10', reference: 'BILL-002', lineItems: [{ id: '1', description: 'Office Chairs', category: 'Office Expenses', quantity: 5, unitPrice: 5000, total: 25000 }], subtotal: 25000, tax: 0, total: 25000, amountPaid: 0, status: 'open', type: 'bill' },
  { id: '3', vendorId: '4', vendorName: 'Rent Properties', issueDate: '2024-01-01', dueDate: '2024-01-05', reference: 'BILL-003', lineItems: [{ id: '1', description: 'Monthly Rent', category: 'Rent', quantity: 1, unitPrice: 30000, total: 30000 }], subtotal: 30000, tax: 0, total: 30000, amountPaid: 30000, status: 'paid', type: 'bill' },
  { id: '4', vendorId: '3', vendorName: 'Cloud Services Inc', issueDate: '2024-01-15', dueDate: '2024-02-15', reference: 'BILL-004', lineItems: [{ id: '1', description: 'Cloud Hosting', category: 'Software', quantity: 1, unitPrice: 8500, total: 8500 }], subtotal: 8500, tax: 0, total: 8500, amountPaid: 0, status: 'open', type: 'bill' },
];

export const mockInvoices: Invoice[] = [
  { id: '1', customerId: 'C1', customerName: 'ABC Corporation', invoiceNumber: 'INV-001', issueDate: '2024-01-05', dueDate: '2024-02-05', paymentTerms: 'Net 30', lineItems: [{ id: '1', description: 'Consulting Services', category: 'Revenue', quantity: 1, unitPrice: 150000, total: 150000 }], subtotal: 150000, tax: 0, total: 150000, amountPaid: 150000, status: 'paid' },
  { id: '2', customerId: 'C2', customerName: 'XYZ Enterprises', invoiceNumber: 'INV-002', issueDate: '2024-01-10', dueDate: '2024-02-10', paymentTerms: 'Net 30', lineItems: [{ id: '1', description: 'Software Development', category: 'Revenue', quantity: 1, unitPrice: 75000, total: 75000 }], subtotal: 75000, tax: 0, total: 75000, amountPaid: 75000, status: 'paid' },
];

export const mockBankAccounts: BankAccount[] = [
  { id: '1', institutionName: 'HBL Bank', accountNumber: 'PK45-0001-1234-5678', category: 'operating', openingBalance: 500000, currentBalance: 695000, lastReconciledDate: '2024-01-10', status: 'active', reconciliationStatus: 'up_to_date' },
  { id: '2', institutionName: 'UBL Bank', accountNumber: 'PK45-0002-2345-6789', category: 'savings', openingBalance: 1000000, currentBalance: 1050000, lastReconciledDate: '2024-01-05', status: 'active', reconciliationStatus: 'up_to_date' },
  { id: '3', institutionName: 'Petty Cash', accountNumber: 'PETTY-001', category: 'petty_cash', openingBalance: 50000, currentBalance: 35000, status: 'active', reconciliationStatus: 'overdue' },
];

export const mockAccounts: Account[] = [
  { id: '1', code: '1000', name: 'Assets', type: 'asset', balance: 1780000, status: 'active' },
  { id: '2', code: '1100', name: 'Cash and Bank', type: 'asset', parentId: '1', balance: 1780000, status: 'active' },
  { id: '3', code: '2000', name: 'Liabilities', type: 'liability', balance: 33500, status: 'active' },
  { id: '4', code: '2100', name: 'Accounts Payable', type: 'liability', parentId: '3', balance: 33500, status: 'active' },
  { id: '5', code: '3000', name: 'Equity', type: 'equity', balance: 1500000, status: 'active' },
  { id: '6', code: '4000', name: 'Revenue', type: 'revenue', balance: 225000, status: 'active' },
  { id: '7', code: '5000', name: 'Expenses', type: 'expense', balance: 108500, status: 'active' },
  { id: '8', code: '5100', name: 'Utilities', type: 'expense', parentId: '7', balance: 15000, status: 'active' },
  { id: '9', code: '5200', name: 'Rent', type: 'expense', parentId: '7', balance: 30000, status: 'active' },
  { id: '10', code: '5300', name: 'Marketing', type: 'expense', parentId: '7', balance: 25000, status: 'active' },
];

export const mockJournalEntries: JournalEntry[] = [
  { id: '1', date: '2024-01-15', description: 'Electricity Bill Payment', reference: 'JE-001', lines: [{ id: '1', accountId: '8', accountName: 'Utilities', debit: 15000, credit: 0 }, { id: '2', accountId: '2', accountName: 'Cash and Bank', debit: 0, credit: 15000 }], status: 'posted' },
  { id: '2', date: '2024-01-10', description: 'Rent Payment', reference: 'JE-002', lines: [{ id: '1', accountId: '9', accountName: 'Rent', debit: 30000, credit: 0 }, { id: '2', accountId: '2', accountName: 'Cash and Bank', debit: 0, credit: 30000 }], status: 'posted' },
];

export const mockActionCards: ActionCard[] = [
  { id: '1', type: 'anomaly', title: 'Unusual Transaction Detected', description: 'Transaction amount 3x higher than average for this vendor', urgency: 'high', transactionId: '5', status: 'pending', flagReason: 'Amount exceeds typical transaction value by 300%' },
  { id: '2', type: 'reminder', title: 'Pending Bill Payment', description: 'Bill BILL-002 is due in 5 days', urgency: 'medium', status: 'pending' },
  { id: '3', type: 'optimization', title: 'Duplicate Entry Detected', description: 'Possible duplicate transaction found for Electric Corp', urgency: 'low', status: 'pending' },
  { id: '4', type: 'anomaly', title: 'Uncategorized Transaction', description: 'Transaction requires categorization', urgency: 'medium', transactionId: '5', status: 'pending' },
];

export const mockAuditLogs: AuditLog[] = [
  { id: '1', userId: 'U1', userName: 'admin@finpulse.com', action: 'login', module: 'Auth', timestamp: '2024-01-15T09:00:00Z', ipAddress: '192.168.1.1' },
  { id: '2', userId: 'U1', userName: 'admin@finpulse.com', action: 'create', module: 'Transaction', entityId: '8', entityType: 'transaction', timestamp: '2024-01-15T09:15:00Z', ipAddress: '192.168.1.1', afterSnapshot: { description: 'Consulting Revenue', amount: 75000 } },
  { id: '3', userId: 'U1', userName: 'admin@finpulse.com', action: 'update', module: 'Vendor', entityId: '1', entityType: 'vendor', timestamp: '2024-01-15T10:00:00Z', ipAddress: '192.168.1.1', beforeSnapshot: { phone: '+92-300-1111111' }, afterSnapshot: { phone: '+92-300-1234567' } },
  { id: '4', userId: 'U1', userName: 'admin@finpulse.com', action: 'export', module: 'Reports', timestamp: '2024-01-15T11:00:00Z', ipAddress: '192.168.1.1' },
];

export const mockNotifications: Notification[] = [
  { id: '1', title: 'Low Balance Alert', message: 'Petty Cash balance is below PKR 40,000', category: 'financial', isRead: false, timestamp: '2024-01-15T12:00:00Z', priority: 'high' },
  { id: '2', title: 'Bill Due Soon', message: 'Bill BILL-002 from Office Supplies Ltd is due in 5 days', category: 'financial', isRead: false, timestamp: '2024-01-15T11:00:00Z', priority: 'medium' },
  { id: '3', title: 'New Login Detected', message: 'Login from new device detected', category: 'security', isRead: true, timestamp: '2024-01-15T09:00:00Z', priority: 'low' },
  { id: '4', title: 'Anomaly Detected', message: 'Agent detected unusual transaction pattern', category: 'agent', isRead: false, timestamp: '2024-01-15T10:30:00Z', priority: 'high' },
];

export const mockExpenseCategories: ExpenseCategory[] = [
  { category: 'Rent', amount: 30000, percentage: 27.6, threshold: 35000 },
  { category: 'Utilities', amount: 15000, percentage: 13.8, threshold: 20000 },
  { category: 'Marketing', amount: 25000, percentage: 23.0, threshold: 20000 },
  { category: 'Office Expenses', amount: 25000, percentage: 23.0, threshold: 30000 },
  { category: 'Software', amount: 8500, percentage: 7.8, threshold: 15000 },
  { category: 'Other', amount: 5000, percentage: 4.8 },
];

export const mockCashFlowData: CashFlowData[] = [
  { period: 'Week 1', inflow: 150000, outflow: 45000, balance: 605000 },
  { period: 'Week 2', inflow: 75000, outflow: 63500, balance: 616500 },
  { period: 'Week 3', inflow: 50000, outflow: 35000, balance: 631500 },
  { period: 'Week 4', inflow: 100000, outflow: 36500, balance: 695000 },
];

export const bankInstitutions = [
  'HBL Bank',
  'UBL Bank',
  'MCB Bank',
  'Allied Bank',
  'Bank Alfalah',
  'Meezan Bank',
  'Faysal Bank',
  'Habib Metropolitan Bank',
];

export const chartOfAccountTemplates = {
  retail: 'Retail Business',
  services: 'Professional Services',
  manufacturing: 'Manufacturing',
};
