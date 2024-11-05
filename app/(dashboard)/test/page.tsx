'use client'

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  MessageSquare,
  PenSquare,
  Search,
  Settings,
  MoreVertical,
  Mail,
  FileText,
  Twitter
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Component() {
  const [selectedEmailIndex, setSelectedEmailIndex] = useState<number>(-1)
  const [isEmailOpen, setIsEmailOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedEmailIndex(prev => 
          prev < emails.length - 1 ? prev + 1 : prev
        )
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedEmailIndex(prev => 
          prev > 0 ? prev - 1 : prev
        )
      } else if (e.key === ' ' && selectedEmailIndex !== -1) {
        e.preventDefault()
        setIsEmailOpen(!isEmailOpen)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedEmailIndex, isEmailOpen])

  return (
    <div className="flex h-screen bg-background">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="border-b px-6 py-3">
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-4">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Keyboard Shortcuts</DropdownMenuItem>
                <DropdownMenuItem>Help & Feedback</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Tabs defaultValue="important" className="w-full">
              <TabsList className="gap-2">
                <TabsTrigger value="important" className="text-sm">
                  Important <Badge variant="secondary" className="ml-2">4</Badge>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="text-sm">
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="support" className="text-sm">
                  Support
                </TabsTrigger>
                <TabsTrigger value="team" className="text-sm">
                  Team Blocking <Badge variant="secondary" className="ml-2">1</Badge>
                </TabsTrigger>
                <TabsTrigger value="vc" className="text-sm">
                  VC <Badge variant="secondary" className="ml-2">3</Badge>
                </TabsTrigger>
                <TabsTrigger value="applications" className="text-sm">
                  Applications <Badge variant="secondary" className="ml-2">201</Badge>
                </TabsTrigger>
                <TabsTrigger value="other" className="text-sm">
                  Other
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <PenSquare className="h-4 w-4" />
                  <span className="sr-only">Compose</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Search</span>
                </Button>
              </div>
            </Tabs>
          </div>
        </header>

        {/* Email List */}
        <ScrollArea className="flex-1">
          <div className="divide-y">
            {emails.map((email, index) => (
              <div
                key={email.id}
                className={`flex items-center gap-4 px-6 py-3 hover:bg-muted/50 cursor-pointer group ${
                  selectedEmailIndex === index ? 'bg-muted' : ''
                }`}
                onClick={() => {
                  setSelectedEmailIndex(index)
                  setIsEmailOpen(true)
                }}
                role="button"
                tabIndex={0}
                aria-selected={selectedEmailIndex === index}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={email.avatar} alt={email.sender} />
                  <AvatarFallback>{email.sender[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{email.sender}</span>
                    {email.badge && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                        {email.badge}
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-sm truncate">{email.subject}</span>
                    <span className="text-muted-foreground text-sm truncate">
                      {email.preview}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{email.date}</span>
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
      </div>

      {/* Right Sidebar */}
      <Card className="w-80 border-l rounded-none p-6">
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-20 w-20 mb-4">
            <AvatarImage src="/placeholder.svg" alt="Alex Bass" />
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <h2 className="font-semibold text-lg">Alex Bass</h2>
          <p className="text-sm text-muted-foreground mb-2">alex@example.com</p>
          <p className="text-sm text-muted-foreground">San Francisco</p>
        </div>

        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Recent Opens</h3>
            <div className="space-y-2">
              {recentOpens.map((item, index) => (
                <div key={index} className="text-sm">
                  <p className="font-medium">{item.sender}</p>
                  <p className="text-muted-foreground">{item.subject}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Quick Actions</h3>
            <div className="flex flex-col gap-2">
              <Button variant="outline" className="justify-start">
                <Mail className="mr-2 h-4 w-4" />
                Compose Email
              </Button>
              <Button variant="outline" className="justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Create Document
              </Button>
              <Button variant="outline" className="justify-start">
                <Twitter className="mr-2 h-4 w-4" />
                Share on Twitter
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

const emails = [
  {
    id: 1,
    sender: "Alex Bass",
    subject: "Superhuman Screen Recordings",
    preview: "Hey Andra, We need to work on the screen recordings for the Superhuman...",
    date: "33 mins ago",
    avatar: "/placeholder.svg",
    badge: "team"
  },
  {
    id: 2,
    sender: "Jonathan, Brett",
    subject: "Superhuman launch communications - Invitation to edit",
    preview: "jon@superhuman.com has invited...",
    date: "MAY 13",
    avatar: "/placeholder.svg"
  },
  {
    id: 3,
    sender: "Noel, Jeanine, Conrad",
    subject: "Superhuman announcement 🎯",
    preview: "Hello team, this is an announcement email that talks about t...",
    date: "MAY 13",
    avatar: "/placeholder.svg"
  },
  {
    id: 4,
    sender: "Nicole Luvalle",
    subject: "Updated Invitation: Recruiting Plan Summary",
    preview: "This event has been changed. More details Rec...",
    date: "MAY 13",
    avatar: "/placeholder.svg"
  },
  {
    id: 5,
    sender: "Simone, Rachel",
    subject: "Invitation: Recruiting Plan Summary Review",
    preview: "You have been invited to the following event. Mo...",
    date: "MAY 12",
    avatar: "/placeholder.svg"
  }
]

const recentOpens = [
  {
    sender: "Andriy Zapisotskyi",
    subject: "Re: Connecting Andriy of Growthmate.io with Alex...",
    time: "33 mins ago"
  },
  {
    sender: "Siddharth Janghu",
    subject: "Re: Akiflow Partnership <> Efficient App",
    time: "46 mins ago"
  },
  {
    sender: "Jasmine Jones",
    subject: "Re: Introduction to 02/20 Dashlane Webinar",
    time: "Yesterday"
  },
  {
    sender: "Steve Holm",
    subject: "Appreciating The Product-Focused Direction!",
    time: "Yesterday"
  }
]