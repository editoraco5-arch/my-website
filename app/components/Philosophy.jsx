"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
    const containerRef = useRef(null);
    const imageRef = useRef(null);
    const statement1Ref = useRef(null);
    const statement2Ref = useRef(null);

    const statement1 = "معظم منصات التعليم تركز على: الحشو النظري وتكرار الأساسيات.";
    const statement2Start = "نحن نركز على: ";
    const statement2Highlight = "الاحتراف";
    const statement2End = " والتطبيق السينمائي الحي.";

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Parallax Image
            gsap.fromTo(imageRef.current,
                { y: '-15%' },
                {
                    y: '15%',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                    }
                }
            );

            // Text Reveal
            const animateText = (elementRef, delay = 0) => {
                const words = elementRef.current.querySelectorAll('.word');
                gsap.fromTo(words,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.08,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: 'top 60%',
                        },
                        delay
                    }
                );
            };

            animateText(statement1Ref, 0);
            animateText(statement2Ref, 0.4);

        }, containerRef);
        return () => ctx.revert();
    }, []);

    const wrapWords = (text, extraClass = '') => {
        return text.split(' ').map((word, i) => (
            <span key={i} className={`word inline-block mr-2 lg:mr-3 ${extraClass}`}>
                {word}
            </span>
        ));
    };

    return (
        <section ref={containerRef} className="relative w-full min-h-[80dvh] flex items-center justify-center overflow-hidden bg-obsidian text-ivory px-6 py-32">
            {/* Background Parallax Texture */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                <div
                    ref={imageRef}
                    className="w-full h-[130%] bg-cover bg-center -mt-[15%]"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&auto=format&fit=crop")' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-12">
                <p ref={statement1Ref} className="text-xl md:text-3xl font-heading font-medium text-ivory/60 leading-relaxed max-w-2xl">
                    {wrapWords(statement1)}
                </p>

                <h2 ref={statement2Ref} className="text-4xl md:text-6xl lg:text-8xl font-drama italic font-bold leading-tight">
                    {wrapWords(statement2Start)}
                    <span className="word inline-block mr-2 lg:mr-3 text-champagne">
                        {statement2Highlight}
                    </span>
                    {wrapWords(statement2End)}
                </h2>
            </div>
        </section>
    );
}
