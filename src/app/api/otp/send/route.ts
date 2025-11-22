import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Otp from '@/models/Otp';
import User from '@/models/User';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        await dbConnect();

        // Check if email already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Save OTP
        await Otp.create({ email, otp });

        // Send Email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"${process.env.EMAIL_SENDER_NAME || 'SwapWallet'}" <${process.env.EMAIL_SENDER_ADDRESS || process.env.EMAIL_USER}>`,
            to: email,
            subject: `${process.env.EMAIL_SENDER_NAME || 'SwapWallet'} Verification Code`,
            text: `Your verification code is: ${otp}. It expires in 5 minutes.`,
        };

        console.log('Mail Options:', JSON.stringify(mailOptions, null, 2));

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'OTP sent successfully' });
    } catch (error: any) {
        console.error('Send OTP error detailed:', error);
        if (error.response) {
            console.error('SMTP Response:', error.response);
        }
        return NextResponse.json({ error: 'Failed to send OTP', details: error.message }, { status: 500 });
    }
}
