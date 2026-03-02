import React from 'react';
import { Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-midnight-900 border-t border-midnight-800 pt-16 pb-8" dir="rtl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">

                    <div className="col-span-1 md:col-span-1 lg:col-span-1">
                        <a href="#" className="flex items-center gap-2 mb-4">
                            <div className="w-6 h-6 rounded bg-accent text-white flex items-center justify-center font-bold text-xs shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                                E
                            </div>
                            <span className="text-xl font-bold tracking-tight text-white">
                                Editora
                            </span>
                        </a>
                        <p className="text-text-muted text-sm leading-relaxed mb-6">
                            منصة تعليمية متكاملة لتمكين صناع المحتوى من احتراف التصوير والمونتاج والخدع البصرية باستخدام أقوى البرامج العالمية.
                        </p>
                        <div className="flex space-x-4 space-x-reverse">
                            <a href="#" className="text-text-muted hover:text-white transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="text-text-muted hover:text-white transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="text-text-muted hover:text-white transition-colors">
                                <Youtube size={20} />
                            </a>
                            <a href="#" className="text-text-muted hover:text-white transition-colors">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">الدورات الرئيسية</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-sm text-text-muted hover:text-accent-glow transition-colors">احتراف DaVinci Resolve</a></li>
                            <li><a href="#" className="text-sm text-text-muted hover:text-accent-glow transition-colors">Premiere Pro المتقدم</a></li>
                            <li><a href="#" className="text-sm text-text-muted hover:text-accent-glow transition-colors">خدع بصرية مع After Effects</a></li>
                            <li><a href="#" className="text-sm text-text-muted hover:text-accent-glow transition-colors">هندسة الصوت السينمائي</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">روابط سريعة</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-sm text-text-muted hover:text-white transition-colors">عن إيديتورا</a></li>
                            <li><a href="#" className="text-sm text-text-muted hover:text-white transition-colors">الخبراء والمدربين</a></li>
                            <li><a href="#" className="text-sm text-text-muted hover:text-white transition-colors">قصص النجاح</a></li>
                            <li><a href="#" className="text-sm text-text-muted hover:text-white transition-colors">الأسئلة الشائعة</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">قانوني</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-sm text-text-muted hover:text-white transition-colors">شروط الاستخدام</a></li>
                            <li><a href="#" className="text-sm text-text-muted hover:text-white transition-colors">سياسة الخصوصية</a></li>
                            <li><a href="#" className="text-sm text-text-muted hover:text-white transition-colors">سياسة الاسترجاع</a></li>
                        </ul>
                    </div>

                </div>

                <div className="border-t border-midnight-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-text-muted">
                        &copy; {new Date().getFullYear()} Editora. جميع الحقوق محفوظة.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-text-muted">
                        <span>صُنع بشغف لصناع المحتوى</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
