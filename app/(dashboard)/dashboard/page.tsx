"use client"
import Sidebar from '@/components/sidebar'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useState } from 'react'
import { ArrowUpRight, Bell, Calendar, ChevronDown, ChevronRight, CreditCard, FileText, HelpCircle, LayoutDashboard, Mail, Menu, MessageSquare, Moon, MoreVertical, Search, Settings, Sun, Users, Plus } from 'lucide-react'


type Props = {}

const Dashboard = (props: Props) => {
    const [darkMode, setDarkMode] = useState(false)
  const [trackingIds, setTrackingIds] = useState<string[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<{ name: string; email: string; picture: string } | null>(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }
  return (

    <div>
        Dashboard
        <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

    </div>
  )
}

export default Dashboard