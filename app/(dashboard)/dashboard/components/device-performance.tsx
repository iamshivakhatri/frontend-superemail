import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';

interface Campaign {
    createdAt: string;
    opened: number | null; // Allow null if data is not available
    clicked: number | null;
    delivered: number | null;
    deviceOpens?: Record<string, number>; // Optional field for device opens
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-2 border border-gray-300 rounded shadow">
                <p className="font-semibold">{`${label}`}</p>
                <p>{`Opened: ${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
};

const DevicePerformance = ({ campaigns }: { campaigns: Campaign[] }) => {
    const devicePerformance = useMemo(() => {
        const deviceCounts = campaigns.reduce((acc, campaign) => {
            // Assuming that each campaign could potentially include device opens
            const deviceOpens = campaign.deviceOpens || {};
            Object.entries(deviceOpens).forEach(([device, count]) => {
                acc[device] = (acc[device] || 0) + count;
            });
            return acc;
        }, {} as Record<string, number>);

        return Object.entries(deviceCounts).map(([device, opened]) => ({
            device,
            opened
        }));
    }, [campaigns]);

    return (
        <Card>
            <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4 dark:text-white">Performance By Device Type</h2>
                <div className="h-[300px] lg:h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={devicePerformance} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis dataKey="device" type="category" width={100} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="opened" fill="url(#colorClickThrough)" />
                            <defs>
                                <linearGradient id="colorClickThrough" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0.5} />
                                </linearGradient>
                            </defs>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex justify-center mt-4">
                    <div className="flex items-center mr-4">
                        <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Opened</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default DevicePerformance;
