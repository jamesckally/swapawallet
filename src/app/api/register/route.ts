import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { headers } from 'next/headers';

export async function POST(req: Request) {
    try {
        const { email, twitterHandle, cantonId } = await req.json();

        if (!email || !twitterHandle || !cantonId) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        await dbConnect();

        // Check global limit
        const count = await User.countDocuments();
        if (count >= 5000) {
            return NextResponse.json({ error: 'Registration closed. Limit reached.' }, { status: 400 });
        }

        // Check duplicates
        const existingUser = await User.findOne({
            $or: [{ email }, { twitterHandle }, { cantonId }],
        });

        if (existingUser) {
            return NextResponse.json({ error: 'User with these credentials already exists' }, { status: 400 });
        }

        // Check IP limit
        const headersList = await headers();
        const ip = headersList.get('x-forwarded-for') || 'unknown';

        // In local dev, IP might be ::1 or 127.0.0.1. 
        // We will treat 'unknown' as a separate bucket or just log it.

        const ipCount = await User.countDocuments({ ipAddress: ip });
        if (ipCount >= 2) {
            return NextResponse.json({ error: 'Registration limit reached for this IP address' }, { status: 400 });
        }

        // Create User
        await User.create({
            email,
            twitterHandle,
            cantonId,
            ipAddress: ip,
        });

        return NextResponse.json({ message: 'Registration successful' });
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
    }
}
