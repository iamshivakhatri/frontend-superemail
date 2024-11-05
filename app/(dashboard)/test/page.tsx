import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MessageSquare, PenSquare, Search, Settings } from "lucide-react"

export default function Component() {
  return (
    <div className="flex h-screen bg-background">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="border-b px-6 py-3">
          <Tabs defaultValue="inbox" className="w-full">
            <TabsList className="gap-2">
              <TabsTrigger value="inbox" className="text-sm">
                Inbox <Badge variant="secondary" className="ml-2">7</Badge>
              </TabsTrigger>
              <TabsTrigger value="product" className="text-sm">
                Product <Badge variant="secondary" className="ml-2">3</Badge>
              </TabsTrigger>
              <TabsTrigger value="pitch-decks" className="text-sm">
                Pitch Decks <Badge variant="secondary" className="ml-2">1</Badge>
              </TabsTrigger>
              <TabsTrigger value="investors" className="text-sm">
                Investors <Badge variant="secondary" className="ml-2">5</Badge>
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
        </header>

        {/* Email List */}
        <ScrollArea className="flex-1">
          <div className="divide-y">
            {emails.map((email) => (
              <div
                key={email.id}
                className="flex items-center gap-4 px-6 py-3 hover:bg-muted/50 cursor-pointer group"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={email.avatar} alt={email.sender} />
                  <AvatarFallback>{email.sender[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{email.sender}</span>
                    {email.badge && (
                      <Badge variant="secondary" className="bg-pink-100 text-pink-700">
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
            <AvatarImage src="/placeholder.svg" alt="Laura Shea" />
            <AvatarFallback>LS</AvatarFallback>
          </Avatar>
          <h2 className="font-semibold text-lg">Laura Shea</h2>
          <p className="text-sm text-muted-foreground mb-2">laura@ventures.com</p>
          <p className="text-sm text-muted-foreground">San Francisco</p>
        </div>

        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">About</h3>
            <p className="text-sm text-muted-foreground">
              Early stage VC focused on dormant but massive markets
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Social</h3>
            <div className="flex flex-col gap-2">
              <Button variant="outline" className="justify-start">
                <svg
                  className="mr-2 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.47 2H3.53a1.45 1.45 0 0 0-1.47 1.43v17.14A1.45 1.45 0 0 0 3.53 22h16.94a1.45 1.45 0 0 0 1.47-1.43V3.43A1.45 1.45 0 0 0 20.47 2ZM8.09 18.74h-3v-9h3ZM6.59 8.48a1.56 1.56 0 1 1 0-3.12 1.57 1.57 0 1 1 0 3.12Zm12.32 10.26h-3v-4.83c0-1.21-.43-2-1.52-2A1.65 1.65 0 0 0 12.85 13a2 2 0 0 0-.1.73v5h-3v-9h3V11a3 3 0 0 1 2.71-1.5c2 0 3.45 1.29 3.45 4.06Z" />
                </svg>
                LinkedIn
              </Button>
              <Button variant="outline" className="justify-start">
                <svg
                  className="mr-2 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07" />
                </svg>
                Facebook
              </Button>
              <Button variant="outline" className="justify-start">
                <Settings className="mr-2 h-4 w-4" />
                AngelList
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
    sender: "Laura Shea",
    subject: "Closing our deal",
    preview: "This is a snippet of text, it'll show a preview of content inside...",
    date: "MAY 13",
    avatar: "/placeholder.svg",
    badge: "superhuman"
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