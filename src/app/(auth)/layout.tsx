import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center py-12 px-4 text-gray-900">
      <div className="max-w-md w-full space-y-8">
        {children}
      </div>
    </div>
  );
}
