import prisma from "../../lib/prisma";
import Link from "next/link";
import { Plus, Edit2, Search, ExternalLink, BookOpen } from "lucide-react";
import { deleteContent } from "../actions";
import DeleteButton from "./DeleteButton";

export default async function CoursesAdminPage() {
    const contents = await prisma.content.findMany({
        orderBy: { createdAt: 'desc' },
        include: { author: { select: { name: true } } }
    });

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold mb-1 font-heading text-white">إدارة المحتوى</h2>
                    <p className="text-gray-400 text-sm">عرض وتحرير جميع الدورات والدروس والمقالات.</p>
                </div>
                <Link href="/admin/courses/new" className="bg-white text-midnight-950 px-5 py-2.5 rounded-xl font-bold hover:bg-champagne transition-colors shadow-lg flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    <span>إضافة محتوى جديد</span>
                </Link>
            </div>

            {/* Filters / Search Bar */}
            <div className="bg-obsidian border border-white/5 rounded-2xl p-4 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input type="text" placeholder="البحث برقم الدورة أو العنوان..." className="w-full bg-[#0D0D12] border border-white/10 rounded-xl pr-12 pl-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-champagne/50 transition-colors" />
                </div>
                <select className="bg-[#0D0D12] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-champagne/50 min-w-[150px] cursor-pointer appearance-none">
                    <option value="">جميع الأنواع</option>
                    <option value="COURSE">دورات</option>
                    <option value="LESSON">دروس</option>
                    <option value="ARTICLE">مقالات</option>
                </select>
                <select className="bg-[#0D0D12] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-champagne/50 min-w-[150px] cursor-pointer appearance-none">
                    <option value="">جميع الحالات</option>
                    <option value="published">منشور</option>
                    <option value="draft">مسودة</option>
                </select>
            </div>

            {/* Content Table */}
            <div className="bg-obsidian border border-white/10 rounded-2xl overflow-x-auto shadow-xl">
                <table className="w-full text-right whitespace-nowrap">
                    <thead className="bg-white/5 border-b border-white/10">
                        <tr>
                            <th className="p-5 font-semibold text-gray-400 text-sm">العنوان</th>
                            <th className="p-5 font-semibold text-gray-400 text-sm">النوع</th>
                            <th className="p-5 font-semibold text-gray-400 text-sm">الحالة</th>
                            <th className="p-5 font-semibold text-gray-400 text-sm hidden md:table-cell">تاريخ الإنشاء</th>
                            <th className="p-5 font-semibold text-left text-gray-400 text-sm">إجراءات</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 disabled-text-selection">
                        {contents.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="p-12 text-center text-gray-400">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center bg-white/5 mb-2">
                                            <BookOpen className="w-8 h-8 opacity-50 text-champagne" />
                                        </div>
                                        <p>لا يوجد محتوى حالياً</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            contents.map(item => (
                                <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="p-5">
                                        <div className="flex items-center gap-3">
                                            {item.imageUrl ? (
                                                <div className="w-10 h-10 rounded border border-white/10 overflow-hidden shrink-0">
                                                    <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                                                </div>
                                            ) : (
                                                <div className="w-10 h-10 rounded border border-white/10 bg-midnight-900 flex items-center justify-center shrink-0">
                                                    <BookOpen className="w-4 h-4 text-gray-500" />
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-bold text-white mb-0.5 max-w-[200px] md:max-w-xs truncate">{item.title}</p>
                                                <p className="text-xs text-gray-500">بواسطة {item.author?.name || 'مجهول'}</p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="p-5">
                                        <span className="text-sm text-gray-300 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                                            {item.type === 'COURSE' ? 'دورة' : item.type === 'LESSON' ? 'درس' : 'مقال'}
                                        </span>
                                    </td>

                                    <td className="p-5">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${item.published ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'}`}>
                                            {item.published ? 'منشور' : 'مسودة'}
                                        </span>
                                    </td>

                                    <td className="p-5 text-sm text-gray-400 hidden md:table-cell">
                                        {new Date(item.createdAt).toLocaleDateString("ar-SA")}
                                    </td>

                                    <td className="p-5 text-left">
                                        <div className="flex items-center justify-end gap-2">
                                            {item.published && (
                                                <Link href={`/courses/${item.id}`} target="_blank" className="p-2 text-gray-400 hover:text-champagne transition-colors bg-white/5 hover:bg-white/10 rounded-lg" title="عرض في الموقع">
                                                    <ExternalLink className="w-4 h-4" />
                                                </Link>
                                            )}
                                            <Link href={`/admin/courses/${item.id}/edit`} className="p-2 text-gray-400 hover:text-blue-400 transition-colors bg-white/5 hover:bg-white/10 rounded-lg" title="تعديل">
                                                <Edit2 className="w-4 h-4" />
                                            </Link>
                                            <DeleteButton id={item.id} />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {/* Pagination Placeholder */}
                <div className="p-4 border-t border-white/10 flex justify-between items-center text-sm text-gray-400">
                    <div>يعرض 1 إلى {contents.length} من أصل {contents.length} نتيجة</div>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-50" disabled>السابق</button>
                        <button className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-50" disabled>التالي</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
