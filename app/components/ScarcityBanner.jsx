"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Clock } from 'lucide-react';
import Link from 'next/link';

export default function ScarcityBanner() {
    const [timeLeft, setTimeLeft] = useState({
        hours: 11,
        minutes: 45,
        seconds: 22
    });
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                } else if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                } else if (prev.hours > 0) {
                    return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
                }
                return prev;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (time) => time.toString().padStart(2, '0');

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-obsidian border-b border-white/5 text-gray-300 w-full z-[60] relative overflow-hidden flex justify-center items-center py-1.5"
                    dir="rtl"
                >
                    {/* Subtle Animated Shine Effect */}
                    <motion.div
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "linear", repeatDelay: 3 }}
                        className="absolute inset-0 w-1/4 bg-gradient-to-r from-transparent via-champagne/10 to-transparent skew-x-12"
                    />

                    <div className="max-w-7xl mx-auto px-4 flex flex-row items-center justify-center gap-2 sm:gap-4 md:gap-6 text-[10px] sm:text-xs md:text-sm font-medium relative z-10 w-full">

                        <div className="flex items-center gap-1.5 shrink-0">
                            <Flame className="w-3.5 h-3.5 md:w-4 md:h-4 text-champagne animate-pulse" />
                            <span className="font-bold font-heading text-white">
                                <span className="hidden sm:inline">عرض لفترة محدودة: </span>خصم 75%
                            </span>
                        </div>

                        <div className="flex items-center gap-1.5 bg-midnight-950 px-2.5 py-0.5 rounded-full border border-white/5 font-data text-champagne shrink-0">
                            <Clock className="w-3.5 h-3.5" />
                            <div className="flex gap-0.5 items-center font-bold tracking-widest text-[11px] sm:text-xs">
                                <span>{formatTime(timeLeft.hours)}</span>
                                <span className="opacity-50 text-[9px] -mt-0.5 px-0.5">:</span>
                                <span>{formatTime(timeLeft.minutes)}</span>
                                <span className="opacity-50 text-[9px] -mt-0.5 px-0.5">:</span>
                                <span className="w-4 text-center">{formatTime(timeLeft.seconds)}</span>
                            </div>
                        </div>

                        <Link href="/checkout" className="shrink-0">
                            <button className="bg-champagne text-obsidian px-3 py-0.5 rounded-full text-[10px] sm:text-xs font-bold hover:bg-white hover:scale-105 transition-all shadow-[0_0_10px_rgba(201,168,76,0.2)] font-heading">
                                اشترك الآن
                            </button>
                        </Link>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
