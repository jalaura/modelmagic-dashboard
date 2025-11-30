import React from 'react';
import { useApp } from '../context';
import { ProjectStatus } from '../types';
import { Link } from 'react-router-dom';
import { CheckCircle2, AlertCircle, ArrowRight, Folder, Briefcase } from 'lucide-react';

const TeamWidget: React.FC<{ manager: any; leadEditor: any }> = ({ manager, leadEditor }) => (
  <div className="bg-white rounded-xl p-8 border border-[#E5E7EB] shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] transition-shadow duration-300">
    <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg text-[#1A1A1A]">Your ModelMagic Team</h3>
        <div className="w-2 h-2 rounded-full bg-[#22C55E]"></div>
    </div>
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="relative">
          <img src={manager.avatar} alt={manager.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-50" />
          {manager.isOnline && <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#22C55E] border-2 border-white rounded-full"></div>}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-[#1A1A1A] text-base">{manager.name}</p>
          <p className="text-sm text-[#6B7280] font-medium">Account Manager</p>
          <button className="mt-2 text-sm text-[#1F6B55] font-medium hover:underline flex items-center gap-1">
            Message <ArrowRight size={12} />
          </button>
        </div>
      </div>
      <div className="h-px bg-[#F3F4F6]" />
      <div className="flex items-start gap-4">
        <div className="relative">
          <img src={leadEditor.avatar} alt={leadEditor.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-50" />
          {leadEditor.isOnline && <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#22C55E] border-2 border-white rounded-full"></div>}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-[#1A1A1A] text-base">{leadEditor.name}</p>
          <p className="text-sm text-[#6B7280] font-medium">Lead Editor</p>
          <button className="mt-2 text-sm text-[#1F6B55] font-medium hover:underline flex items-center gap-1">
            Message <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  </div>
);

const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  accentColor: string;
}> = ({ title, value, icon, accentColor }) => (
  <div className="bg-white p-6 rounded-xl border border-[#E5E7EB] shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] hover:translate-y-[-2px] hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] transition-all duration-300">
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="text-3xl font-bold text-[#1A1A1A] tracking-tight">{value}</h3>
        <p className="text-[#6B7280] text-sm font-medium mt-1 uppercase tracking-wider">{title}</p>
      </div>
      <div className={`p-2.5 rounded-lg ${accentColor} bg-opacity-10 text-opacity-100`}>
        {React.cloneElement(icon as React.ReactElement<any>, { className: accentColor.replace('bg-', 'text-') })}
      </div>
    </div>
  </div>
);

const ProjectCard: React.FC<{ project: any; accentColor: string }> = ({ project, accentColor }) => {
  const isEditing = project.status === ProjectStatus.BEING_EDITED || project.status === ProjectStatus.QA_REVIEW;
  const progressPercent = project.progressDay && project.totalDays 
    ? Math.round((project.progressDay / project.totalDays) * 100) 
    : 0;

  return (
    <div className="group relative bg-white border border-[#E5E7EB] rounded-xl p-8 shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] hover:translate-y-[-4px] transition-all duration-300">
      {/* Accent Square */}
      <div className={`absolute top-0 right-0 w-5 h-5 ${accentColor} rounded-tr-xl rounded-bl-lg`}></div>

      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-5">
          <img 
            src={project.thumbnail} 
            alt={project.name} 
            className="w-20 h-20 rounded-lg object-cover border border-[#E5E7EB]"
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                    {project.category}
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded 
                    ${project.status === ProjectStatus.READY_FOR_REVIEW ? 'bg-[#F59E0B]/10 text-[#F59E0B]' : 'bg-[#1F6B55]/10 text-[#1F6B55]'}`}>
                    {project.status}
                </span>
            </div>
            <h4 className="font-bold text-xl text-[#1A1A1A] tracking-tight mb-1">{project.name}</h4>
            <div className="flex items-center gap-3 text-sm text-[#6B7280] font-mono">
                <span className="font-bold text-[#1F6B55]">{project.packageType}</span>
                <span>•</span>
                <span>Due {new Date(project.deliveryDate).toLocaleDateString(undefined, {month:'short', day:'numeric'})}</span>
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="mb-6">
          <div className="flex justify-between text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-2">
            <span>Day {project.progressDay} of {project.totalDays}</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden">
            <div 
              className={`h-full ${accentColor} rounded-full transition-all duration-500`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-6 border-t border-[#F3F4F6]">
        <div className="flex items-center gap-3">
          {project.assignedEditor && (
            <>
              <img src={project.assignedEditor.avatar} alt={project.assignedEditor.name} className="w-8 h-8 rounded-full border border-white shadow-sm" />
              <div className="flex flex-col">
                  <span className="text-[10px] text-[#9CA3AF] uppercase font-bold tracking-wider">Editor</span>
                  <span className="text-xs font-medium text-[#1A1A1A]">{project.assignedEditor.name.split(' ')[0]}</span>
              </div>
            </>
          )}
        </div>
        <Link 
          to={`/projects/${project.id}`}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors border-2
            ${project.status === ProjectStatus.READY_FOR_REVIEW 
                ? 'bg-[#F59E0B] border-[#F59E0B] text-white hover:bg-[#D97706]' 
                : 'bg-white border-[#E5E7EB] text-[#1A1A1A] hover:border-[#1F6B55] hover:text-[#1F6B55]'}`}
        >
          {project.status === ProjectStatus.READY_FOR_REVIEW ? 'Review Now' : 'Details'} 
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
};

export const Dashboard: React.FC = () => {
  const { projects, user, teamMembers, messages } = useApp();
  
  const activeProjects = projects.filter(p => p.status !== ProjectStatus.COMPLETED && p.status !== ProjectStatus.DRAFT);
  const actionNeeded = projects.filter(p => p.status === ProjectStatus.READY_FOR_REVIEW);
  const completedCount = projects.filter(p => p.status === ProjectStatus.COMPLETED).length;
  
  const accountManager = teamMembers.find(m => m.role === 'Account Manager') || teamMembers[0];
  const leadEditor = teamMembers.find(m => m.role === 'Lead Editor') || teamMembers[1];

  const recentMessages = messages.slice(0, 3);
  
  // Greptile Accents cycle
  const accents = ['bg-[#22C55E]', 'bg-[#EC4899]', 'bg-[#F97316]', 'bg-[#F59E0B]'];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E5E7EB]">
        <div>
          <span className="inline-block px-3 py-1 rounded-md bg-[#1F6B55]/10 text-[#1F6B55] text-xs font-bold uppercase tracking-wider mb-4">
            Dashboard
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] tracking-tight leading-tight">
            Welcome back, {user.name.split(' ')[0]}.
          </h1>
          <p className="text-lg text-[#6B7280] mt-4 max-w-2xl font-light">
            You have <strong className="text-[#1A1A1A] font-medium">{activeProjects.length} projects</strong> currently in production. 
            Questions? Chat or email us anytime.
          </p>
        </div>
        <div className="flex gap-4">
           <Link 
            to="/projects/new"
            className="flex items-center gap-2 bg-[#1F6B55] hover:bg-[#164f3f] text-white px-6 py-3 rounded-md font-bold shadow-sm transition-all hover:-translate-y-0.5"
          >
            Submit Project <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Column (Projects) - Spans 8 cols */}
        <div className="lg:col-span-8 space-y-10">
          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <StatCard 
              title="In Progress" 
              value={activeProjects.length} 
              icon={<Briefcase size={20} />}
              accentColor="bg-[#22C55E]"
            />
            <StatCard 
              title="Awaiting Review" 
              value={actionNeeded.length} 
              icon={<AlertCircle size={20} />}
              accentColor="bg-[#F59E0B]"
            />
            <StatCard 
              title="Delivered" 
              value={completedCount} 
              icon={<CheckCircle2 size={20} />}
              accentColor="bg-[#EC4899]"
            />
          </div>

          {/* Action Needed */}
          {actionNeeded.length > 0 && (
            <section className="animate-fadeIn">
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-1.5 h-6 bg-[#F59E0B] rounded-full"></div>
                 <h2 className="text-2xl font-bold text-[#1A1A1A] tracking-tight">Needs Approval</h2>
              </div>
              <div className="grid gap-6">
                {actionNeeded.map((project, idx) => (
                  <ProjectCard key={project.id} project={project} accentColor="bg-[#F59E0B]" />
                ))}
              </div>
            </section>
          )}

          {/* Active Projects */}
          <section>
             <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-[#1F6B55] rounded-full"></div>
                    <h2 className="text-2xl font-bold text-[#1A1A1A] tracking-tight">In Production</h2>
                </div>
                <Link to="/projects" className="text-sm text-[#1F6B55] font-bold hover:underline flex items-center gap-1">
                    View All Projects <ArrowRight size={14} />
                </Link>
              </div>
              
              <div className="grid gap-6">
                {activeProjects.filter(p => p.status !== ProjectStatus.READY_FOR_REVIEW).map((project, idx) => (
                   <ProjectCard key={project.id} project={project} accentColor={accents[idx % accents.length]} />
                ))}
                {activeProjects.length === 0 && actionNeeded.length === 0 && (
                  <div className="bg-white border border-dashed border-[#E5E7EB] rounded-xl p-16 text-center">
                    <div className="w-16 h-16 bg-[#F5F3F0] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Folder className="text-[#9CA3AF]" size={24} />
                    </div>
                    <h3 className="font-bold text-lg text-[#1A1A1A] mb-2">No active projects</h3>
                    <p className="text-[#6B7280] mb-6 max-w-md mx-auto">Our editing team is standing by. Submit a new project to get started.</p>
                    <Link to="/projects/new" className="text-[#1F6B55] font-bold hover:underline">Start a Project</Link>
                  </div>
                )}
              </div>
          </section>
        </div>

        {/* Right Sidebar (Team & Comms) - Spans 4 cols */}
        <div className="lg:col-span-4 space-y-8">
          <TeamWidget manager={accountManager} leadEditor={leadEditor} />

          {/* Messages */}
          <div className="bg-white rounded-xl shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] border border-[#E5E7EB] p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg text-[#1A1A1A]">Team Chat</h3>
              <Link to="/team" className="text-xs text-[#1F6B55] font-bold uppercase tracking-wider hover:underline">View All</Link>
            </div>
            <div className="space-y-6">
              {recentMessages.map(msg => (
                <div key={msg.id} className="flex gap-4 group cursor-pointer hover:bg-gray-50 -mx-2 p-2 rounded-lg transition-colors">
                  <img src={msg.sender.avatar} alt={msg.sender.name} className="w-10 h-10 rounded-full flex-shrink-0 object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between mb-1">
                      <p className="text-sm font-bold text-[#1A1A1A]">{msg.sender.name.split(' ')[0]}</p>
                      <span className="text-[10px] text-[#9CA3AF] font-mono">2h</span>
                    </div>
                    <div className="bg-[#F5F3F0] p-3 rounded-lg rounded-tl-none relative">
                        <p className="text-sm text-[#4B5563] leading-relaxed line-clamp-2">{msg.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Tip */}
          <div className="bg-[#1F6B55] rounded-xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full translate-x-8 -translate-y-8"></div>
            <h3 className="font-bold text-lg mb-3 relative z-10">Did you know?</h3>
            <p className="text-white/80 text-sm mb-4 leading-relaxed relative z-10">
              The <strong>DFY Pack</strong> includes a product video for your social media channels at no extra cost.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};