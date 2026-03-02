import prisma from "../../../../../../lib/prisma";
import { updateChapter } from "../../../../../actions";
import Link from "next/link";
import { ArrowRight, Save, Video } from "lucide-react";
import { notFound } from "next/navigation";

export default async function EditChapterPage({ params }) {
    // Next 15 best practice: await the params object entirely
    const resolvedParams = await params;
    const { id: contentId, chapterId } = resolvedParams;

    if (!contentId || !chapterId) {
        notFound();
    }

    const chapter = await prisma.chapter.findUnique({
        where: { id: chapterId, contentId: contentId }
    });

    if (!chapter) {
        notFound();
    }

    const content = await prisma.content.findUnique({
        where: { id: contentId },
        select: { title: true }
    });

    const updateChapterWithIds = updateChapter.bind(null, chapter.id, contentId);

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                <Link href={`/admin/courses/${contentId}/edit`} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                    <ArrowRight className="w-5 h-5" />
                </Link>
                <div>
                    <h2 className="text-2xl font-bold font-heading text-white">تعديل الدرس: {chapter.title}</h2>
                    <p className="text-gray-400 text-sm">أنت تقوم الآن بتعديل درس ضمن دورة "{content?.title || "الدورة"}"</p>
                </div>
            </div>

            <form action={updateChapterWithIds} className="bg-obsidian border border-white/5 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">

                <div>
                    <label className="block text-sm font-medium text-white mb-2">عنوان الدرس <span className="text-red-400">*</span></label>
                    <input name="title" defaultValue={chapter.title} required placeholder="العنوان الواضح والجذاب..." className="w-full bg-[#0D0D12] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-champagne/50 transition-colors" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-white mb-2">رابط فيديو الدرس</label>
                    <input name="videoUrl" defaultValue={chapter.videoUrl || ""} type="text" placeholder="https://youtube.com/..." dir="ltr" className="w-full bg-[#0D0D12] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-champagne/50 text-left" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-white mb-2">الترتيب</label>
                    <input name="order" defaultValue={chapter.order} type="number" placeholder="ترتيب الدرس" className="w-full bg-[#0D0D12] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-champagne/50" />
                </div>

                <div className="pt-6 flex flex-col md:flex-row items-center gap-3 border-t border-white/5">
                    <button type="submit" className="w-full md:w-auto flex-1 bg-blue-500 text-white py-3.5 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-blue-400 hover:-translate-y-0.5 transition-all shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                        <Save className="w-5 h-5 text-white/90" />
                        <span>حفظ التعديلات</span>
                    </button>
                    <Link href={`/admin/courses/${contentId}/edit`} className="w-full md:w-auto px-8 py-3.5 bg-transparent border border-white/10 text-white rounded-xl font-medium flex justify-center items-center hover:bg-white/5 transition-colors">
                        إلغاء
                    </Link>
                </div>
            </form>
        </div>
    );
}
