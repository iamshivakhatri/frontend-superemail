import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb'; // Adjust the path as needed to your Prisma client instance

export async function GET(request: Request, { params }: { params: { campaignId: string } }) {
  const { campaignId } = params;
  console.log('id', campaignId);

  try {
    // Fetch the campaign from the database using Prisma
    const campaign = await prismadb.campaign.findUnique({
      where: { 
        id: campaignId,
        
    }, 
    include: {
        audiencefile: true,
    }, 
    
    });

    if (!campaign) {
      return NextResponse.json({ message: 'Campaign not found' }, { status: 404 });
    }

    return NextResponse.json(campaign, { status: 200 });
  } catch (error) {
    console.error('Error fetching campaign:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
