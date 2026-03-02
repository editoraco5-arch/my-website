import { getServerSession } from 'next-auth/next';
import { authOptions } from '../lib/authOptions';
import { redirect } from 'next/navigation';
import { getMyEnrollments } from '../admin/actions/enrollment';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import { Play, BookOpen, Clock, BarChart, ListVideo } from 'lucide-react';

export const metadata = {
    title: 'دوراتي | Editora',
    description: 'تصفح جميع الدورات التي اشتركت بها على منصة Editora',
};

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user) redirect('/login?redirect=/dashboard');

    const enrollments = await getMyEnrollments();

    return (
        <main className="min-h-screen bg-midnight-900 relative" dir="rtl">
            <Navbar />

            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-champagne/5 rounded-full blur-[180px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

            <div className="pt-32 pb-24 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Header */}
                    <div className="mb-12">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 rounded-2xl bg-champagne/10 border border-champagne/20 flex items-center justify-center text-2xl font-bold text-champagne font-heading">
                                {session.user.name?.charAt(0) || 'U'}
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white font-heading">مرحباً، {session.user.name || 'بك'}!</h1>
                                <p className="text-gray-400 text-sm mt-1">لوحة التحكم الخاصة بك</p>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-6">
                            <div className="bg-obsidian border border-white/10 rounded-2xl px-6 py-4 flex items-center gap-3">
                                <BookOpen className="w-5 h-5 text-champagne" />
                                <div>
                                    <div className="text-2xl font-bold text-white font-heading">{enrollments.length}</div>
                                    <div className="text-xs text-gray-400">دورة مسجل بها</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Courses Grid */}
                    {enrollments.length === 0 ? (
                        <div className="text-center py-24 bg-obsidian border border-white/5 rounded-3xl">
                            <ListVideo className="w-16 h-16 text-white/10 mx-auto mb-6" />
                            <h2 className="text-2xl font-bold text-white font-heading mb-3">لا توجد دورات بعد</h2>
                            <p className="text-gray-400 mb-8">ابدأ رحلتك التعليمية بالاشتراك في دورة جديدة</p>
                            <Link href="/courses"
                                className="inline-flex items-center gap-2 bg-champagne text-midnight-900 py-3 px-8 rounded-xl font-bold hover:bg-white transition-colors">
                                <BookOpen className="w-5 h-5" />
                                تصفح الدورات
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <h2 className="text-xl font-bold text-white font-heading mb-6">دوراتي</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {enrollments.map(({ content, createdAt }) => (
                                    <Link key={content.id} href={`/courses/${content.id}`}
                                        className="group bg-obsidian border border-white/10 rounded-3xl overflow-hidden hover:border-champagne/30 transition-all hover:-translate-y-1 shadow-lg hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.4)]">
                                        {/* Thumbnail */}
                                        <div className="aspect-video bg-midnight-950 relative overflow-hidden">
                                            {content.imageUrl ? (
                                                <img src={content.imageUrl} alt={content.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            ) : (
                                                <div className="absolute inset-0 bg-gradient-to-tr from-midnight-950 to-midnight-800 flex items-center justify-center">
                                                    <Play className="w-12 h-12 text-white/10" />
                                                </div>
                                            )}
                                            {/* Play overlay */}
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                                                <div className="w-12 h-12 rounded-full bg-champagne opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 flex items-center justify-center shadow-lg">
                                                    <Play className="w-5 h-5 text-midnight-950 ml-0.5" fill="currentColor" />
                                                </div>
                                            </div>
                                            {/* Enrolled badge */}
                                            <div className="absolute top-3 right-3 bg-champagne text-midnight-950 text-xs font-bold px-2.5 py-1 rounded-full">
                                                ✓ مسجل
                                            </div>
                                        </div>

                                        {/* Info */}
                                        <div className="p-5">
                                            <h3 className="font-bold text-white font-heading text-base mb-3 leading-snug line-clamp-2 group-hover:text-champagne transition-colors">
                                                {content.title}
                                            </h3>
                                            <div className="flex items-center gap-3 text-xs text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <ListVideo className="w-3.5 h-3.5" />
                                                    <span>{content.chapters?.length || 0} درس</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <BarChart className="w-3.5 h-3.5" />
                                                    <span>{content.level}</span>
                                                </div>
                                                {content.duration && (
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="w-3.5 h-3.5" />
                                                        <span>{content.duration}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                                                <span className="text-xs text-gray-500">
                                                    تسجيل في {new Date(createdAt).toLocaleDateString('ar-SA')}
                                                </span>
                                                <span className="text-xs text-champagne font-bold flex items-center gap-1">
                                                    <Play className="w-3 h-3" /> متابعة
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </main>
    );
}
