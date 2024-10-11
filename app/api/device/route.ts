// app/api/device-tracking/route.ts
import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb'; // Adjust the path based on your project structure

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Validate the input data
        const { userId, campaignId, smartphone, desktopLaptop, tablet, smartwatch, campaignType } = body;

        if (!userId || !campaignId || !campaignType) {
            return NextResponse.json(
                { error: 'userId, campaignId, and campaignType are required' },
                { status: 400 }
            );
        }

        // Create a new DeviceTracking entry
        const newTrackingEntry = await prismadb.deviceTracking.create({
            data: {
                userId,
                campaignId,
                smartphone: smartphone || 0,
                desktopLaptop: desktopLaptop || 0,
                tablet: tablet || 0,
                smartwatch: smartwatch || 0,
                campaignType,
            },
        });

        return NextResponse.json(newTrackingEntry, { status: 201 });
    } catch (error) {
        console.error('Error creating device tracking entry:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
