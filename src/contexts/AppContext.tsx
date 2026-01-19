import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, CompanyProfile, Notification } from '@/types';
import { mockNotifications } from '@/data/mockData';

interface AppContextType {
  isAuthenticated: boolean;
  user: User | null;
  companyProfile: CompanyProfile | null;
  onboardingComplete: boolean;
  notifications: Notification[];
  unreadCount: number;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (data: Partial<User>) => Promise<boolean>;
  completeOnboarding: (profile: CompanyProfile) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login
    if (email && password) {
      setUser({
        id: '1',
        email,
        username: 'Admin User',
        businessName: 'Fin-Pulse Demo',
        role: 'admin',
        isVerified: true,
        twoFactorEnabled: false,
      });
      setIsAuthenticated(true);
      setOnboardingComplete(true);
      setCompanyProfile({
        name: 'Fin-Pulse Demo Company',
        address: 'Islamabad, Pakistan',
        phone: '+92-51-1234567',
        email: 'info@finpulse.com',
        fiscalYearStart: '2024-01-01',
        currency: 'PKR',
        chartOfAccountsTemplate: 'services',
        openingCashBalance: 50000,
        openingBankBalance: 500000,
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setCompanyProfile(null);
    setOnboardingComplete(false);
  };

  const signup = async (data: Partial<User>): Promise<boolean> => {
    // Mock signup
    setUser({
      id: '1',
      email: data.email || '',
      username: data.username || '',
      businessName: data.businessName || '',
      role: 'admin',
      isVerified: false,
      twoFactorEnabled: false,
    });
    setIsAuthenticated(true);
    setOnboardingComplete(false);
    return true;
  };

  const completeOnboarding = (profile: CompanyProfile) => {
    setCompanyProfile(profile);
    setOnboardingComplete(true);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        user,
        companyProfile,
        onboardingComplete,
        notifications,
        unreadCount,
        login,
        logout,
        signup,
        completeOnboarding,
        markNotificationRead,
        markAllNotificationsRead,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
