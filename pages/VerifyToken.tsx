import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthService } from '../authService';

const VerifyToken: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const verifyToken = async () => {
      const token = searchParams.get('token');
      
      if (!token) {
        setStatus('error');
        setErrorMessage('No token provided');
        setTimeout(() => navigate('/login'), 2000);
        return;
      }

      try {
        const result = await
        AuthService.verifyMagicLink();
        if (result.success && result.user) {
          // Store user data in localStorage
          localStorage.setItem('user', JSON.stringify(result.user));
          localStorage.setItem('token', result.token);
          
          setStatus('success');
          
          // Redirect based on user role
          setTimeout(() => {
            if (result.user.role === 'admin') {
              navigate('/admin');
            } else {
              navigate('/dashboard');
            }
          }, 1000);
        } else {
          throw new Error('Verification failed');
        }
      } catch (error: any) {
        setStatus('error');
        setErrorMessage(error.message || 'Invalid or expired magic link');
        setTimeout(() => navigate('/login'), 3000);
      }
    };

    verifyToken();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-teal-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-2xl font-bold">M</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {status === 'verifying' && 'Verifying your magic link...'}
          {status === 'success' && 'Success! Redirecting...'}
          {status === 'error' && 'Verification Failed'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {status === 'verifying' && (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
            </div>
          )}
          
          {status === 'success' && (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Authentication successful! Taking you to your dashboard...
              </p>
            </div>
          )}
          
          {status === 'error' && (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <p className="mt-4 text-sm text-red-600 font-medium">
                {errorMessage}
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Redirecting you back to login...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyToken;
