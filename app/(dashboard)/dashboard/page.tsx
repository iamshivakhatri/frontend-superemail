"use client"
import Sidebar from '@/components/sidebar'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useState } from 'react'
import { ArrowUpRight, Bell, Calendar, ChevronDown, ChevronRight, CreditCard, FileText, HelpCircle, LayoutDashboard, Mail, Menu, MessageSquare, Moon, MoreVertical, Search, Settings, Sun, Users, Plus } from 'lucide-react'
import Dashboard  from './components/dashboard-main';




type Props = {}

const DashboardMain = (props: Props) => {
  const [darkMode, setDarkMode] = useState(false)
  const [trackingIds, setTrackingIds] = useState<string[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<{ name: string; email: string; picture: string } | null>(null);



  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }
  return (
    <>
    <Dashboard />
    </>

   
  )
}

export default DashboardMain