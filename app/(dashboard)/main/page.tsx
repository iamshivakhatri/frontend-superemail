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

export default function Component() {
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
    <div className="flex h-screen bg-background flex-col sm:flex-row">
      {/* Main Content */}
      <div className="flex-1 flex flex-col relative">
        {/* Top Navigation */}
        <header className="px-6 py-3">
          <div className="flex items-center w-full">
            <DropdownMenu>
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
            </DropdownMenu>

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
        <div>hello</div>

        <Link href="/create" passHref>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:scale-110"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <PenSquare
                    className={`h-6 w-6 transition-all duration-300 ${
                      isHovered ? "rotate-90" : ""
                    }`}
                  />
                  <span className="sr-only">Create new item</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left" align="center">
                <p>Create new item</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Link>
      </div>

      {/* Right Sidebar (Email Content) */}
      {isEmailOpen && selectedEmailIndex !== -1 && (
        // <Card className="w-80 border-l rounded-none p-6">
        //   <button
        //     className="absolute top-2 right-2"
        //     onClick={() => setIsEmailOpen(false)}
        //   >
        //     <X className="h-5 w-5" />
        //   </button>
        //   <div className="flex flex-col items-center text-center">
        //     <Avatar className="h-20 w-20 mb-4">
        //       <AvatarImage src="/placeholder.svg" alt="Alex Bass" />
        //       <AvatarFallback>AB</AvatarFallback>
        //     </Avatar>
        //     <h2 className="font-semibold text-lg">Alex Bass</h2>
        //     <p className="text-sm text-muted-foreground mb-2">
        //       alex@example.com
        //     </p>
        //     <p className="text-sm text-muted-foreground">San Francisco</p>
        //   </div>

        //   <div className="mt-6 space-y-4">
        //     <div className="space-y-2">
        //       <h3 className="text-sm font-medium">Recent Opens</h3>
        //       {/* <div className="space-y-2">
        //       {recentOpens.map((item, index) => (
        //         <div key={index} className="text-sm">
        //           <p className="font-medium">{item.sender}</p>
        //           <p className="text-muted-foreground">{item.subject}</p>
        //           <p className="text-xs text-muted-foreground">{item.time}</p>
        //         </div>
        //       ))}
        //     </div> */}
        //     </div>

        //     <div className="space-y-2">
        //       <h3 className="text-sm font-medium">Quick Actions</h3>
        //       <div className="flex flex-col gap-2">
        //         <Button variant="outline" className="justify-start">
        //           <Mail className="mr-2 h-4 w-4" />
        //           Compose Email
        //         </Button>
        //         <Button variant="outline" className="justify-start">
        //           <FileText className="mr-2 h-4 w-4" />
        //           Create Document
        //         </Button>
        //         <Button variant="outline" className="justify-start">
        //           <Twitter className="mr-2 h-4 w-4" />
        //           Share on Twitter
        //         </Button>
        //       </div>
        //     </div>
        //   </div>
        // </Card>
        <ScrollArea className="w-80 border-l">
          <div className="p-4 space-y-6">
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
            <div>
              <h2 className="font-semibold mb-2">Email Summary</h2>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Response regarding Cloudflare caching services</li>
                <li>
                  • Milk Moon Studio specializes in Design and Webflow
                  Development
                </li>
                <li>• Refers to existing resources and documentation</li>
                <li>• Suggests Zaraz integration for performance</li>
              </ul>
            </div>

            {/* Draft Reply */}
            <div>
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
        </ScrollArea>
      )}
    </div>
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
