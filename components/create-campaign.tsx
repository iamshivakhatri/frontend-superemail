"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Moon,
  Bell,

  MoreVertical,
  Calendar as CalendarIcon,
  Upload,
  Sparkles,
  Sun,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, set } from "date-fns";

import { getInitialsFromEmail } from "@/utils/stringUtils";
import axios from "axios";
import { useAuth } from "@/context/auth-provider";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";


const emailTemplates = [
  {
    id: 1,
    name: "Welcome Email",
    subject: "Welcome to Our Service!",
    body: "Dear [Name],\n\nWelcome to our service! We're excited to have you on board...",
  },
  {
    id: 2,
    name: "Monthly Newsletter",
    subject: "Your Monthly Update",
    body: "Hello [Name],\n\nHere's what's new this month...",
  },
  {
    id: 3,
    name: "Product Announcement",
    subject: "Introducing Our Latest Product",
    body: "Hi [Name],\n\nWe're thrilled to announce our newest product...",
  },
];

export default function CreateCampaign({ onCreate }: { onCreate: () => void }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tokens, setTokens] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const [campaignType, setCampaignType] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [targetAudience, setTargetAudience] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [audienceFile, setAudienceFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState("details");
  const [csvData, setCsvData] = useState<{ name: string; email: string }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [trackingIds, setTrackingIds] = useState<string[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<{
    name: string;
    email: string;
    picture: string;
  } | null>(null);
  const [title, setTitle] = useState("Success");
  const [campaignCreated, setIsCampaignCreated] = useState(false);

  const { userId, userEmail } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      const storedTokens = localStorage.getItem("gmail_tokens");
      if (storedTokens) {
        const parsedTokens = JSON.parse(storedTokens);
        setTokens(parsedTokens);
        setIsAuthenticated(true);
        // Fetch user email using the access token
        try {
          const response = await fetch(
            "https://www.googleapis.com/oauth2/v2/userinfo",
            {
              headers: {
                Authorization: `Bearer ${parsedTokens.access_token}`,
              },
            }
          );
          const data = await response.json();
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      } else {
        router.push("/"); // Redirect to login page if not authenticated
      }
    };
    checkAuth();
  }, [router]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const storedTokens = localStorage.getItem("gmail_tokens");
      if (storedTokens) {
        const tokens = JSON.parse(storedTokens);
        try {
          const response = await fetch(
            "https://emailapp-backend.onrender.com/auth/user-info",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ tokens }),
            }
          );
          if (response.ok) {
            const data = await response.json();
            setUserInfo(data);
          } else {
            console.error("Failed to fetch user info");
          }
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      }
    };

    fetchUserInfo();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Create a new campaign
  const handleSaveCampaign = async () => {
    setIsLoading(true);

    if (!isAuthenticated) {
        console.error("User is not authenticated");
        toast.error("User is not authenticated");
        setIsLoading(false);
        return;
    }

    // Check if all required fields are filled
    if (
        !campaignName ||
        !campaignType ||
        !subject ||
        !body ||
        !startDate ||
        !endDate ||
        csvData.length === 0
    ) {
        toast.error("Please fill in all required fields and upload a CSV file.");
        setIsLoading(false);
        return;
    }

    try {
        // Extract audience names and emails from csvData
        const audienceNames = csvData.map((row) => row.name);
        const audienceEmails = csvData.map((row) => row.email);

        // Create audience file
        const audienceResponse = await axios.post("/api/create-audiencefile", {
            audienceName: audienceNames,
            audienceEmail: audienceEmails,
        });

        if (audienceResponse.status !== 201) {
            throw new Error(`Error creating audience file: ${audienceResponse.status}`);
        }

        const audiencefileId = audienceResponse.data.audiencefileId;

        // Create the campaign first
        const campaignResponse = await axios.post("/api/campaign", {
            userId, 
            audiencefileId,
            campaignName,
            campaignType,
            endDate: endDate ? new Date(endDate).toISOString() : null,
            recurringCampaign: isRecurring,
            subject,
            emailBody: body,
            targetAudience,
        });

        if (campaignResponse.status !== 201) {
            throw new Error(`Error creating campaign: ${campaignResponse.status}`);
        }

        // Extract campaignId for the next requests
        const { campaignId } = campaignResponse.data;

        // Create a promise to send emails
        const emailPromise = axios.post(
            "https://backend-superemail.onrender.com/auth/send-email",
            {
                recipients: csvData,
                subject,
                body,
                userEmail,
                tokens,
                campaignId,
                userId,
            }
        );

        // Create a timeout promise to wait for 5 seconds
        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Request timed out")), 5000)
        );

        // Use Promise.race to handle both email sending and timeout
        await Promise.race([emailPromise, timeoutPromise]);

        // Store tracking IDs and device info
        const emailResponse = await emailPromise; // Await the resolved email promise
        const newTrackingIds = emailResponse.data.info.map((item:any) => item.trackingId);
        setTrackingIds(newTrackingIds);

        const trackingResponse = await axios.post("/api/addTrackingAndDeviceInfo", {
            campaignId,
            userId,
            newTrackingIds,
        });

        if (trackingResponse.status !== 201) {
            throw new Error(`Error saving tracking info: ${trackingResponse.status}`);
        }

        toast.success("Campaign created and emails sent successfully!");
        onCreate();

    } catch (error) {
        console.error("Error saving campaign and sending emails:", error);
        toast.error(`Error creating campaign and sending emails: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
        setIsLoading(false); // Always turn off loading state here
    }
};





  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = emailTemplates.find((t) => t.id.toString() === templateId);
    if (template) {
      setSubject(template.subject);
      setBody(template.body);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const rows = text.split("\n").slice(1); // Skip header row
        const parsedData = rows.map((row) => {
          const [name, email] = row.split(",");
          return { name: name.trim(), email: email.trim() };
        });
        setCsvData(parsedData);
        setAudienceFile(file);
      };
      reader.readAsText(file);
    }
  };

  const handleNext = () => {
    if (activeTab === "details") {
      setActiveTab("content");
    } else if (activeTab === "content") {
      setActiveTab("audience");
    }
  };

  const handleBack = () => {
    if (activeTab === "content") {
      setActiveTab("details");
    } else if (activeTab === "audience") {
      setActiveTab("content");
    }
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>; // Or a more sophisticated loading state
  }

  return (
    <div className={`flex flex-col h-screen ${darkMode ? "dark" : ""}`}>
      <header className="bg-white dark:bg-gray-800 shadow-sm lg:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold dark:text-white">Create Campaign</h1>
          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Create Campaign
              </h1>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                  {darkMode ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </Button>
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
                <Avatar>
                  {userInfo && userInfo.picture ? (
                    <AvatarImage
                      src={userInfo.picture}
                      alt={userInfo.name || userInfo.email}
                    />
                  ) : (
                    <AvatarFallback>
                      {userInfo ? getInitialsFromEmail(userInfo.email) : "U"}
                    </AvatarFallback>
                  )}
                </Avatar>
              </div>
            </div>
            {isLoading?(
              <div>
                <div className="flex items-center justify-center h-80">
                <Loader2 className="animate-spin size-30 " />
                </div>
              </div>
            ):(
              <Card className="w-full h-full flex flex-col">
              <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4">
                <CardTitle className="text-lg md:text-2xl font-bold">
                  Campaign Details
                </CardTitle>
                <Button variant="ghost" size="icon" className="mt-2 md:mt-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto">
                <Tabs value={activeTab} className="w-full h-full flex flex-col">
                  <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    <TabsTrigger
                      value="details"
                      onClick={() => setActiveTab("details")}
                    >
                      Details
                    </TabsTrigger>
                    <TabsTrigger
                      value="content"
                      onClick={() => setActiveTab("content")}
                    >
                      Content
                    </TabsTrigger>
                    <TabsTrigger
                      value="audience"
                      onClick={() => setActiveTab("audience")}
                    >
                      Audience
                    </TabsTrigger>
                  </TabsList>

                  {/* Details Tab Content */}
                  <TabsContent value="details" className="flex-1">
                    <form className="space-y-4 md:space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Campaign Name */}
                        <div className="space-y-2">
                          <Label htmlFor="campaignName">Campaign Name</Label>
                          <Input
                            id="campaignName"
                            placeholder="Enter campaign name"
                            value={campaignName}
                            onChange={(e) => setCampaignName(e.target.value)}
                            className="w-full"
                          />
                        </div>
                        {/* Campaign Type */}
                        <div className="space-y-2">
                          <Label htmlFor="campaignType">Campaign Type</Label>
                          <Select
                            value={campaignType}
                            onValueChange={setCampaignType}
                          >
                            <SelectTrigger id="campaignType">
                              <SelectValue placeholder="Select campaign type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="newsletter">
                                Newsletter
                              </SelectItem>
                              <SelectItem value="promotional">
                                Promotional
                              </SelectItem>
                              <SelectItem value="transactional">
                                Transactional
                              </SelectItem>
                              <SelectItem value="automated">
                                Automated
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        {/* Start Date */}
                        <div className="space-y-2">
                          <Label htmlFor="startDate">Start Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={`w-full justify-start text-left font-normal ${
                                  !startDate && "text-muted-foreground"
                                }`}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {startDate ? (
                                  format(startDate, "PPP")
                                ) : (
                                  <span>Pick a start date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={startDate}
                                onSelect={setStartDate}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        {/* End Date */}
                        <div className="space-y-2">
                          <Label htmlFor="endDate">End Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={`w-full justify-start text-left font-normal ${
                                  !endDate && "text-muted-foreground"
                                }`}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {endDate ? (
                                  format(endDate, "PPP")
                                ) : (
                                  <span>Pick an end date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={endDate}
                                onSelect={setEndDate}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        {/* Recurring Campaign */}
                        <div className="space-y-2">
                          <Label htmlFor="recurring">Recurring Campaign</Label>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="recurring"
                              checked={isRecurring}
                              onCheckedChange={setIsRecurring}
                            />
                            <Label htmlFor="recurring">
                              Enable recurring schedule
                            </Label>
                          </div>
                        </div>
                      </div>
                    </form>
                  </TabsContent>

                  {/* Content Tab Content */}
                  <TabsContent value="content" className="flex-1">
                    <form className="space-y-4 md:space-y-6">
                      {/* Email Template */}
                      <div className="space-y-2">
                        <Label htmlFor="emailTemplate">Email Template</Label>
                        <Select
                          value={selectedTemplate}
                          onValueChange={handleTemplateChange}
                        >
                          <SelectTrigger id="emailTemplate">
                            <SelectValue placeholder="Select email template" />
                          </SelectTrigger>
                          <SelectContent>
                            {emailTemplates.map((template) => (
                              <SelectItem
                                key={template.id}
                                value={template.id.toString()}
                              >
                                {template.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {/* Subject */}
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          placeholder="Email subject"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="w-full"
                        />
                      </div>
                      {/* Email Body */}
                      <div className="space-y-2">
                        <Label htmlFor="body">Email Body</Label>
                        <Textarea
                          id="body"
                          placeholder="Email body"
                          value={body}
                          onChange={(e) => setBody(e.target.value)}
                          rows={10}
                          className="min-h-[200px] w-full"
                        />
                      </div>
                    </form>
                  </TabsContent>

                  {/* Audience Tab Content */}
                  <TabsContent value="audience" className="flex-1">
                    <form className="space-y-4 md:space-y-6">
                      {/* Target Audience */}
                      <div className="space-y-2">
                        <Label htmlFor="targetAudience">Target Audience</Label>
                        <Select
                          value={targetAudience}
                          onValueChange={setTargetAudience}
                        >
                          <SelectTrigger id="targetAudience">
                            <SelectValue placeholder="Select target audience" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Subscribers</SelectItem>
                            <SelectItem value="new">New Subscribers</SelectItem>
                            <SelectItem value="active">Active Users</SelectItem>
                            <SelectItem value="inactive">
                              Inactive Users
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {/* Upload Audience File */}
                      <div className="space-y-2">
                        <Label htmlFor="audienceFile">
                          Upload Audience File (CSV)
                        </Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            id="audienceFile"
                            type="file"
                            accept=".csv"
                            onChange={handleFileUpload}
                            className="flex-grow"
                          />
                          <Button
                            variant="outline"
                            onClick={(e) => {
                              e.preventDefault();
                              document.getElementById("audienceFile")?.click();
                            }}
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            Upload
                          </Button>
                        </div>
                        {audienceFile && (
                          <p className="text-sm text-gray-500 mt-1">
                            File selected: {audienceFile.name} ({csvData.length}{" "}
                            recipients)
                          </p>
                        )}
                      </div>
                    </form>
                  </TabsContent>
                </Tabs>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  {activeTab !== "details" && (
                    <Button
                      variant="outline"
                      onClick={() =>
                        setActiveTab(
                          activeTab === "content" ? "details" : "content"
                        )
                      }
                    >
                      Back
                    </Button>
                  )}
                  {activeTab === "audience" ? (
                    <Button
                      onClick={handleSaveCampaign}
                      className="bg-purple-600 hover:bg-purple-700 text-white ml-auto"
                    >
                      Create Campaign
                    </Button>
                  ) : (
                    <Button
                      onClick={() =>
                        setActiveTab(
                          activeTab === "details" ? "content" : "audience"
                        )
                      }
                      className="bg-purple-600 hover:bg-purple-700 text-white ml-auto"
                    >
                      Next
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
            )

            }
            
          </div>
        </main>
      </div>
    </div>
  );
}
