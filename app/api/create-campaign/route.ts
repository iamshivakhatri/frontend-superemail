import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb'; // Adjust this path to where your Prisma instance is configured.

export async function POST(request: Request) {
  try {
    // Parse the request body
    const {
      userId,
      audiencefileId,
      campaignName,
      campaignType,
      endDate,
      scheduleCampaign,
      recurringCampaign,
      emailTemplate,
      subject,
      emailBody,
      targetAudience,
    } = await request.json();

    // Validate the required fields
    if (
      !userId ||
      !audiencefileId ||
      !campaignName ||
      !campaignType ||
      !subject ||
      !emailBody ||
      !targetAudience
    ) {
      return NextResponse.json(
        { error: 'Missing required fields.' },
        { status: 400 }
      );
    }

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    // Check if the audience file exists
    const audiencefile = await prisma.audiencefile.findUnique({
      where: { id: audiencefileId },
    });

    if (!audiencefile) {
      return NextResponse.json({ error: 'Audience file not found.' }, { status: 404 });
    }

    // Create the new campaign and associate it with the user and audience file
    const newCampaign = await prisma.campaign.create({
      data: {
        userId,
        audiencefileId,
        campaignName,
        campaignType,
        endDate: endDate ? new Date(endDate) : null,
        scheduleCampaign: scheduleCampaign ? new Date(scheduleCampaign) : null,
        recurringCampaign,
        emailTemplate,
        subject,
        emailBody,
        targetAudience,
      },
    });

    // Return success response with the new campaign
    return NextResponse.json(newCampaign, { status: 201 });
  } catch (error) {
    console.error('Error creating campaign:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  console.log('GET request received:', request.url);
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId'); // Get userId from query parameters
  console.log('userId:', userId);

  if (!userId) {
    return NextResponse.json(
      { error: 'Missing userId parameter.' },
      { status: 400 }
    );
  }

  try {
    // Retrieve campaigns for the specified userId
    const campaigns = await prisma.campaign.findMany({
      where: { userId },
      include: { audiencefile: true }, // Optionally include related audiencefile data
    });

    // Return the list of campaigns
    return NextResponse.json(campaigns, { status: 200 });
  } catch (error) {
    console.error('Error retrieving campaigns:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
