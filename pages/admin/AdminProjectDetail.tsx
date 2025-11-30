import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context';
import { ProjectStatus } from '../../types';
import { ChevronLeft, CheckCircle, Upload, MessageSquare, Clock, Save, Eye } from 'lucide-react';

export const AdminProjectDetail: React.FC = () => {
  const { id } = useParams();
  const { projects, updateProject } = useApp();
  const project = projects.find(p => p.id === id);
  const [internalNote, setInternalNote] = useState(project?.internalNotes || '');

  if (!project) return <div>Project not found</div>;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-4">
          <Link to="/admin" className="p-2 hover:bg-white rounded-full text-[#6B7280] border border-transparent hover:border-[#E5E7EB]">
            <ChevronLeft size={24} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#1A1A1A]">{project.name}</h1>
            <p className="text-sm text-[#6B7280]">Client: {project.clientName} • {project.clientEmail}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-[#E5E7EB] bg-white rounded-md text-[#6B7280] font-bold text-sm shadow-sm hover:bg-gray-50">
             Save Draft
          </button>
          <button 
             onClick={() => updateProject(project.id, { status: ProjectStatus.QA_REVIEW })}
             className="px-6 py-2 bg-[#1F6B55] text-white rounded-md font-bold text-sm shadow-sm hover:bg-[#164f3f]"
          >
             Submit for QA
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col: Brief & Assets */}
        <div className="space-y-8">
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-[#1A1A1A] mb-4">Client Brief</h3>
            <div className="bg-[#F5F3F0] p-4 rounded-lg text-sm text-[#4B5563] mb-4">
              {project.creativeBrief}
            </div>
             <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Package:</span> <span className="font-medium">{project.packageType}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Items:</span> <span className="font-medium">{project.itemQuantity}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Priority:</span> <span className="font-bold text-[#F59E0B]">{project.priority}</span></div>
             </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-sm">
             <h3 className="font-bold text-[#1A1A1A] mb-4">Internal Notes</h3>
             <textarea 
                className="w-full border border-[#E5E7EB] rounded-md p-3 text-sm h-32 focus:ring-1 focus:ring-[#1F6B55] outline-none"
                placeholder="Notes for the team..."
                value={internalNote}
                onChange={(e) => setInternalNote(e.target.value)}
             />
             <button 
                onClick={() => updateProject(project.id, { internalNotes: internalNote })}
                className="mt-2 text-xs font-bold text-[#1F6B55] hover:underline"
             >
                Save Note
             </button>
          </div>
        </div>

        {/* Center: Work Area */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white border border-[#E5E7EB] rounded-xl p-8 shadow-sm text-center">
              <div className="w-16 h-16 bg-[#F5F3F0] rounded-full flex items-center justify-center mx-auto mb-4 text-[#1F6B55]">
                 <Upload size={24} />
              </div>
              <h3 className="font-bold text-lg text-[#1A1A1A] mb-2">Upload Deliverables</h3>
              <p className="text-[#6B7280] text-sm mb-6">Drag and drop edited files here or click to browse.</p>
              <button className="px-6 py-2 border-2 border-[#1F6B55] text-[#1F6B55] rounded-md font-bold text-sm hover:bg-[#1F6B55] hover:text-white transition-colors">
                 Select Files
              </button>
           </div>

           <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-[#1A1A1A] mb-6">QA Checklist</h3>
              <div className="space-y-4">
                 {[
                    'Resolution check (2000px+)',
                    'Color profile (sRGB)',
                    'Background removal accuracy',
                    'Lighting consistency',
                    'Brief compliance'
                 ].map((item, i) => (
                    <label key={i} className="flex items-center gap-3 p-3 hover:bg-[#F9FAFB] rounded-lg cursor-pointer transition-colors">
                       <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-[#1F6B55] focus:ring-[#1F6B55]" />
                       <span className="text-sm font-medium text-[#1A1A1A]">{item}</span>
                    </label>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};