'use client'

import { useEffect, useState } from "react"
import { ArrowLeft, ArrowUp, ArrowDown, Clock, Share2, MoreHorizontal, MoreVertical,Github, Linkedin, ChevronDown, Send, Calendar, Paperclip, Trash2, Bot, Command as Cmd, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "react-hot-toast"
import Link from "next/link"
import { ScrollArea } from "@/components/ui/scroll-area"



export default function Component() {
  const [open, setOpen] = useState(false)
  const [draftMode, setDraftMode] = useState<"outline" | "edit">("outline")
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
    Alex`)

  // Handle keyboard shortcuts
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      } else if (e.key === "j" && e.metaKey) {
        e.preventDefault()
        setDraftMode(draftMode === "outline" ? "edit" : "outline")
      } else if (e.key === "m") {
        // toast({
        //   description: "Next time, just hit M to summarize!",
        //   duration: 3000,
        // })
        toast.custom("Next time, just hit M to summarize!", {
            position: 'bottom-right',
            icon: '🤖',
            style: {
              background: '#3333',
              color: '#fffff',
              border: '1px solid #3333',

            },
        })
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [draftMode])

  return (
    <>
      <div className="flex h-screen flex-col bg-background">
        <div className="flex flex-1 overflow-hidden">
          {/* Left Navigation */}
          <div className="flex flex-col items-center gap-4 border-r p-4">
            <Link href="/main">
            <Button variant="ghost" size="icon" aria-label="Back" >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            </Link>
            <div className="flex flex-col gap-2">
              <Button variant="ghost" size="icon" aria-label="Previous email">
                <ArrowUp className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Next email">
                <ArrowDown className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-auto">
            <div className="mx-auto max-w-4xl p-6">
              <div className="mb-6 flex items-center justify-between">
                <h1 className="text-xl font-semibold">Cloudflare Caching Worth It In My Scenario?</h1>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Clock className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="mb-6 flex items-center justify-between text-sm text-muted-foreground">
                <div>Me</div>
                <div>DEC 16</div>
              </div>

              <Card className="mb-6 p-6">
                <div className="mb-4">
                  <div className="mb-2 text-sm text-muted-foreground">Jakes to Me</div>
                  <div className="mb-1">1:03 AM</div>
                </div>
                <div className="space-y-4 text-sm">
                  <p>Hi Alex,</p>
                  <p>
                    Site optimisation is not a service we offer here at Milk Moon Studio, we specialise in Design and Webflow
                    Development and tend to focus on full site builds. We do have a couple of posts on the topic detailing what
                    we've done before that can be used as a general guide when using Cloudflare. Since every project is unique
                    and needs a lot of tweaking to get just right it's not something we do for other folks.
                  </p>
                  <p>
                    You can find a general post on{" "}
                    <a href="#" className="text-primary hover:underline">
                      using Cloudflare and Cassette
                    </a>{" "}
                    here as well as a post on an image optimisation worker we created for Cloudflare{" "}
                    <a href="#" className="text-primary hover:underline">
                      here
                    </a>
                    . You might also consider using Zaraz with Cloudflare to gain even more speed.
                  </p>
                  <p>Hope that helps.</p>
                </div>
              </Card>

              {/* Reply Section */}
              <Card className="mb-6 ">
                <div className="p-4 min-h-[200px] ">
                  <h2 className="mb-2 text-sm font-medium">Write a draft</h2>
                  <Textarea
                    placeholder={draftMode === "outline" ? "Outline your email in brief notes" : "Write your full response..."}
                    className="min-h-[200px] resize-none border-0 focus-visible:ring-0"
                    value={draftContent}
                    onChange={(e) => setDraftContent(e.target.value)}
                  />
                  
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                    Hit <kbd className="rounded bg-muted px-1">⌘</kbd> <kbd className="rounded bg-muted px-1">J</kbd> to switch to {draftMode === "outline" ? "Edit" : "Outline"}
                  </div>
                <Separator />
                <div className="flex items-center justify-between p-2">
                  <div className="flex gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" className="gap-1">
                          Send <ChevronDown className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Send now</DropdownMenuItem>
                        <DropdownMenuItem>Schedule send</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="ghost" size="sm">
                      Send later
                    </Button>
                    <Button variant="ghost" size="sm">
                      Remind me
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Bot className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Command className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>


            </div>
          </div>

          {/* Profile Sidebar */}
          {/* <div className="w-80 border-l p-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="mb-4 h-16 w-16">
                <AvatarImage src="/placeholder.svg" alt="Alex Bass" />
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
              <h2 className="mb-1 text-xl font-semibold">Alex Bass</h2>
              <p className="mb-4 text-sm text-muted-foreground">contact@efficient.app</p>
              <p className="mb-4 text-sm">Austin</p>
              <Button variant="secondary" className="mb-6">
                EDIT PROFILE
              </Button>
              <p className="mb-6 text-sm text-muted-foreground">
                Sharing highly unfiltered SaaS opinions at Efficient App (find your software stack with no-BS software
                comparisons). ⚡️ Founder & Product (efficient.app)
              </p>
              <div className="grid w-full gap-2">
                <Button variant="outline" className="w-full justify-start">
                  <svg
                    viewBox="0 0 24 24"
                    className="mr-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  LinkedIn
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <svg
                    viewBox="0 0 24 24"
                    className="mr-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                  GitHub
                </Button>
              </div>
            </div>
          </div> */}
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
            <p className="text-xs text-muted-foreground mb-4">contact@efficient.app</p>
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
              <li>• Milk Moon Studio specializes in Design and Webflow Development</li>
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
        </div>
      </div>

      {/* Command Palette for AI */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="flex items-center border-b px-3 pb-3">
          <Bot className="mr-2 h-5 w-5" />
          <span className="text-sm font-medium">AI Assistant</span>
          <Button variant="ghost" size="icon" className="ml-auto h-8 w-8" onClick={() => setOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <Command className="rounded-lg border-none bg-transparent">
          <CommandInput placeholder="Ask AI to help with your response..." />
          <CommandList>
            <CommandEmpty>Start typing to get AI assistance...</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>Summarize the email thread</CommandItem>
              <CommandItem>Draft a polite response</CommandItem>
              <CommandItem>Make it more concise</CommandItem>
              <CommandItem>Make it more formal</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}

