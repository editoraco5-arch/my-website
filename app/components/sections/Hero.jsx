import React from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowLeft } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden" dir="rtl">
            {/* Background Cinematic Effects */}
            <div className="absolute inset-0 z-0 bg-midnight-900">
                <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] mix-blend-screen opacity-50 animate-subtle-pulse"></div>
                <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[150px] mix-blend-screen opacity-40"></div>

                {/* Subtle grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border border-midnight-700/50 mb-8"
                >
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                    <span className="text-sm text-text-muted font-medium">محتوى حصري لعام 2026 متاح الآن</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-5xl md:text-7xl min-[1100px]:text-8xl font-black mb-6 tracking-tight leading-[1.1]"
                >
                    احترف أدوات <br className="hidden md:block" />
                    <span className="cinematic-text font-black">الصناعة العالمية</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
                >
                    منصة تعليمية متكاملة لتمكين صناع المحتوى من احتراف التصوير والمونتاج والخدع البصرية باستخدام أقوى البرامج العالمية.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto"
                >
                    <button className="w-full sm:w-auto px-8 py-4 bg-white text-midnight-900 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] flex items-center justify-center gap-2 group">
                        ابـدأ التعلـم فــوراً
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    </button>

                    <button className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-lg text-white border border-midnight-700 hover:bg-midnight-800 transition-all glow-hover flex items-center justify-center gap-2 group">
                        <div className="w-8 h-8 rounded-full bg-midnight-800 border border-midnight-600 flex items-center justify-center group-hover:border-accent/50 group-hover:bg-accent/10 transition-colors">
                            <Play className="w-4 h-4 text-white ml-0.5" fill="currentColor" />
                        </div>
                        مشاهدة مقاطع مجانية
                    </button>
                </motion.div>

                {/* Software Icons / Trust badges */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="mt-20 pt-10 border-t border-midnight-800/50 w-full max-w-3xl"
                >
                    <p className="text-sm text-text-muted mb-6 uppercase tracking-widest font-semibold">البرامج المدعومة</p>
                    <div className="flex justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-[#00002A] border border-[#2A2A5A] flex items-center justify-center shadow-[0_0_10px_rgba(0,0,42,0.5)]">
                                <span className="text-[#9999FF] font-bold text-xs" style={{ fontFamily: 'sans-serif' }}>Pr</span>
                            </div>
                            <span className="text-sm font-semibold hidden md:block">Premiere</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-[#00002A] border border-[#2A2A5A] flex items-center justify-center shadow-[0_0_10px_rgba(0,0,42,0.5)]">
                                <span className="text-[#9999FF] font-bold text-xs" style={{ fontFamily: 'sans-serif' }}>Ae</span>
                            </div>
                            <span className="text-sm font-semibold hidden md:block">After Effects</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-[#222] border border-[#444] flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.5)] overflow-hidden">
                                <div className="w-6 h-6 rounded-full border-2 border-[conic-gradient(from_0deg,#ff4b4b,#ffb94b,#4bff4b,#4b4bff,#ff4b4b)] animate-[spin_4s_linear_infinite]" style={{ background: 'conic-gradient(from 0deg, #ff4b4b, #ffb94b, #4bff4b, #4b4bff, #ff4b4b)' }}></div>
                            </div>
                            <span className="text-sm font-semibold hidden md:block">DaVinci Resolve</span>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default Hero;
