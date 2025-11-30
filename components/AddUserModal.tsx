
import React, { useState } from 'react';
import { UserRole } from '../types';
import { X, Mail, User, Briefcase, Check } from 'lucide-react';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'client' as UserRole,
    company: '',
    sendInvite: true
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-[#1A1A1A]/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md border border-[#E5E7EB] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-[#E5E7EB] bg-[#F9FAFB]">
          <h3 className="font-bold text-lg text-[#1A1A1A]">Add New User</h3>
          <button onClick={onClose} className="text-[#9CA3AF] hover:text-[#1A1A1A] transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-2">Full Name</label>
            <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={16} />
                <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full pl-10 pr-4 py-2.5 border border-[#E5E7EB] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1F6B55]"
                    placeholder="Jane Doe"
                />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-2">Email Address</label>
            <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={16} />
                <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full pl-10 pr-4 py-2.5 border border-[#E5E7EB] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1F6B55]"
                    placeholder="jane@example.com"
                />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-2">Role</label>
                <select 
                    value={formData.role}
                    onChange={e => setFormData({...formData, role: e.target.value as UserRole})}
                    className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1F6B55] bg-white"
                >
                    <option value="client">Client</option>
                    <option value="editor">Editor</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <div>
                <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-2">Company</label>
                <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={16} />
                    <input 
                        type="text" 
                        value={formData.company}
                        onChange={e => setFormData({...formData, company: e.target.value})}
                        className="w-full pl-10 pr-4 py-2.5 border border-[#E5E7EB] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1F6B55]"
                        placeholder="Acme Inc."
                    />
                </div>
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-3 p-3 border border-[#E5E7EB] rounded-lg cursor-pointer hover:bg-[#F9FAFB]">
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${formData.sendInvite ? 'bg-[#1F6B55] border-[#1F6B55]' : 'border-gray-300'}`}>
                    {formData.sendInvite && <Check size={14} className="text-white" />}
                </div>
                <input 
                    type="checkbox" 
                    className="hidden"
                    checked={formData.sendInvite}
                    onChange={e => setFormData({...formData, sendInvite: e.target.checked})}
                />
                <span className="text-sm text-[#1A1A1A] font-medium">Send Magic Link Invitation</span>
            </label>
          </div>

          <div className="flex gap-3 pt-4 border-t border-[#E5E7EB] mt-4">
            <button 
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2.5 border border-[#E5E7EB] text-[#6B7280] font-bold text-sm rounded-md hover:bg-gray-50 hover:text-[#1A1A1A] transition-colors"
            >
                Cancel
            </button>
            <button 
                type="submit"
                className="flex-1 px-4 py-2.5 bg-[#1F6B55] text-white font-bold text-sm rounded-md hover:bg-[#164f3f] transition-colors shadow-sm"
            >
                Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
