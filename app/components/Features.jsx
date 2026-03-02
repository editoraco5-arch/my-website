"use client";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

// ==========================================
// Card 1: Diagnostic Shuffler
// ==========================================
function DiagnosticShuffler() {
    const [cards, setCards] = useState([
        { id: 1, title: 'Davinci Resolve', subtitle: 'تلوين سينمائي احترافي', color: '#0FF0FC' },
        { id: 2, title: 'Adobe Premiere', subtitle: 'تحرير متقدم', color: '#C9A84C' },
        { id: 3, title: 'After Effects', subtitle: 'صناعة الخدع البصرية', color: '#7B61FF' }
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCards(prev => {
                const newArr = [...prev];
                const last = newArr.pop();
                newArr.unshift(last);
                return newArr;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-48 flex items-center justify-center mt-6 perspective-1000">
            {cards.map((card, idx) => {
                // Calculate position based on index (0 is front)
                const isFront = idx === 0;
                const scale = 1 - idx * 0.1;
                const translateY = idx * 20;
                const opacity = 1 - idx * 0.3;
                const zIndex = 10 - idx;

                return (
                    <div
                        key={card.id}
                        className="absolute w-[80%] p-6 rounded-[1.5rem] border border-white/5 bg-obsidian transition-all duration-700 shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
                        style={{
                            transform: `translateY(${translateY}px) scale(${scale})`,
                            opacity,
                            zIndex,
                            transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                        }}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: card.color }}></div>
                            <h4 className="font-heading font-bold text-ivory text-sm">{card.title}</h4>
                        </div>
                        <p className="font-heading text-xs text-ivory/60 mt-2">{card.subtitle}</p>
                    </div>
                );
            })}
        </div>
    );
}

// ==========================================
// Card 2: Telemetry Typewriter
// ==========================================
function TelemetryTypewriter() {
    const fullText = "> تحميل بيانات المشروع الحقيقي...\n> بناء معرض الأعمال (Portfolio)...\n> تأسيس الخبرة العملية: مكتمل.";
    const [text, setText] = useState('');

    useEffect(() => {
        let currentIdx = 0;
        const interval = setInterval(() => {
            setText(fullText.slice(0, currentIdx));
            currentIdx++;
            if (currentIdx > fullText.length) {
                clearInterval(interval);
                setTimeout(() => {
                    setText('');
                    currentIdx = 0;
                }, 5000);
            }
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full mt-6 bg-[#0D0D12] rounded-xl border border-white/5 p-4 relative overflow-hidden h-48">
            <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
                <div className="w-2 h-2 rounded-full bg-neon animate-pulse"></div>
                <span className="text-xs font-data text-neon tracking-widest uppercase">Live Feed</span>
            </div>
            <pre className="font-data text-sm text-ivory/80 whitespace-pre-wrap leading-relaxed">
                {text}<span className="inline-block w-2 h-4 ml-1 bg-neon animate-pulse align-middle"></span>
            </pre>
        </div>
    );
}

// ==========================================
// Card 3: Cursor Protocol Scheduler
// ==========================================
function CursorProtocolScheduler() {
    const containerRef = useRef(null);
    const cursorRef = useRef(null);
    const highlightRef = useRef(null);
    const saveBtnRef = useRef(null);
    const days = ['س', 'ح', 'ن', 'ث', 'ع', 'خ', 'ج'];

    useEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

            // Initial state
            gsap.set(cursorRef.current, { x: 200, y: 150, opacity: 0 });
            gsap.set(highlightRef.current, { opacity: 0, scale: 0.8 });
            gsap.set(saveBtnRef.current, { scale: 1, backgroundColor: 'transparent' });

            // Enter cursor
            tl.to(cursorRef.current, { opacity: 1, duration: 0.3 })
                // Move to Wednesday (index 3)
                .to(cursorRef.current, { x: 140, y: 60, duration: 1, ease: 'power2.inOut' })
                // Click press
                .to(cursorRef.current, { scale: 0.8, duration: 0.1 })
                // Activate highlight
                .to(highlightRef.current, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.7)' }, '<')
                // Release click
                .to(cursorRef.current, { scale: 1, duration: 0.1 })
                // Move to Save button
                .to(cursorRef.current, { x: 30, y: 150, duration: 1, ease: 'power2.inOut' }, '+=0.5')
                // Click press
                .to(cursorRef.current, { scale: 0.8, duration: 0.1 })
                // Button press effect
                .to(saveBtnRef.current, { scale: 0.95, backgroundColor: '#0FF0FC', color: '#0D0D12', duration: 0.1 }, '<')
                // Release click
                .to(cursorRef.current, { scale: 1, duration: 0.1 })
                .to(saveBtnRef.current, { scale: 1, duration: 0.1 }, '<')
                // Fade out cursor
                .to(cursorRef.current, { opacity: 0, duration: 0.3 }, '+=0.5');

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative w-full mt-6 bg-[#0D0D12] rounded-xl border border-white/5 p-6 h-48 overflow-hidden">
            <div className="grid grid-cols-7 gap-2 mb-6" dir="rtl">
                {days.map((day, i) => (
                    <div key={i} className="relative flex items-center justify-center aspect-square rounded-md border border-white/5 text-xs text-ivory/50 font-heading">
                        {i === 3 && (
                            <div ref={highlightRef} className="absolute inset-0 bg-champagne rounded-md" />
                        )}
                        <span className="relative z-10">{day}</span>
                    </div>
                ))}
            </div>

            <div className="flex justify-end">
                <button
                    ref={saveBtnRef}
                    className="px-4 py-1.5 rounded-full border border-white/10 text-xs font-heading text-ivory transition-colors"
                >
                    جدولة
                </button>
            </div>

            {/* SVG Cursor */}
            <svg
                ref={cursorRef}
                xmlns="http://www.w3.org/2000/svg"
                width="24" height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute top-0 left-0 z-50 text-obsidian drop-shadow-md origin-top-left"
                style={{ pointerEvents: 'none' }}
            >
                <polygon points="3 3 10.42 21 14.12 14.12 21 10.42 3 3"></polygon>
            </svg>
        </div>
    );
}

// ==========================================
// Main Features Section
// ==========================================
export default function Features() {
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Future scroll animations could go here
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full py-32 px-6 lg:px-20 bg-obsidian text-ivory">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Feature 1 */}
                    <div className="group flex flex-col p-8 rounded-[2rem] bg-surface border border-white/5 shadow-2xl relative overflow-hidden">
                        <h3 className="text-xl font-heading font-bold mb-2">إتقان أدوات المحترفين</h3>
                        <p className="text-sm font-heading text-ivory/60">
                            كورسات متخصصة تغطي أهم برامج الصناعة من الأساسيات حتى الاحتراف.
                        </p>
                        <DiagnosticShuffler />
                    </div>

                    {/* Feature 2 */}
                    <div className="group flex flex-col p-8 rounded-[2rem] bg-surface border border-white/5 shadow-2xl relative overflow-hidden">
                        <h3 className="text-xl font-heading font-bold mb-2">تطبيق عملي حقيقي</h3>
                        <p className="text-sm font-heading text-ivory/60">
                            التعلم لا يعتمد على النظري، بل على بناء معرض أعمال قوي للمتدرب.
                        </p>
                        <TelemetryTypewriter />
                    </div>

                    {/* Feature 3 */}
                    <div className="group flex flex-col p-8 rounded-[2rem] bg-surface border border-white/5 shadow-2xl relative overflow-hidden">
                        <h3 className="text-xl font-heading font-bold mb-2">تعلم بمرونة تامة</h3>
                        <p className="text-sm font-heading text-ivory/60">
                            منصة سهلة تتيح لك الوصول للكورسات في أي وقت ومن أي جهاز.
                        </p>
                        <CursorProtocolScheduler />
                    </div>

                </div>
            </div>
        </section>
    );
}
