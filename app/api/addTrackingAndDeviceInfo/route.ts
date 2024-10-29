import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb'; 

// Route to add tracking and device info
export async function POST(request: Request) {
    try {
        const { campaignId, userId, newTrackingIds } = await request.json();

        if (!campaignId || !userId || !newTrackingIds) {
            return NextResponse.json(
                { error: 'Missing required fields.' },
                { status: 400 }
            );
        }

        const newTracking = await prisma.$transaction(async (prisma) => {
            // Create DeviceTracking entry
            const deviceTracking = await prisma.deviceTracking.create({
                data: {
                    userId,
                    campaignId,
                    campaignType: 'email', // Specify campaignType if needed
                    smartphone: 0,
                    desktopLaptop: 0,
                    tablet: 0,
                    smartwatch: 0,
                },
            });

            // Create CampaignTracking entry with tracking IDs
            const campaignTracking = await prisma.campaignTracking.create({
                data: {
                    campaignId,
                    userId,
                    trackingIds: newTrackingIds,
                },
            });

            return { deviceTracking, campaignTracking };
        });

        return NextResponse.json(newTracking, { status: 201 });
    } catch (error) {
        console.error('Error adding tracking and device info:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
