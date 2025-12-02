
import React, { useState, useEffect } from 'react';
import { useApp } from '../../context';
import { AuthService } from '../../authService';
import { User, UserRole } from '../../types';
import { Search, Filter, MoreHorizontal, Edit2, Trash2, Plus, Mail } from 'lucide-react';
import { AddUserModal } from '../../components/AddUserModal';

export const AdminClients: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    setIsLoading(true);
    const data = await AuthService.getAllUsers();
    setUsers(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (userData: any) => {
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');
    try {
      await AuthService.addUser(userData);
      setSuccessMessage('User added successfully!');
      setIsAddModalOpen(false);
      fetchUsers();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error adding user:', error);
      setErrorMessage('Failed to add user. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');
    try {
      await AuthService.deleteUser(userId);
      setSuccessMessage('User deleted successfully!');
      fetchUsers();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting user:', error);
      setErrorMessage('Failed to delete user. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadge = (role: UserRole) => {
    switch(role) {
      case 'admin': return <span className="bg-[#1F6B55]/10 text-[#1F6B55] px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">Admin</span>;
      case 'editor': return <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">Editor</span>;
      default: return <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">Client</span>;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex justify-between items-center pb-6 border-b border-[#E5E7EB]">
        <div>
          <h1 className="text-3xl font-bold text-[#1A1A1A] tracking-tight">User Management</h1>
          <p className="text-[#6B7280] mt-2">Manage client accounts and team access.</p>
        </div>
        <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-[#1F6B55] hover:bg-[#164f3f] text-white rounded-md font-bold text-sm shadow-sm transition-all"
        >

                {/* Success/Error Messages */}
      {successMessage && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md flex items-center gap-2 text-green-700">
          <span className="text-green-600">✓</span>
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-red-700">
          <span className="text-red-600">⚠</span>
          {errorMessage}
        </div>
      )}
            <Plus size={18} /> Add New User
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={16} />
            <input 
            type="text" 
            placeholder="Search users by name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-[#E5E7EB] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1F6B55] shadow-sm"
            />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 border border-[#E5E7EB] bg-white rounded-md text-[#6B7280] hover:text-[#1A1A1A] text-sm font-medium shadow-sm">
            <Filter size={16} /> Filter
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider">User</th>
              <th className="px-6 py-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider">Role</th>
              <th className="px-6 py-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider">Last Login</th>
              <th className="px-6 py-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB]">
            {filteredUsers.map(user => (
              <tr key={user.id} className="hover:bg-[#F9FAFB] transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border border-[#E5E7EB]" />
                    <div>
                        <p className="font-bold text-[#1A1A1A] text-sm">{user.name}</p>
                        <p className="text-xs text-[#6B7280]">{user.email}</p>
                        {user.company && <p className="text-xs text-[#9CA3AF] mt-0.5">{user.company}</p>}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {getRoleBadge(user.role)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-[#22C55E]' : 'bg-gray-300'}`}></div>
                    <span className="text-sm font-medium text-[#1A1A1A] capitalize">{user.status || 'Active'}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-[#6B7280] font-mono">
                  {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 text-[#6B7280] hover:text-[#1F6B55] hover:bg-[#F5F3F0] rounded transition-colors" title="Edit">
                        <Edit2 size={16} />
                    </button>
                    <button 
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-2 text-[#6B7280] hover:text-[#EF4444] hover:bg-red-50 rounded transition-colors" 
                        title="Delete"
                    >
                        <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAddModalOpen && (
        <AddUserModal 
            isOpen={isAddModalOpen} 
            onClose={() => setIsAddModalOpen(false)} 
            onSubmit={handleAddUser}
                    isSubmitting={isSubmitting}
          errorMessage={errorMessage}
          successMessage={successMessage}
        />
      )}
    </div>
  );
};
