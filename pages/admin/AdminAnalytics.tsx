import React, { useEffect, useState } from 'react';
import { DollarSign, Clock, CheckCircle, TrendingUp, AlertCircle, Loader } from 'lucide-react';

// Type definitions for better type safety
interface AnalyticsMetrics {
  total_revenue: number;
  total_projects: number;
  active_projects: number;
  online_team_members: number;
}

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color }) => {
  // Extract hex color from Tailwind class (e.g., "bg-[#1F6B55]" -> "#1F6B55")
  const hexColor = color.match(/#[0-9A-Fa-f]{6}/) ? color.match(/#[0-9A-Fa-f]{6}/)![0] : '#1F6B55';
  
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">{title}</p>
          <h3 className="text-3xl font-bold text-[#1A1A1A] mt-1">{value}</h3>
        </div>
        <div className="p-2 rounded-lg" style={{ backgroundColor: `${hexColor}1A` }}>
          <Icon style={{ color: hexColor }} size={20} />
        </div>
      </div>
      <div className="flex items-center gap-1 text-xs font-bold text-[#22C55E]">
        <TrendingUp size={12} />
        <span>Live API data</span>
      </div>
    </div>
  );
};

export const AdminAnalytics: React.FC = () => {
  const [metrics, setMetrics] = useState<AnalyticsMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('https://modelmagic-api.cmsdossier.workers.dev/api/analytics/metrics');
        
        if (!response.ok) {
          throw new Error(`API returned ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (data.success && data.metrics) {
          setMetrics(data.metrics);
        } else {
          throw new Error('Invalid API response format');
        }
      } catch (error) {
        console.error('Error fetching analytics:', error);
        setError(error instanceof Error ? error.message : 'Failed to load analytics data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnalytics();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="space-y-8 animate-fadeIn">
        <div className="pb-6 border-b border-[#E5E7EB]">
          <h1 className="text-3xl font-bold text-[#1A1A1A] tracking-tight">Performance Analytics</h1>
        </div>
        <div className="flex flex-col items-center justify-center py-20">
          <Loader className="animate-spin text-[#1F6B55] mb-4" size={48} />
          <p className="text-lg font-medium text-[#6B7280]">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-8 animate-fadeIn">
        <div className="pb-6 border-b border-[#E5E7EB]">
          <h1 className="text-3xl font-bold text-[#1A1A1A] tracking-tight">Performance Analytics</h1>
        </div>
        <div className="flex flex-col items-center justify-center py-20">
          <AlertCircle className="text-red-500 mb-4" size={48} />
          <p className="text-lg font-bold text-[#1A1A1A] mb-2">Failed to Load Analytics</p>
          <p className="text-sm text-[#6B7280] mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-[#1F6B55] text-white rounded-lg hover:bg-[#1a5a47] transition-colors font-medium"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Format metrics with safe fallbacks
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
