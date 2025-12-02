import React, { useEffect, useState } from 'react';
import { DollarSign, Clock, CheckCircle, TrendingUp } from 'lucide-react';

const StatCard: React.FC<{ title: string; value: string; icon: any; color: string }> = ({ title, value, icon: Icon, color }) =>
  <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">{title}</p>
        <h3 className="text-3xl font-bold text-[#1A1A1A] mt-1">{value}</h3>
      </div>
      <div className={`p-2 rounded-lg ${color} bg-opacity-10`}>
        <Icon className={`${color.replace('bg-', 'text-')}`} size={20} />
      </div>
    </div>
    <div className="flex items-center gap-1 text-xs font-bold text-[#22C55E]">
      <TrendingUp size={12} />
      <span>Live API data</span>
    </div>
  </div>
);

export const AdminAnalytics: React.FC = () => {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('https://modelmagic-api.cmsdossier.workers.dev/api/analytics/metrics');
        if (response.ok) {
          const data = await response.json();
          if (data.success) setMetrics(data.metrics);
        }
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const revenue = metrics?.total_revenue ? `$${metrics.total_revenue.toLocaleString()}` : '$0';
  const projectsDelivered = metrics?.total_projects?.toString() || '0';
  const activeProjects = metrics?.active_projects?.toString() || '0';
  const onlineTeam = metrics?.online_team_members?.toString() || '0';

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="pb-6 border-b border-[#E5E7EB]">
        <h1 className="text-3xl font-bold text-[#1A1A1A] tracking-tight">Performance Analytics</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Revenue (MTD)" value={revenue} icon={DollarSign} color="bg-[#1F6B55]" />
        <StatCard title="Projects Delivered" value={projectsDelivered} icon={CheckCircle} color="bg-[#F59E0B]" />
        <StatCard title="Active Projects" value={activeProjects} icon={Clock} color="bg-[#EC4899]" />
        <StatCard title="Online Team" value={onlineTeam} icon={CheckCircle} color="bg-[#22C55E]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-8 shadow-sm h-80 flex items-center justify-center text-gray-400">
          Revenue Chart
        </div>
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-8 shadow-sm h-80 flex items-center justify-center text-gray-400">
          Project Volume Chart
        </div>
      </div>
    </div>
  );
};
