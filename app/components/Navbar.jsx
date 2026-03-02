"use client";
import { useEffect, useRef, useState } from 'react';
import { useSession, signOut } from "next-auth/react";
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from './MagneticButton';
import { getSiteSection } from '../admin/actions/site';

export default function Navbar() {
    const { data: session } = useSession();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [siteTitle, setSiteTitle] = useState("Editora");
    const navRef = useRef(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await getSiteSection('general_content');
                if (res?.content?.siteTitle) {
                    setSiteTitle(res.content.siteTitle);
                }
            } catch (error) {
                console.error("Failed to fetch site title", error);
            }
        };
        fetchSettings();

        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { title: 'الميزات', path: '/features' },
        { title: 'الفلسفة', path: '/philosophy' },
        { title: 'المسار', path: '/protocol' },
        { title: 'الباقات', path: '/pricing' },
        { title: 'الدورات', path: '/courses' }
    ];

    return (
        <div className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center w-full px-4 pointer-events-none">
            <nav
                ref={navRef}
                className={`pointer-events-auto flex items-center justify-between w-full max-w-5xl px-4 md:px-6 py-3 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] rounded-full ${isScrolled || isMobileMenuOpen
                    ? 'bg-obsidian/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] translate-y-0'
                    : 'bg-transparent border border-transparent md:translate-y-2'
                    }`}
            >
                {/* Logo and Mobile Menu Toggle in same wrapper for flex alignment */}
                <div className="flex items-center justify-between w-full lg:w-auto">
                    <Link href="/">
                        <div className="text-xl md:text-2xl font-bold tracking-tighter text-ivory font-heading select-none cursor-pointer hover:text-champagne transition-colors">
                            {siteTitle}<span className="text-champagne">.</span>
                        </div>
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="lg:hidden text-ivory p-2 rounded-lg hover:bg-white/10 transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Desktop Links */}
                <ul className="hidden lg:flex gap-8 text-sm font-medium text-ivory/70 font-heading items-center">
                    {navLinks.map((item) => (
                        <li key={item.path} className="transition-all duration-300 hover:text-ivory hover:-translate-y-[1px] cursor-pointer">
                            <Link href={item.path}>
                                {item.title}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Desktop Auth / CTA */}
                <div className="hidden lg:flex items-center gap-6">
                    {session ? (
                        <>
                            {session.user?.role === 'ADMIN' && (
                                <Link href="/admin">
                                    <span className="text-ivory hover:text-champagne transition-colors cursor-pointer text-sm font-medium whitespace-nowrap">لوحة التحكم</span>
                                </Link>
                            )}
                            <Link href="/dashboard">
                                <span className="text-ivory hover:text-champagne transition-colors cursor-pointer text-sm font-medium whitespace-nowrap">دوراتي</span>
                            </Link>
                            <button onClick={() => signOut()} className="text-ivory/50 hover:text-red-400 transition-colors cursor-pointer text-sm font-medium whitespace-nowrap">
                                خروج
                            </button>
                        </>
                    ) : (
                        <Link href="/login">
                            <span className="text-ivory/50 hover:text-ivory transition-colors cursor-pointer text-sm font-medium whitespace-nowrap">دخول</span>
                        </Link>
                    )}
                    <Link href="/checkout">
                        <MagneticButton className="px-6 py-2.5 bg-champagne text-obsidian shadow-[0_0_20px_rgba(201,168,76,0.15)] whitespace-nowrap text-sm font-bold">
                            ابدأ التعلم
                        </MagneticButton>
                    </Link>
                </div>
            </nav>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-20 left-4 right-4 bg-obsidian/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col gap-6 shadow-2xl pointer-events-auto lg:hidden"
                    >
                        <ul className="flex flex-col gap-4 text-center">
                            {navLinks.map((item) => (
                                <li key={item.path} className="text-ivory/80 hover:text-champagne text-lg font-heading transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}>
                                    <Link href={item.path}>
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="h-px w-full bg-white/10" />
                        <div className="flex flex-col gap-4">
                            {session ? (
                                <>
                                    {session.user?.role === 'ADMIN' && (
                                        <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                                            <div className="w-full text-center py-3 text-ivory hover:text-champagne transition-colors font-medium">لوحة التحكم</div>
                                        </Link>
                                    )}
                                    <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                                        <div className="w-full text-center py-3 text-champagne hover:text-white transition-colors font-bold">دوراتي</div>
                                    </Link>
                                    <button onClick={() => { signOut(); setIsMobileMenuOpen(false); }} className="w-full text-center py-3 text-red-400/80 hover:text-red-400 transition-colors font-medium">
                                        تسجيل الخروج
                                    </button>
                                </>
                            ) : (
                                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                    <div className="w-full text-center py-3 text-ivory/80 hover:text-ivory transition-colors font-medium">دخول للحساب</div>
                                </Link>
                            )}
                            <Link href="/checkout" onClick={() => setIsMobileMenuOpen(false)}>
                                <button className="w-full py-4 bg-champagne text-obsidian rounded-xl font-bold shadow-[0_0_20px_rgba(201,168,76,0.15)]">
                                    ابدأ التعلم الآن
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
