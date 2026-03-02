"use client";

import Link from 'next/link';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FeaturedCourses({ courses, data }) {
    if (!courses || courses.length === 0) return null;

    // Display up to 3 courses
    const displayCourses = courses.slice(0, 3);

    return (
        <section className="py-24 bg-midnight-900 relative overflow-hidden text-white w-full">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-champagne/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6" dir="rtl">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4 text-white">
                            {data?.title || "أحدث"} <span className="text-champagne">{data?.subtitle || "الدورات"}</span>
                        </h2>
                        <p className="text-gray-400 text-lg max-w-xl">
                            {data?.description || "اختر من بين تشكيلة واسعة من الدورات المتقدمة في المونتاج وصناعة المحتوى، وابدأ رحلتك نحو الاحتراف."}
                        </p>
                    </div>
                    <Link href="/courses">
                        <button className="px-6 py-3 border border-white/20 hover:border-champagne/50 hover:bg-white/5 rounded-xl font-bold transition-all flex items-center gap-2 group">
                            {data?.buttonText || "تصفح كل الدورات"}
                            <span className="group-hover:-translate-x-1 transition-transform">←</span>
                        </button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" dir="rtl">
                    {displayCourses.map((course, index) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:border-champagne/30 shadow-xl"
                        >
                            <div className="aspect-video bg-black/50 relative overflow-hidden block">
                                <Link href={`/courses/${course.id}`} className="absolute inset-0 z-10" />
                                {course.imageUrl ? (
                                    <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Play className="w-12 h-12 text-champagne/30" />
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 bg-obsidian/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-medium text-champagne z-20">
                                    {course.type === 'COURSE' ? 'دورة متكاملة' : 'درس سريع'}
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>

                            <div className="p-6 flex flex-col flex-1">
                                <Link href={`/courses/${course.id}`} className="hover:text-champagne transition-colors z-10">
                                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{course.title}</h3>
                                </Link>
                                {course.description && (
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">{course.description}</p>
                                )}
                                <div className="flex justify-between items-center mt-auto pt-6 border-t border-white/10">
                                    <div className="text-sm text-gray-400">
                                        بواسطة <span className="text-white">{course.author?.name || 'الإدارة'}</span>
                                    </div>
                                    <Link href={`/courses/${course.id}`} className="text-champagne font-medium text-sm flex items-center gap-2 hover:text-white transition-colors z-10">
                                        شاهد الآن
                                        <Play className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
