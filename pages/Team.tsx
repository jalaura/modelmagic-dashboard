import React from 'react';
import { useApp } from '../context';
import { MessageSquare, Mail, Star, Clock, Globe } from 'lucide-react';

export const TeamPage: React.FC = () => {
  const { teamMembers } = useApp();

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col gap-6 pb-6 border-b border-[#E5E7EB]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
            <h1 className="text-4xl font-bold text-[#1A1A1A] tracking-tight">Your Dedicated Team</h1>
            <p className="text-[#6B7280] mt-2 max-w-2xl font-light">
                Meet the professionals managing your projects. All ModelMagic editors are vetted experts.
            </p>
            </div>
            {/* Communication Policy Badge */}
            <div className="flex items-center gap-2 text-sm text-[#1F6B55] bg-[#1F6B55]/5 px-4 py-2 rounded-full border border-[#1F6B55]/20">
                <Globe size={16} />
                <span className="font-medium">100% Remote, Async Team</span>
            </div>
        </div>

        {/* Async Banner */}
        <div className="bg-[#1A1A1A] text-white p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <Clock className="text-[#22C55E]" size={24} />
                </div>
                <div>
                    <h3 className="font-bold text-lg">We work asynchronously</h3>
                    <p className="text-white/80 text-sm">All communication happens via chat & email. Our team responds within 4 business hours.</p>
                </div>
            </div>
            <div className="flex gap-3">
                 <button className="px-5 py-2.5 bg-white text-[#1A1A1A] rounded-md text-sm font-bold hover:bg-gray-100 transition-colors">
                    Start a Chat
                 </button>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map(member => (
          <div key={member.id} className="bg-white border border-[#E5E7EB] rounded-xl p-8 shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] transition-all duration-300 group">
            <div className="flex items-start justify-between mb-6">
              <div className="relative">
                <img src={member.avatar} alt={member.name} className="w-24 h-24 rounded-full border-4 border-[#F5F3F0] object-cover" />
                <span className={`absolute bottom-1 right-1 w-5 h-5 border-2 border-white rounded-full ${
                  member.isOnline ? 'bg-[#22C55E]' : 'bg-[#D1D5DB]'
                }`} />
              </div>
              <div className="bg-[#F5F3F0] text-[#1F6B55] text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wider">
                {member.role}
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-[#1A1A1A] mb-1">{member.name}</h3>
            <p className="text-[#6B7280] text-sm mb-8 font-medium">{member.email}</p>

            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 bg-[#1A1A1A] text-white py-2.5 rounded-md font-bold text-sm hover:bg-black transition-colors">
                <MessageSquare size={16} /> Chat
              </button>
              <button className="flex items-center justify-center gap-2 border border-[#E5E7EB] rounded-md text-[#1A1A1A] font-medium text-sm hover:bg-[#F5F3F0] hover:border-[#D1D5DB] transition-colors">
                <Mail size={16} /> Email
              </button>
            </div>
            <p className="text-center text-[10px] text-[#9CA3AF] mt-4 font-medium uppercase tracking-wider">Typically replies in 2-4 hrs</p>
          </div>
        ))}

        {/* QA Pool Card */}
        <div className="bg-[#F5F3F0] border border-dashed border-[#D1D5DB] rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-[#E5E7EB]/50 transition-colors">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                <Star className="text-[#1F6B55]" size={32} />
            </div>
            <h3 className="font-bold text-lg text-[#1A1A1A] mb-2">QA & Retouching Pool</h3>
            <p className="text-sm text-[#6B7280] mb-6 leading-relaxed max-w-xs">
                Behind your lead editor, we have a team of 15+ specialists handling bulk processing and quality assurance.
            </p>
            <span className="text-xs font-bold text-[#1F6B55] bg-white border border-[#E5E7EB] px-4 py-1.5 rounded-full shadow-sm">
                Always Available
            </span>
        </div>
      </div>

      {/* Metrics */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden shadow-sm mt-8">
        <div className="p-8 border-b border-[#E5E7EB]">
            <h3 className="font-bold text-xl text-[#1A1A1A]">Service Level Agreement</h3>
        </div>
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E5E7EB]">
            <div className="p-8 hover:bg-[#F9FAFB] transition-colors">
                <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">Avg. Response Time</p>
                <p className="text-4xl font-bold text-[#1A1A1A] tracking-tight">2.4 <span className="text-lg text-[#6B7280] font-normal">hrs</span></p>
                <p className="text-sm text-[#22C55E] mt-3 font-medium flex items-center gap-1">✓ Within guarantee</p>
            </div>
            <div className="p-8 hover:bg-[#F9FAFB] transition-colors">
                <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">On-Time Delivery</p>
                <p className="text-4xl font-bold text-[#1A1A1A] tracking-tight">99.8<span className="text-lg text-[#6B7280] font-normal">%</span></p>
                <p className="text-sm text-[#22C55E] mt-3 font-medium flex items-center gap-1">✓ Top tier performance</p>
            </div>
            <div className="p-8 hover:bg-[#F9FAFB] transition-colors">
                <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">Satisfaction Score</p>
                <p className="text-4xl font-bold text-[#1A1A1A] tracking-tight">4.9<span className="text-lg text-[#6B7280] font-normal">/5</span></p>
                <p className="text-sm text-[#6B7280] mt-3">Based on last 50 projects</p>
            </div>
        </div>
      </div>
    </div>
  );
};