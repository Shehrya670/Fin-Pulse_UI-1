import React from 'react';
import { Bell, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useApp } from '@/contexts/AppContext';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  sidebarCollapsed: boolean;
}

const Header: React.FC<HeaderProps> = ({ sidebarCollapsed }) => {
  const { user, unreadCount, logout, notifications, markNotificationRead } = useApp();
  const navigate = useNavigate();

  const recentNotifications = notifications.slice(0, 5);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header
      className={`fixed top-0 right-0 z-30 flex h-14 items-center justify-between bg-white border-b border-slate-200 px-4 transition-all duration-300 shadow-sm ${
        sidebarCollapsed ? 'left-16' : 'left-64'
      }`}
    >
      <div className="flex items-center gap-4">
        <h2 className="text-sm font-medium text-slate-600">
          Welcome back, <span className="text-slate-900 font-semibold">{user?.username || 'User'}</span>
        </h2>
      </div>

      <div className="flex items-center gap-2">
        {/* Notification Bell */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative border-slate-200 hover:bg-slate-100">
              <Bell size={18} className="text-slate-600" />
              {unreadCount > 0 && (
                <Badge className="absolute -right-1 -top-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 border-slate-200">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-xs text-blue-600 hover:text-indigo-600"
                onClick={() => navigate('/notifications')}
              >
                View all
              </Button>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {recentNotifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`flex flex-col items-start gap-1 ${
                  !notification.isRead ? 'bg-blue-50' : ''
                }`}
                onClick={() => markNotificationRead(notification.id)}
              >
                <span className="text-sm">{notification.title}</span>
                <span className="text-xs text-slate-500 line-clamp-1">
                  {notification.message}
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="border-slate-200 hover:bg-slate-100">
              <User size={18} className="text-slate-600" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="border-slate-200">
            <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/user-profile')} className="hover:bg-blue-50">
              <User size={16} className="mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout} className="hover:bg-red-50">
              <LogOut size={16} className="mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
