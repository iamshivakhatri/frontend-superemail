'use client'

import { useEffect, useState } from "react"
import { ArrowLeft, ArrowUp, ArrowDown, Clock, Share2, MoreHorizontal, ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Separator } from "@/components/ui/separator"

export default function Component() {
  const [open, setOpen] = useState(false)

  // Handle keyboard shortcuts
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <div className="flex h-screen bg-background">
        {/* Left Navigation */}
        <div className="flex flex-col items-center gap-4 border-r p-4">
          <Button variant="ghost" size="icon" aria-label="Back">
            <ArrowLeft className="h-4 w-4" />
          </Button>
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
          </div>
        </div>

        {/* Profile Sidebar */}
        <div className="w-80 border-l p-6">
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
        </div>
      </div>

      {/* Command Palette */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="flex items-center border-b px-3 pb-3">
          <Clock className="mr-2 h-5 w-5" />
          <span className="text-sm font-medium">Remind me</span>
        </div>
        <Command className="rounded-lg border-none bg-transparent">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              <div className="px-3 py-2">
                <div className="flex items-center justify-between rounded-md bg-secondary p-3">
                  <span className="text-sm">next week</span>
                  <span className="text-xs text-muted-foreground">MON, 10:00 AM</span>
                </div>
              </div>
              <div className="px-3 py-2">
                <div className="flex items-center justify-between rounded-md p-3 hover:bg-secondary">
                  <span className="text-sm">next Wednesday</span>
                  <span className="text-xs text-muted-foreground">WED, FEB 07, 10:00 AM</span>
                </div>
              </div>
            </CommandGroup>
          </CommandList>
          <div className="flex items-center justify-end border-t p-3">
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
              if no reply
              <ChevronDown className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </Command>
      </CommandDialog>
    </>
  )
}