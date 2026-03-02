"use client";
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function MagneticButton({ children, className = '', onClick }) {
    const buttonRef = useRef(null);
    const textRef = useRef(null);
    const bgRef = useRef(null);

    useEffect(() => {
        const button = buttonRef.current;

        const handleMouseEnter = () => {
            gsap.to(button, {
                scale: 1.03,
                duration: 0.4,
                ease: 'power3.out' // Using cubic-bezier(0.25, 0.46, 0.45, 0.94) equivalent
            });
            gsap.to(bgRef.current, {
                y: '0%',
                duration: 0.4,
                ease: 'power3.out'
            });
            gsap.to(textRef.current, {
                y: '-1px',
                color: '#0D0D12',
                duration: 0.4,
                ease: 'power3.out'
            });
        };

        const handleMouseLeave = () => {
            gsap.to(button, {
                scale: 1,
                duration: 0.4,
                ease: 'power3.out'
            });
            gsap.to(bgRef.current, {
                y: '100%',
                duration: 0.4,
                ease: 'power3.out'
            });
            gsap.to(textRef.current, {
                y: '0px',
                color: '#0D0D12',
                duration: 0.4,
                ease: 'power3.out'
            });
        };

        button.addEventListener('mouseenter', handleMouseEnter);
        button.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            button.removeEventListener('mouseenter', handleMouseEnter);
            button.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <button
            ref={buttonRef}
            onClick={onClick}
            className={`relative overflow-hidden rounded-full font-heading font-semibold text-sm transition-shadow ${className}`}
            style={{
                transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
        >
            <span
                ref={bgRef}
                className="absolute inset-0 w-full h-full bg-ivory translate-y-full rounded-full"
            ></span>
            <span ref={textRef} className="relative z-10 flex items-center justify-center gap-2 text-obsidian">
                {children}
            </span>
        </button>
    );
}
