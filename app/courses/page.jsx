import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import prisma from '../lib/prisma';
import Link from 'next/link';
import { Play } from 'lucide-react';

export const metadata = {
    title: 'الدورات والمحتوى | Editora',
};

// Force dynamic rendering to always fetch fresh data from the database
export const dynamic = 'force-dynamic';

export default async function CoursesPage() {
    // Fetch only published content
    const contents = await prisma.content.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' },
        include: {
            author: {
                select: { name: true }
            }
        }
    });

    return (
        <main className="min-h-screen bg-midnight-900 overflow-hidden relative">
            <Navbar />

            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-champagne/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto relative z-10">
                <div className="text-center md:text-right mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4 text-white">الدورات <span className="text-champagne">والمحتوى</span></h1>
                    <p className="text-gray-400 max-w-2xl text-lg">تعلم أسرار صناعة المحتوى والمونتاج الاحترافي من خلال دوراتنا المتجددة.</p>
                </div>

                {contents.length === 0 ? (
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-16 text-center backdrop-blur-sm">
                        <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Play className="w-8 h-8 text-champagne opacity-50" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">لا توجد دورات حالياً</h3>
                        <p className="text-gray-400">نعمل على تجهيز محتوى حصري قريباً، ابق على اطلاع!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {contents.map(course => (
                            <div key={course.id} className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:border-champagne/30 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(201,168,76,0.1)]">
                                <div className="aspect-video bg-black/50 relative overflow-hidden">
                                    {course.imageUrl ? (
                                        <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <Play className="w-12 h-12 text-champagne/30" />
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4 bg-obsidian/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-medium text-champagne">
                                        {course.type === 'COURSE' ? 'دورة متكاملة' : 'درس سريع'}
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-1">
                                    <Link href={`/courses/${course.id}`} className="hover:text-champagne transition-colors">
                                        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{course.title}</h3>
                                    </Link>
                                    {course.description && (
                                        <p className="text-gray-400 text-sm mb-4 line-clamp-3">{course.description}</p>
                                    )}
                                    <div className="flex justify-between items-center mt-6 pt-6 border-t border-white/10">
                                        <div className="text-sm text-gray-400">
                                            بواسطة <span className="text-white">{course.author?.name || 'الإدارة'}</span>
                                        </div>
                                        <Link href={`/courses/${course.id}`} className="text-champagne font-medium text-sm flex items-center gap-2 hover:text-white transition-colors">
                                            شاهد الآن
                                            <Play className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
