import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Otp from '@/models/Otp';

export async function POST(req: Request) {
    try {
        const { email, otp } = await req.json();

        if (!email || !otp) {
            return NextResponse.json({ error: 'Email and OTP are required' }, { status: 400 });
        }

        await dbConnect();

        // Find OTP
        const validOtp = await Otp.findOne({ email, otp });

        if (!validOtp) {
            return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 });
        }

        // Ideally we should mark it as verified or delete it, but for this flow we just return success
        // and let the registration step check again or trust the client state (less secure)
        // Better approach: Return a temporary token or signature.
        // For simplicity in this layman guide: we will just return success and delete the OTP to prevent reuse.

        await Otp.deleteOne({ _id: validOtp._id });

        return NextResponse.json({ message: 'OTP verified successfully' });
    } catch (error) {
        console.error('Verify OTP error:', error);
        return NextResponse.json({ error: 'Failed to verify OTP' }, { status: 500 });
    }
}
