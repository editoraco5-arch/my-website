import prisma from "../lib/prisma";
import Link from "next/link";
import { BookOpen, Users, PlayCircle, TrendingUp } from "lucide-react";

export default async function AdminDashboard() {
    // Fetch real stats from DB
    const totalContent = await prisma.content.count();
    const publishedContent = await prisma.content.count({ where: { published: true } });
    const draftContent = totalContent - publishedContent;

    // Fetch registered students (Users with role USER)
    const totalStudents = await prisma.user.count({ where: { role: 'USER' } });

    const stats = [
        { title: "إجمالي المحتوى", value: totalContent, icon: BookOpen, color: "text-blue-400", bg: "bg-blue-400/10" },
        { title: "الدروس المنشورة", value: publishedContent, icon: PlayCircle, color: "text-green-400", bg: "bg-green-400/10" },
        { title: "الطلاب المسجلين", value: totalStudents, icon: Users, color: "text-champagne", bg: "bg-champagne/10" },
        { title: "الأرباح النشطة", value: "0 ر.س", icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-400/10" },
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold mb-1 font-heading text-white">نظرة عامة</h2>
                    <p className="text-gray-400 text-sm">مرحباً بك في لوحة تحكم Editora. إليك ملخص أداء منصتك.</p>
                </div>
                <Link href="/admin/courses/new" className="bg-champagne text-midnight-900 px-6 py-2.5 rounded-xl font-bold hover:bg-white transition-all shadow-lg flex items-center gap-2">
                    <span className="text-xl leading-none">+</span>
                    <span>محتوى جديد</span>
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="bg-obsidian border border-white/5 rounded-2xl p-6 flex flex-col justify-between hover:border-white/10 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-gray-400 font-medium">{stat.title}</span>
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg}`}>
                                    <Icon className={`w-5 h-5 ${stat.color}`} />
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold text-white font-heading">{stat.value}</h3>
                        </div>
                    );
                })}
            </div>

            {/* Quick Actions / Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                <div className="bg-midnight-900/50 border border-white/5 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4 border-b border-white/5 pb-4">حالة المحتوى</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center bg-obsidian p-4 rounded-xl border border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                <span className="text-gray-300">منشور وجاهز</span>
                            </div>
                            <span className="font-bold text-white">{publishedContent}</span>
                        </div>
                        <div className="flex justify-between items-center bg-obsidian p-4 rounded-xl border border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <span className="text-gray-300">مسودات (غير منشورة)</span>
                            </div>
                            <span className="font-bold text-white">{draftContent}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-midnight-900/50 border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                    <BookOpen className="w-16 h-16 text-white/5 mb-4" />
                    <h3 className="text-lg font-bold text-white mb-2">إدارة جميع المحتويات</h3>
                    <p className="text-gray-400 text-sm mb-6 max-w-xs">انتقل إلى صفحة إدارة المحتوى لعرض جميع الدروس والدورات، والتعديل عليها أو حذفها.</p>
                    <Link href="/admin/courses" className="text-champagne hover:text-white transition-colors border border-champagne/30 hover:border-white/30 px-6 py-2.5 rounded-xl font-medium">
                        تصفح المحتوى الكامل
                    </Link>
                </div>
            </div>
        </div>
    );
}
