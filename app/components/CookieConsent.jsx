"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck } from 'lucide-react';

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if the user has already accepted or declined cookies
        const consent = localStorage.getItem('editora_cookie_consent');
        if (!consent) {
            // Add a small delay so it doesn't pop up instantly, making it feel more deliberate
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('editora_cookie_consent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('editora_cookie_consent', 'declined');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-50 focus:outline-none"
                    dir="rtl"
                >
                    <div className="bg-obsidian/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] preserve-3d">

                        {/* Dramatic Lighting effect */}
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-champagne/5 to-transparent rounded-3xl pointer-events-none" />

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-midnight-950 border border-white/5 flex items-center justify-center shrink-0">
                                        <ShieldCheck className="w-5 h-5 text-champagne" />
                                    </div>
                                    <h3 className="text-lg font-bold font-heading text-white tracking-tight">خصوصيتك تهمنا</h3>
                                </div>
                                <button
                                    onClick={handleDecline}
                                    className="p-1.5 rounded-full text-gray-500 hover:text-white hover:bg-white/10 transition-colors"
                                    aria-label="إغلاق"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <p className="text-sm text-gray-400 font-drama leading-relaxed mb-6">
                                نستخدم ملفات تعريف الارتباط (Cookies) والتقنيات المشابهة لتقديم تجربة تصفح مخصصة، وتحليل حركة المرور، وتحسين جودة منصتنا.
                                باختيارك "قبول"، فإنك توافق على سياسة الخصوصية الخاصة بنا.
                            </p>

                            <div className="flex gap-3">
                                <button
                                    onClick={handleAccept}
                                    className="flex-1 bg-champagne text-midnight-950 py-2.5 rounded-xl font-bold hover:bg-white transition-all shadow-[0_0_15px_rgba(201,168,76,0.15)] hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] hover:-translate-y-0.5 active:translate-y-0 text-sm"
                                >
                                    قبول وتفعيل
                                </button>
                                <button
                                    onClick={handleDecline}
                                    className="flex-1 bg-transparent border border-white/10 text-white py-2.5 rounded-xl font-medium hover:bg-white/5 transition-colors text-sm"
                                >
                                    التخصيص
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
