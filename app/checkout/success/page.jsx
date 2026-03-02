"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, Play, Download } from 'lucide-react';
import MagneticButton from '../../components/MagneticButton';

export default function CheckoutSuccessPage() {
    return (
        <main className="min-h-screen bg-midnight-900 text-right flex flex-col items-center justify-center px-6 relative overflow-hidden" dir="rtl">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-champagne/5 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                className="max-w-xl w-full text-center relative z-10"
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
                <div className="flex justify-center mb-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                        className="w-24 h-24 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center relative"
                    >
                        <div className="absolute inset-0 rounded-full border border-green-500/50 animate-ping opacity-20" />
                        <CheckCircle2 className="w-12 h-12 text-green-400" />
                    </motion.div>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold font-heading text-white mb-4">
                    مرحباً بك في عالم الاحتراف!
                </h1>

                <p className="text-gray-400 font-drama text-lg mb-10 leading-relaxed">
                    تمت عملية الدفع بنجاح. لقد اتخذت أول خطوة حقيقية لتغيير مسارك في صناعة المحتوى البصري. جميع موارد الدورة أصبحت متاحة لك الآن.
                </p>

                <div className="bg-obsidian border border-white/10 rounded-2xl p-6 mb-10 text-right shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    <h3 className="text-white font-bold font-heading mb-4 text-lg border-b border-white/5 pb-3">تفاصيل الطلب</h3>
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-400 text-sm">رقم الطلب:</span>
                        <span className="text-white font-medium font-data">#EDI-{Math.floor(1000 + Math.random() * 9000).toString()}</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-400 text-sm">الباقة:</span>
                        <span className="text-champagne font-medium">الأساسية (عرض لفترة محدودة)</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">الوصول:</span>
                        <span className="text-white font-medium">مدى الحياة</span>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/courses" className="flex-1">
                        <MagneticButton className="w-full py-4 bg-champagne text-obsidian font-bold shadow-[0_0_30px_rgba(201,168,76,0.3)] flex justify-center items-center gap-2 transition-all">
                            <Play className="w-5 h-5" />
                            ابدأ التعلم الآن
                        </MagneticButton>
                    </Link>

                    <button className="flex-1 py-4 rounded-xl border border-white/20 hover:border-white/40 text-white font-bold transition-colors flex justify-center items-center gap-2">
                        <Download className="w-5 h-5" />
                        تحميل الفاتورة
                    </button>
                </div>
            </motion.div>
        </main>
    );
}
