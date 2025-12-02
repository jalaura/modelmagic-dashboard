
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Project, Asset, User, Notification, TeamMember, Message, UserRole } from './types';
import { AuthService } from './authService';
import { useNavigate } from 'react-router-dom';

interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  projects: Project[];
  assets: Asset[];
  notifications: Notification[];
  teamMembers: TeamMember[];
  messages: Message[];
  userRole: UserRole;
  addProject: (project: Project) => void;
  updateAssetStatus: (assetId: string, status: 'approved' | 'revision') => void;
  getProjectAssets: (projectId: string) => Asset[];
  switchRole: (role: UserRole) => void;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
  login: (email: string) => Promise<void>;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const navigate = useNavigate();
  
  // Data states
  const [projects, setProjects] = useState<Project[]>([]);  const [assets, setAssets] = useState<Asset[]>([]);
  const [notifications] = useState<Notification[]>([]);
  const [teamMembers] = useState<TeamMember[]>([]);
  const [messages] = useState<Message[]>([]);
  
  const [userRole, setUserRole] = useState<UserRole>('client');

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      const currentUser = AuthService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        setIsAuthenticated(true);
        
        // Restore role preference if admin, otherwise default to user's role
        const savedRole = localStorage.getItem('modelmagic_user_role') as UserRole;
        if (currentUser.role === 'admin' && savedRole) {
          setUserRole(savedRole);
        } else if (currentUser.role === 'editor') {
          setUserRole('admin'); // Editors see admin view
        } else {
          setUserRole('client');
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  // Fetch data from API when user is authenticated
  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated || !user) return;

      try {
        setIsLoading(true);

        // Fetch projects
        const projectsRes = await fetch('https://modelmagic-api.cmsdossier.workers.dev/api/projects');
        if (projectsRes.ok) {
          const projectsData = await projectsRes.json();
          if (projectsData.success) {
            setProjects(projectsData.projects || []);
          }
        }

        // Fetch assets
        const assetsRes = await fetch('https://modelmagic-api.cmsdossier.workers.dev/api/assets');
        if (assetsRes.ok) {
          const assetsData = await assetsRes.json();
          if (assetsData.success) {
            setAssets(assetsData.assets || []);
          }
        }

        // Fetch team members
        const teamRes = await fetch('https://modelmagic-api.cmsdossier.workers.dev/api/team-members');
        if (teamRes.ok) {
          const teamData = await teamRes.json();
          if (teamData.success) {
            // Update team members state if we had a setter
            console.log('Team members:', teamData.team_members);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, user]);

  const login = async (email: string) => {
    try {
      const user = await AuthService.verifyMagicLink(email);
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
        if (user.role === 'editor') setUserRole('admin');
        else if (user.role === 'admin') setUserRole('admin'); // Default admins to admin view
        else setUserRole('client');
      }
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    setIsAuthenticated(false);
    setUserRole('client');
  };

  const switchRole = (role: UserRole) => {
    if (user?.role !== 'admin') return; // Only admins can switch
    setUserRole(role);
    localStorage.setItem('modelmagic_user_role', role);
    
    // Auto-navigate when switching roles for convenience
    if (role === 'admin') {
        navigate('/admin');
    } else {
        navigate('/dashboard');
    }
  };

  const addProject = (project: Project) => {
    setProjects(prev => [project, ...prev]);
  };

  const updateAssetStatus = (assetId: string, status: 'approved' | 'revision') => {
    setAssets(prev => prev.map(a => a.id === assetId ? { ...a, status } : a));
  };

  const getProjectAssets = (projectId: string) => {
    return assets.filter(a => a.projectId === projectId);
  };

  const updateProject = (projectId: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, ...updates } : p));
  };

  return (
    <AppContext.Provider value={{
      user,
      isAuthenticated,
      isLoading,
      projects,
      assets,
      notifications,
      teamMembers,
      messages,
      userRole,
      addProject,
      updateAssetStatus,
      getProjectAssets,
      switchRole,
      updateProject,
      login,
      logout
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
