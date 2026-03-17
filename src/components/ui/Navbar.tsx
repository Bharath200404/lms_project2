'use client';

import Link from 'next/link';
import { useAuth } from '@/components/ui/AuthContext';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="glass-effect sticky top-0 z-50 py-4 px-8 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          FutureSkills Academy
        </Link>
        
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
            Home
          </Link>
          <Link href="/courses" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
            Courses
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
            About
          </Link>
          {user ? (
            <>
              <span className="text-gray-700 font-medium">Hi, {user.name}</span>
          
              <button 
                onClick={handleLogout}
                className="btn-primary text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn-secondary text-sm">
                Login
              </Link>
              <Link href="/signup" className="btn-primary text-sm">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
