import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * Custom hook to access authentication context
 * This is a wrapper around useContext for better error handling
 * and cleaner code in components
 * 
 * @returns {object} Auth context value
 * @throws {Error} If used outside of AuthProvider
 * 
 * @example
 * function MyComponent() {
 *   const { user, login, logout, isAuthenticated } = useAuth();
 *   
 *   if (!isAuthenticated) {
 *     return <LoginPrompt />;
 *   }
 *   
 *   return <div>Welcome, {user.name}!</div>;
 * }
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default useAuth;