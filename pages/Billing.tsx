import React from 'react';
import { Check, CreditCard, Zap, Shield } from 'lucide-react';

const PLANS = [
  {
    name: 'Starter',
    price: 0,
    description: 'Perfect for trying out ModelMagic',
    features: [
      'Pay as you go',
      'Standard support',
      '48-hour turnaround',
      'Basic editing'
    ],
    cta: 'Current Plan',
    current: true
  },
  {
    name: 'Pro',
    price: 49,
    description: 'For growing brands with regular needs',
    features: [
      '10% discount on all services',
      'Priority support',
      '24-hour turnaround',
      'Advanced retouching',
      'Dedicated account manager'
    ],
    cta: 'Upgrade to Pro',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 299,
    description: 'Volume processing for large catalogs',
    features: [
      '20% discount on all services',
      '24/7 Priority support',
      'Same-day turnaround',
      'Custom style guides',
      'API access',
      'SLA guarantee'
    ],
    cta: 'Contact Sales'
  }
];

export const BillingPage: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex justify-between items-center pb-6 border-b border-[#E5E7EB]">
        <div>
          <h1 className="text-4xl font-bold text-[#1A1A1A] tracking-tight">Billing & Plans</h1>
          <p className="text-[#6B7280] mt-2">Manage your subscription and payment methods.</p>
        </div>
      </div>

      {/* Usage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-[#E5E7EB] shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-[#1F6B55]/10 text-[#1F6B55] rounded-lg">
              <CreditCard size={24} />
            </div>
            <div>
              <p className="text-sm text-[#6B7280] font-medium">Current Balance</p>
              <p className="text-2xl font-bold text-[#1A1A1A]">$0.00</p>
            </div>
          </div>
          <button className="w-full py-2 text-sm font-bold text-[#1F6B55] border border-[#1F6B55] rounded-md hover:bg-[#1F6B55]/5 transition-colors">
            View Invoices
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl border border-[#E5E7EB] shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-[#F59E0B]/10 text-[#F59E0B] rounded-lg">
              <Zap size={24} />
            </div>
            <div>
              <p className="text-sm text-[#6B7280] font-medium">Projects this Month</p>
              <p className="text-2xl font-bold text-[#1A1A1A]">3</p>
            </div>
          </div>
          <div className="w-full bg-[#F3F4F6] rounded-full h-2 mt-2">
            <div className="bg-[#F59E0B] h-2 rounded-full" style={{ width: '30%' }}></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-[#E5E7EB] shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-[#3B82F6]/10 text-[#3B82F6] rounded-lg">
              <Shield size={24} />
            </div>
            <div>
              <p className="text-sm text-[#6B7280] font-medium">Plan Status</p>
              <p className="text-2xl font-bold text-[#1A1A1A]">Active</p>
            </div>
          </div>
          <p className="text-sm text-[#6B7280]">Next billing date: June 1, 2024</p>
        </div>
      </div>

      {/* Plans */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-8 text-center">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLANS.map((plan) => (
            <div 
              key={plan.name} 
              className={`relative bg-white rounded-xl p-8 border transition-all duration-300 hover:-translate-y-1 ${
                plan.popular 
                  ? 'border-[#1F6B55] shadow-lg ring-1 ring-[#1F6B55]' 
                  : 'border-[#E5E7EB] shadow-sm hover:shadow-md'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1F6B55] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-xl font-bold text-[#1A1A1A]">{plan.name}</h3>
              <p className="text-[#6B7280] text-sm mt-2 h-10">{plan.description}</p>
              
              <div className="my-6">
                <span className="text-4xl font-bold text-[#1A1A1A]">${plan.price}</span>
                <span className="text-[#6B7280]">/month</span>
              </div>

              <button 
                className={`w-full py-3 rounded-md font-bold text-sm mb-8 transition-colors ${
                  plan.current
                    ? 'bg-[#F3F4F6] text-[#9CA3AF] cursor-default'
                    : plan.popular
                      ? 'bg-[#1F6B55] text-white hover:bg-[#164f3f]'
                      : 'bg-white border border-[#1F6B55] text-[#1F6B55] hover:bg-[#1F6B55]/5'
                }`}
              >
                {plan.cta}
              </button>

              <ul className="space-y-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#6B7280]">
                    <Check size={16} className="text-[#1F6B55] mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};