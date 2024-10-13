'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/sidebar';
import { useAuth } from "@/context/auth-provider"; 
import { useRouter } from 'next/navigation';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { userId, loading } = useAuth(); // Get loading state
  const router = useRouter();

  useEffect(() => {
    if (!loading && !userId) {
      console.log('Not logged in');
      router.push('/login');  // Redirect to login only if userId is null and not loading
    }
  }, [loading, userId, router]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  if (loading) {
    return <div>Loading...</div>; // Show loading screen while checking local storage
  }

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <Sidebar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;
