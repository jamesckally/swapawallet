'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Disc } from 'lucide-react';

export default function StatsCounter() {
    const [stats, setStats] = useState({ count: 0, slotsLeft: 6000 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('/api/stats');
                const data = await res.json();
                if (data.count !== undefined) {
                    setStats(data);
                }
            } catch (error) {
                console.error('Failed to fetch stats', error);
            }
        };

        fetchStats();
        const interval = setInterval(fetchStats, 30000); // Refresh every 30s
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl mx-auto mb-8 grid grid-cols-2 gap-4"
        >
            <div className="bg-card border border-border p-4 rounded-xl flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <p className="text-textSecondary text-sm">Registered Users</p>
                        <p className="text-2xl font-bold text-textPrimary">{stats.count}</p>
                    </div>
                </div>
            </div>

            <div className="bg-card border border-border p-4 rounded-xl flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-secondary/10 rounded-lg">
                        <Disc className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                        <p className="text-textSecondary text-sm">Slots Left</p>
                        <p className="text-2xl font-bold text-textPrimary">{stats.slotsLeft}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
