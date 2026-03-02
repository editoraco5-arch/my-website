"use client";
import { useState } from 'react';
import { ChevronDown, PlayCircle, FileText, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CourseCurriculum() {
    const [openModules, setOpenModules] = useState([0]); // First module open by default
    const [activeChapter, setActiveChapter] = useState(null);

    const toggleModule = (index) => {
        if (openModules.includes(index)) {
            setOpenModules(openModules.filter(i => i !== index));
        } else {
            setOpenModules([...openModules, index]);
        }
    };

    const modules = [
        {
            title: "الفصل الأول: أساسيات التصوير الفوتوغرافي والفيديو",
            lessonsCount: 5,
            duration: "الأساسيات الوافية",
            lessons: [
                { title: "مقدمة الدورة والمعدات المطلوبة", duration: "متاح", type: "video", isFree: true },
                { title: "فهم التعريض (Exposure Triangle)", duration: "الدرس الثاني", type: "video", isFree: true },
                { title: "الإضاءة السينمائية وكيفية توزيعها", duration: "الدرس الثالث", type: "video", isFree: false },
                { title: "اختيار العدسات المناسبة للتصوير", duration: "الدرس الرابع", type: "video", isFree: false },
                { title: "تكوين الكادر السينمائي (Composition)", duration: "الدرس الخامس", type: "video", isFree: false },
            ]
        },
        {
            title: "الفصل الثاني: المونتاج والقص (البرنامج الاحترافي)",
            lessonsCount: 6,
            duration: "التطبيق العملي",
            lessons: [
                { title: "كيفية القص والتعديل على التايم لاين", duration: "الدرس الأول", type: "video", isFree: false },
                { title: "التعامل مع المسارات (Tracks)", duration: "الدرس الثاني", type: "video", isFree: false },
                { title: "استخدام أدوات الانتقالات بين المشاهد", duration: "الدرس الثالث", type: "video", isFree: false },
                { title: "إضافة النصوص والعناوين المتحركة (Titles)", duration: "الدرس الرابع", type: "video", isFree: false },
                { title: "التلاعب بالسرعة (Speed Ramping)", duration: "الدرس الخامس", type: "video", isFree: false },
                { title: "تطبيق عملي: مونتاج فيديو كامل", duration: "مهم جداً", type: "video", isFree: false },
            ]
        },
        {
            title: "الفصل الثالث: التلوين السينمائي (Color Grading)",
            lessonsCount: 4,
            duration: "تصحيح الألوان",
            lessons: [
                { title: "الفرق بين Color Correction و Color Grading", duration: "الدرس الأول", type: "video", isFree: false },
                { title: "قراءة المؤشرات (Scopes) لضبط الإضاءة", duration: "الدرس الثاني", type: "video", isFree: false },
                { title: "استخدام عجلات الألوان (Color Wheels)", duration: "الدرس الثالث", type: "video", isFree: false },
                { title: "استخدام الـ LUTs بشكل صحيح", duration: "الدرس الرابع", type: "video", isFree: false },
            ]
        },
        {
            title: "الفصل الرابع: هندسة الصوت للسينما واليوتيوب",
            lessonsCount: 3,
            duration: "الصوت الاحترافي",
            lessons: [
                { title: "تنقية وتشذيب الصوت وعزل الضوضاء", duration: "الدرس الأول", type: "video", isFree: false },
                { title: "موازنة مستويات الصوت والـ EQ", duration: "الدرس الثاني", type: "video", isFree: false },
                { title: "إضافة المؤثرات الصوتية (SFX)", duration: "الدرس الثالث", type: "video", isFree: false },
            ]
        },
        {
            title: "الفصل الخامس: التصدير ونشر المحتوى",
            lessonsCount: 2,
            duration: "الخطوة الأخيرة",
            lessons: [
                { title: "أفضل إعدادات استخراج الفيديو لليوتيوب وإنستجرام", duration: "الدرس الأول", type: "video", isFree: false },
                { title: "بناء معرض الأعمال والتسويق لنفسك", duration: "الدرس الثاني", type: "video", isFree: false },
            ]
        }
    ];

    const totalLessons = modules.reduce((acc, curr) => acc + curr.lessonsCount, 0);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2
            }
        }
    };

    const nodeVariants = {
        hidden: { opacity: 0, z: -500, rotateX: 45, scale: 0.8 },
        visible: {
            opacity: 1,
            z: 0,
            rotateX: 0,
            scale: 1,
            transition: { type: "spring", bounce: 0.4, duration: 1.2 }
        }
    };

    return (
        <section className="py-24 bg-transparent perspective-[2000px] preserve-3d relative overflow-hidden">
            <motion.div
                className="max-w-6xl mx-auto px-4 md:px-6 preserve-3d relative"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                <motion.div variants={nodeVariants} className="mb-20 text-center">
                    <h2 className="text-4xl md:text-6xl font-black font-heading text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-4 drop-shadow-2xl translate-z-10">
                        الرحلة التعليمية
                    </h2>
                    <p className="text-champagne font-drama text-lg md:text-xl">
                        {modules.length} محطات رئيسية • {totalLessons} تدريب عملي
                    </p>
                </motion.div>

                {/* The 3D Central Timeline Beam */}
                <div className="absolute left-1/2 top-40 bottom-0 w-1 bg-gradient-to-b from-champagne/50 via-champagne/10 to-transparent -translate-x-1/2 rounded-full shadow-[0_0_30px_rgba(201,168,76,0.5)] hidden md:block" />

                <div className="space-y-12 md:space-y-24 preserve-3d relative z-10 w-full overflow-hidden">
                    {modules.map((module, index) => {
                        const isOpen = openModules.includes(index);
                        const isEven = index % 2 === 0;

                        return (
                            <motion.div
                                key={index}
                                className={`relative flex flex-col md:flex-row items-center w-full mb-12 lg:mb-24 ${isEven ? 'md:flex-row-reverse md:justify-end' : 'md:justify-start'}`}
                                variants={nodeVariants}
                            >
                                {/* Glass Content Card */}
                                <div className={`w-full md:w-[45%] z-10 ${isEven ? 'md:pl-12 lg:pl-20' : 'md:pr-12 lg:pr-20'}`}>
                                    <div className={`
                                        p-6 md:p-8 rounded-3xl backdrop-blur-3xl border border-white/10
                                        bg-black/60 shadow-[0_20px_50px_rgba(0,0,0,0.5)]
                                        transition-all duration-500 hover:border-champagne/40 hover:shadow-[0_20px_60px_rgba(201,168,76,0.15)]
                                        ${activeChapter === index ? 'ring-2 ring-champagne/50 glow-hover' : ''}
                                    `}>
                                        <button
                                            onClick={() => toggleModule(index)}
                                            onMouseEnter={() => setActiveChapter(index)}
                                            onMouseLeave={() => setActiveChapter(null)}
                                            className="w-full flex items-start justify-between text-right gap-4 outline-none"
                                        >
                                            <div className="flex flex-col gap-2 w-full">
                                                <span className="text-champagne text-xs font-bold tracking-widest uppercase">المحطة 0{index + 1}</span>
                                                <h3 className="text-xl md:text-2xl font-bold text-white font-heading leading-tight">{module.title}</h3>
                                                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mt-2">
                                                    <span>{module.lessonsCount} دروس مدعمة</span>
                                                    <span className="hidden md:block w-1 h-1 rounded-full bg-gray-600" />
                                                    <span className="text-gray-300">{module.duration}</span>
                                                </div>
                                            </div>
                                            <div className={`shrink-0 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-500 shadow-inner ${isOpen ? 'bg-champagne/20 border-champagne/50 rotate-180' : 'hover:bg-white/10'}`}>
                                                <ChevronDown className={`w-5 h-5 ${isOpen ? 'text-champagne' : 'text-gray-400'}`} />
                                            </div>
                                        </button>

                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0, y: -20, rotateX: -20 }}
                                                    animate={{ height: "auto", opacity: 1, y: 0, rotateX: 0 }}
                                                    exit={{ height: 0, opacity: 0, y: -20, rotateX: -20 }}
                                                    transition={{ type: "spring", bounce: 0, duration: 0.6 }}
                                                    className="mt-6 pt-6 border-t border-white/10 flex flex-col gap-3 overflow-hidden origin-top"
                                                >
                                                    {module.lessons.map((lesson, lIndex) => (
                                                        <div key={lIndex} className="flex flex-wrap md:flex-nowrap items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group/lesson cursor-pointer gap-2">
                                                            <div className="flex items-center gap-3 w-full md:w-auto">
                                                                <div className="w-8 h-8 rounded-full bg-black/50 border border-white/10 flex items-center justify-center group-hover/lesson:border-champagne/30 transition-colors shrink-0">
                                                                    {lesson.type === 'video' ? (
                                                                        <PlayCircle className={`w-4 h-4 ${lesson.isFree ? 'text-champagne' : 'text-gray-500 group-hover/lesson:text-white'}`} />
                                                                    ) : (
                                                                        <FileText className="w-4 h-4 text-gray-500 group-hover/lesson:text-white" />
                                                                    )}
                                                                </div>
                                                                <span className={`text-sm font-medium ${lesson.isFree ? 'text-white' : 'text-gray-400 group-hover/lesson:text-gray-200'} transition-colors ${lesson.title.length > 30 ? 'truncate max-w-[200px] md:max-w-none' : ''}`} title={lesson.title}>{lesson.title}</span>
                                                            </div>
                                                            <div className="flex items-center gap-3 shrink-0 ml-auto md:ml-0">
                                                                {lesson.isFree ? (
                                                                    <span className="text-[10px] font-bold bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-1 rounded-md">مجاني</span>
                                                                ) : (
                                                                    <Lock className="w-3 h-3 text-gray-600 md:hidden" />
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* Glowing Timeline Node Bulb */}
                                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-obsidian border-4 border-champagne rounded-full z-20 shadow-[0_0_20px_rgba(201,168,76,0.6)] group-hover:scale-150 group-hover:bg-champagne transition-all duration-500" />
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>
        </section>
    );
}
