"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, Settings, LogOut, ExternalLink, Menu, X } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";

export default function AdminSidebar() {
    const pathname = usePathname();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const routes = [
        { href: "/admin", label: "نظرة عامة", icon: LayoutDashboard },
        { href: "/admin/courses", label: "إدارة المحتوى", icon: BookOpen },
        { href: "/admin/settings/site", label: "إعدادات الموقع", icon: Settings },
    ];

    return (
        <>
            {/* Mobile Nav Toggle */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-obsidian border-b border-white/5 z-50 px-6 flex items-center justify-between">
                <Link href="/admin" className="text-xl font-bold tracking-tighter text-ivory font-heading">
                    Editora<span className="text-champagne">.</span> <span className="text-sm font-normal text-gray-500">| لوحة التحكم</span>
                </Link>
                <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="text-gray-300 hover:text-white transition-colors">
                    {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Sidebar Overlay (Mobile) */}
            {isMobileOpen && (
                <div className="md:hidden fixed inset-0 bg-black/80 z-40 backdrop-blur-sm" onClick={() => setIsMobileOpen(false)} />
            )}

            {/* Sidebar Navigation */}
            <aside className={`fixed md:sticky top-0 right-0 h-full max-h-screen w-64 bg-obsidian border-l border-white/5 flex flex-col z-50 transition-transform duration-300 transform ${isMobileOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}`}>

                {/* Brand Logo */}
                <div className="h-20 flex items-center px-8 border-b border-white/5 hidden md:flex">
                    <Link href="/admin" className="text-2xl font-bold tracking-tighter text-ivory font-heading">
                        Editora<span className="text-champagne">.</span>
                    </Link>
                </div>

                {/* Main Navigation */}
                <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-2 mt-16 md:mt-0 text-right" dir="rtl">
                    <p className="px-4 text-xs font-bold text-gray-500 mb-4 uppercase tracking-wider font-heading">القائمة الرئيسية</p>

                    {routes.map((route) => {
                        const Icon = route.icon;
                        const isActive = pathname === route.href || (route.href !== '/admin' && pathname.startsWith(route.href));

                        return (
                            <Link
                                key={route.href}
                                href={route.href}
                                onClick={() => setIsMobileOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${isActive ? "bg-champagne/10 text-champagne font-bold" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
                            >
                                <Icon className={`w-5 h-5 transition-transform ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
                                <span>{route.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Actions */}
                <div className="p-4 border-t border-white/5 space-y-2 text-right" dir="rtl">
                    <Link href="/" target="_blank" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300 group">
                        <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span>عرض الموقع المباشر</span>
                    </Link>
                    <button onClick={() => signOut()} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500/80 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 group">
                        <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span>تسجيل الخروج</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
