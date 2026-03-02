"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import MagneticButton from './MagneticButton';
import { PlayCircle, ShieldCheck, Infinity } from 'lucide-react';

export default function StickySidebar() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show the sticky bar after scrolling past the main hero
            setIsVisible(window.scrollY > 500);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`fixed bottom-0 md:bottom-6 left-0 right-0 md:left-auto md:right-6 lg:right-12 z-40 transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full md:translate-y-10 opacity-0 pointer-events-none'}`}>
            <div className="bg-obsidian/90 backdrop-blur-xl border-t md:border border-white/10 p-4 md:p-6 md:rounded-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] md:shadow-[0_20px_50px_rgba(0,0,0,0.5)] md:w-80 flex flex-col gap-4 w-full text-right" dir="rtl">

                {/* Desktop Video Thumbnail */}
                <div className="hidden md:block w-full aspect-video rounded-xl bg-midnight-950 border border-white/5 relative overflow-hidden group cursor-pointer">
                    <img src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=600&auto=format&fit=crop" alt="course thumbnail" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <PlayCircle className="w-12 h-12 text-white/80 group-hover:text-champagne transition-colors" />
                    </div>
                </div>

                <div className="flex md:flex-col justify-between items-center md:items-start gap-2">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl md:text-3xl font-bold font-heading w-full text-white">$49.99</span>
                        <span className="text-gray-500 line-through text-sm md:text-base">$199.99</span>
                    </div>
                    <span className="text-red-400 text-xs font-bold bg-red-400/10 px-2 py-1 rounded hidden md:inline-block">خصم 75% ينتهي قريباً</span>
                </div>

                <Link href="/checkout" className="w-full block">
                    <MagneticButton className="w-full py-3.5 bg-champagne text-obsidian shadow-[0_0_20px_rgba(201,168,76,0.2)] text-base font-bold">
                        أضف إلى السلة
                    </MagneticButton>
                </Link>

                <div className="hidden md:flex flex-col gap-3 text-sm text-gray-400 mt-2">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-gray-500" />
                        <span>ضمان استرجاع 30 يوم</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Infinity className="w-4 h-4 text-gray-500" />
                        <span>وصول كامل مدى الحياة</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
