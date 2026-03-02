import React, { useState, useEffect } from 'react';
import { Menu, X, Play } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'الدورات', href: '#courses' },
        { name: 'الخبراء', href: '#experts' },
        { name: 'الباقات', href: '#pricing' },
    ];

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b border-transparent',
                isScrolled
                    ? 'bg-midnight-900/80 backdrop-blur-xl border-midnight-700/50 py-3'
                    : 'bg-transparent py-5'
            )}
            dir="rtl"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center">
                        <a href="#" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 rounded bg-accent text-white flex items-center justify-center font-bold text-lg shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.8)] transition-all">
                                E
                            </div>
                            <span className="text-xl font-bold tracking-tight text-white group-hover:text-accent-glow transition-colors">
                                Editora
                            </span>
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-text-muted hover:text-white transition-colors py-2 relative group"
                            >
                                {link.name}
                                <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
                            </a>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="hidden md:flex items-center space-x-4 space-x-reverse">
                        <button className="text-sm font-medium text-text-muted hover:text-white transition-colors px-4 py-2">
                            تسجيل الدخول
                        </button>
                        <button className="text-sm font-medium bg-white text-midnight-900 px-5 py-2 rounded-full hover:bg-gray-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                            ابدأ الآن
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-text-muted hover:text-white"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden absolute top-full left-0 w-full bg-midnight-800 border-b border-midnight-700 shadow-xl"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-1">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="block px-3 py-3 rounded-md text-base font-medium text-text-muted hover:text-white hover:bg-midnight-700 transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <div className="mt-6 pt-6 border-t border-midnight-700 flex flex-col gap-3">
                                <button className="w-full text-center text-sm font-medium text-text-muted hover:text-white transition-colors py-2 border border-midnight-700 rounded-lg">
                                    تسجيل الدخول
                                </button>
                                <button className="w-full text-center text-sm font-medium bg-white text-midnight-900 py-3 rounded-lg hover:bg-gray-200 transition-colors">
                                    ابدأ التعلم الآن
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
