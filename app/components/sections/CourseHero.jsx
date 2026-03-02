"use client";

import { useState } from 'react';
import { Play, Star, CheckCircle2, ShieldCheck, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function CourseHero({ data, branding }) {
    const [isTrailerOpen, setIsTrailerOpen] = useState(false);

    const DaVinciIcon = () => (
        <svg viewBox="0 0 1024 1024" className="w-full h-full drop-shadow-[0_10px_25px_rgba(201,168,76,0.3)]">
            <defs>
                <linearGradient id="davinci_bg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1A1A1A" />
                    <stop offset="100%" stopColor="#000000" />
                </linearGradient>
            </defs>
            <rect x="96" y="96" width="832" height="832" rx="168" fill="url(#davinci_bg)" stroke="#333" strokeWidth="12" />
            <path d="M512 250 L800 512 L512 770 L224 512 Z" fill="none" stroke="#E2E2E2" strokeWidth="30" strokeLinejoin="round" />
            <path d="M512 280 L760 512 L512 512 Z" fill="#E23E3E" opacity="0.9" />
            <path d="M512 740 L760 512 L512 512 Z" fill="#3E83E2" opacity="0.9" />
            <path d="M512 280 L264 512 L512 512 Z" fill="#E2B83E" opacity="0.9" />
            <path d="M512 740 L264 512 L512 512 Z" fill="#3EE285" opacity="0.9" />
            <circle cx="512" cy="512" r="100" fill="#1A1A1A" stroke="#FFF" strokeWidth="15" />
        </svg>
    );

    const badges = [
        { src: "https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg", delay: 0, x: -120, y: -80, isSvg: false },
        { src: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg", delay: 0.2, x: 140, y: -100, isSvg: false },
        { element: <DaVinciIcon />, delay: 0.4, x: 100, y: 150, isSvg: true }
    ];

    return (
        <section className="relative min-h-[90vh] pb-20 pt-32 md:pt-40 flex items-center overflow-hidden bg-black text-white">
            {/* Cinematic Video Background with Brighter Overlays */}
            <div className="absolute inset-0 w-full h-full z-0">
                {branding?.heroBackgroundUrl && (branding.heroBackgroundUrl.includes('.jpg') || branding.heroBackgroundUrl.includes('.png')) ? (
                    <img
                        src={branding.heroBackgroundUrl}
                        className="w-full h-full object-cover opacity-60 mix-blend-screen scale-105"
                        alt="Course Background"
                    />
                ) : (
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-60 mix-blend-screen scale-105"
                    >
                        <source src={branding?.heroBackgroundUrl || "https://player.vimeo.com/external/494254249.sd.mp4?s=d7e3cb23ef57c0dbf12255734ccf3e2b109e7c53&profile_id=165&oauth2_token_id=57447761"} type="video/mp4" />
                    </video>
                )}
                {/* Warmer, less depressing Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-900 via-midnight-900/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-obsidian/80 via-transparent to-transparent" />
                {/* Energetic Glow */}
                <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-champagne/20 rounded-full blur-[150px] pointer-events-none" />
                <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col lg:flex-row gap-12 lg:gap-8 items-center justify-between" dir="rtl">

                {/* Left/Main Content - Hype Builder */}
                <div className="flex-1 w-full relative">
                    {/* Floating 3D Badges */}
                    <div className="absolute inset-0 pointer-events-none hidden lg:block">
                        {badges.map((badge, index) => {
                            const motionProps = {
                                className: "absolute w-20 h-20 md:w-24 md:h-24 object-contain",
                                initial: { opacity: 0, scale: 0 },
                                animate: {
                                    opacity: 1,
                                    scale: 1,
                                    y: [badge.y, badge.y - 15, badge.y],
                                    x: [badge.x, badge.x + 10, badge.x],
                                    rotateZ: [0, 5, -5, 0]
                                },
                                transition: {
                                    delay: badge.delay,
                                    duration: 6,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: "easeInOut"
                                },
                                style: {
                                    top: "50%",
                                    left: "30%",
                                    marginTop: badge.y,
                                    marginLeft: badge.x
                                }
                            };

                            if (badge.isSvg) {
                                return (
                                    <motion.div key={index} {...motionProps}>
                                        {badge.element}
                                    </motion.div>
                                );
                            }

                            return (
                                <motion.img
                                    key={index}
                                    src={badge.src}
                                    {...motionProps}
                                    className={`${motionProps.className} filter drop-shadow-[0_10px_25px_rgba(201,168,76,0.2)]`}
                                />
                            );
                        })}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-sm font-bold mb-6 backdrop-blur-md">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                            أكثر من 10,000 مستفيد
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black font-heading leading-[1.1] mb-6 drop-shadow-2xl">
                            {data?.heading ? (
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-champagne via-yellow-200 to-amber-500">{data.heading}</span>
                            ) : (
                                <>
                                    لا تكن <span className="text-gray-500 line-through decoration-red-500/50">مجرد هاوٍ</span> <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-champagne via-yellow-200 to-amber-500">اصنع أفلاماً تسحر العقول.</span>
                                </>
                            )}
                        </h1>

                        <p className="text-lg md:text-xl text-gray-300 font-drama max-w-2xl mb-8 leading-relaxed drop-shadow-lg">
                            {data?.subheading || "احصل على الكتالوج السري الذي يستخدمه كبار صُنّاع المحتوى لتلوين ومونتاج فيديوهات تحصد ملايين المشاهدات."}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            {/* Watch Trailer Button */}
                            <button
                                onClick={() => setIsTrailerOpen(true)}
                                className="group w-full sm:w-auto flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/20 backdrop-blur-md px-8 py-4 rounded-xl text-white font-bold transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]"
                            >
                                <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Play className="w-5 h-5 ml-1" fill="currentColor" />
                                </div>
                                {data?.buttonText || "شاهد مقطورة الدورة"}
                            </button>
                        </div>

                        <div className="flex items-center gap-4 mt-8">
                            <div className="flex -space-x-3 -space-x-reverse">
                                <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop" className="w-10 h-10 rounded-full border-2 border-midnight-900 object-cover" />
                                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" className="w-10 h-10 rounded-full border-2 border-midnight-900 object-cover" />
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" className="w-10 h-10 rounded-full border-2 border-midnight-900 object-cover" />
                                <div className="w-10 h-10 rounded-full border-2 border-midnight-900 bg-obsidian flex items-center justify-center text-xs font-bold text-champagne">+10K</div>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex text-champagne">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
                                </div>
                                <span className="text-xs text-gray-400">تقييم 4.9/5 من الخريجين</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right/Checkout Box - Aggressive Sales Focus */}
                <motion.div
                    className="w-full lg:w-[420px] flex-shrink-0"
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
                >
                    <div className="bg-obsidian/60 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 shadow-[0_20px_70px_rgba(0,0,0,0.7)] relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-champagne/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        <div className="border border-red-500/30 bg-red-500/10 text-red-400 text-center py-2 rounded-lg font-bold text-sm mb-6 animate-pulse">
                            🔥 العرض الخاص يختفي قريباً!
                        </div>

                        <div className="mb-6">
                            <h3 className="text-xl text-white font-bold font-heading mb-2">الدورة الشاملة للمونتاج</h3>
                            <div className="flex items-end gap-3">
                                <span className="text-5xl font-black font-data text-white">$49</span>
                                <span className="text-xl text-gray-500 line-through mb-1">$199</span>
                            </div>
                            <p className="text-green-400 text-sm font-bold mt-1">توفير بقيمة $150 (75%)</p>
                        </div>

                        <ul className="space-y-3 mb-8">
                            {[
                                "أكثر من 50 درس تطبيقي عالي الجودة",
                                "ملفات العمل والمشاريع للتطبيق العملي",
                                "حزمة Luts سينمائية مجانية (بقيمة $199)",
                                "وصول مدى الحياة للمحتوى والتحديثات"
                            ].map((feature, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-gray-300 font-medium">
                                    <CheckCircle2 className="w-5 h-5 text-champagne shrink-0" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <Link href="/courses" className="block w-full">
                            <motion.button
                                className="w-full py-4 bg-champagne text-obsidian rounded-xl font-bold text-lg hover:bg-yellow-400 transition-colors shadow-[0_0_40px_rgba(201,168,76,0.4)] relative flex justify-center items-center gap-2 overflow-hidden"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="relative z-10">استثمر في مهاراتك الآن</span>
                                {/* Animated shine */}
                                <motion.div
                                    className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                                    animate={{ left: ["-100%", "200%"] }}
                                    transition={{ duration: 1.5, ease: "linear", repeat: Infinity, repeatDelay: 1 }}
                                />
                            </motion.button>
                        </Link>

                        <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500 font-medium">
                            <ShieldCheck className="w-4 h-4 text-gray-400" />
                            ضمان استرداد ذهبي لمدة 30 يوماً
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Trailer Modal Overlay */}
            <AnimatePresence>
                {isTrailerOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
                        onClick={() => setIsTrailerOpen(false)}
                    >
                        <motion.button
                            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
                            onClick={() => setIsTrailerOpen(false)}
                        >
                            <X className="w-8 h-8" />
                        </motion.button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 20 }}
                            className="w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/20 shadow-2xl relative"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Placeholder for actual YouTube/Vimeo embed */}
                            <iframe
                                className="w-full h-full"
                                src={data?.trailerUrl || "https://player.vimeo.com/video/494254249?autoplay=1&loop=1&title=0&byline=0&portrait=0"}
                                frameBorder="0"
                                allow="autoplay; fullscreen; picture-in-picture"
                                allowFullScreen
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
