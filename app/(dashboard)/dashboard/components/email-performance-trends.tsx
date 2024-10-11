import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Campaign {
  createdAt: string;
  opened: number;
  clicked: number;
  delivered: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-lg">
        {payload.map((pld, index) => (
          <p key={index} className="text-gray-700 dark:text-gray-300">
            {`${pld.name}: ${pld.value.toFixed(2)}%`}
          </p>
        ))}
        <p className="text-gray-700 dark:text-gray-300">{`Date: ${label}`}</p>
      </div>
    );
  }
  return null;
};

const EmailPerformanceTrends: React.FC<{ campaigns: Campaign[] }> = ({ campaigns }) => {
  const chartData = campaigns
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    .map(campaign => ({
      date: new Date(campaign.createdAt).toLocaleDateString(),
      openRate: (campaign.opened)/(campaign.delivered) * 100,
      clickRate: (campaign.clicked)/(campaign.delivered) * 100
    }));

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-4 dark:text-white">Email Performance Trends</h2>
        <div className="h-[300px] lg:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorOpenRate" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorClickRate" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" stroke="#888888" />
              <YAxis stroke="#888888" />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="openRate" stroke="#8884d8" fillOpacity={1} fill="url(#colorOpenRate)" />
              <Area type="monotone" dataKey="clickRate" stroke="#82ca9d" fillOpacity={1} fill="url(#colorClickRate)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center mt-4">
          <div className="flex items-center mr-4">
            <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Open rate</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Click rate</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailPerformanceTrends;