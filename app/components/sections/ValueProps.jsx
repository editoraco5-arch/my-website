import React from 'react';
import { motion } from 'framer-motion';
import { Settings2, Briefcase, Laptop } from 'lucide-react';

const ValueProps = () => {
    const cards = [
        {
            icon: <Settings2 className="w-8 h-8 text-accent" />,
            title: 'إتقان أدوات المحترفين',
            description: 'كورسات متخصصة وعميقة تغطي أهم برامج الصناعة (DaVinci Resolve، Adobe Premiere، After Effects) من الأساسيات حتى الاحتراف.',
            delay: 0.1
        },
        {
            icon: <Briefcase className="w-8 h-8 text-accent" />,
            title: 'تطبيق عملي ومشاريع حقيقية',
            description: 'التعلم لا يعتمد على النظري فقط، بل على التطبيق العملي لبناء معرض أعمال (بورتفوليو) قوي للمتدرب يعزز فرصه في سوق العمل.',
            delay: 0.2
        },
        {
            icon: <Laptop className="w-8 h-8 text-accent" />,
            title: 'تعلم بمرونة تامة',
            description: 'منصة سهلة الاستخدام تتيح لك الوصول للكورسات في أي وقت ومن أي جهاز لتبدأ رحلتك الإبداعية بالسرعة التي تناسبك.',
            delay: 0.3
        }
    ];

    return (
        <section className="py-24 bg-midnight-900 relative z-10 border-t border-midnight-800" dir="rtl" id="features">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-white"
                    >
                        لماذا تختار <span className="text-accent-glow">إيديتورا</span>؟
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-lg text-text-muted leading-relaxed"
                    >
                        نبني جيلاً من المبدعين عبر منهجية تجمع بين الفهم العميق لأدوات الصناعة والتطبيق العملي المكثف.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: card.delay }}
                            className="glass-panel p-8 rounded-2xl group flex flex-col h-full hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden"
                        >
                            {/* Subtle top gradient line for brutalist luxury feel */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-midnight-600 to-transparent opacity-50 group-hover:via-accent transition-all duration-500"></div>

                            <div className="w-16 h-16 rounded-xl bg-midnight-900 border border-midnight-700 flex items-center justify-center mb-6 group-hover:border-accent/40 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all">
                                {card.icon}
                            </div>

                            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-accent-glow transition-colors">
                                {card.title}
                            </h3>

                            <p className="text-text-muted leading-relaxed font-medium">
                                {card.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default ValueProps;
