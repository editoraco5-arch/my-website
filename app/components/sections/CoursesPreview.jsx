import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, Clock, Star, Users } from 'lucide-react';

const CoursesPreview = () => {
    const courses = [
        {
            title: 'الماستر كلاس في DaVinci Resolve',
            instructor: 'أحمد سعيد - ملون سينمائي',
            image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            duration: '18 ساعة',
            students: '+2400',
            rating: '4.9',
            tag: 'الأكثر مبيعاً',
            software: 'DaVinci Resolve'
        },
        {
            title: 'التحرير الاحترافي بـ Premiere Pro',
            instructor: 'عمر خالد - صانع محتوى',
            image: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            duration: '14 ساعة',
            students: '+1850',
            rating: '4.8',
            tag: 'مستوى متقدم',
            software: 'Premiere Pro'
        },
        {
            title: 'خدع بصرية متقدمة After Effects',
            instructor: 'سارة عبدالرحمن - فنانة VFX',
            image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            duration: '22 ساعة',
            students: '+3100',
            rating: '5.0',
            tag: 'جديد',
            software: 'After Effects'
        }
    ];

    return (
        <section className="py-24 bg-midnight-900 relative z-10" dir="rtl" id="courses">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-2xl">
                        <motion.h2
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-white"
                        >
                            اكتشف <span className="text-accent-glow">الدورات المميزة</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-text-muted text-lg"
                        >
                            انضم لآلاف المتدربين وابدأ رحلتك في صناعة المحتوى السينمائي اليوم.
                        </motion.p>
                    </div>

                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-white hover:text-accent-glow font-medium flex items-center gap-2 group transition-colors whitespace-nowrap"
                    >
                        تصفح جميع الكورسات
                        <div className="w-8 h-8 rounded-full border border-midnight-700 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all">
                            <span className="transform -rotate-180 group-hover:translate-x-1 transition-transform">&rarr;</span>
                        </div>
                    </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            className="glass-panel rounded-2xl overflow-hidden group hover:border-midnight-600 transition-all duration-300 flex flex-col h-full cursor-pointer hover:shadow-2xl hover:-translate-y-1 block"
                        >
                            {/* Thumbnail Container */}
                            <div className="relative aspect-video overflow-hidden border-b border-midnight-700">
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-in-out opacity-80 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-midnight-900 to-transparent opacity-80"></div>

                                {/* Overlay Play Button */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm bg-midnight-900/40">
                                    <PlayCircle className="w-16 h-16 text-white shadow-lg drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                                </div>

                                {/* Tags */}
                                <div className="absolute top-4 right-4 bg-accent text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                    {course.tag}
                                </div>
                                <div className="absolute bottom-4 left-4 bg-midnight-900/80 backdrop-blur-md border border-midnight-700 text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
                                    <Clock size={14} className="text-accent" />
                                    {course.duration}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="text-accent text-xs font-bold mb-3 uppercase tracking-wider">{course.software}</div>
                                <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-accent-glow transition-colors">
                                    {course.title}
                                </h3>
                                <p className="text-sm text-text-muted mb-6 flex-grow">
                                    مع {course.instructor}
                                </p>

                                {/* Footer fixed at bottom of card */}
                                <div className="flex items-center justify-between pt-4 border-t border-midnight-700/50">
                                    <div className="flex items-center gap-1.5 text-yellow-400 text-sm font-medium">
                                        <Star size={16} fill="currentColor" />
                                        <span>{course.rating}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-text-muted text-sm font-medium">
                                        <Users size={16} />
                                        <span>{course.students} متدرب</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default CoursesPreview;
