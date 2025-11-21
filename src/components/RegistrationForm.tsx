'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Twitter, Hash, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import clsx from 'clsx';

export default function RegistrationForm() {
    const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Details, 4: Success
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        email: '',
        otp: '',
        twitterHandle: '',
        cantonId: ''
    });

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/otp/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to send OTP');
            setStep(2);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/otp/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email, otp: formData.otp }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Invalid OTP');
            setStep(3);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    twitterHandle: formData.twitterHandle,
                    cantonId: formData.cantonId
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Registration failed');
            setStep(4);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto bg-card border border-border rounded-2xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.form
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        onSubmit={handleSendOtp}
                        className="space-y-6"
                    >
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold text-textPrimary">Verify Email</h2>
                            <p className="text-textSecondary text-sm">Enter your Gmail to receive an OTP</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-textSecondary">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-textSecondary" />
                                <input
                                    type="email"
                                    required
                                    placeholder="user@gmail.com"
                                    className="w-full bg-background border border-border rounded-lg py-3 pl-10 pr-4 text-textPrimary focus:outline-none focus:border-primary transition-colors"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 text-error text-sm bg-error/10 p-3 rounded-lg">
                                <AlertCircle className="w-4 h-4" />
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-primary to-secondary text-background font-bold py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send OTP'}
                        </button>
                    </motion.form>
                )}

                {step === 2 && (
                    <motion.form
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        onSubmit={handleVerifyOtp}
                        className="space-y-6"
                    >
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold text-textPrimary">Enter OTP</h2>
                            <p className="text-textSecondary text-sm">Check your email for the code</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-textSecondary">One-Time Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-textSecondary" />
                                <input
                                    type="text"
                                    required
                                    placeholder="123456"
                                    className="w-full bg-background border border-border rounded-lg py-3 pl-10 pr-4 text-textPrimary focus:outline-none focus:border-primary transition-colors tracking-widest"
                                    value={formData.otp}
                                    onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 text-error text-sm bg-error/10 p-3 rounded-lg">
                                <AlertCircle className="w-4 h-4" />
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-primary to-secondary text-background font-bold py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Verify OTP'}
                        </button>

                        <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="w-full text-textSecondary text-sm hover:text-primary transition-colors"
                        >
                            Back to Email
                        </button>
                    </motion.form>
                )}

                {step === 3 && (
                    <motion.form
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        onSubmit={handleRegister}
                        className="space-y-6"
                    >
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold text-textPrimary">Complete Profile</h2>
                            <p className="text-textSecondary text-sm">Final step to secure your spot</p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-textSecondary">Twitter Handle</label>
                                <div className="relative">
                                    <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-textSecondary" />
                                    <input
                                        type="text"
                                        required
                                        placeholder="@username"
                                        className="w-full bg-background border border-border rounded-lg py-3 pl-10 pr-4 text-textPrimary focus:outline-none focus:border-primary transition-colors"
                                        value={formData.twitterHandle}
                                        onChange={(e) => setFormData({ ...formData, twitterHandle: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-textSecondary">Canton Network Party ID</label>
                                <div className="relative">
                                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-textSecondary" />
                                    <input
                                        type="text"
                                        required
                                        placeholder="Party ID..."
                                        className="w-full bg-background border border-border rounded-lg py-3 pl-10 pr-4 text-textPrimary focus:outline-none focus:border-primary transition-colors"
                                        value={formData.cantonId}
                                        onChange={(e) => setFormData({ ...formData, cantonId: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 text-error text-sm bg-error/10 p-3 rounded-lg">
                                <AlertCircle className="w-4 h-4" />
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-primary to-secondary text-background font-bold py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Complete Registration'}
                        </button>
                    </motion.form>
                )}

                {step === 4 && (
                    <motion.div
                        key="step4"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-8 space-y-6"
                    >
                        <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle className="w-10 h-10 text-success" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-textPrimary">Registration Successful!</h2>
                            <p className="text-textSecondary mt-2">You have secured your spot in swapWallet.</p>
                        </div>
                        <div className="p-4 bg-background rounded-lg border border-border text-left space-y-2">
                            <p className="text-sm text-textSecondary">Email: <span className="text-textPrimary">{formData.email}</span></p>
                            <p className="text-sm text-textSecondary">Twitter: <span className="text-textPrimary">{formData.twitterHandle}</span></p>
                            <p className="text-sm text-textSecondary">Party ID: <span className="text-textPrimary">{formData.cantonId}</span></p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
