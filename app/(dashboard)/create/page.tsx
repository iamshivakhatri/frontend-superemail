'use client'

import * as React from 'react'
import { ArrowLeft, ArrowUp, ArrowDown, Clock, Command, Link2, Image as ImageIcon, SmilePlus, MoreHorizontal, Check, ChevronDown, Bold, Italic, Underline } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function Component() {
  const [showFormatting, setShowFormatting] = React.useState(false)
  const [emailContent, setEmailContent] = React.useState('')
  const editorRef = React.useRef<HTMLDivElement>(null)

  const handleFormat = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
  }

  const handleEditorChange = () => {
    if (editorRef.current) {
      setEmailContent(editorRef.current.innerHTML)
    }
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Navigation */}
      <div className="w-12 border-r flex flex-col items-center py-6 gap-6">
        <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
          <ArrowLeft className="h-4 w-4" />
        </Badge>
        <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
          <ArrowUp className="h-4 w-4" />
        </Badge>
        <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
          <ArrowDown className="h-4 w-4" />
        </Badge>
      </div>

      {/* Main Content */}
      <div className="flex-1 border-r overflow-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-semibold">New Message</h1>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium w-16">To</span>
                <div className="flex-1 flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>LS</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">Laura Shea</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium w-16">Subject</span>
                <input 
                  type="text" 
                  placeholder="Tip: Hit ⌘J for AI"
                  className="flex-1 bg-transparent text-sm outline-none border-b border-input pb-1"
                />
              </div>
            </div>

            <Separator />

            {showFormatting && (
              <div className="flex items-center gap-2 p-2 bg-muted/40 rounded-md">
                <Button variant="ghost" size="sm" onClick={() => handleFormat('bold')}>
                  <Bold className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleFormat('italic')}>
                  <Italic className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleFormat('underline')}>
                  <Underline className="h-4 w-4" />
                </Button>
                <Separator orientation="vertical" className="h-6" />
                <Button variant="ghost" size="sm" onClick={() => handleFormat('createLink', prompt('Enter URL:') || undefined)}>
                  <Link2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleFormat('insertImage', prompt('Enter image URL:') || undefined)}>
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <SmilePlus className="h-4 w-4" />
                </Button>
              </div>
            )}

            <div 
              ref={editorRef}
              contentEditable 
              className="min-h-[400px] outline-none text-sm border-b border-input pb-4"
              onFocus={() => setShowFormatting(true)}
              onBlur={() => setShowFormatting(false)}
              onInput={handleEditorChange}
              dangerouslySetInnerHTML={{ __html: emailContent }}
            />
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="sticky bottom-0 left-12 right-80 border-t bg-background p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>
                    Send
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-80">
                  <DropdownMenuItem className="flex items-center gap-2">
                    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                      ⇧ L
                    </kbd>
                    <span>Send later</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Send when Laura is most likely to open
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost">Remind me</Button>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Command className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Clock className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 p-6 border-l">
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-20 w-20 mb-4">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>LS</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-semibold">Laura Shea</h2>
          <p className="text-sm text-muted-foreground">laura@uxventures.com</p>
          <p className="text-sm text-muted-foreground mb-6">San Francisco</p>
          
          <p className="text-sm text-muted-foreground mb-6">
            Early stage VC focused on dormant but massive markets
          </p>

          <div className="w-full space-y-3 mb-8">
            <Button variant="outline" className="w-full justify-start">
              <span className="mr-2">📧</span> Mail
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <span className="mr-2">📋</span> Diligence list
            </Button>
          </div>

          <div className="w-full space-y-6 text-sm">
            <div>
              <h3 className="font-medium mb-3">Recent Activity</h3>
              <div className="space-y-2 text-left">
                <p className="text-muted-foreground">Your thoughts on this article just...</p>
                <p className="text-muted-foreground">Re: messaging & bots</p>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Social</h3>
              <div className="flex flex-col gap-2">
                <Button variant="outline" size="sm">LinkedIn</Button>
                <Button variant="outline" size="sm">Facebook</Button>
                <Button variant="outline" size="sm">AngelList</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Notification */}
      <div className="fixed bottom-6 right-6 animate-in fade-in slide-in-from-bottom-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2.5 text-sm text-secondary-foreground shadow-md">
                <span>Next time, just hit</span>
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                  ⌘
                </kbd>
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                  J
                </kbd>
                <span>for AI!</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 rounded-full hover:bg-muted"
                >
                  <Check className="h-3 w-3" />
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              Use AI to help compose your email
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}