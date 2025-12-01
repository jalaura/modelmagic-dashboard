import { User, UserRole } from './types';

// Mock User Database
const MOCK_USERS: Record<string, User> = {
  'sarah@luxeboutique.com': {
    id: 'u1',
    name: 'Sarah Jenning',
    email: 'sarah@luxeboutique.com',
    company: 'Luxe Boutique',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    plan: 'Growth',
    role: 'client',
    status: 'active',
    lastLogin: '2024-05-12T10:00:00Z'
  },
  'admin@modelmagic.com': {
    id: 'admin1',
    name: 'Admin User',
    email: 'admin@modelmagic.com',
    company: 'ModelMagic HQ',
    avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=1F6B55&color=fff',
    plan: 'Admin',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-05-12T08:30:00Z'
  },
  'jessica@modelmagic.com': {
    id: 't1',
    name: 'Jessica Martinez',
    email: 'jessica@modelmagic.com',
    company: 'ModelMagic Team',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    plan: 'Staff',
    role: 'editor',
    status: 'active',
    lastLogin: '2024-05-12T09:15:00Z'
  },
  'sofia@modelmagic.com': {
    id: 't3',
    name: 'Sofia Chen',
    email: 'sofia@modelmagic.com',
    company: 'ModelMagic Team',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    plan: 'Staff',
    role: 'editor',
    status: 'inactive',
    lastLogin: '2024-05-10T16:45:00Z'
  }
};

const TOKEN_KEY = 'modelmagic_auth_token';
const USER_KEY = 'modelmagic_user_data';
const API_BASE_URL = 'https://api.modelsmagix.com';
export const AuthService = {
  sendMagicLink: async (email: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/request-magic-link`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to send magic link');
      }

      return true;
    } catch (error) {
      console.error('Error sending magic link:', error);
      throw error;
    }
  },

  verifyMagicLink: async (email: string): Promise<User | null> => {
    // Extract token from URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (!token) {
      throw new Error('No token provided');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/verify-token?token=${token}`);

      if (!response.ok) {
        throw new Error('Invalid or expired token');
      }

      const data = await response.json();
      const user = data.user;

      // Create mock session
      localStorage.setItem(TOKEN_KEY, 'mock-jwt-token-' + Date.now());
      localStorage.setItem(USER_KEY, JSON.stringify(user));

      return user;
    } catch (error) {
      console.error('Error verifying magic link:', error);
      throw error;
    }
  },

  getCurrentUser: (): User | null => {
    const token = localStorage.getItem(TOKEN_KEY);
    const userData = localStorage.getItem(USER_KEY);

    if (token && userData) {
      try {
        return JSON.parse(userData);
      } catch (e) {
        return null;
      }
    }

    return null;
  },

  addUser: async (userData: any): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const id = 'u' + Date.now();
        const newUser: User = {
          id,
          name: userData.name,
          email: userData.email,
          company: userData.company || '',
          role: userData.role || 'client',
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=random`,
          plan: 'Free',
          status: 'active',
          lastLogin: undefined
        };
        MOCK_USERS[userData.email.toLowerCase()] = newUser;
        resolve(newUser);
      }, 800);
    });
  },

  deleteUser: async (userId: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const email = Object.keys(MOCK_USERS).find(key => MOCK_USERS[key].id === userId);
        if (email) {
          delete MOCK_USERS[email];
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};
