'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowUp, ArrowDown, Share2, MoreVertical, Clock, Paperclip, Trash2, Github, Linkedin, Send } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

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
Alex`)

  return (
    <div className="flex h-screen bg-background">
      {/* Navigation */}
      <div className="w-12 border-r flex flex-col items-center py-4 gap-4">
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
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-semibold">Cloudflare Caching Worth It In My Scenario?</h1>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Clock className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="prose prose-sm max-w-none">
                <p>Hi Alex,</p>
                <p>Site optimisation is not a service we offer here at Milk Moon Studio, we specialise in Design and Webflow Development and tend to focus on full site builds. We do have a couple of posts on the topic detailing what we've done before that can be used as a general guide when using Cloudflare. Since every project is unique and needs a lot of tweaking to get just right it's not something we do for other folks.</p>
                <p>You can find a general post on using Cloudflare and Cassette here as well as a post on an image optimisation worker we created for Cloudflare here. You might also consider using Zaraz with Cloudflare to gain even more speed.</p>
                <p>Hope that helps.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Sidebar */}
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
  )
}