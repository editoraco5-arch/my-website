"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Step1Graphic() {
    return (
        <svg className="w-full h-full text-champagne animate-[spin_20s_linear_infinite]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="50" cy="50" r="40" strokeDasharray="4 4" />
            <circle cx="50" cy="50" r="25" strokeDasharray="2 6" strokeWidth="2" />
            <polygon points="50,15 80,80 20,80" className="opacity-50" />
            <polygon points="50,85 20,20 80,20" className="opacity-50" />
        </svg>
    );
}

function Step2Graphic() {
    const laserRef = useRef(null);
    useEffect(() => {
        gsap.to(laserRef.current, {
            y: '100%',
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut'
        });
    }, []);
    return (
        <div className="relative w-full h-full bg-obsidian rounded-xl border border-white/5 overflow-hidden flex items-center justify-center">
            {/* Grid pattern */}
            <div className="absolute inset-0 max-w-full max-h-full" style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            {/* Laser line */}
            <div ref={laserRef} className="absolute top-0 left-0 w-full h-[2px] bg-neon shadow-[0_0_15px_#0FF0FC] z-10" />
        </div>
    );
}

function Step3Graphic() {
    const pathRef = useRef(null);
    useEffect(() => {
        gsap.to(pathRef.current, {
            strokeDashoffset: 0,
            duration: 2,
            repeat: -1,
            ease: 'linear'
        });
    }, []);
    return (
        <svg className="w-full h-full text-champagne drop-shadow-[0_0_10px_rgba(201,168,76,0.5)]" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="1">
            <path
                ref={pathRef}
                d="M 0,25 L 20,25 L 25,10 L 35,45 L 45,5 L 55,35 L 60,25 L 100,25"
                strokeDasharray="150"
                strokeDashoffset="150"
            />
        </svg>
    );
}

const steps = [
    {
        id: '01',
        title: 'التأسيس التقني والنظري',
        description: 'فهم عميق لأدوات برامج المونتاج والخدع البصرية (مثل DaVinci و Premiere) وبناء أساس متين للمحترفين.',
        Graphic: Step1Graphic
    },
    {
        id: '02',
        title: 'التطبيق العملي والمشاريع',
        description: 'العمل على لقطات سينمائية حقيقية وتطبيق مفاهيم التلوين والمونتاج خطوة بخطوة للوصول لنتيجة مبهرة.',
        Graphic: Step2Graphic
    },
    {
        id: '03',
        title: 'صناعة معرض الأعمال والانطلاق',
        description: 'تجميع وتحسين مشاريعك في بورتفوليو قوي يعكس احترافيتك ويكون جاهزاً لدخول سوق العمل السينمائي.',
        Graphic: Step3Graphic
    }
];

export default function Protocol() {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Sticky stacking logic
            cardsRef.current.forEach((card, i) => {
                ScrollTrigger.create({
                    trigger: card,
                    start: 'top top',
                    pin: true,
                    pinSpacing: false,
                });

                if (i > 0) {
                    gsap.to(cardsRef.current[i - 1], {
                        scale: 0.9,
                        opacity: 0.5,
                        filter: 'blur(20px)',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top bottom',
                            end: 'top top',
                            scrub: true,
                        }
                    });
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full bg-obsidian">
            {steps.map((step, i) => (
                <div
                    key={step.id}
                    ref={el => cardsRef.current[i] = el}
                    className="w-full h-[100dvh] sticky top-0 flex items-center justify-center p-6 bg-obsidian border-t border-white/5 shadow-[-10px_-20px_40px_rgba(13,13,18,0.8)]"
                >
                    <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
                        {/* Visual Graphic */}
                        <div className="order-2 md:order-1 w-full aspect-square md:aspect-auto md:h-[60vh] rounded-[2rem] bg-surface border border-white/10 p-12 flex items-center justify-center relative overflow-hidden">
                            <step.Graphic />
                        </div>

                        {/* Text Content */}
                        <div className="order-1 md:order-2 flex flex-col items-start gap-6">
                            <span className="font-data text-champagne text-2xl md:text-4xl opacity-80 tracking-widest border-b border-champagne/30 pb-2">
                                /{step.id}
                            </span>
                            <h2 className="text-3xl md:text-5xl font-heading font-bold text-ivory tracking-tight">
                                {step.title}
                            </h2>
                            <p className="text-lg md:text-xl font-heading text-ivory/60 leading-relaxed max-w-md">
                                {step.description}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
            {/* Spacer to allow scrolling past the pinned cards smoothly */}
            <div className="h-[20vh] w-full bg-obsidian/0 pointer-events-none" />
        </section>
    );
}
