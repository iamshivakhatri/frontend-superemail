// dashboard/layout.tsx
"use client"
import React, { useState } from 'react';
import Sidebar from "@/components/sidebar"; // Adjust the import path if necessary

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <div className={`flex ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <Sidebar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <main className="flex-1 p-6">
        {children} {/* This is where the page content will be rendered */}
      </main>
    </div>
  );
};

export default Layout;
