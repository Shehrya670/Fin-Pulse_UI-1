import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  User,
  Building2,
  Users,
  FileText,
  ArrowLeftRight,
  Receipt,
  Landmark,
  Scale,
  BookOpen,
  TrendingUp,
  LayoutDashboard,
  PieChart,
  Bot,
  History,
  FileBarChart,
  Bell,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const modules = [
  { id: 1, name: 'User Profiling', path: '/user-profile', icon: User },
  { id: 2, name: 'Business Setup', path: '/business-setup', icon: Building2 },
  { id: 3, name: 'Vendor Management', path: '/vendors', icon: Users },
  { id: 4, name: 'Document Upload', path: '/documents', icon: FileText },
  { id: 5, name: 'Transactions', path: '/transactions', icon: ArrowLeftRight },
  { id: 6, name: 'Bills & Invoices', path: '/bills', icon: Receipt },
  { id: 7, name: 'Bank Accounts', path: '/bank-accounts', icon: Landmark },
  { id: 8, name: 'Reconciliation', path: '/reconciliation', icon: Scale },
  { id: 9, name: 'General Ledger', path: '/ledger', icon: BookOpen },
  { id: 10, name: 'Cash Flow', path: '/cash-flow', icon: TrendingUp },
  { id: 11, name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { id: 12, name: 'Expense Tracking', path: '/expenses', icon: PieChart },
  { id: 13, name: 'Agent Centre', path: '/agent', icon: Bot },
  { id: 14, name: 'Audit Trail', path: '/audit', icon: History },
  { id: 15, name: 'Reports', path: '/reports', icon: FileBarChart },
  { id: 16, name: 'Notifications', path: '/notifications', icon: Bell },
];

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen border-r-2 border-foreground bg-background transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex h-14 items-center justify-between border-b-2 border-foreground px-4">
        {!isCollapsed && (
          <span className="text-xl font-bold tracking-tight">FIN-PULSE</span>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-3.5rem)]">
        <nav className="flex flex-col gap-1 p-2">
          {modules.map((module) => {
            const Icon = module.icon;
            const isActive = location.pathname === module.path;
            return (
              <NavLink
                key={module.id}
                to={module.path}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors border-2',
                  isActive
                    ? 'bg-foreground text-background border-foreground'
                    : 'border-transparent hover:bg-secondary hover:border-foreground'
                )}
              >
                <Icon size={18} />
                {!isCollapsed && <span>{module.name}</span>}
              </NavLink>
            );
          })}
        </nav>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;
