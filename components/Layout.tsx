
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, Folder, Image, CreditCard, HelpCircle, 
  Bell, Search, Menu, X, Plus, Users, ChevronRight,
  List, BarChart2, Briefcase, Settings, ChevronDown, Check, LogOut
} from 'lucide-react';
import { useApp } from '../context';

const SidebarItem: React.FC<{ 
  to: string; 
  icon: React.ReactNode; 
  label: string; 
  active: boolean 
}> = ({ to, icon, label, active }) => (
  <Link
    to={to}
    className={`group flex items-center gap-3 px-6 py-3 mb-1 transition-all duration-200 border-l-4 ${
      active 
        ? 'border-[#1F6B55] bg-white text-[#1F6B55] font-semibold' 
        : 'border-transparent text-[#6B7280] hover:text-[#1A1A1A] hover:bg-gray-50'
    }`}
  >
    {React.cloneElement(icon as React.ReactElement<any>, { 
      size: 20, 
      className: active ? 'text-[#1F6B55]' : 'text-[#9CA3AF] group-hover:text-[#4B5563] transition-colors' 
    })}
    <span className="text-[15px]">{label}</span>
  </Link>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, notifications, userRole, switchRole, logout } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  
  // Sync Role with URL to prevent mismatches if user navigates manually
  useEffect(() => {
    if (location.pathname.startsWith('/admin') && userRole !== 'admin' && user?.role === 'admin') {
      switchRole('admin');
    }
  }, [location.pathname, userRole, user, switchRole]);

  if (!user) return null; 

  const unreadCount = notifications.filter(n => !n.read).length;
  const isAdminView = userRole === 'admin';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleRoleSwitch = (role: 'client' | 'admin') => {
    // 1. Update State
    switchRole(role);
    // 2. Close Menu
    setRoleSwitcherOpen(false);
    // 3. Navigate Explicitly using direct URL manipulation
    // Using window.location.hash since the app uses HashRouter.
    // This ensures reliable navigation even if useNavigate context is tricky.
    if (role === 'admin') {
      window.location.hash = '/admin';
    } else {
      window.location.hash = '/dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F3F0] flex font-sans">
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-[#1A1A1A]/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-[#E5E7EB]
          transform transition-transform duration-300 ease-out shadow-sm
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        aria-label="Sidebar Navigation"
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="h-24 flex items-center px-8">
            <Link to={isAdminView ? "/admin" : "/dashboard"} className="flex items-center gap-3 group" aria-label="Go to Dashboard">
              <div className="w-8 h-8 bg-[#1F6B55] rounded-md flex items-center justify-center shadow-sm group-hover:bg-[#164f3f] transition-colors">
                <span className="text-white text-lg font-bold">M</span>
              </div>
              <span className="text-[#1A1A1A] font-bold text-xl tracking-tight">ModelMagic</span>
            </Link>
            {isAdminView && (
              <span className="ml-2 px-2 py-0.5 text-[10px] font-bold bg-[#1F6B55] text-white rounded tracking-wider uppercase">
                Admin
              </span>
            )}
            <button
              className="ml-auto lg:hidden text-[#9CA3AF]"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close Menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Nav */}
          <div className="flex-1 overflow-y-auto py-6">
            {!isAdminView && (
              <div className="px-6 mb-8">
                <Link
                  to="/projects/new"
                  className="w-full flex items-center justify-center gap-2 bg-[#1F6B55] hover:bg-[#164f3f] text-white py-3 rounded-md font-medium transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                  aria-label="Submit New Project"
                >
                  <Plus size={18} />
                  Submit Project
                </Link>
              </div>
            )}

            <nav className="space-y-1" aria-label="Main Navigation">
              {isAdminView ? (
                <>
                  <SidebarItem 
                    to="/admin" 
                    icon={<List />} 
                    label="Project Queue" 
                    active={location.pathname === '/admin'} 
                  />
                  <SidebarItem 
                    to="/admin/team" 
                    icon={<Users />} 
                    label="Team Workload" 
                    active={location.pathname === '/admin/team'} 
                  />
                  <SidebarItem 
                    to="/admin/analytics" 
                    icon={<BarChart2 />} 
                    label="Analytics" 
                    active={location.pathname === '/admin/analytics'} 
                  />
                   <SidebarItem 
                    to="/admin/clients" 
                    icon={<Briefcase />} 
                    label="Clients" 
                    active={location.pathname === '/admin/clients'} 
                  />
                </>
              ) : (
                <>
                  <SidebarItem 
                    to="/dashboard" 
                    icon={<Home />} 
                    label="Dashboard" 
                    active={location.pathname === '/dashboard' || location.pathname === '/'} 
                  />
                  <SidebarItem 
                    to="/projects" 
                    icon={<Folder />} 
                    label="My Projects" 
                    active={location.pathname.startsWith('/projects') && location.pathname !== '/projects/new'} 
                  />
                  <SidebarItem 
                    to="/assets" 
                    icon={<Image />} 
                    label="Asset Library" 
                    active={location.pathname === '/assets'} 
                  />
                  <SidebarItem 
                    to="/team" 
                    icon={<Users />} 
                    label="My Team" 
                    active={location.pathname === '/team'} 
                  />
                  <SidebarItem 
                    to="/billing" 
                    icon={<CreditCard />} 
                    label="Billing" 
                    active={location.pathname === '/billing'} 
                  />
                </>
              )}
            </nav>
          </div>

          {/* Bottom Nav */}
          <div className="p-6 border-t border-[#E5E7EB] bg-white">
             <Link 
                to="/help"
                className="flex items-center gap-3 text-[#6B7280] hover:text-[#1F6B55] transition-colors mb-6 px-2"
              >
                <HelpCircle size={20} />
                <span className="text-sm font-medium">Help & Support</span>
              </Link>
            
            <div className="relative">
              <div 
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-4 px-2 py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
              >
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#1A1A1A] truncate group-hover:text-[#1F6B55] transition-colors">{user.name}</p>
                  <p className="text-xs text-[#6B7280] truncate font-medium">{user.company}</p>
                </div>
                <ChevronRight size={16} className={`text-[#9CA3AF] transition-transform ${profileOpen ? '-rotate-90' : ''}`} />
              </div>
              
              {/* Profile Dropdown */}
              {profileOpen && (
                <div className="absolute bottom-full left-0 w-full mb-2 bg-white rounded-lg shadow-lg border border-[#E5E7EB] py-1 z-50">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[#EF4444] hover:bg-red-50 font-medium"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#F5F3F0]">
        {/* Top Header */}
        <header className={`h-20 flex items-center justify-between px-8 lg:px-12 sticky top-0 z-30 backdrop-blur-md border-b border-[#E5E7EB]/50 ${isAdminView ? 'bg-[#1F6B55]/5' : 'bg-[#F5F3F0]/90'}`}>
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-[#6B7280] hover:text-[#1A1A1A]"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Menu"
            >
              <Menu size={24} />
            </button>
            <div className="relative hidden md:block w-96 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] group-focus-within:text-[#1F6B55] transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search projects, assets..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E5E7EB] bg-white focus:outline-none focus:ring-2 focus:ring-[#1F6B55]/20 focus:border-[#1F6B55] transition-all text-sm shadow-sm"
                aria-label="Search"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button
              className="relative p-2 text-[#6B7280] hover:text-[#1F6B55] transition-colors"
              aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
            >
              <Bell size={22} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#EF4444] rounded-full ring-2 ring-[#F5F3F0]"></span>
              )}
            </button>

            {/* Role Switcher Dropdown - Only for Admins */}
            {user.role === 'admin' && (
              <div className="relative">
                <button
                  onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors shadow-sm"
                  aria-label="Switch Role"
                  aria-expanded={roleSwitcherOpen}
                >
                  <span>{userRole === 'client' ? '👤 Client View' : '🔧 Admin View'}</span>
                  <ChevronDown size={16} />
                </button>
                
                {roleSwitcherOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                    <button
                      onClick={() => handleRoleSwitch('client')}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center justify-between"
                    >
                      <span>👤 Client View</span>
                      {userRole === 'client' && <Check size={16} className="text-green-600" />}
                    </button>
                    <button
                      onClick={() => handleRoleSwitch('admin')}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center justify-between"
                    >
                      <span>🔧 Admin View</span>
                      {userRole === 'admin' && <Check size={16} className="text-green-600" />}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-8 lg:px-12 lg:py-10">
          <div className="max-w-[1280px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
