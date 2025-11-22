import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await dbConnect();
        const count = await User.countDocuments();
        const totalSlots = 5000;
        const slotsLeft = Math.max(0, totalSlots - count);

        return NextResponse.json({ count, slotsLeft });
    } catch (error) {
        console.error('Stats error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: 'Failed to fetch stats', details: errorMessage }, { status: 500 });
    }
}
