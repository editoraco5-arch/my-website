"use client";

import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function WhatYouLearn() {
    const outcomes = [
        "إتقان أساسيات التصوير الفوتوغرافي والفيديو (مثلث التعريض، ضبط الإضاءة).",
        "اختيار المعدات والكاميرات المناسبة لمختلف ميزانيات صُنّاع المحتوى.",
        "التأسيس الصحيح للمونتاج وقص الفيديوهات باحترافية وسرعة.",
        "التلوين النقي (Color Correction) والتلوين السينمائي (Color Grading).",
        "معالجة عيوب الصوت وإضافة المؤثرات الصوتية التي تصنع الفارق.",
        "التعامل مع المشاريع الضخمة وتنظيم سير العمل (Workflow).",
        "تصدير الفيديوهات بأعلى جودة لمختلف المنصات (يوتيوب، تيك توك، إنستجرام).",
        "بناء معرض أعمالك (Portfolio) وتطوير هويتك البصرية كصانع محتوى."
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } }
    };

    return (
        <section className="py-28 bg-transparent relative z-10">
            <motion.div
                className="max-w-5xl mx-auto px-6 preserve-3d"
                initial={{ opacity: 0, y: 50, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 80, damping: 20 }}
            >
                <div className="bg-obsidian border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-champagne/5 rounded-full blur-[100px] pointer-events-none" />

                    <h2 className="text-2xl md:text-3xl font-bold font-heading text-white mb-8 pr-4 border-r-4 border-champagne">
                        ماذا ستتعلم في هذه الدورة؟
                    </h2>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {outcomes.map((item, index) => (
                            <motion.div variants={itemVariants} key={index} className="flex gap-3 text-gray-300 text-right group/item">
                                <div className="mt-1 flex-shrink-0">
                                    <Check className="w-5 h-5 text-champagne group-hover/item:scale-110 transition-transform" />
                                </div>
                                <span className="leading-relaxed font-drama text-[15px]">{item}</span>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* New section added below the outcomes grid */}
                    <div className="mt-16 md:mt-24 relative z-10 w-full">
                        <motion.div
                            className="w-full rounded-3xl bg-gradient-to-r from-obsidian via-midnight-900 to-obsidian border border-champagne/20 p-8 md:p-12 relative overflow-hidden group shadow-[0_0_50px_rgba(201,168,76,0.1)]"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
                            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-champagne/10 rounded-full blur-[120px] pointer-events-none transition-opacity duration-700 group-hover:opacity-60"></div>

                            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                                <div className="flex-1 w-full text-center md:text-right">
                                    <h3 className="text-3xl md:text-4xl font-black font-heading mb-4 text-white drop-shadow-md">هل أنت مستعد لبدء التغيير؟</h3>
                                    <p className="text-gray-300 font-drama text-lg max-w-xl mx-auto md:mx-0 leading-relaxed">
                                        انضم إلى أكثر من <span className="text-champagne font-bold">10,000 صانع محتوى</span> غيروا مسيرتهم المهنية. لا تدع الفرصة تفوتك!
                                    </p>
                                </div>
                                <div className="w-full md:w-auto shrink-0">
                                    <Link href="/checkout" className="block w-full md:w-auto">
                                        <button className="w-full md:w-auto px-10 py-5 bg-champagne text-obsidian font-bold text-lg rounded-xl hover:bg-yellow-400 transition-all duration-300 shadow-[0_0_40px_rgba(201,168,76,0.3)] hover:shadow-[0_0_60px_rgba(201,168,76,0.5)] hover:scale-105 relative overflow-hidden flex justify-center items-center gap-2 group/btn">
                                            <span className="relative z-10">احجز مقعدك الآن</span>
                                            {/* Animated shine */}
                                            <motion.div
                                                className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                                                animate={{ left: ["-100%", "200%"] }}
                                                transition={{ duration: 2, ease: "linear", repeat: Infinity, repeatDelay: 1 }}
                                            />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
