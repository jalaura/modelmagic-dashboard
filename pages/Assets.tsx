import React, { useState } from 'react';
import { useApp } from '../context';
import { Download, Filter, Search, Heart, Share2, User } from 'lucide-react';

export const AssetsPage: React.FC = () => {
  const { assets } = useApp();
  const [filter, setFilter] = useState('all');

  const filteredAssets = filter === 'favorites' 
    ? assets.filter(a => false) // Mock favorites
    : assets;

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#E5E7EB]">
        <div>
          <h1 className="text-4xl font-bold text-[#1A1A1A] tracking-tight">Asset Library</h1>
          <p className="text-[#6B7280] mt-2">Manage and download your completed transformations.</p>
        </div>
        <div className="flex gap-3">
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={16} />
              <input 
                type="text" 
                placeholder="Search assets..." 
                className="pl-10 pr-4 py-2.5 border border-[#E5E7EB] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1F6B55] w-64 shadow-sm"
              />
           </div>
           <button className="flex items-center gap-2 px-4 py-2.5 border border-[#E5E7EB] bg-white rounded-md text-[#6B7280] hover:text-[#1A1A1A] hover:border-[#9CA3AF] text-sm font-medium transition-colors shadow-sm">
             <Filter size={16} /> Filters
           </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredAssets.map(asset => (
          <div key={asset.id} className="group bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300">
            <div className="relative aspect-[4/5] bg-[#F5F3F0] overflow-hidden">
              <img src={asset.url} alt={asset.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              
              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-[#1A1A1A]/20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 backdrop-blur-[2px]">
                <div className="flex gap-3 justify-center mb-2">
                   <button className="p-3 bg-white text-[#1A1A1A] rounded-full hover:bg-[#1F6B55] hover:text-white transition-colors shadow-lg transform hover:scale-110" title="Download High-Res">
                     <Download size={20} />
                   </button>
                   <button className="p-3 bg-white text-[#1A1A1A] rounded-full hover:bg-[#1F6B55] hover:text-white transition-colors shadow-lg transform hover:scale-110" title="Share">
                     <Share2 size={20} />
                   </button>
                </div>
              </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-[#1A1A1A] truncate text-sm flex-1 mr-2">{asset.name}</h3>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                   asset.status === 'approved' ? 'bg-[#22C55E]/10 text-[#22C55E]' : 'bg-[#F3F4F6] text-[#6B7280]'
                 }`}>
                    {asset.status}
                 </span>
              </div>
              
              <p className="text-xs text-[#6B7280] truncate mb-4 font-medium">{asset.projectName}</p>
              
              {asset.editedBy && (
                 <div className="pt-3 border-t border-[#F3F4F6] flex items-center gap-2">
                   <img src={asset.editedBy.avatar} className="w-5 h-5 rounded-full object-cover" />
                   <span className="text-xs text-[#9CA3AF] font-medium">Ed. by {asset.editedBy.name.split(' ')[0]}</span>
                 </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};