"use client";

import { Star, PlayCircle, Users } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Instructor({ data }) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, rotateX: 5 },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: { type: "spring", stiffness: 100, damping: 20 }
        }
    };
    return (
        <section className="py-28 bg-transparent relative z-10 overflow-hidden">
            <motion.div
                className="max-w-4xl mx-auto px-6 preserve-3d"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-bold font-heading text-white mb-10 text-right">
                    {data?.title || "عن المدرب"}
                </motion.h2>

                <div className="flex flex-col md:flex-row gap-8 items-start preserve-3d">
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
                            visible: { opacity: 1, scale: 1, rotateY: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
                        }}
                        className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0 relative rounded-full overflow-hidden border-2 border-champagne/30 shadow-[0_0_30px_rgba(201,168,76,0.1)] hover:shadow-[0_0_50px_rgba(201,168,76,0.3)] transition-shadow duration-500"
                    >
                        {/* Placeholder for Instructor Image */}
                        <img
                            src={data?.imageUrl || "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=2000&auto=format&fit=crop"}
                            alt="Instructor Profile"
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                        />
                    </motion.div>

                    <div className="text-right preserve-3d">
                        <motion.h3 variants={itemVariants} className="text-2xl font-bold text-white mb-2 font-heading text-champagne">مدرب الدورة</motion.h3>
                        <motion.p variants={itemVariants} className="text-gray-400 mb-6 font-medium">مخرج وصانع محتوى محترف</motion.p>

                        <motion.div variants={itemVariants} className="flex flex-wrap gap-6 mb-6">
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                <Star className="w-4 h-4 text-champagne fill-current" />
                                <span>تقييم الدورة المتميز</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                <Users className="w-4 h-4 text-champagne" />
                                <span>محتوى عملي وتطبيقي</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                <PlayCircle className="w-4 h-4 text-champagne" />
                                <span>شرح تفصيلي من الصفر</span>
                            </div>
                        </motion.div>

                        <div className="space-y-4 text-gray-400 font-drama leading-relaxed preserve-3d">
                            <motion.p variants={itemVariants} className="whitespace-pre-wrap">
                                {data?.description || `أكثر من 10 سنوات من الخبرة في مجال صناعة الأفلام والمونتاج السينمائي. عملت مع كبرى الوكالات العالمية وشاركت في مونتاج وتلوين إعلانات تجارية وأفلام وثائقية الحائزة على جوائز.
هدفي هو نقل هذه الخبرة العملية من السوق الحقيقي إليك بصورة مبسطة ومباشرة، بعيداً عن الحشو النظري. الدورة مصممة لتأخذك من الصفر وتضعك على أول طريق الاحتراف بصناعة المحتوى المرئي.`}
                            </motion.p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
