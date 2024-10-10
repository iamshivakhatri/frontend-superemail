import React from 'react';
import { Card, CardContent } from "@/components/ui/card"
 // Adjust this import to match your UI library
import { Mail, Clock } from 'lucide-react'; // Adjust this import for the icon library you're using



interface AudienceFile {
  id: string;
  audienceName: string[];
  audienceEmail: string[];
}

interface Campaign {
  id: string;
  campaignName: string;
  campaignType: string;
  createdAt: string;
  emailBody: string;
  endDate: string;
  recurringCampaign: boolean;
  userId: string;
  audiencefileId: string;
  audiencefile: AudienceFile; // Added to match the structure
}

const CampaignCard: React.FC<{ campaign: Campaign; onClick: () => void }> = ({ campaign, onClick }) => {
  return (
    <Card className="mb-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer" onClick={onClick}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-2xl">
              📧
            </div>
            <div>
              <h3 className="text-lg font-semibold">{campaign.campaignName}</h3> {/* Updated property name */}
              <p className="text-sm text-gray-500 dark:text-gray-400">{campaign.campaignType}</p> {/* Updated property name */}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 text-gray-400" />
            {/* You can include recipient info if you want */}
            <Clock className="h-4 w-4 text-gray-400 ml-2" />
            <span className="text-sm text-gray-500">
              {Math.ceil((new Date(campaign.endDate).getTime() - new Date(campaign.createdAt).getTime()) / (1000 * 60 * 60 * 24))} days
            </span>
            <span className={`ml-2 px-2 py-1 text-xs font-semibold ${
              campaign.recurringCampaign ? 'text-green-800 bg-green-100' : 
              'text-yellow-800 bg-yellow-100'
            }`}>
              {campaign.recurringCampaign ? 'Recurring' : 'One-time'}
            </span>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-500">
          {new Date(campaign.createdAt).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default CampaignCard;
