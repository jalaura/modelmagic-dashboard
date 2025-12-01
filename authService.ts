import { User, UserRole } from './types';

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

  verifyMagicLink: async (): Promise<User | null> => {
    // Extract token from URL hash for hash-based routing
    const hash = window.location.hash;
    const match = hash.match(/[?&]token=([^&]+)/);
    const token = match ? match[1] : null;

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

      // Store session
      localStorage.setItem(TOKEN_KEY, token);
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

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};
