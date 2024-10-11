import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  subtext: string;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, subtext, icon }) => (
  <Card className="flex-1 overflow-hidden">
    <CardContent className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 flex items-center">
            {title}
            {icon}
          </h3>
          <div className="text-2xl font-bold dark:text-white">{value}</div>
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${change?.startsWith('+') ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'}`}>
          {change}
        </span>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtext}</p>
    </CardContent>
  </Card>
);

const StatCards: React.FC<{ campaigns: any[] }> = ({ campaigns }) => {
 console.log("campaigns at the card level", campaigns);
  // Calculate statistics from campaigns
  const totalSent = campaigns.reduce((sum, campaign) => sum + campaign.sent, 0);
  const totalOpened = campaigns.reduce((sum, campaign) => sum + campaign.opened, 0);
  const totalClicked = campaigns.reduce((sum, campaign) => sum + campaign.clicked, 0);
  const totalDelivered = campaigns.reduce((sum, campaign) => sum + campaign.delivered, 0);

  const openRate = totalSent > 0 ? (totalOpened / totalSent * 100).toFixed(2) : '0';
  const clickRate = totalSent > 0 ? (totalClicked / totalSent * 100).toFixed(2) : '0';
  const deliveredRate = totalSent > 0 ? (totalDelivered / totalSent * 100).toFixed(2) : '0';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard 
        title="Sent" 
        value={totalSent.toString()}
        // change="+0.5%" 
        subtext={`${campaigns.length} Campaigns`}
        icon={<ArrowUpRight className="h-4 w-4 ml-1" />} 
      />
      <StatCard 
        title="Open Rate" 
        value={`${openRate}%`}
        // change="-1.7%" 
        subtext={`${totalOpened} Opened`}
        icon={<ArrowUpRight className="h-4 w-4 ml-1" />} 
      />
      <StatCard 
        title="Click Rate" 
        value={`${clickRate}%`}
        // change="-2.3%" 
        subtext={`${totalClicked} Clicked`}
        icon={<ArrowUpRight className="h-4 w-4 ml-1" />} 
      />
      <StatCard 
        title="Delivered Rate" 
        value={`${deliveredRate}%`}
        // change="+1.0%" 
        subtext={`${totalDelivered} delivered`}
        icon={<ArrowUpRight className="h-4 w-4 ml-1" />} 
      />
    </div>
  );
};

export default StatCards;