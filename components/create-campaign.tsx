"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Moon, Bell, ChevronDown, LayoutDashboard, Mail, Users, Settings, MoreVertical, Calendar as CalendarIcon, Upload, Sparkles, Sun, ChevronLeft, ChevronRight, Menu } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"
import { enUS } from "date-fns/locale"
import Link from 'next/link'
import SuccessModal from '@/components/SuccessModal'
import { getInitialsFromEmail } from '@/utils/stringUtils';
import { saveCampaign, Campaign } from '@/utils/campaignStore';
import axios from 'axios';
import { useAuth } from "@/context/auth-provider";

const emailTemplates = [
  { id: 1, name: "Welcome Email", subject: "Welcome to Our Service!", body: "Dear [Name],\n\nWelcome to our service! We're excited to have you on board..." },
  { id: 2, name: "Monthly Newsletter", subject: "Your Monthly Update", body: "Hello [Name],\n\nHere's what's new this month..." },
  { id: 3, name: "Product Announcement", subject: "Introducing Our Latest Product", body: "Hi [Name],\n\nWe're thrilled to announce our newest product..." },
]

export default function CreateCampaign() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [tokens, setTokens] = useState(null)
  const [darkMode, setDarkMode] = useState(false)
  const [campaignName, setCampaignName] = useState('')
  const [campaignType, setCampaignType] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [targetAudience, setTargetAudience] = useState('')
  const [isRecurring, setIsRecurring] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [audienceFile, setAudienceFile] = useState<File | null>(null)
  const [activeTab, setActiveTab] = useState('details')
  const [csvData, setCsvData] = useState<{ name: string; email: string }[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [trackingIds, setTrackingIds] = useState<string[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<{ name: string; email: string; picture: string } | null>(null);

  const {userId} = useAuth()



  useEffect(() => {
    const fetchUserInfo = async () => {
      const storedTokens = localStorage.getItem('gmail_tokens');
      if (storedTokens) {
        const tokens = JSON.parse(storedTokens);
        try {
          const response = await fetch('https://emailapp-backend.onrender.com/auth/user-info', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tokens }),
          });
          if (response.ok) {
            const data = await response.json();
            setUserInfo(data);
          } else {
            console.error('Failed to fetch user info');
          }
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      }
    };

    fetchUserInfo();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }



  const handleSaveCampaign = async () => {
      if (!isAuthenticated) {
          console.error('User is not authenticated');
          setModalMessage('You must be authenticated to create a campaign.');
          setIsModalOpen(true);
          return;
      }
  
      // Check if all required fields are filled
      if (!campaignName || !campaignType || !subject || !body || !startDate || !endDate || csvData.length === 0) {
          setModalMessage('Please fill in all required fields and upload a CSV file.');
          setIsModalOpen(true);
          return;
      }
  
      try {
          // Extract audience names and emails from csvData (assumed to be an array of objects with 'name' and 'email' properties)
          const audienceNames = csvData.map(row => row.name); // Adjust this based on your csvData structure
          const audienceEmails = csvData.map(row => row.email); // Adjust this based on your csvData structure
  
          // Create audience file
          const audienceResponse = await axios.post('/api/create-audiencefile', {
              audienceName: audienceNames,
              audienceEmail: audienceEmails,
          });
  
          if (audienceResponse.status !== 201) {
              throw new Error(`Error creating audience file: ${audienceResponse.status}`);
          }
  
          const audiencefileId = audienceResponse.data.audiencefileId;
  
          // Send emails
          // const emailResponse = await axios.post('/auth/send-email', {
          //     recipients: csvData,
          //     subject,
          //     body,
          //     userEmail,
          //     tokens,
          // });
  
          // console.log('Emails sent successfully:', emailResponse.data);
          
          // Store tracking IDs
          // const newTrackingIds = emailResponse.data.info.map((item: any) => item.trackingId);
          // setTrackingIds(newTrackingIds);
  
          // Save the campaign
          const campaignResponse = await axios.post('/api/create-campaign', {
              userId, // Assuming userId is defined in your component
              audiencefileId,
              campaignName,
              campaignType,
              endDate: endDate ? new Date(endDate).toISOString() : null,
              scheduleCampaign: null, // Update this if you have scheduling logic
              recurringCampaign: isRecurring, // Assuming isRecurring is defined in your component
              emailTemplate: null, // If you have an email template, pass it here
              subject,
              emailBody: body,
              targetAudience,
          });
  
          if (campaignResponse.status !== 201) {
              throw new Error(`Error saving campaign: ${campaignResponse.status}`);
          }
  
          // setModalMessage(`Campaign "${campaignName}" created and ${emailResponse.data.info.length} emails sent successfully!`);
          setIsModalOpen(true);
      } catch (error) {
          console.error('Error saving campaign and sending emails:', error);
          setModalMessage(`Error creating campaign and sending emails: ${error instanceof Error ? error.message : 'Unknown error'}`);
          setIsModalOpen(true);
      }
  };
  

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId)
    const template = emailTemplates.find(t => t.id.toString() === templateId)
    if (template) {
      setSubject(template.subject)
      setBody(template.body)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target?.result as string
        const rows = text.split('\n').slice(1) // Skip header row
        const parsedData = rows.map(row => {
          const [name, email] = row.split(',')
          return { name: name.trim(), email: email.trim() }
        })
        setCsvData(parsedData)
        setAudienceFile(file)
      }
      reader.readAsText(file)
    }
  }

  const handleNext = () => {
    if (activeTab === 'details') {
      setActiveTab('content')
    } else if (activeTab === 'content') {
      setActiveTab('audience')
    }
  }

  const handleBack = () => {
    if (activeTab === 'content') {
      setActiveTab('details')
    } else if (activeTab === 'audience') {
      setActiveTab('content')
    }
  }


  return (
    <div className={`flex flex-col h-screen ${darkMode ? 'dark' : ''}`}>
      <header className="bg-white dark:bg-gray-800 shadow-sm lg:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold dark:text-white">Create Campaign</h1>
          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
     
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-4xl mx-auto">
            

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-bold">Campaign Details</CardTitle>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="details" onClick={() => setActiveTab('details')}>Details</TabsTrigger>
                    <TabsTrigger value="content" onClick={() => setActiveTab('content')}>Content</TabsTrigger>
                    <TabsTrigger value="audience" onClick={() => setActiveTab('audience')}>Audience</TabsTrigger>
                  </TabsList>
                  <TabsContent value="details">
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="campaignName">Campaign Name</Label>
                          <Input
                            id="campaignName"
                            placeholder="Enter campaign name"
                            value={campaignName}
                            onChange={(e) => setCampaignName(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="campaignType">Campaign Type</Label>
                          <Select value={campaignType} onValueChange={setCampaignType}>
                            <SelectTrigger id="campaignType">
                              <SelectValue placeholder="Select campaign type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="newsletter">Newsletter</SelectItem>
                              <SelectItem value="promotional">Promotional</SelectItem>
                              <SelectItem value="transactional">Transactional</SelectItem>
                              <SelectItem value="automated">Automated</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="startDate">Start Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={`w-full justify-start text-left font-normal ${!startDate && "text-muted-foreground"}`}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {startDate ? format(startDate, "PPP") : <span>Pick a start date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={startDate}
                                onSelect={setStartDate}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="endDate">End Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={`w-full justify-start text-left font-normal ${!endDate && "text-muted-foreground"}`}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {endDate ? format(endDate, "PPP") : <span>Pick an end date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={endDate}
                                onSelect={setEndDate}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="recurring">Recurring Campaign</Label>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="recurring"
                              checked={isRecurring}
                              onCheckedChange={setIsRecurring}
                            />
                            <Label htmlFor="recurring">Enable recurring schedule</Label>
                          </div>
                        </div>
                      </div>
                    </form>
                  </TabsContent>
                  <TabsContent value="content">
                    <form className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="emailTemplate">Email Template</Label>
                        <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
                          <SelectTrigger id="emailTemplate">
                            <SelectValue placeholder="Select email template" />
                          </SelectTrigger>
                          <SelectContent>
                            {emailTemplates.map((template) => (
                              <SelectItem key={template.id} value={template.id.toString()}>
                                {template.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          placeholder="Email subject"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="body">Email Body</Label>
                        <Textarea
                          id="body"
                          placeholder="Email body"
                          value={body}
                          onChange={(e) => setBody(e.target.value)}
                          rows={10}
                          className="min-h-[200px]"
                        />
                      </div>
                    </form>
                  </TabsContent>
                  <TabsContent value="audience">
                    <form className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="targetAudience">Target Audience</Label>
                        <Select value={targetAudience} onValueChange={setTargetAudience}>
                          <SelectTrigger id="targetAudience">
                            <SelectValue placeholder="Select target audience" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Subscribers</SelectItem>
                            <SelectItem value="new">New Subscribers</SelectItem>
                            <SelectItem value="active">Active Users</SelectItem>
                            <SelectItem value="inactive">Inactive Users</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="audienceFile">Upload Audience File (CSV)</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            id="audienceFile"
                            type="file"
                            accept=".csv"
                            onChange={handleFileUpload}
                            className="flex-grow"
                          />
                          <Button variant="outline" onClick={() => document.getElementById('audienceFile')?.click()}>
                            <Upload className="mr-2 h-4 w-4" />
                            Upload
                          </Button>
                        </div>
                        {audienceFile && (
                          <p className="text-sm text-gray-500 mt-1">
                            File selected: {audienceFile.name} ({csvData.length} recipients)
                          </p>
                        )}
                      </div>
                    </form>
                  </TabsContent>
                </Tabs>

                <div className="flex justify-between mt-8">
                  {activeTab !== 'details' && (
                    <Button variant="outline" onClick={() => setActiveTab(activeTab === 'content' ? 'details' : 'content')}>
                      Back
                    </Button>
                  )}
                  {activeTab === 'audience' ? (
                    <Button onClick={handleSaveCampaign} className="bg-purple-600 hover:bg-purple-700 text-white ml-auto">
                      Create Campaign
                    </Button>
                  ) : (
                    <Button onClick={() => setActiveTab(activeTab === 'details' ? 'content' : 'audience')} className="bg-purple-600 hover:bg-purple-700 text-white ml-auto">
                      Next
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      <SuccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={modalMessage}
      />
      
   
    </div>
  )
}