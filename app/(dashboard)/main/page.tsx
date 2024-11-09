"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

import {
  Gift,
  ChevronRight,
  HelpCircle,
  LineChart,
  Loader2,
  MenuIcon,
  User2,
  Users,
  Zap,
} from "lucide-react";

import {
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Share2,
  Clock,
  Paperclip,
  Trash2,
  Github,
  Linkedin,
  Send,
  Menu,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Calendar,
  MessageSquare,
  PenSquare,
  Search,
  Settings,
  MoreVertical,
  Mail,
  FileText,
  Twitter,
  X,
  PlusCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { Archive, Inbox, Star } from "lucide-react";

export default function Component() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [draftContent, setDraftContent] = useState(`Dear Jakes,

        Thank you for your detailed response regarding Cloudflare caching and site optimization. I appreciate the information you've provided about your services at Milk Moon Studio, specializing in Design and Webflow Development.
        
        I understand that site optimization, particularly Cloudflare caching, is not a service you offer directly. However, I'm grateful for the resources you've pointed me towards:
        
        1. Your general post on using Cloudflare and Cassette
        2. The post about the image optimization worker you created for Cloudflare
        3. The suggestion to consider using Zaraz with Cloudflare for improved speed
        
        These will be valuable starting points for my research. I'll review these resources and see how I can apply them to my specific scenario.
        
        If I have any further questions about Design or Webflow Development, I'll certainly keep Milk Moon Studio in mind.
        
        Thank you again for your help and for taking the time to respond to my inquiry.
        
        Best regards,
        Alex`);
  const [selectedEmailIndex, setSelectedEmailIndex] = useState<number>(-1);
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [unreadEmails, setUnreadEmails] = useState<number[]>(
    emails
      .map((email) => email.id)
      .filter((id): id is number => id !== undefined)
  );
  const [activeTab, setActiveTab] = useState<string>("important");
  const [isComposeOpen, setIsComposeOpen] = useState(false); // For opening email compose modal
  const [isHovered, setIsHovered] = useState(false);

  const clickCountRef = useRef(0); // Track the number of clicks
  const [openEmailId, setOpenEmailId] = useState(null); // To store the ID of the opened email
  const router = useRouter(); // Initialize useRouter from next/navigation
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [showFooter, setShowFooter] = useState(true);

  const [selectedItem, setSelectedItem] = useState("inbox");
  const [showSettings, setShowSettings] = useState(false);

  const handleClick = () => {
    setIsComposeOpen(true); // Open compose section
    // Navigate to /main after triggering the state change (if necessary).
    // If you want navigation immediately, use Next.js router push instead of Link.
  };

  const openEmail = (index: number) => {
    setSelectedEmailIndex(index);
    setIsEmailOpen(true);

    const emailId = emails[index].id;
    if (emailId !== undefined && unreadEmails.includes(emailId)) {
      setUnreadEmails(unreadEmails.filter((id) => id !== emailId)); // Mark as read
    }
    handleEmailClick(index); // Call the function to handle email click
  };

  const handleEmailClick = (emailId: number) => {
    clickCountRef.current += 1;

    // If the click count reaches 2 within 500ms, consider it a double-click
    if (clickCountRef.current === 1) {
      setTimeout(() => {
        if (clickCountRef.current === 2) {
          //   setOpenEmailId(emailId); // Open the email
          router.push(`/main/${emailId}`); // Navigate to the email details page
        }
        clickCountRef.current = 0; // Reset click count after timeout
      }, 500); // Timeout in ms (adjust as needed)
    }
  };

  const filteredEmails = emails.filter(
    (email) => activeTab === "other" || email.badge?.toLowerCase() === activeTab
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedEmailIndex((prev) =>
          prev < emails.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedEmailIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === " " && selectedEmailIndex !== -1) {
        e.preventDefault();
        openEmail(selectedEmailIndex);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedEmailIndex, isEmailOpen, unreadEmails]);

  return (
    <div className="flex h-screen bg-background flex-col sm:flex-row overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 flex flex-col relative">
        {/* Top Navigation */}
        <header className="px-6 py-3">
          <div className="flex items-center w-full">
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-4">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Keyboard Shortcuts</DropdownMenuItem>
                <DropdownMenuItem>Help & Feedback</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}

            <div className="relative">
              {/* Button to toggle sidebar */}
              <Button
                variant="ghost"
                size="icon"
                className="mr-4"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menu</span>
              </Button>

              {/* Sidebar */}
              {isSidebarOpen && (
                <div
                  className={`z-40 shadow-lg absolute top-0 left-[-20px] w-80 h-screen bg-white flex flex-col transition-all duration-200 ${
                    isSidebarOpen ? "block" : "hidden"
                  }`}
                  onMouseLeave={() => setIsSidebarOpen(false)} // Close on mouse leave
                >
                  {/* Profile Section */}
                  <div className="p-4 flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-violet-100 to-violet-50 flex items-center justify-center">
                        <img
                          src="/placeholder.svg"
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white bg-green-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-zinc-900 truncate">
                        shiva.khatri0001@gmail.com
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-zinc-500"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Navigation */}
                  <ScrollArea className="flex-1 px-2">
                    <div className="space-y-1">
                      {/* Primary Navigation */}
                      <div className="flex items-center gap-2 px-2 py-1">
                        <span className="text-sm font-medium">Inbox</span>
                        <span className="text-xs text-zinc-500">·</span>
                        <span className="text-sm text-zinc-500">Important</span>
                        <span className="text-xs text-zinc-500">·</span>
                        <span className="text-sm text-zinc-500">Other</span>
                        <span className="ml-auto text-sm text-zinc-500">
                          925
                        </span>
                      </div>

                      {/* Main Navigation Items */}
                      <NavigationItem
                        icon={Star}
                        label="Starred"
                        isSelected={selectedItem === "starred"}
                        onClick={() => setSelectedItem("starred")}
                        shortcut={
                          <div className="flex gap-1">
                            <kbd className="px-1.5 py-0.5 text-xs bg-zinc-100 rounded">
                              G
                            </kbd>
                            <span className="text-xs text-zinc-500">then</span>
                            <kbd className="px-1.5 py-0.5 text-xs bg-zinc-100 rounded">
                              S
                            </kbd>
                          </div>
                        }
                      />
                      <NavigationItem
                        icon={FileText}
                        label="Drafts"
                        isSelected={selectedItem === "drafts"}
                        onClick={() => setSelectedItem("drafts")}
                      />
                      <NavigationItem
                        icon={Send}
                        label="Sent Mail"
                        isSelected={selectedItem === "sent"}
                        onClick={() => setSelectedItem("sent")}
                      />
                      <NavigationItem
                        icon={Archive}
                        label="Done"
                        isSelected={selectedItem === "done"}
                        onClick={() => setSelectedItem("done")}
                      />
                      <NavigationItem
                        icon={Calendar}
                        label="Scheduled"
                        isSelected={selectedItem === "scheduled"}
                        onClick={() => setSelectedItem("scheduled")}
                      />
                      <NavigationItem
                        icon={Calendar}
                        label="Reminders"
                        isSelected={selectedItem === "reminders"}
                        onClick={() => setSelectedItem("reminders")}
                      />
                      <NavigationItem
                        icon={MessageSquare}
                        label="Snippets"
                        isSelected={selectedItem === "snippets"}
                        onClick={() => setSelectedItem("snippets")}
                      />
                      <NavigationItem
                        icon={Mail}
                        label="Spam"
                        isSelected={selectedItem === "spam"}
                        onClick={() => setSelectedItem("spam")}
                      />
                      <NavigationItem
                        icon={Trash2}
                        label="Trash"
                        isSelected={selectedItem === "trash"}
                        onClick={() => setSelectedItem("trash")}
                      />
                      <NavigationItem
                        icon={Mail}
                        label="[Imap]"
                        isSelected={selectedItem === "imap"}
                        onClick={() => setSelectedItem("imap")}
                      />
                      <NavigationItem
                        icon={FileText}
                        label="Drafts"
                        isSelected={selectedItem === "drafts2"}
                        onClick={() => setSelectedItem("drafts2")}
                      />
                    </div>
                  </ScrollArea>

                  {/* Settings */}
                  <div className="p-4 border-t border-zinc-200">
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2 h-9 px-2"
                    >
                      <Settings className="h-4 w-4" />
                      <span className="text-sm">Settings</span>
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1 flex items-center">
              <div
                className={`flex-grow transition-all duration-300 ease-in-out ${
                  isSearchExpanded ? "hidden" : ""
                }`}
              >
                <Tabs
                  defaultValue="important"
                  onValueChange={(value) => setActiveTab(value)}
                >
                  <TabsList className="gap-2 overflow-auto">
                    <TabsTrigger value="important" className="text-sm">
                      Important{" "}
                      <Badge variant="secondary" className="ml-2">
                        4
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="text-sm">
                      Notifications
                    </TabsTrigger>
                    <TabsTrigger value="support" className="text-sm">
                      Support
                    </TabsTrigger>
                    <TabsTrigger value="team" className="text-sm">
                      Team Blocking{" "}
                      <Badge variant="secondary" className="ml-2">
                        1
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="vc" className="text-sm">
                      VC{" "}
                      <Badge variant="secondary" className="ml-2">
                        3
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="applications" className="text-sm">
                      Applications{" "}
                      <Badge variant="secondary" className="ml-2">
                        201
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="other" className="text-sm">
                      Other
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div
                className={`flex items-center gap-2 ${
                  isSearchExpanded ? "w-full" : ""
                }`}
              >
                {isSearchExpanded ? (
                  <div className="flex w-full items-center transition-all duration-300 ease-in-out transform translate-y-0">
                    <Input
                      type="search"
                      placeholder="Search..."
                      className="flex-grow min-h-[30px]"
                      autoFocus
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsSearchExpanded(false)}
                      className="ml-2"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Close search</span>
                    </Button>
                  </div>
                ) : (
                  <>
                    <Link href="/create" passHref>
                      <Button variant="ghost" size="icon">
                        <PenSquare className="h-6 w-6" />
                        <span className="sr-only">Compose</span>
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsSearchExpanded(true)}
                    >
                      <Search className="h-6 w-6" />
                      <span className="sr-only">Search</span>
                    </Button>
                  </>
                )}
              </div>
              <div className="flex items-center ml-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-blue-500 h-8 w-8 rounded-full flex items-center justify-center text-white"
                >
                  <span className="sr-only">User Profile</span>
                  {/* Initials as a placeholder */}
                  <span className="font-semibold">U</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Email List */}
        <ScrollArea className="flex-1 overflow-auto">
          <div className="divide-y">
            {filteredEmails.map((email, index) => (
              <div
                key={email.id}
                className={`flex items-center gap-4 px-6 py-3 hover:bg-muted/50 cursor-pointer group ${
                  selectedEmailIndex === index ? "bg-muted" : ""
                }`}
                onClick={() => openEmail(email.id)}
                role="button"
                tabIndex={0}
                aria-selected={selectedEmailIndex === index}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={email.avatar} alt={email.sender} />
                  <AvatarFallback>
                    {email.sender ? email.sender[0] : "N/A"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{email.sender}</span>
                    {email.badge && (
                      <Badge
                        variant="secondary"
                        className="bg-blue-100 text-blue-700"
                      >
                        {email.badge}
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-sm truncate">
                      {email.subject}
                    </span>
                    <span className="text-muted-foreground text-sm truncate">
                      {email.pvc}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {email.date}
                  </span>
                  {email.id !== undefined &&
                    unreadEmails.includes(email.id) && (
                      <span className="h-2 w-2 rounded-full bg-blue-500"></span> // Blue dot for unread emails
                    )}
                  <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Calendar className="h-4 w-4" />
                      <span className="sr-only">Schedule</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MessageSquare className="h-4 w-4" />
                      <span className="sr-only">Reply</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between px-6 py-2 bg-background border-t sm:hidden">
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          {/* Add other icons here as needed */}
        </div>

        {/* Compose Button */}
      </div>

      {/* Right Sidebar (Email Content) */}
      {/* Right Sidebar (Email Content) */}
      {isEmailOpen &&
  selectedEmailIndex !== -1 &&
  (showSettings ? (
    <div className="w-80 max-w-2xl mx-auto bg-white min-h-screen transition-all duration-300">
      settings page.
    </div>
  ) : (
    <ScrollArea
      className={`w-80 shadow-lg relative min-h-screen mb-10${
          showFooter ? "mb-10" : ""
      } transition-all duration-300 flex flex-col overflow-hidden`}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 h-8 w-8 text-zinc-400 hover:text-zinc-600"
      ></Button>

      <div className="p-4 flex-1 ">
        {/* Personal Info */}
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-12 w-12 mb-2">
            <AvatarImage src="/placeholder.svg" alt="AB" />
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <h2 className="font-semibold">Alex Bass</h2>
          <p className="text-sm text-muted-foreground mb-2">Austin</p>
          <p className="text-xs text-muted-foreground mb-4">
            contact@efficient.app
          </p>

          <div className="flex gap-2 mb-4">
            <Button variant="outline" size="sm" className="w-full">
              <Linkedin className="h-4 w-4 mr-2" />
              LinkedIn
            </Button>
            <Button variant="outline" size="sm" className="w-full">
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Button>
          </div>

          <Separator className="my-4" />
          <p className="text-xs text-muted-foreground">
            Founder & Product at efficient.app
          </p>
        </div>

        {/* Summary Section */}
        <div className="space-y-2">
          <h2 className="font-semibold mb-2">Email Summary</h2>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Response regarding Cloudflare caching services</li>
            <li>
              • Milk Moon Studio specializes in Design and Webflow Development
            </li>
            <li>• Refers to existing resources and documentation</li>
            <li>• Suggests Zaraz integration for performance</li>
          </ul>
        </div>

        {/* Draft Reply */}
        <div className="space-y-2">
          <h2 className="font-semibold mb-2">AI-Generated Draft</h2>
          <Textarea
            value={draftContent}
            onChange={(e) => setDraftContent(e.target.value)}
            className="min-h-[200px] mb-4"
          />
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Paperclip className="h-4 w-4 mr-2" />
                Attach
              </Button>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </div>
            <Button>
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
        </div>

      </div>

      {/* Footer */}
        <div className="p-4 border-t border-zinc-100 mt-6">
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
                <Settings
                className="h-4 w-4 cursor-pointer"
                onClick={() => setShowSettings(!showSettings)}
                />
            </div>
            </div>
        </div>



    </ScrollArea>
  ))}



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

function NavigationItem({
  icon: Icon,
  label,
  shortcut,
  isSelected,
  onClick,
}: {
  icon: any;
  label: string;
  shortcut?: React.ReactNode;
  isSelected?: boolean;
  onClick?: () => void;
}) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-2 h-9 px-2 hover:bg-zinc-100 transition-colors",
        isSelected && "bg-zinc-100 text-zinc-900"
      )}
      onClick={onClick}
    >
      <Icon className="h-4 w-4" />
      <span className="flex-1 text-sm text-left">{label}</span>
      {shortcut}
    </Button>
  );
}

const emails = [
  {
    id: 1,
    sender: "Alex Bass",
    subject: "Superhuman Screen Recordings",
    pvc: "Hey Andra, We need to work on the screen recordings for the Superhuman...",
    date: "33 mins ago",
    avatar: "/placeholder.svg",
    badge: "team",
    content:
      "Hey Andra, We need to work on the screen recordings for the Superhuman project to make sure everything is clear for the demo.",
  },
  {
    id: 2,
    sender: "Jane Doe",
    subject: "Weekly Sync Meeting",
    pvc: "Hi team, Just a reminder about our weekly sync meeting scheduled for...",
    date: "1 hour ago",
    avatar: "/placeholder.svg",
    badge: "meeting",
    content:
      "Hi team, Just a reminder about our weekly sync meeting scheduled for tomorrow at 10am. Please have your updates ready.",
  },
  {
    id: 3,
    sender: "Mike Johnson",
    subject: "Project Update",
    pvc: "The project is on track, and we expect to meet the deadline...",
    date: "3 hours ago",
    avatar: "/placeholder.svg",
    badge: "important",
    content:
      "The project is on track, and we expect to meet the deadline. There are some challenges, but they’re being addressed.",
  },
  {
    id: 4,
    sender: "Customer Support",
    subject: "Ticket #4534 Resolved",
    pvc: "Hello, Your ticket #4534 regarding login issues has been resolved...",
    date: "4 hours ago",
    avatar: "/placeholder.svg",
    badge: "support",
    content:
      "Hello, Your ticket #4534 regarding login issues has been resolved. Please let us know if you encounter any further issues.",
  },
  {
    id: 5,
    sender: "HR Team",
    subject: "Benefits Enrollment",
    pvc: "Please remember to enroll in benefits by the end of this week...",
    date: "5 hours ago",
    avatar: "/placeholder.svg",
    badge: "team",
    content:
      "Please remember to enroll in benefits by the end of this week to avoid any disruptions in your coverage.",
  },
  {
    id: 6,
    sender: "Marketing",
    subject: "Q4 Campaign vc",
    pvc: "The Q4 campaign analysis report is ready. We saw a great boost in...",
    date: "Yesterday",
    avatar: "/placeholder.svg",
    badge: "vc",
    content:
      "The Q4 campaign analysis report is ready. We saw a great boost in engagement, and the team’s efforts paid off.",
  },
  {
    id: 7,
    sender: "Tom Lee",
    subject: "Code vc Needed",
    pvc: "Hey, Could you vc my latest pull request? It's related to...",
    date: "Yesterday",
    avatar: "/placeholder.svg",
    badge: "team",
    content:
      "Hey, Could you vc my latest pull request? It's related to the new feature we discussed last week.",
  },
  {
    id: 8,
    sender: "Lara Croft",
    subject: "Bug Report #239",
    pvc: "We discovered a bug in the payment gateway integration...",
    date: "2 days ago",
    avatar: "/placeholder.svg",
    badge: "important",
    content:
      "We discovered a bug in the payment gateway integration that affects some users. We'll need to fix it ASAP.",
  },
  {
    id: 9,
    sender: "applications Dept.",
    subject: "Expense Report Approval",
    pvc: "Your expense report for October has been vced and approved...",
    date: "2 days ago",
    avatar: "/placeholder.svg",
    badge: "applications",
    content:
      "Your expense report for October has been vced and approved. The reimbursement will be processed soon.",
  },
  {
    id: 10,
    sender: "Sarah Conner",
    subject: "New Product Feedback",
    pvc: "I’d love to get your feedback on the new product notifications...",
    date: "3 days ago",
    avatar: "/placeholder.svg",
    badge: "vc",
    content:
      "I’d love to get your feedback on the new product notifications. Let me know if you think anything needs changing.",
  },
  {
    id: 11,
    sender: "Chris Pratt",
    subject: "Event Planning Committee",
    pvc: "We’re organizing a company event next month. Volunteers needed...",
    date: "4 days ago",
    avatar: "/placeholder.svg",
    badge: "team",
    content:
      "We’re organizing a company event next month. Volunteers needed to help with planning and logistics.",
  },
  {
    id: 12,
    sender: "DevOps",
    subject: "System Maintenance Notification",
    pvc: "There will be scheduled maintenance on Saturday night...",
    date: "5 days ago",
    avatar: "/placeholder.svg",
    badge: "important",
    content:
      "There will be scheduled maintenance on Saturday night. Please save your work to avoid data loss.",
  },
  {
    id: 13,
    sender: "Lucy Heart",
    subject: "notifications Mockups for Approval",
    pvc: "The initial notifications mockups for the mobile app are ready...",
    date: "6 days ago",
    avatar: "/placeholder.svg",
    badge: "notifications",
    content:
      "The initial notifications mockups for the mobile app are ready. Please vc and let me know if any adjustments are needed.",
  },
  {
    id: 14,
    sender: "Legal Team",
    subject: "Compliance Training",
    pvc: "Reminder: Mandatory compliance training is scheduled for...",
    date: "Last week",
    avatar: "/placeholder.svg",
    badge: "important",
    content:
      "Reminder: Mandatory compliance training is scheduled for next Wednesday. Please register if you haven’t already.",
  },
  {
    id: 15,
    sender: "Bob Martin",
    subject: "Client Proposal Feedback",
    pvc: "The client proposal looks good overall, but there are a few...",
    date: "Last week",
    avatar: "/placeholder.svg",
    badge: "client",
    content:
      "The client proposal looks good overall, but there are a few areas that need improvement before we send it off.",
  },
];
