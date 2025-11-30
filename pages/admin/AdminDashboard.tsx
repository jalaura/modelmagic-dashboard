import React, { useState } from 'react';
import { useApp } from '../../context';
import { ProjectStatus } from '../../types';
import { Link } from 'react-router-dom';
import { ArrowRight, Filter, MoreHorizontal, Clock } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { projects, teamMembers, updateProject } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredProjects = projects.filter(p => {
    if (filterStatus === 'all') return true;
    return p.status === filterStatus;
  });

  const getPriorityColor = (priority?: string) => {
    switch(priority) {
      case 'Urgent': return 'text-[#EF4444] bg-[#EF4444]/10';
      case 'Standard': return 'text-[#F59E0B] bg-[#F59E0B]/10';
      case 'Low': return 'text-[#22C55E] bg-[#22C55E]/10';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex justify-between items-center pb-6 border-b border-[#E5E7EB]">
        <div>
          <h1 className="text-3xl font-bold text-[#1A1A1A] tracking-tight">Project Queue</h1>
          <p className="text-[#6B7280] mt-2">Manage incoming requests and production workflow.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E7EB] rounded-md text-[#6B7280] hover:text-[#1A1A1A] text-sm font-medium shadow-sm">
            <Filter size={16} /> Filter
          </button>
        </div>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider">Project</th>
              <th className="px-6 py-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider">Client</th>
              <th className="px-6 py-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider">Package</th>
              <th className="px-6 py-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider">Priority</th>
              <th className="px-6 py-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider">Assigned Editor</th>
              <th className="px-6 py-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider">Due</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB]">
            {filteredProjects.map(project => (
              <tr key={project.id} className="hover:bg-[#F9FAFB] transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={project.thumbnail} className="w-10 h-10 rounded object-cover border border-[#E5E7EB]" />
                    <span className="font-bold text-[#1A1A1A] text-sm">{project.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-[#4B5563]">{project.clientName || 'Sarah Jenning'}</td>
                <td className="px-6 py-4 text-sm font-medium text-[#1A1A1A]">
                  {project.packageType} 
                  <span className="text-gray-500 text-xs ml-1">× {project.itemQuantity}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${getPriorityColor(project.priority)}`}>
                    {project.priority || 'Standard'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <select 
                    className="text-sm border-none bg-transparent focus:ring-0 text-[#1F6B55] font-medium cursor-pointer"
                    value={project.assignedEditor?.id || ''}
                    onChange={(e) => {
                      const editor = teamMembers.find(m => m.id === e.target.value);
                      if (editor) updateProject(project.id, { assignedEditor: editor });
                    }}
                  >
                    <option value="">Unassigned</option>
                    {teamMembers.filter(m => m.role === 'Lead Editor' || m.role === 'Senior Retoucher').map(m => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4">
                   <span className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider
                        ${project.status === ProjectStatus.COMPLETED ? 'bg-[#22C55E]/10 text-[#22C55E]' :
                          project.status === ProjectStatus.READY_FOR_REVIEW ? 'bg-[#F59E0B]/10 text-[#F59E0B]' :
                          'bg-[#1F6B55]/10 text-[#1F6B55]'}`}>
                        {project.status}
                    </span>
                </td>
                <td className="px-6 py-4 text-sm text-[#6B7280] font-mono">
                  {new Date(project.deliveryDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <Link to={`/admin/projects/${project.id}`} className="text-[#1F6B55] hover:text-[#164f3f] font-bold text-sm flex items-center justify-end gap-1">
                    Manage <ArrowRight size={14} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};