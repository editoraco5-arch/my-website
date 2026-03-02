import prisma from "../../../../lib/prisma";
import { updateContent, createChapter, deleteChapter } from "../../../actions";
import Link from "next/link";
import { ArrowRight, Save, Image as ImageIcon, Plus, ListVideo, Edit } from "lucide-react";
import { notFound } from "next/navigation";
import DeleteChapterButton from "./DeleteChapterButton";
import ImagePreviewInput from "../../../components/ImagePreviewInput";

export default async function EditCoursePage({ params }) {
    // Next 15 best practice: await the params object entirely
    const resolvedParams = await params;

    if (!resolvedParams?.id) {
        notFound();
    }

    const content = await prisma.content.findUnique({
        where: { id: resolvedParams.id },
        include: { chapters: { orderBy: { order: 'asc' } } }
    });

    if (!content) {
        notFound();
    }

    // We bind the ID to the action so it knows what to update
    const updateContentWithId = updateContent.bind(null, resolvedParams.id);
    const createChapterWithId = createChapter.bind(null, resolvedParams.id);

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                <Link href="/admin/courses" className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                    <ArrowRight className="w-5 h-5" />
                </Link>
                <div>
                    <h2 className="text-2xl font-bold font-heading text-white">تعديل المحتوى</h2>
                    <p className="text-gray-400 text-sm">أنت تقوم الآن بتعديل "{content.title}"</p>
                </div>
            </div>

            <form action={updateContentWithId} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Form Fields */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-obsidian border border-white/5 rounded-2xl p-6 md:p-8 shadow-xl">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-white mb-2">عنوان المحتوى <span className="text-red-400">*</span></label>
                                <input name="title" defaultValue={content.title} required placeholder="العنوان الواضح والجذاب..." className="w-full bg-[#0D0D12] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-champagne/50 transition-colors text-lg" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white mb-2">الوصف الكامل</label>
                                <textarea name="description" defaultValue={content.description || ""} rows="5" placeholder="اكتب تفاصيل الدورة، وماذا سيتعلم الطالب..." className="w-full bg-[#0D0D12] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-champagne/50 transition-colors font-drama leading-relaxed"></textarea>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                                <div>
                                    <label className="block text-sm font-medium text-white mb-2">ماذا سيتعلم الطالب؟ (الفوائد)</label>
                                    <textarea name="benefits" defaultValue={content.benefits || ""} rows="3" placeholder="اكتب الفوائد أو المخرجات التعليمية (كل نقطة في سطر)..." className="w-full bg-[#0D0D12] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-champagne/50 transition-colors text-sm"></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-white mb-2">متطلبات الدورة</label>
                                    <textarea name="requirements" defaultValue={content.requirements || ""} rows="3" placeholder="المهارات أو الأدوات المطلوبة قبل البدء (كل نقطة في سطر)..." className="w-full bg-[#0D0D12] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-champagne/50 transition-colors text-sm"></textarea>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-white mb-2">لمن هذه الدورة؟ (الجمهور المستهدف)</label>
                                    <input name="targetAudience" defaultValue={content.targetAudience || ""} placeholder="مثال: المصممين، المبتدئين في المونتاج..." className="w-full bg-[#0D0D12] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-champagne/50 transition-colors" />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/5">
                                <div>
                                    <label className="block text-sm font-medium text-white mb-2">السعر (ر.س)</label>
                                    <input name="price" defaultValue={content.price || ""} type="number" step="0.01" placeholder="مثال: 199.99" className="w-full bg-[#0D0D12] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-champagne/50 transition-colors" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-obsidian border border-white/5 rounded-2xl p-6 md:p-8 shadow-xl">
                        <h3 className="text-lg font-bold text-white mb-6 border-b border-white/5 pb-4">الوسائط</h3>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-white mb-2">رابط صورة الغلاف</label>
                                <ImagePreviewInput name="imageUrl" defaultValue={content.imageUrl || ""} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white mb-2">رابط الفيديو التعريفي</label>
                                <input name="videoUrl" defaultValue={content.videoUrl || ""} type="text" placeholder="https://youtube.com/..." dir="ltr" className="w-full bg-[#0D0D12] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-champagne/50 text-left" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Config Fields */}
                <div className="space-y-6">
                    <div className="bg-obsidian border border-white/5 rounded-2xl p-6 shadow-xl sticky top-24">
                        <h3 className="text-lg font-bold text-white mb-6 border-b border-white/5 pb-4">الإعدادات وتحديث الحالة</h3>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-white mb-2">نوع المحتوى</label>
                                <select name="type" defaultValue={content.type} className="w-full bg-[#0D0D12] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-champagne/50 transition-colors cursor-pointer appearance-none">
                                    <option value="COURSE">دورة كاملة</option>
                                    <option value="LESSON">درس فردي</option>
                                    <option value="ARTICLE">مقال نصي</option>
                                </select>
                            </div>

                            <div className="pt-2 border-t border-white/5">
                                <label className="flex items-start gap-4 cursor-pointer group bg-midnight-950/50 p-4 rounded-xl border border-white/5 hover:border-champagne/30 transition-colors">
                                    <div className="pt-1">
                                        <input name="published" defaultChecked={content.published} type="checkbox" className="w-5 h-5 accent-green-500 bg-midnight-800 border-white/20 rounded cursor-pointer" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white mb-1">منشور للعامة</p>
                                        <p className="text-xs text-gray-500 leading-relaxed max-w-[200px]">إذا ألغيت التحديد، سيتحول المحتوى إلى مسودة ولن يظهر للطلاب.</p>
                                    </div>
                                </label>
                            </div>

                            <div className="pt-4 flex flex-col gap-3">
                                <button type="submit" className="w-full bg-blue-500 text-white py-3.5 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-blue-400 hover:-translate-y-0.5 transition-all shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                                    <Save className="w-5 h-5 text-white/90" />
                                    <span>تحديث البيانات</span>
                                </button>
                                <Link href="/admin/courses" className="w-full bg-white/5 text-white py-3.5 rounded-xl font-medium flex justify-center items-center hover:bg-white/10 transition-colors">
                                    إلغاء التعديل
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            {/* Chapters Section */}
            {content.type === 'COURSE' && (
                <div className="bg-obsidian border border-white/5 rounded-2xl p-6 md:p-8 shadow-xl">
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
                        <div className="flex items-center gap-3">
                            <ListVideo className="w-6 h-6 text-champagne" />
                            <h3 className="text-xl font-bold text-white">دروس الدورة (Chapters)</h3>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* List of existing chapters */}
                        {content.chapters && content.chapters.length > 0 ? (
                            <div className="space-y-3">
                                {content.chapters.map((chapter) => (
                                    <div key={chapter.id} className="bg-[#0D0D12] border border-white/10 rounded-xl p-4 flex items-center justify-between">
                                        <div>
                                            <p className="font-bold text-white">{chapter.order}. {chapter.title}</p>
                                            {chapter.videoUrl && (
                                                <Link href={chapter.videoUrl} target="_blank" className="text-xs text-champagne hover:underline mt-1 inline-block">
                                                    رابط الفيديو
                                                </Link>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Link href={`/admin/courses/${content.id}/chapters/${chapter.id}/edit`} className="p-2 text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-lg">
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                            <DeleteChapterButton chapterId={chapter.id} contentId={content.id} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-6 text-gray-500 bg-white/5 rounded-xl border border-white/5 border-dashed">
                                لا يوجد دروس مضافة بعد.
                            </div>
                        )}

                        {/* Add new chapter form */}
                        <div className="pt-6 border-t border-white/5">
                            <h4 className="text-lg font-bold text-white mb-4">إضافة درس جديد</h4>
                            <form action={createChapterWithId} className="grid grid-cols-1 md:grid-cols-12 gap-4">
                                <div className="md:col-span-5">
                                    <input name="title" required placeholder="عنوان الدرس..." className="w-full bg-[#0D0D12] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-champagne/50" />
                                </div>
                                <div className="md:col-span-4">
                                    <input name="videoUrl" type="text" placeholder="رابط فيديو الدرس..." dir="ltr" className="w-full bg-[#0D0D12] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-champagne/50 text-left" />
                                </div>
                                <div className="md:col-span-2">
                                    <input name="order" type="number" defaultValue={(content.chapters?.length || 0) + 1} placeholder="الترتيب" className="w-full bg-[#0D0D12] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-champagne/50" />
                                </div>
                                <div className="md:col-span-1 flex items-end">
                                    <button type="submit" className="w-full h-[50px] bg-white text-midnight-950 rounded-xl font-bold flex justify-center items-center hover:bg-champagne transition-colors">
                                        <Plus className="w-5 h-5" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
