"use client";

import MagneticButton from './MagneticButton';
import { motion } from 'framer-motion';
import Link from 'next/link';

const tiers = [
    {
        name: 'الأساسية',
        price: '$49',
        period: '/شهرياً',
        description: 'للمبتدئين الراغبين في بناء أساس نظري قوي.',
        features: ['أساسيات المونتاج', 'مقدمة في تلوين الفيديو', 'نصائح لترتيب الملفات'],
        isPopular: false,
        cta: 'ابدأ مجاناً'
    },
    {
        name: 'الاحترافية',
        price: '$99',
        period: '/شهرياً',
        description: 'الصيغة الأكثر طلباً لصناع المحتوى المحترفين.',
        features: ['كل ما في الأساسية', 'تلوين سينمائي متقدم (DaVinci)', 'صناعة بورتفوليو قوي', 'جلسات توجيه شهرية'],
        isPopular: true,
        cta: 'اشترك الآن'
    },
    {
        name: 'الشاملة',
        price: '$249',
        period: '/سنوياً',
        description: 'للاستوديوهات وفرق العمل السينمائية.',
        features: ['كل ما في الاحترافية', 'خدع بصرية متقدمة', 'تحليل مشاريعكم الخاصة', 'دعم فني على مدار الساعة'],
        isPopular: false,
        cta: 'تواصل معنا'
    }
];

export default function Pricing() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50, rotateX: -10, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            transition: { type: "spring", stiffness: 100, damping: 20 }
        }
    };

    return (
        <section className="w-full py-32 px-6 lg:px-20 bg-obsidian text-ivory flex justify-center perspective-2000 overflow-hidden">
            <motion.div
                className="max-w-6xl w-full flex flex-col items-center preserve-3d"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
            >
                <motion.div variants={itemVariants} className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">خطط تناسب طموحك</h2>
                    <p className="text-ivory/60 font-heading max-w-lg mx-auto">
                        اختر الباقة التي تناسب مستواك، وابدأ رحلتك في صناعة المحتوى السينمائي.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full items-center preserve-3d">
                    {tiers.map((tier, i) => (
                        <motion.div
                            key={tier.name}
                            variants={itemVariants}
                            whileHover={{ scale: tier.isPopular ? 1.08 : 1.05, rotateY: i === 0 ? 5 : i === 2 ? -5 : 0 }}
                            transition={{ type: "spring", stiffness: 150, damping: 15 }}
                            className={`relative flex flex-col p-8 rounded-[2rem] border transition-shadow duration-500 ${tier.isPopular
                                ? 'bg-champagne text-obsidian shadow-[0_20px_60px_rgba(201,168,76,0.3)] hover:shadow-[0_30px_80px_rgba(201,168,76,0.4)] border-champagne/50 z-10 lg:-mt-8 lg:mb-8'
                                : 'bg-midnight-950/80 backdrop-blur-md border-white/10 text-ivory z-0 hover:border-champagne/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
                                }`}
                        >
                            {tier.isPopular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-obsidian text-champagne text-xs font-bold rounded-full tracking-widest uppercase shadow-xl ring-1 ring-champagne/30">
                                    الأكثر طلباً
                                </div>
                            )}

                            <h3 className="text-xl font-heading font-bold mb-2">{tier.name}</h3>
                            <p className={`text-sm mb-6 ${tier.isPopular ? 'text-obsidian/70' : 'text-ivory/60'}`}>
                                {tier.description}
                            </p>

                            <div className="mb-8 flex items-baseline gap-1">
                                <span className="text-4xl font-data font-bold tracking-tight">{tier.price}</span>
                                <span className={`text-sm font-heading ${tier.isPopular ? 'text-obsidian/60' : 'text-ivory/40'}`}>
                                    {tier.period}
                                </span>
                            </div>

                            <ul className="flex flex-col gap-4 mb-10 flex-grow">
                                {tier.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-sm font-heading">
                                        <svg className={`w-4 h-4 flex-shrink-0 ${tier.isPopular ? 'text-obsidian' : 'text-champagne'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className={tier.isPopular ? 'text-obsidian/90' : 'text-ivory/80'}>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {tier.isPopular ? (
                                <Link href="/checkout" className="w-full mt-auto block z-20">
                                    <MagneticButton className="w-full py-4 bg-obsidian text-champagne hover:text-white transition-colors ring-1 ring-obsidian/10 shadow-lg font-bold">
                                        {tier.cta}
                                    </MagneticButton>
                                </Link>
                            ) : (
                                <Link href="/checkout" className="w-full mt-auto block z-20">
                                    <button className="w-full py-4 rounded-full border border-white/20 hover:border-champagne/50 hover:bg-champagne/5 text-sm font-heading transition-all duration-300">
                                        {tier.cta}
                                    </button>
                                </Link>
                            )}
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
