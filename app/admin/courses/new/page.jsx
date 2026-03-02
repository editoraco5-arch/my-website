import { createContent } from "../../actions";
import Link from "next/link";
import { ArrowRight, Save, Image as ImageIcon } from "lucide-react";
import ImagePreviewInput from "../../components/ImagePreviewInput";

export default function NewCoursePage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                <Link href="/admin/courses" className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                    <ArrowRight className="w-5 h-5" />
                </Link>
                <div>
                    <h2 className="text-2xl font-bold font-heading text-white">إضافة محتوى جديد</h2>
                    <p className="text-gray-400 text-sm">قم بإنشاء دورة أو درس جديد ونشره فوراً.</p>
                </div>
            </div>

            <form action={createContent} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Form Fields */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-obsidian border border-white/5 rounded-2xl p-6 md:p-8 shadow-xl">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-white mb-2">عنوان المحتوى <span className="text-red-400">*</span></label>
                                <input name="title" required placeholder="العنوان الواضح والجذاب..." className="w-full bg-[#0D0D12] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-champagne/50 transition-colors text-lg" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white mb-2">الوصف الكامل</label>
                                <textarea name="description" rows="5" placeholder="اكتب تفاصيل الدورة، وماذا سيتعلم الطالب..." className="w-full bg-[#0D0D12] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-champagne/50 transition-colors font-drama leading-relaxed"></textarea>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                                <div>
                                    <label className="block text-sm font-medium text-white mb-2">ماذا سيتعلم الطالب؟ (الفوائد)</label>
                                    <textarea name="benefits" rows="3" placeholder="اكتب الفوائد أو المخرجات التعليمية (كل نقطة في سطر)..." className="w-full bg-[#0D0D12] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-champagne/50 transition-colors text-sm"></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-white mb-2">متطلبات الدورة</label>
                                    <textarea name="requirements" rows="3" placeholder="المهارات أو الأدوات المطلوبة قبل البدء (كل نقطة في سطر)..." className="w-full bg-[#0D0D12] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-champagne/50 transition-colors text-sm"></textarea>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-white mb-2">لمن هذه الدورة؟ (الجمهور المستهدف)</label>
                                    <input name="targetAudience" placeholder="مثال: المصممين، المبتدئين في المونتاج..." className="w-full bg-[#0D0D12] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-champagne/50 transition-colors" />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/5">
                                <div>
                                    <label className="block text-sm font-medium text-white mb-2">السعر (ر.س)</label>
                                    <input name="price" type="number" step="0.01" placeholder="مثال: 199.99" className="w-full bg-[#0D0D12] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-champagne/50 transition-colors" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-obsidian border border-white/5 rounded-2xl p-6 md:p-8 shadow-xl">
                        <h3 className="text-lg font-bold text-white mb-6 border-b border-white/5 pb-4">الوسائط</h3>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-white mb-2">رابط صورة الغلاف</label>
                                <ImagePreviewInput name="imageUrl" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white mb-2">رابط الفيديو التعريفي</label>
                                <input name="videoUrl" type="text" placeholder="https://youtube.com/..." dir="ltr" className="w-full bg-[#0D0D12] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-champagne/50 text-left" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Config Fields */}
                <div className="space-y-6">
                    <div className="bg-obsidian border border-white/5 rounded-2xl p-6 shadow-xl sticky top-24">
                        <h3 className="text-lg font-bold text-white mb-6 border-b border-white/5 pb-4">النشر والإعدادات</h3>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-white mb-2">نوع المحتوى</label>
                                <select name="type" className="w-full bg-[#0D0D12] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-champagne/50 transition-colors cursor-pointer appearance-none">
                                    <option value="COURSE">دورة كاملة</option>
                                    <option value="LESSON">درس فردي</option>
                                    <option value="ARTICLE">مقال نصي</option>
                                </select>
                            </div>

                            <div className="pt-2 border-t border-white/5">
                                <label className="flex items-start gap-4 cursor-pointer group bg-midnight-950/50 p-4 rounded-xl border border-white/5 hover:border-champagne/30 transition-colors">
                                    <div className="pt-1">
                                        <input name="published" type="checkbox" defaultChecked className="w-5 h-5 accent-green-500 bg-midnight-800 border-white/20 rounded cursor-pointer" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white mb-1">تفعيل النشر فوراً</p>
                                        <p className="text-xs text-gray-500 leading-relaxed max-w-[200px]">عند التفعيل سيتوفر هذا المحتوى للطلاب مباشرة على المنصة.</p>
                                    </div>
                                </label>
                            </div>

                            <div className="pt-4 flex flex-col gap-3">
                                <button type="submit" className="w-full bg-champagne text-midnight-900 py-3.5 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-white hover:-translate-y-0.5 transition-all shadow-[0_0_20px_rgba(201,168,76,0.15)]">
                                    <Save className="w-5 h-5" />
                                    <span>حفظ ونشر</span>
                                </button>
                                <Link href="/admin/courses" className="w-full bg-white/5 text-white py-3.5 rounded-xl font-medium flex justify-center items-center hover:bg-white/10 transition-colors">
                                    إلغاء
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
