"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Gift,
  Github,
  HelpCircle,
  LineChart,
  Loader2,
  Mail,
  MenuIcon,
  PenSquare,
  Search,
  Settings,
  User2,
  Users,
  X,
  Zap,
} from "lucide-react";

export default function Component() {
  const [selectedCategory, setSelectedCategory] = useState("important");
  const [showFooter, setShowFooter] = useState(true); // Toggle footer visibility based on page

  return (
    <div className="flex h-screen bg-white">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center px-4 h-14 border-b border-zinc-100">
          <Button variant="ghost" size="icon" className="mr-2">
            <MenuIcon className="h-5 w-5 text-zinc-500" />
          </Button>
          
          <nav className="flex items-center space-x-6">
            {/* Navigation buttons */}
            <button
              onClick={() => setSelectedCategory("important")}
              className={cn(
                "text-sm font-medium flex items-center",
                selectedCategory === "important" 
                  ? "text-zinc-900" 
                  : "text-zinc-500 hover:text-zinc-900"
              )}
            >
              Important
              <span className="ml-1.5 text-xs text-zinc-500">925</span>
            </button>
            {/* ... other buttons */}
          </nav>

          <div className="ml-auto flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-zinc-500" />
              <Input
                placeholder="Search"
                className="w-72 pl-8 h-9 bg-zinc-50 border-none text-sm"
              />
            </div>
            <Button variant="ghost" className="h-8 px-3 text-sm font-medium">
              <PenSquare className="h-4 w-4 mr-2" />
              Compose
            </Button>
          </div>
        </header>

        {/* Email List */}
        <ScrollArea className="flex-1">
          {emails.map((email) => (
            <div
              key={email.id}
              className="flex items-start px-4 py-3 border-b border-zinc-100 hover:bg-zinc-50"
            >
              {email.isImportant && (
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-4" />
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center min-w-0">
                    <span className="text-sm font-medium text-zinc-900 truncate">
                      {email.sender}
                    </span>
                    <span className="ml-2 text-xs text-zinc-500">
                      {email.subject}
                    </span>
                  </div>
                  <span className="ml-2 text-xs text-zinc-500 whitespace-nowrap">
                    {email.date}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 truncate mt-0.5">
                  {email.preview}
                </p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Right Sidebar */}
      <div className={cn("w-80 bg-zinc-50/50 flex flex-col relative", { "mb-12": showFooter })}>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 h-8 w-8 text-zinc-400 hover:text-zinc-600"
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="p-4 flex-1">
          <h2 className="text-lg font-medium text-zinc-900">Selisha Thapa</h2>
          <p className="text-sm text-zinc-500 mt-0.5">selishathapa7@gmail.com</p>
          
          <div className="mt-6 space-y-4">
            <div className="flex items-center space-x-2 text-zinc-500">
              <Mail className="h-4 w-4" />
              <span className="text-sm">Mail</span>
            </div>
            
            <div className="space-y-2 pl-6">
              <p className="text-sm text-zinc-600">Getting to Know Each Other</p>
              <p className="text-sm text-zinc-600">Important</p>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-zinc-100">
          <div className="flex items-center space-x-2 text-zinc-500 mb-4">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">We'll let you know when it's ready!</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-zinc-500">
              <span className="text-sm">My Team</span>
              <Users className="h-4 w-4" />
            </div>
            <div className="flex items-center space-x-4 text-zinc-400">
              <Zap className="h-4 w-4" />
              <Gift className="h-4 w-4" />
              <HelpCircle className="h-4 w-4" />
              <LineChart className="h-4 w-4" />
              <Settings className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Conditional */}
      {showFooter && (
        <div className="fixed bottom-0 left-0 right-0 px-4 py-2 border-t border-zinc-100 bg-white flex items-center justify-between text-xs text-zinc-500">
          <div className="flex items-center space-x-4">
            <span>Hit</span>
            <kbd className="px-1.5 py-0.5 text-xs bg-zinc-100 rounded">E</kbd>
            <span>to Mark Done</span>
            {/* ... other commands */}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-zinc-500 hover:text-zinc-900"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

const emails = [
  {
    id: 1,
    sender: "shivaji",
    subject: "Scheduled Email Test",
    preview: "Hello, this is a test email scheduled via Postman.",
    date: "NOV 3",
    isImportant: false,
  },
  {
    id: 2,
    sender: "Redis",
    subject: "Get started with Redis Cloud",
    preview: "Redis | The Real-Time Data Platform Redis Welcome to Redis Cloud You did it! Whether you're a first...",
    date: "NOV 2",
    isImportant: true,
  },
  // ... other emails remain the same
];
