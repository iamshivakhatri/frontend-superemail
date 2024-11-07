'use client'


import React, { useState, useEffect } from 'react'
import Sidebar from '@/components/sidebar'
import { useAuth } from "@/context/auth-provider"
import { useRouter } from 'next/navigation'
import DashboardSkeleton from '@/components/skeleton'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronUp, ChevronDown } from 'lucide-react'

type Props = {}

const footer = (props: Props) => {
    const [darkMode, setDarkMode] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isFooterExpanded, setIsFooterExpanded] = useState(false)
    const { isLoggedIn, loading } = useAuth()
    const router = useRouter()
  
    const toggleDarkMode = () => setDarkMode(prev => !prev)
    const toggleFooter = () => setIsFooterExpanded(prev => !prev)
  return (




<footer className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-all duration-300 ease-in-out`}>
<div className="container mx-auto px-4">
  <div className="flex items-center justify-between h-16">
    <Avatar>
      <AvatarImage src="/placeholder-avatar.png" alt="User" />
      <AvatarFallback>U</AvatarFallback>
    </Avatar>
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleFooter}
      aria-label={isFooterExpanded ? "Collapse footer" : "Expand footer"}
    >
      {isFooterExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
    </Button>
  </div>
  {isFooterExpanded && (
    <div className={`py-4 grid grid-cols-1 md:grid-cols-3 gap-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
      <div>
        <h3 className="font-semibold mb-2">Quick Links</h3>
        <ul className="space-y-1">
          <li><a href="#" className="hover:underline">Dashboard</a></li>
          <li><a href="#" className="hover:underline">Profile</a></li>
          <li><a href="#" className="hover:underline">Settings</a></li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Tools</h3>
        <ul className="space-y-1">
          <li><a href="#" className="hover:underline">Analytics</a></li>
          <li><a href="#" className="hover:underline">Reports</a></li>
          <li><a href="#" className="hover:underline">Integrations</a></li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Support</h3>
        <ul className="space-y-1">
          <li><a href="#" className="hover:underline">Help Center</a></li>
          <li><a href="#" className="hover:underline">Contact Us</a></li>
          <li><a href="#" className="hover:underline">FAQs</a></li>
        </ul>
      </div>
    </div>
  )}
</div>
</footer>
  )
}

export default footer