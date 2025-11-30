import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context';
import { ProjectStatus } from '../types';
import { 
  ChevronLeft, CheckCircle2, Clock, Calendar, 
  Download, MessageSquare, Edit2, Check, User as UserIcon
} from 'lucide-react';

const ReviewInterface: React.FC<{ projectId: string }> = ({ projectId }) => {
  const { getProjectAssets, updateAssetStatus } = useApp();
  const assets = getProjectAssets(projectId);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showRevisionForm, setShowRevisionForm] = useState(false);
  const currentAsset = assets[selectedIndex];

  if (!assets.length) return <div className="p-12 text-center text-[#6B7280] bg-[#F5F3F0] rounded-xl border border-[#E5E7EB]">Editor hasn't uploaded previews yet.</div>;

  return (
    <div className="bg-[#1A1A1A] rounded-xl overflow-hidden flex flex-col h-[700px] shadow-xl border border-[#E5E7EB]">
      {/* Main View */}
      <div className="flex-1 relative flex items-center justify-center bg-[#0F0F0F]">
        <img 
          src={currentAsset.url} 
          alt={currentAsset.name} 
          className="max-h-full max-w-full object-contain p-8"
        />
        
        {/* Overlays */}
        <div className="absolute top-6 right-6 flex gap-3">
           <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg backdrop-blur-md ${
             currentAsset.status === 'approved' ? 'bg-[#22C55E] text-white' :
             currentAsset.status === 'revision' ? 'bg-[#F59E0B] text-white' :
             'bg-white/10 text-white border border-white/20'
           }`}>
             {currentAsset.status}
           </span>
        </div>

        {/* Revision Form Overlay */}
        {showRevisionForm && (
            <div className="absolute inset-y-0 right-0 w-96 bg-white p-8 shadow-2xl animate-slideIn border-l border-[#E5E7EB]">
                <h3 className="font-bold text-xl text-[#1A1A1A] mb-6">Request Revision</h3>
                
                <div className="space-y-6">
                    <div>
                        <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wider block mb-2">Feedback Tags</label>
                        <div className="flex flex-wrap gap-2">
                            {['Lighting', 'Color', 'Retouching', 'Background', 'Composition'].map(tag => (
                                <button key={tag} className="px-3 py-1.5 text-xs font-medium border border-[#E5E7EB] rounded-md hover:border-[#1F6B55] hover:text-[#1F6B55] transition-colors">{tag}</button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wider block mb-2">Detailed Notes</label>
                        <textarea 
                            className="w-full border border-[#E5E7EB] rounded-md p-3 text-sm h-40 focus:ring-2 focus:ring-[#1F6B55] focus:border-transparent outline-none resize-none"
                            placeholder="Please describe exactly what needs to be changed..."
                        ></textarea>
                    </div>
                    <div className="flex gap-3 pt-4">
                        <button 
                            onClick={() => {
                                updateAssetStatus(currentAsset.id, 'revision');
                                setShowRevisionForm(false);
                            }}
                            className="flex-1 bg-[#F59E0B] text-white py-2.5 rounded-md font-bold text-sm hover:bg-[#D97706] shadow-sm"
                        >
                            Submit Revision
                        </button>
                        <button 
                            onClick={() => setShowRevisionForm(false)}
                            className="px-4 py-2.5 border border-[#E5E7EB] rounded-md text-sm font-medium hover:bg-[#F5F3F0]"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* Review Actions */}
        {!showRevisionForm && (
            <div className="absolute bottom-10 flex gap-4">
            <button 
                onClick={() => setShowRevisionForm(true)}
                className="flex items-center gap-2 px-6 py-3 bg-white text-[#1A1A1A] rounded-md hover:bg-[#F5F3F0] font-bold shadow-lg transition-colors border border-transparent"
            >
                <Edit2 size={18} /> Request Revision
            </button>
            <button 
                onClick={() => updateAssetStatus(currentAsset.id, 'approved')}
                className="flex items-center gap-2 px-6 py-3 bg-[#1F6B55] text-white rounded-md hover:bg-[#164f3f] font-bold shadow-lg transition-colors"
            >
                <Check size={18} /> Approve Design
            </button>
            </div>
        )}
      </div>

      {/* Thumbnails */}
      <div className="h-28 bg-[#151515] p-6 flex gap-4 overflow-x-auto items-center border-t border-white/10">
        {assets.map((asset, idx) => (
          <button 
            key={asset.id}
            onClick={() => setSelectedIndex(idx)}
            className={`relative flex-shrink-0 h-16 w-16 rounded-md overflow-hidden border-2 transition-all ${
              idx === selectedIndex ? 'border-[#1F6B55] ring-2 ring-[#1F6B55]/50 opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
            }`}
          >
            <img src={asset.url} alt="thumbnail" className="w-full h-full object-cover" />
            {asset.status === 'approved' && (
              <div className="absolute top-0 right-0 bg-[#22C55E] p-0.5 rounded-bl-sm">
                <Check size={10} className="text-white" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export const ProjectDetail: React.FC = () => {
  const { id } = useParams();
  const { projects } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'review' | 'files'>('overview');
  
  const project = projects.find(p => p.id === id);

  if (!project) return <div>Project not found</div>;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-5">
          <Link to="/projects" className="p-2 hover:bg-white rounded-full text-[#6B7280] hover:text-[#1A1A1A] transition-colors border border-transparent hover:border-[#E5E7EB]">
            <ChevronLeft size={24} />
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-bold text-[#1A1A1A] tracking-tight">{project.name}</h1>
                <span className="px-2 py-0.5 bg-[#F5F3F0] text-[#6B7280] text-[10px] font-bold uppercase tracking-wider rounded border border-[#E5E7EB]">
                    {project.status}
                </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-[#6B7280] font-medium">
              <span className="flex items-center gap-1.5"><Clock size={14} className="text-[#1F6B55]" /> {project.packageType}</span>
              <span className="text-[#D1D5DB]">|</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> Due: {new Date(project.deliveryDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        
        {/* Editor Info Box */}
        {project.assignedEditor && (
            <div className="flex items-center gap-4 bg-white border border-[#E5E7EB] px-5 py-3 rounded-lg shadow-sm">
                <div className="text-right">
                    <p className="text-[10px] text-[#9CA3AF] uppercase font-bold tracking-wider mb-0.5">Editor</p>
                    <p className="text-sm font-bold text-[#1A1A1A]">{project.assignedEditor.name}</p>
                </div>
                <img src={project.assignedEditor.avatar} alt="Editor" className="w-10 h-10 rounded-full object-cover" />
                <button className="p-2 text-[#1F6B55] hover:bg-[#1F6B55]/10 rounded-full transition-colors">
                    <MessageSquare size={18} />
                </button>
            </div>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b border-[#E5E7EB]">
        <nav className="flex gap-8">
          {['Overview', 'Review', 'Files'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase() as any)}
              className={`py-4 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors ${
                activeTab === tab.toLowerCase() 
                  ? 'border-[#1F6B55] text-[#1F6B55]' 
                  : 'border-transparent text-[#9CA3AF] hover:text-[#6B7280]'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div>
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <div className="bg-white p-8 rounded-xl border border-[#E5E7EB] shadow-[0_1px_3px_0_rgba(0,0,0,0.1)]">
                <h3 className="font-bold text-lg text-[#1A1A1A] mb-6 flex items-center gap-2">
                    <span className="w-1 h-5 bg-[#1F6B55] rounded-full"></span>
                    Creative Brief
                </h3>
                <div className="bg-[#F5F3F0] p-6 rounded-lg text-[#4B5563] text-sm leading-relaxed mb-8 border border-[#E5E7EB] font-medium">
                    {project.creativeBrief}
                </div>
                <dl className="grid grid-cols-2 gap-8 text-sm">
                  <div>
                    <dt className="text-[#9CA3AF] font-bold text-xs uppercase tracking-wider mb-2">Category</dt>
                    <dd className="font-bold text-[#1A1A1A] text-lg">{project.category}</dd>
                  </div>
                  <div>
                    <dt className="text-[#9CA3AF] font-bold text-xs uppercase tracking-wider mb-2">Platforms</dt>
                    <dd className="font-bold text-[#1A1A1A] text-lg">{project.platforms.join(', ')}</dd>
                  </div>
                  <div>
                    <dt className="text-[#9CA3AF] font-bold text-xs uppercase tracking-wider mb-2">Package</dt>
                    <dd className="font-bold text-[#1A1A1A] text-lg">{project.packageType}</dd>
                  </div>
                  <div>
                    <dt className="text-[#9CA3AF] font-bold text-xs uppercase tracking-wider mb-2">Item Quantity</dt>
                    <dd className="font-bold text-[#1A1A1A] text-lg">{project.itemQuantity}</dd>
                  </div>
                </dl>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-xl border border-[#E5E7EB] shadow-[0_1px_3px_0_rgba(0,0,0,0.1)]">
                <h3 className="font-bold text-lg text-[#1A1A1A] mb-6">Production Timeline</h3>
                <div className="space-y-0 relative">
                   <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-[#F3F4F6]" />
                   {[
                     { label: 'Brief Submitted', done: true, date: 'May 10' },
                     { label: 'Team Assigned', done: true, date: 'May 10' },
                     { label: 'Editing in Progress', done: project.status !== ProjectStatus.SUBMITTED && project.status !== ProjectStatus.TEAM_ASSIGNED, date: 'May 11' },
                     { label: 'QA Review', done: project.status === ProjectStatus.QA_REVIEW || project.status === ProjectStatus.READY_FOR_REVIEW || project.status === ProjectStatus.COMPLETED, date: 'May 12' },
                     { label: 'Ready for Review', done: project.status === ProjectStatus.READY_FOR_REVIEW || project.status === ProjectStatus.COMPLETED, date: 'May 12' },
                   ].map((step, idx) => (
                     <div key={idx} className="relative flex items-start gap-4 pb-8 last:pb-0">
                       <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 bg-white ${
                         step.done ? 'border-[#1F6B55] text-[#1F6B55]' : 'border-[#E5E7EB] text-[#E5E7EB]'
                       }`}>
                           <div className={`w-2.5 h-2.5 rounded-full ${step.done ? 'bg-[#1F6B55]' : 'bg-[#F3F4F6]'}`} />
                       </div>
                       <div className="flex-1 pt-1">
                         <p className={`text-sm font-bold ${step.done ? 'text-[#1A1A1A]' : 'text-[#9CA3AF]'}`}>{step.label}</p>
                         <p className="text-xs text-[#9CA3AF] font-mono mt-1">{step.date}</p>
                       </div>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'review' && (
          <ReviewInterface projectId={project.id} />
        )}
        
        {activeTab === 'files' && (
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-16 text-center shadow-sm">
             <div className="w-20 h-20 bg-[#F5F3F0] rounded-full flex items-center justify-center mx-auto mb-6">
                <Download size={32} className="text-[#6B7280]" />
             </div>
             <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Original Uploads</h3>
             <p className="text-[#6B7280] mb-8">Access the raw files you sent to our team.</p>
             <button className="px-6 py-3 bg-white border border-[#E5E7EB] hover:border-[#1F6B55] hover:text-[#1F6B55] text-[#1A1A1A] rounded-md font-bold transition-colors">
               Download Original Assets (ZIP)
             </button>
          </div>
        )}
      </div>
    </div>
  );
};