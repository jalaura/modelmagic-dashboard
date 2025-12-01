
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { NewProject } from './pages/NewProject';
import { ProjectDetail } from './pages/ProjectDetail';
import { AssetsPage } from './pages/Assets';
import { TeamPage } from './pages/Team';
import HelpPage from './pages/Help';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProjectDetail } from './pages/admin/AdminProjectDetail';
import { AdminTeam } from './pages/admin/AdminTeam';
import { AdminAnalytics } from './pages/admin/AdminAnalytics';
import { AdminClients } from './pages/admin/AdminClients';
import { AppProvider, useApp } from './context';
import { Folder, ArrowRight } from 'lucide-react';
import { ProjectStatus } from './types';
import { Link } from 'react-router-dom';
import { Login } from './pages/Login';
import { VerifyToken } from './pages/VerifyToken';
import { ProtectedRoute } from './components/ProtectedRoute';

// Simple Projects List Component for the route
const ProjectsList: React.FC = () => {
    const { projects } = useApp();
    return (
        <div className="space-y-8 animate-fadeIn">
            <div className="flex justify-between items-center pb-6 border-b border-[#E5E7EB]">
                <div>
                  <h1 className="text-4xl font-bold text-[#1A1A1A] tracking-tight">My Projects</h1>
                  <p className="text-[#6B7280] mt-2">Track the status of your photo transformations.</p>
                </div>
                <Link to="/projects/new" className="bg-[#1F6B55] hover:bg-[#164f3f] text-white px-6 py-3 rounded-md text-sm font-bold shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
                    Submit Project
                </Link>
            </div>
            
            <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                        <tr>
                            <th className="px-8 py-5 text-xs font-bold text-[#6B7280] uppercase tracking-wider">Project Name</th>
                            <th className="px-8 py-5 text-xs font-bold text-[#6B7280] uppercase tracking-wider">Assigned To</th>
                            <th className="px-8 py-5 text-xs font-bold text-[#6B7280] uppercase tracking-wider">Status</th>
                            <th className="px-8 py-5 text-xs font-bold text-[#6B7280] uppercase tracking-wider">Due Date</th>
                            <th className="px-8 py-5 text-xs font-bold text-[#6B7280] uppercase tracking-wider"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E7EB]">
                        {projects.map(project => (
                            <tr key={project.id} className="hover:bg-[#F9FAFB] transition-colors group">
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-md bg-[#F5F3F0] flex-shrink-0 overflow-hidden border border-[#E5E7EB]">
                                            <img src={project.thumbnail} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="text-base font-bold text-[#1A1A1A] group-hover:text-[#1F6B55] transition-colors">{project.name}</p>
                                            <p className="text-xs text-[#6B7280] font-medium mt-0.5">{project.packageType} • {project.itemQuantity} Items</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-5">
                                    {project.assignedEditor ? (
                                        <div className="flex items-center gap-3">
                                            <img src={project.assignedEditor.avatar} className="w-8 h-8 rounded-full border border-white shadow-sm" />
                                            <span className="text-sm font-medium text-[#1A1A1A]">{project.assignedEditor.name}</span>
                                        </div>
                                    ) : (
                                        <span className="text-sm text-[#9CA3AF] italic">Pending Assignment</span>
                                    )}
                                </td>
                                <td className="px-8 py-5">
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider
                                        ${project.status === ProjectStatus.COMPLETED ? 'bg-[#22C55E]/10 text-[#22C55E]' :
                                          project.status === ProjectStatus.READY_FOR_REVIEW ? 'bg-[#F59E0B]/10 text-[#F59E0B]' :
                                          'bg-[#1F6B55]/10 text-[#1F6B55]'}`}>
                                        {project.status}
                                    </span>
                                </td>
                                <td className="px-8 py-5 text-sm font-medium text-[#6B7280] font-mono">{new Date(project.deliveryDate).toLocaleDateString()}</td>
                                <td className="px-8 py-5 text-right">
                                    <Link to={`/projects/${project.id}`} className="text-[#1A1A1A] hover:text-[#1F6B55] text-sm font-bold flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        View <ArrowRight size={14} />
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

const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex flex-col items-center justify-center h-96 text-center animate-fadeIn">
    <div className="w-20 h-20 bg-[#F5F3F0] rounded-full flex items-center justify-center mb-6">
      <Folder className="text-[#9CA3AF]" size={32} />
    </div>
    <h2 className="text-2xl font-bold text-[#1A1A1A]">{title}</h2>
    <p className="text-[#6B7280] mt-2 mb-8">This feature is currently under development.</p>
    <Link to="/" className="text-[#1F6B55] font-bold hover:underline">Return to Dashboard</Link>
  </div>
);

// HomeRoute handles the redirect logic based on Role
const HomeRoute: React.FC = () => {
  const { userRole } = useApp();
  if (userRole === 'admin') {
    return <Navigate to="/admin" replace />;
  }
  return <Navigate to="/dashboard" replace />;
};

const App: React.FC = () => {
  return (
    <AppProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
                                  <Route path="/auth/verify" element={<VerifyToken />} />

          
          {/* Protected Routes */}
          <Route path="/*" element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  {/* Root Route logic */}
                  <Route path="/" element={<HomeRoute />} />

                  {/* Client Routes */}
                  <Route path="/dashboard" element={
                    // Protect Client Dashboard from being accessed directly by Admin mode unless switching
                    <Dashboard />
                  } />
                  <Route path="/projects" element={<ProjectsList />} />
                  <Route path="/projects/new" element={<NewProject />} />
                  <Route path="/projects/:id" element={<ProjectDetail />} />
                  <Route path="/assets" element={<AssetsPage />} />
                  <Route path="/team" element={<TeamPage />} />
                  <Route path="/billing" element={<PlaceholderPage title="Billing & Plans" />} />
                  <Route path="/help" element={<HelpPage />} />
                  
                  {/* Admin Routes */}
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/projects/:id" element={<AdminProjectDetail />} />
                  <Route path="/admin/team" element={<AdminTeam />} />
                  <Route path="/admin/analytics" element={<AdminAnalytics />} />
                  <Route path="/admin/clients" element={<AdminClients />} />

                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          } />
        </Routes>
    </AppProvider>
  );
};

export default App;
