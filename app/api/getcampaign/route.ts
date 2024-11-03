import { NextRequest, NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const campaignId = searchParams.get('campaignId');
  const userId = searchParams.get('userId');

  if (!campaignId || !userId) {
    return NextResponse.json({ message: 'Missing campaignId or userId' }, { status: 400 });
  }

  try {
    const campaign = await prismadb.campaign.findUnique({
      where: { id: campaignId },
    });

    if (!campaign || campaign.userId !== userId) {
      return NextResponse.json({ message: 'Campaign or User not found' }, { status: 404 });
    }

    return NextResponse.json({ campaignName: campaign.campaignName }, { status: 200 });
  } catch (error) {
    console.error('Error fetching campaign details:', error);
    return NextResponse.json({ message: 'Error fetching campaign details' }, { status: 500 });
  }
}
