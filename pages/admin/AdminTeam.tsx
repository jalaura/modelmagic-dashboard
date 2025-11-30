import React from 'react';
import { useApp } from '../../context';
import { Briefcase, CheckCircle, Clock } from 'lucide-react';

export const AdminTeam: React.FC = () => {
  const { teamMembers, projects } = useApp();

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="pb-6 border-b border-[#E5E7EB]">
         <h1 className="text-3xl font-bold text-[#1A1A1A] tracking-tight">Team Workload</h1>
         <p className="text-[#6B7280] mt-2">Monitor capacity and assign tasks effectively.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.filter(m => m.role !== 'Account Manager').map(member => {
           const activeCount = projects.filter(p => p.assignedEditor?.id === member.id && p.status !== 'Completed').length;
           
           return (
              <div key={member.id} className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-sm">
                 <div className="flex items-center gap-4 mb-6">
                    <img src={member.avatar} className="w-16 h-16 rounded-full object-cover" />
                    <div>
                       <h3 className="font-bold text-lg text-[#1A1A1A]">{member.name}</h3>
                       <p className="text-xs font-bold text-[#1F6B55] uppercase tracking-wider">{member.role}</p>
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-[#F5F3F0] p-3 rounded-lg text-center">
                       <p className="text-2xl font-bold text-[#1A1A1A]">{activeCount}</p>
                       <p className="text-xs text-[#6B7280] uppercase font-bold">Active</p>
                    </div>
                    <div className="bg-[#F5F3F0] p-3 rounded-lg text-center">
                       <p className="text-2xl font-bold text-[#1A1A1A]">12</p>
                       <p className="text-xs text-[#6B7280] uppercase font-bold">This Week</p>
                    </div>
                 </div>

                 <div className="space-y-2">
                    <h4 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">Current Assignments</h4>
                    {projects.filter(p => p.assignedEditor?.id === member.id && p.status !== 'Completed').slice(0, 3).map(p => (
                       <div key={p.id} className="text-sm flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                          <span className="truncate max-w-[150px] font-medium">{p.name}</span>
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded font-bold">Due Tmrw</span>
                       </div>
                    ))}
                 </div>
              </div>
           );
        })}
      </div>
    </div>
  );
};