import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check, Lock } from 'lucide-react';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50">
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">FP</div>
          <div className="font-semibold text-lg">Fin-Pulse</div>
        </div>
        <nav className="flex items-center gap-4">
          <Link to="/login" className="text-sm text-slate-700 hover:underline">Log in</Link>
          <Link to="/signup">
            <Button className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">Get started</Button>
          </Link>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-slate-900">Get back to what you love with Fin-Pulse</h1>
            <p className="mt-6 text-lg text-slate-700 max-w-xl">Accounting software made for small businesses and sole traders — fast, secure and delightful to use. Track expenses, customise invoices and run reports all from one place.</p>

            <div className="mt-8 flex items-center gap-4">
              <Link to="/signup">
                <Button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-base shadow-lg">Try Fin-Pulse for free</Button>
              </Link>
            </div>

            <div className="mt-14 grid grid-cols-2 gap-4 max-w-md">
              <div className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600"><Check size={20} /></div>
                <div>
                  <div className="text-sm font-semibold">Cancel anytime</div>
                  <div className="text-xs text-slate-500">No contracts, no surprises</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600"><Lock size={20} /></div>
                <div>
                  <div className="text-sm font-semibold">Safe and secure</div>
                  <div className="text-xs text-slate-500">Enterprise-grade protection</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-12 text-white shadow-2xl">
              <h3 className="text-2xl font-bold mb-4">Business Overview</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/10 p-4 rounded-lg">
                    <div className="text-sm">Invoices</div>
                    <div className="text-2xl font-bold mt-2">12,352</div>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg">
                    <div className="text-sm">Expenses</div>
                    <div className="text-2xl font-bold mt-2">3,756</div>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg">
                    <div className="text-sm">Sales</div>
                    <div className="text-2xl font-bold mt-2">6,500</div>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg">
                    <div className="text-sm">Bank</div>
                    <div className="text-2xl font-bold mt-2">24,120</div>
                  </div>
                </div>
            </div>

            <div className="absolute -bottom-8 -right-8 w-56 h-56 rounded-2xl bg-white/90 shadow-2xl flex items-center justify-center text-slate-800 font-semibold">
              <div className="text-center px-3">
                <div className="text-sm font-semibold">Dashboard preview</div>
                <div className="text-xs text-slate-600 mt-1">A quick glance at your finances</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
