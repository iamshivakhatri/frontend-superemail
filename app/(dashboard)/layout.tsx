"use client";

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/sidebar';
import { useAuth } from "@/context/auth-provider"; 
import { useRouter } from 'next/navigation';
import DashboardSkeleton from '@/components/skeleton';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoggedIn, loading } = useAuth(); // Get isLoggedIn and loading state
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      console.log('Not logged in');
      router.push('/login');  // Redirect to login if not logged in and not loading
    }
  }, [loading, isLoggedIn, router]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  if (loading) {
    return <DashboardSkeleton/>// Show loading screen while checking local storage
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
