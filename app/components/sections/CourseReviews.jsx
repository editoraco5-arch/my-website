"use client";

import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const reviews = [
    {
        name: "عبدالرحمن فهد",
        role: "صانع محتوى يوتيوب",
        rating: 5,
        text: "بصراحة، هذه الدورة اختصرت عليّ سنوات من البحث المشتت. تدرج المعلومات من الصفر وحتى الاحتراف والتلوين السينمائي فاق توقعاتي بكثير. أنصح بها بشدة!",
        image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop"
    },
    {
        name: "نورة القحطاني",
        role: "مصورة منتجات",
        rating: 5,
        text: "كنت أواجه صعوبة كبيرة في فهم مثلث التعريض وتوزيع الإضاءة، لكن أسلوب الشرح في هذه الدورة مبسط وعملي جداً لدرجة أن جودة تصويري تغيرت خلال أسبوع.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
    },
    {
        name: "طارق سليم",
        role: "محرر فيديو مستقل",
        rating: 5,
        text: "فصل هندسة الصوت وتصحيح الألوان (Color Grading) كان بمثابة كنز بالنسبة لي. المهارات التي تعلمتها في المونتاج ضاعفت من قيمة أعمالي لدى العملاء.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
    }
];

export default function CourseReviews() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9, rotateX: 15, y: 30 },
        visible: {
            opacity: 1,
            scale: 1,
            rotateX: 0,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 20 }
        }
    };

    return (
        <section className="py-28 bg-transparent relative z-10 overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-4">
                        قصص نجاح من <span className="text-champagne">طلابنا</span>
                    </h2>
                    <p className="text-gray-400 font-drama max-w-2xl mx-auto text-lg">
                        آراء حقيقية من صُنّاع محتوى وشباب بدأوا من الصفر ووصلوا للاحتراف من خلاصة هذه الدورة.
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 preserve-3d"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {reviews.map((review, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            className="bg-midnight-950 border border-white/10 p-8 rounded-2xl relative group hover:border-champagne/30 transition-colors shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_40px_rgba(201,168,76,0.1)] text-right"
                            dir="rtl"
                        >
                            <Quote className="absolute top-6 left-6 w-12 h-12 text-champagne/10 rotate-180 group-hover:scale-110 transition-transform" />

                            <div className="flex items-center gap-4 mb-6 relative z-10">
                                <img
                                    src={review.image}
                                    alt={review.name}
                                    className="w-14 h-14 rounded-full object-cover border-2 border-champagne/50"
                                />
                                <div>
                                    <h3 className="text-white font-bold font-heading">{review.name}</h3>
                                    <p className="text-xs text-gray-500">{review.role}</p>
                                </div>
                            </div>

                            <div className="flex gap-1 mb-4 text-champagne">
                                {[...Array(review.rating)].map((_, idx) => (
                                    <Star key={idx} className="w-4 h-4 fill-current" />
                                ))}
                            </div>

                            <p className="text-gray-300 font-drama leading-relaxed relative z-10">
                                "{review.text}"
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
