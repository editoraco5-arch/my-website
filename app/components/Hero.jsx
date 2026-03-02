"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import MagneticButton from './MagneticButton';

export default function Hero() {
    const containerRef = useRef(null);
    const text1Ref = useRef(null);
    const text2Ref = useRef(null);
    const ctaRef = useRef(null);
    const bgRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Background subtle scale in
            gsap.fromTo(bgRef.current,
                { scale: 1.1 },
                { scale: 1, duration: 2.5, ease: 'power2.out' }
            );

            // Staggered text reveal
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            tl.fromTo(text1Ref.current,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, delay: 0.2 }
            )
                .fromTo(text2Ref.current,
                    { y: 40, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1.2 },
                    "-=0.9"
                )
                .fromTo(ctaRef.current,
                    { y: 40, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1.2 },
                    "-=0.9"
                );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full h-[100dvh] overflow-hidden bg-obsidian flex flex-col justify-end pb-24 md:pb-32 px-6 lg:px-20 selection:bg-champagne/30">
            {/* Background Image Setup */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div
                    ref={bgRef}
                    className="w-full h-full bg-cover bg-center"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80")',
                        filter: 'brightness(0.7) contrast(1.1)'
                    }}
                />
                {/* Cinematic Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-obsidian/40" />
            </div>

            {/* Content Area */}
            <div className="relative z-10 flex flex-col items-start max-w-5xl gap-6">
                <h1 className="flex flex-col items-start gap-2">
                    <span
                        ref={text1Ref}
                        className="text-2xl md:text-4xl font-heading font-bold tracking-tighter text-ivory/90"
                    >
                        شغف الإبداع يلتقي بـ
                    </span>
                    <span
                        ref={text2Ref}
                        className="text-6xl md:text-8xl lg:text-[10rem] font-drama italic text-ivory leading-none tracking-tight pr-4 md:pr-12"
                    >
                        دقة المحترفين.
                    </span>
                </h1>

                <div ref={ctaRef} className="mt-8 flex items-center gap-6">
                    <MagneticButton className="px-8 py-4 bg-champagne text-obsidian text-lg shadow-[0_0_30px_rgba(201,168,76,0.2)]">
                        تصفح الكورسات
                    </MagneticButton>
                    <button className="text-ivory/70 hover:text-ivory border-b border-ivory/30 pb-1 font-heading transition-colors duration-300">
                        مشاهدة تجربة مجانية
                    </button>
                </div>
            </div>
        </section>
    );
}
