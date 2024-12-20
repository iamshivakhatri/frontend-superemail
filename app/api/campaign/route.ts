import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb'; // Adjust this path to where your Prisma instance is configured.
import toast from 'react-hot-toast';





export async function POST(request: Request) {
  try {
    const {
      userId,
      audiencefileId,
      campaignName,
      campaignType,
      subject,
      emailBody,
      sendDate,
    } = await request.json();

    // Validate required fields
    if (
      !userId ||
      !audiencefileId ||
      !campaignName ||
      !campaignType ||
      !subject ||
      !emailBody 
    ) {
      return NextResponse.json(
        { error: 'Missing required fields.' },
        { status: 400 }
      );
    }

    // Optional: Validate `sendDate` as a valid date if it's provided
    const validSendDate = sendDate ? new Date(sendDate) : null;
    if (validSendDate && isNaN(validSendDate.getTime())) {
      toast.error('Invalid sendDate format.');
      return NextResponse.json(
        { error: 'Invalid sendDate format.' },
        { status: 400 }
      );
    }

    // Create campaign in the database
    const campaign = await prisma.campaign.create({
      data: {
        userId,
        audiencefileId,
        campaignName,
        campaignType,
        subject,
        emailBody,
        sendDate: validSendDate,
      },
    });

    return NextResponse.json({ campaignId: campaign.id, userId }, { status: 201 });
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
