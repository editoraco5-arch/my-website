import prisma from '../../lib/prisma';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../lib/authOptions';
import { isEnrolled } from '../../admin/actions/enrollment';
import {
    Play, CheckCircle, Clock, BarChart, FileText,
    Monitor, ChevronRight, ExternalLink, ListVideo, Lock, ShieldCheck
} from 'lucide-react';
import EnrollButton from './EnrollButton';

export async function generateMetadata({ params }) {
    const resolvedParams = await params;
    const course = await prisma.content.findUnique({ where: { id: resolvedParams.id } });
    if (!course) return { title: 'دورة غير موجودة | Editora' };
    return {
        title: `${course.title} | Editora`,
        description: course.description?.substring(0, 160) || 'شاهد هذه الدورة المميزة على منصة Editora',
    };
}

export default async function CourseDetailPage({ params, searchParams }) {
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;

    const session = await getServerSession(authOptions);

    const course = await prisma.content.findUnique({
        where: { id: resolvedParams.id },
        include: {
            author: { select: { name: true, image: true } },
            chapters: { orderBy: { order: 'asc' } }
        }
    });

    if (!course || !course.published) notFound();

    // Check enrollment status
    const enrolled = session?.user?.id ? await isEnrolled(session.user.id, course.id) : false;
    const isAdmin = session?.user?.role === 'ADMIN';
    const hasAccess = enrolled || isAdmin; // Admins always have access

    const parseList = (text) => text ? text.split('\n').filter(line => line.trim() !== '') : [];
    const benefitsList = parseList(course.benefits);
    const requirementsList = parseList(course.requirements);

    const currentChapterId = resolvedSearchParams?.chapter;

    let activeVideoUrl = null;
    let activeChapterId = null;
    let activeChapterTitle = 'مقدمة الدورة';

    if (hasAccess) {
        // Only enrolled users can play videos
        activeVideoUrl = course.videoUrl;
        if (currentChapterId && course.chapters?.length > 0) {
            const chapter = course.chapters.find(c => c.id === currentChapterId);
            if (chapter) {
                activeVideoUrl = chapter.videoUrl || activeVideoUrl;
                activeChapterId = chapter.id;
                activeChapterTitle = chapter.title;
            }
        } else if (course.chapters?.length > 0 && !activeVideoUrl) {
            activeVideoUrl = course.chapters[0].videoUrl;
            activeChapterId = course.chapters[0].id;
            activeChapterTitle = course.chapters[0].title;
        }
    }

    const getEmbedUrl = (url) => {
        if (!url) return null;
        if (url.includes('youtube.com/watch?v=')) return url.replace('watch?v=', 'embed/');
        if (url.includes('youtu.be/')) return url.replace('youtu.be/', 'youtube.com/embed/');
        if (url.includes('vimeo.com/')) return url.replace('vimeo.com/', 'player.vimeo.com/video/');
        return url;
    };

    const embedUrl = getEmbedUrl(activeVideoUrl);

    return (
        <main className="min-h-screen bg-midnight-900 relative" dir="rtl">
            <Navbar />

            <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-champagne/5 rounded-full blur-[180px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

            <div className="pt-32 pb-24 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-8 font-medium">
                        <Link href="/courses" className="hover:text-champagne transition-colors">الدورات</Link>
                        <ChevronRight className="w-4 h-4 rotate-180" />
                        <span className="text-white">{course.title}</span>
                    </div>

                    {/* Course Title (Moved here for better layout) */}
                    <div className="mb-12">
                        <h1 className="text-3xl md:text-5xl font-bold font-heading text-white mb-4 leading-tight">
                            {course.title}
                        </h1>
                        {course.description && (
                            <p className="text-xl text-gray-300 mb-6 leading-relaxed font-light">{course.description}</p>
                        )}
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-champagne/20 flex items-center justify-center text-champagne font-bold text-xs shrink-0">
                                {course.author?.name ? course.author.name.charAt(0) : 'E'}
                            </div>
                            <span className="text-gray-400 text-sm">بواسطة <span className="text-white font-medium">{course.author?.name || 'الإدارة'}</span></span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start relative">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-10 order-1">
                            {/* Video Player (only for enrolled users) */}
                            {hasAccess && embedUrl && (
                                <div id="video-player" className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl scroll-mt-32">
                                    <div className="bg-champagne text-midnight-950 font-bold text-sm px-4 py-2 flex items-center gap-2">
                                        <Play className="w-4 h-4" fill="currentColor" />
                                        يتم عرض: {activeChapterTitle}
                                    </div>
                                    <div className="aspect-video bg-black">
                                        <iframe
                                            src={embedUrl}
                                            className="w-full h-full"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Chapters List (full access for enrolled) */}
                            {course.chapters?.length > 0 && (
                                <div className="bg-obsidian border border-white/10 rounded-3xl overflow-hidden shadow-xl">
                                    <div className="p-5 bg-white/5 border-b border-white/10 flex items-center gap-3">
                                        <ListVideo className="w-5 h-5 text-champagne" />
                                        <h2 className="text-lg font-bold text-white font-heading">
                                            محتوى الدورة ({course.chapters.length} درس)
                                        </h2>
                                        {hasAccess && (
                                            <span className="mr-auto text-xs text-champagne flex items-center gap-1">
                                                <ShieldCheck className="w-3 h-3" /> وصول كامل
                                            </span>
                                        )}
                                    </div>
                                    <div className="divide-y divide-white/5">
                                        {course.chapters.map((chapter, index) => {
                                            const isActive = chapter.id === activeChapterId;
                                            return hasAccess ? (
                                                <Link
                                                    key={chapter.id}
                                                    href={`/courses/${course.id}?chapter=${chapter.id}#video-player`}
                                                    className={`flex items-center gap-4 p-5 transition-colors hover:bg-white/5 ${isActive ? 'bg-champagne/10 border-r-2 border-r-champagne' : ''}`}
                                                    scroll={true}
                                                >
                                                    <div className={`w-8 h-8 flex items-center justify-center shrink-0 text-xs font-bold rounded-full ${isActive ? 'bg-champagne text-midnight-950' : 'bg-white/10 text-gray-400'}`}>
                                                        {index + 1}
                                                    </div>
                                                    <div className="flex-1">
                                                        <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-300'}`}>
                                                            {chapter.title}
                                                        </span>
                                                    </div>
                                                    <Play className={`w-4 h-4 shrink-0 ${isActive ? 'text-champagne' : 'text-gray-600'}`} />
                                                </Link>
                                            ) : (
                                                <div key={chapter.id} className="flex items-center gap-4 p-5 opacity-60 cursor-not-allowed">
                                                    <div className="w-8 h-8 flex items-center justify-center shrink-0 text-xs font-bold rounded-full bg-white/5 text-gray-500">
                                                        {index + 1}
                                                    </div>
                                                    <div className="flex-1">
                                                        <span className="text-sm font-medium text-gray-500">{chapter.title}</span>
                                                    </div>
                                                    <Lock className="w-4 h-4 shrink-0 text-gray-600" />
                                                </div>
                                            );
                                        })}
                                    </div>
                                    {!hasAccess && (
                                        <div className="p-5 bg-champagne/5 border-t border-champagne/10 text-center">
                                            <p className="text-sm text-champagne font-medium">🔒 سجل في الدورة للوصول إلى جميع الدروس</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Benefits */}
                            {benefitsList.length > 0 && (
                                <div className="bg-obsidian border border-white/5 rounded-3xl p-8 shadow-xl">
                                    <h2 className="text-2xl font-bold text-white mb-6 font-heading">ماذا ستتعلم في هذه الدورة؟</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {benefitsList.map((benefit, index) => (
                                            <div key={index} className="flex items-start gap-4">
                                                <div className="mt-1 w-5 h-5 rounded-full bg-champagne/10 flex items-center justify-center shrink-0">
                                                    <CheckCircle className="w-3.5 h-3.5 text-champagne" />
                                                </div>
                                                <p className="text-gray-300 leading-relaxed text-sm md:text-base">{benefit}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Requirements */}
                            {requirementsList.length > 0 && (
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-4 font-heading flex items-center gap-2">
                                        <FileText className="w-6 h-6 text-champagne" /> المتطلبات
                                    </h3>
                                    <ul className="list-disc list-inside space-y-2 text-gray-300 text-lg marker:text-champagne/50">
                                        {requirementsList.map((req, index) => <li key={index}>{req}</li>)}
                                    </ul>
                                </div>
                            )}

                            {/* Target Audience */}
                            {course.targetAudience && (
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-4 font-heading flex items-center gap-2">
                                        <Monitor className="w-6 h-6 text-champagne" /> لمن هذه الدورة؟
                                    </h3>
                                    <p className="text-gray-300 text-lg leading-relaxed">{course.targetAudience}</p>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1 order-2">
                            <div className="sticky top-32 bg-obsidian border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                                {/* Cover Image */}
                                <div className="aspect-video bg-black/80 relative flex items-center justify-center border-b border-white/5">
                                    {course.imageUrl ? (
                                        <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="absolute inset-0 bg-gradient-to-tr from-midnight-950 to-midnight-800 flex items-center justify-center flex-col gap-3">
                                            <ListVideo className="w-10 h-10 text-white/20" />
                                            <span className="text-white/40 text-sm font-medium">محتوى الدورة</span>
                                        </div>
                                    )}
                                    {!hasAccess && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                            <div className="w-16 h-16 rounded-full bg-black/80 border border-white/20 flex items-center justify-center">
                                                <Lock className="w-8 h-8 text-champagne" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="p-8">
                                    {/* Price / Access indicator */}
                                    {hasAccess ? (
                                        <div className="flex items-center gap-2 mb-6 text-champagne">
                                            <ShieldCheck className="w-5 h-5" />
                                            <span className="font-bold text-lg">لديك وصول كامل</span>
                                        </div>
                                    ) : (
                                        <div className="mb-6">
                                            <div className="text-4xl font-bold text-white font-heading tracking-tight">
                                                {course.price ? `${course.price} ر.س` : 'مجانًا'}
                                            </div>
                                        </div>
                                    )}

                                    {/* CTA Button */}
                                    {hasAccess ? (
                                        <Link href={`/courses/${course.id}?chapter=${activeChapterId || course.chapters?.[0]?.id || ''}#video-player`}
                                            className="w-full bg-champagne text-midnight-900 py-4 px-6 rounded-xl font-bold text-lg flex justify-center items-center gap-2 hover:bg-white hover:-translate-y-1 transition-all shadow-[0_10px_30px_rgba(201,168,76,0.2)] mb-4"
                                            scroll={true}>
                                            <Play className="w-5 h-5" fill="currentColor" />
                                            <span>متابعة التعلم</span>
                                        </Link>
                                    ) : course.price !== null && course.price >= 0 ? (
                                        <EnrollButton courseId={course.id} price={course.price} isLoggedIn={!!session?.user} />
                                    ) : (
                                        <button className="w-full bg-champagne/10 border border-champagne/30 text-champagne py-4 px-6 rounded-xl font-bold text-lg flex justify-center items-center gap-2 cursor-not-allowed mb-4">
                                            غير متاح للتسجيل حالياً
                                        </button>
                                    )}

                                    <p className="text-center text-xs text-gray-500 mt-4 leading-relaxed">
                                        {hasAccess ? 'استمتع بالوصول الكامل لجميع دروس الدورة' :
                                            course.price !== null ? 'دفع آمن ومشفر 100% • ضمان استرداد 30 يوم' :
                                                'هذه الدورة قيد الإعداد والمراجعة'}
                                    </p>


                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </main>
    );
}
