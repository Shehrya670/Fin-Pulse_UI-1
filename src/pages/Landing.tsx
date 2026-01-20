import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check, Lock, Zap, TrendingUp, Users, BarChart3, ChevronDown, BookOpen, Headphones, FileText, Gauge, CreditCard, DollarSign } from 'lucide-react';

const Landing: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const features = [
    { icon: Gauge, title: 'Accounting', description: 'Manage books and track finances' },
    { icon: Users, title: 'Team Management', description: 'Collaborate with your team' },
    { icon: TrendingUp, title: 'Reports', description: 'Insights and analytics' },
    { icon: CreditCard, title: 'Invoicing', description: 'Create and send invoices' },
  ];

  const pricing = [
    { title: 'Starter', price: '$15/mo', features: ['Up to 5 users', 'Basic reports', 'Email support'] },
    { title: 'Professional', price: '$45/mo', features: ['Up to 25 users', 'Advanced reports', 'Priority support'] },
    { title: 'Enterprise', price: 'Custom', features: ['Unlimited users', 'Custom integrations', 'Dedicated support'] },
  ];

  const support = [
    { icon: BookOpen, title: 'Documentation', description: 'Read our guides and tutorials' },
    { icon: Headphones, title: 'Support Center', description: '24/7 customer support team' },
    { icon: FileText, title: 'Blog', description: 'Tips and industry insights' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800/50 sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center text-slate-900 font-bold text-sm">FP</div>
            <div className="font-semibold text-lg">Fin-Pulse</div>
          </div>

          <nav className="flex items-center gap-3">
            {/* Features Dropdown Card */}
            <div className="relative group">
              <button
                onMouseEnter={() => setOpenDropdown('features')}
                onMouseLeave={() => setOpenDropdown(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500 rounded-lg text-sm text-slate-300 hover:text-white transition flex items-center gap-2 shadow-lg"
              >
                Features <ChevronDown size={16} className="group-hover:rotate-180 transition" />
              </button>
              {openDropdown === 'features' && (
                <div
                  onMouseEnter={() => setOpenDropdown('features')}
                  onMouseLeave={() => setOpenDropdown(null)}
                  className="absolute top-full -left-6 mt-2 w-80 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-4 grid grid-cols-2 gap-3"
                >
                  {features.map((feature, idx) => {
                    const IconComponent = feature.icon;
                    return (
                      <div key={idx} className="p-3 rounded-lg hover:bg-slate-700 transition cursor-pointer">
                        <div className="flex items-start gap-3">
                          <IconComponent size={20} className="text-cyan-400 flex-shrink-0 mt-1" />
                          <div>
                            <div className="text-sm font-semibold">{feature.title}</div>
                            <div className="text-xs text-slate-400">{feature.description}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Accountants Card */}
            <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500 rounded-lg text-sm text-slate-300 hover:text-white transition shadow-lg">
              Accountants
            </button>

            {/* Pricing Dropdown Card */}
            <div className="relative group">
              <button
                onMouseEnter={() => setOpenDropdown('pricing')}
                onMouseLeave={() => setOpenDropdown(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-teal-500 rounded-lg text-sm text-slate-300 hover:text-white transition flex items-center gap-2 shadow-lg"
              >
                Pricing <ChevronDown size={16} className="group-hover:rotate-180 transition" />
              </button>
              {openDropdown === 'pricing' && (
                <div
                  onMouseEnter={() => setOpenDropdown('pricing')}
                  onMouseLeave={() => setOpenDropdown(null)}
                  className="absolute top-full -left-12 mt-2 w-96 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-6"
                >
                  <div className="grid grid-cols-3 gap-4">
                    {pricing.map((plan, idx) => (
                      <div key={idx} className="bg-slate-700 border border-slate-600 p-4 rounded-lg hover:bg-slate-600 hover:border-slate-500 transition">
                        <div className="text-sm font-semibold mb-2">{plan.title}</div>
                        <div className="text-2xl font-bold text-cyan-400 mb-4">{plan.price}</div>
                        <ul className="space-y-2">
                          {plan.features.map((feature, fidx) => (
                            <li key={fidx} className="text-xs text-slate-300 flex items-center gap-2">
                              <Check size={14} className="text-teal-400" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-semibold hover:shadow-lg hover:shadow-cyan-500/50">View All Plans</Button>
                </div>
              )}
            </div>

            {/* Learn & Support Dropdown Card */}
            <div className="relative group">
              <button
                onMouseEnter={() => setOpenDropdown('support')}
                onMouseLeave={() => setOpenDropdown(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500 rounded-lg text-sm text-slate-300 hover:text-white transition flex items-center gap-2 shadow-lg"
              >
                Learn & Support <ChevronDown size={16} className="group-hover:rotate-180 transition" />
              </button>
              {openDropdown === 'support' && (
                <div
                  onMouseEnter={() => setOpenDropdown('support')}
                  onMouseLeave={() => setOpenDropdown(null)}
                  className="absolute top-full -left-12 mt-2 w-80 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-4 space-y-3"
                >
                  {support.map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                      <div key={idx} className="p-3 rounded-lg hover:bg-slate-700 transition cursor-pointer">
                        <div className="flex items-start gap-3">
                          <IconComponent size={20} className="text-teal-400 flex-shrink-0 mt-1" />
                          <div>
                            <div className="text-sm font-semibold">{item.title}</div>
                            <div className="text-xs text-slate-400">{item.description}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Log in Card */}
            <Link to="/login" className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-teal-500 rounded-lg text-sm text-slate-300 hover:text-white transition shadow-lg">
              Log in
            </Link>

            {/* Get Started Button */}
            <Link to="/signup">
              <Button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-semibold hover:shadow-lg hover:shadow-cyan-500/50">Get started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-6xl md:text-7xl font-black leading-tight bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-300 bg-clip-text text-transparent">
              Automation where it counts. <span className="text-white">Human when it matters.</span>
            </h1>
            <p className="mt-6 text-xl text-slate-400 max-w-lg leading-relaxed">
              Save time and unlock growth with integrated business tools and AI automation, all in one place.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <Link to="/signup">
                <Button className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-lg font-semibold shadow-lg hover:shadow-green-500/50">See plans & pricing</Button>
              </Link>
            </div>

            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
              <div className="flex items-start gap-4 bg-slate-800/40 p-6 rounded-xl border border-slate-700/50 hover:border-cyan-500/30 transition">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-500/20 to-teal-500/20 flex items-center justify-center flex-shrink-0 text-cyan-400"><Zap size={24} /></div>
                <div>
                  <div className="font-semibold">Quick Setup</div>
                  <div className="text-sm text-slate-400 mt-1">Get started in minutes, not days</div>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-slate-800/40 p-6 rounded-xl border border-slate-700/50 hover:border-cyan-500/30 transition">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-500/20 to-teal-500/20 flex items-center justify-center flex-shrink-0 text-cyan-400"><Lock size={24} /></div>
                <div>
                  <div className="font-semibold">Bank-Level Security</div>
                  <div className="text-sm text-slate-400 mt-1">Enterprise-grade protection</div>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Preview Card */}
          <div className="relative">
            <div className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-8 border border-slate-700/50 shadow-2xl">
              <div className="absolute -top-1 -left-1 w-40 h-40 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-full blur-3xl opacity-50"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500"></div>
                  <h3 className="text-xl font-bold">Accounting Agent</h3>
                </div>

                <div className="space-y-4">
                  <div className="text-center py-6">
                    <div className="text-5xl font-black text-cyan-400">23</div>
                    <div className="text-slate-300 mt-2">Transactions categorized</div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-700/50">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-400">10</div>
                      <div className="text-xs text-slate-400 mt-2">New items</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-teal-400">7</div>
                      <div className="text-xs text-slate-400 mt-2">Open proposals</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-400">3</div>
                      <div className="text-xs text-slate-400 mt-2">Pending contracts</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-slate-800 bg-slate-900/50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 rounded-xl border border-slate-700/50 hover:border-cyan-500/50 transition">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-500/20 to-teal-500/20 flex items-center justify-center text-cyan-400 mb-6">
                <Check size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Accuracy you can count on</h3>
              <p className="text-slate-400 leading-relaxed">Your Accounting Agent helps keep your books accurate by categorising transactions and detecting anomalies, all ready for you to review and approve.</p>
            </div>

            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 rounded-xl border border-slate-700/50 hover:border-teal-500/50 transition">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-teal-500/20 to-cyan-500/20 flex items-center justify-center text-teal-400 mb-6">
                <TrendingUp size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Surface more leads</h3>
              <p className="text-slate-400 leading-relaxed">Your dedicated Customer Agent finds leads and streamlines follow-up, giving you new opportunities to grow the business faster.</p>
            </div>

            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 rounded-xl border border-slate-700/50 hover:border-cyan-500/50 transition">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-500/20 to-teal-500/20 flex items-center justify-center text-cyan-400 mb-6">
                <BarChart3 size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Grow with confidence</h3>
              <p className="text-slate-400 leading-relaxed">Your Finance Agent will surface insights and interpret financial reports to help you stay ahead and make smarter decisions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-black mb-12 text-center">Powerful Features for Every Role</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            'Accounting',
            'Marketing',
            'Customer Hub',
            'Sales & Get Paid',
            'Expenses',
            'Time Tracking',
            'Team Management',
            'Projects'
          ].map((module) => (
            <div key={module} className="bg-slate-800/40 border border-slate-700/50 hover:border-cyan-500/50 hover:bg-slate-800/60 transition rounded-lg p-6 flex items-center gap-3 group cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-500/20 to-teal-500/20 flex items-center justify-center text-cyan-400 group-hover:from-cyan-500/40 group-hover:to-teal-500/40 transition">
                <div className="w-5 h-5 rounded bg-cyan-500/60"></div>
              </div>
              <span className="font-semibold">{module}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-slate-800 bg-gradient-to-r from-slate-900 to-slate-950 py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to transform your business?</h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">Join thousands of businesses automating their operations with Fin-Pulse.</p>
          <Link to="/signup">
            <Button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 text-lg font-bold hover:shadow-lg hover:shadow-cyan-500/50">Get started free</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-400 text-sm">
          <p>&copy; 2026 Fin-Pulse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
