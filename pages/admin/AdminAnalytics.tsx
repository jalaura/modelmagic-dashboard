import React from 'react';
import { DollarSign, Clock, CheckCircle, TrendingUp } from 'lucide-react';

const StatCard: React.FC<{ title: string; value: string; icon: any; color: string }> = ({ title, value, icon: Icon, color }) => (
   <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-start mb-4">
         <div>
            <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">{title}</p>
            <h3 className="text-3xl font-bold text-[#1A1A1A] mt-1">{value}</h3>
         </div>
         <div className={`p-2 rounded-lg ${color} bg-opacity-10`}>
            <Icon className={color.replace('bg-', 'text-')} size={20} />
         </div>
      </div>
      <div className="flex items-center gap-1 text-xs font-bold text-[#22C55E]">
         <TrendingUp size={12} />
         <span>+12.5% from last week</span>
      </div>
   </div>
);

export const AdminAnalytics: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="pb-6 border-b border-[#E5E7EB]">
         <h1 className="text-3xl font-bold text-[#1A1A1A] tracking-tight">Performance Analytics</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <StatCard title="Revenue (MTD)" value="$12,450" icon={DollarSign} color="bg-[#1F6B55]" />
         <StatCard title="Projects Delivered" value="142" icon={CheckCircle} color="bg-[#F59E0B]" />
         <StatCard title="Avg Turnaround" value="26h" icon={Clock} color="bg-[#EC4899]" />
         <StatCard title="Client Satisfaction" value="4.9/5" icon={CheckCircle} color="bg-[#22C55E]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="bg-white border border-[#E5E7EB] rounded-xl p-8 shadow-sm h-80 flex items-center justify-center text-gray-400 font-medium">
            Revenue Chart Placeholder
         </div>
         <div className="bg-white border border-[#E5E7EB] rounded-xl p-8 shadow-sm h-80 flex items-center justify-center text-gray-400 font-medium">
            Project Volume Chart Placeholder
         </div>
      </div>
    </div>
  );
};