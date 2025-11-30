
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useApp } from '../context';
import { Loader2 } from 'lucide-react';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useApp();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F3F0] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#1F6B55]" size={32} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
