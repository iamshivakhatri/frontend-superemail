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
      emailTemplate,
      subject,
      emailBody,
      targetAudience,
      recurringCampaign,
      scheduleCampaign,
      endDate,
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

    // Start a transaction to create the campaign and the device tracking
    const newCampaign = await prisma.$transaction(async (prisma) => {
      // Create the new campaign
      const campaign = await prisma.campaign.create({
        data: {
          userId,
          audiencefileId,
          campaignName,
          campaignType,
          emailTemplate, // Optional
          subject,
          emailBody,
          targetAudience,
          recurringCampaign: recurringCampaign || false, // Default to false if not provided
          scheduleCampaign: scheduleCampaign ? new Date(scheduleCampaign) : null,
          endDate: endDate ? new Date(endDate) : null,
        },
      });

      // Create a DeviceTracking entry associated with the campaign
      const deviceTracking = await prisma.deviceTracking.create({
        data: {
          userId,
          campaignId: campaign.id, // Link the campaign with the device tracking entry
          campaignType,
          smartphone: 0, // Initialize tracking fields to 0
          desktopLaptop: 0,
          tablet: 0,
          smartwatch: 0,
        },
      });

      return NextResponse.json({ campaign, deviceTracking }, { status: 201 });
    });

    // Return success response with the new campaign and device tracking details
    return NextResponse.json(newCampaign, { status: 201 });
  } catch (error) {
    console.error('Error creating campaign and device tracking:', error);
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
      include: {
         audiencefile: true ,
         deviceTracking: true ,
        }, // Optionally include related audiencefile data
    });
    console.log("campaigns", campaigns);

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

// PUT update an existing campaign
export async function PUT(request: Request) {
  try {
    const { id, ...data } = await request.json();

    // Validate the campaign ID
    if (!id) {
      return NextResponse.json(
        { error: 'Campaign ID is required.' },
        { status: 400 }
      );
    }

    // Update the campaign in the database
    const updatedCampaign = await prisma.campaign.update({
      where: { id },
      data: {
        ...data,
        // Ensure that optional fields are handled correctly
        scheduleCampaign: data.scheduleCampaign ? new Date(data.scheduleCampaign) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
      },
    });

    // Return success response with the updated campaign
    return NextResponse.json(updatedCampaign, { status: 200 });
  } catch (error) {
    console.error('Error updating campaign:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
