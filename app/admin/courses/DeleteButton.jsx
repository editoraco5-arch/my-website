"use client";

import { Trash2, AlertCircle } from "lucide-react";
import { useTransition, useState } from "react";
import { deleteContent } from "../actions";

export default function DeleteButton({ id }) {
    const [isPending, startTransition] = useTransition();
    const [showModal, setShowModal] = useState(false);

    const handleDelete = () => {
        startTransition(async () => {
            try {
                await deleteContent(id);
                setShowModal(false);
            } catch (e) {
                alert('حدث خطأ أثناء الحذف');
            }
        });
    };

    return (
        <>
            <button
                type="button"
                className="p-2 text-gray-400 hover:text-red-400 transition-colors bg-white/5 hover:bg-white/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                title="حذف"
                disabled={isPending}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowModal(true);
                }}
            >
                <Trash2 className="w-4 h-4" />
            </button>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div
                        className="bg-obsidian border border-white/10 shadow-2xl rounded-2xl p-6 w-full max-w-sm text-center space-y-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
                            <AlertCircle className="w-8 h-8 text-red-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white">هل أنت متأكد؟</h3>
                        <p className="text-gray-400 text-sm">
                            هل أنت متأكد من حذف هذا المحتوى؟ لا يمكن التراجع عن هذا الإجراء وسيتم حذف جميع البيانات المرتبطة به.
                        </p>

                        <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                            <button
                                type="button"
                                disabled={isPending}
                                onClick={handleDelete}
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl font-bold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isPending ? 'جاري الحذف...' : 'نعم، احذف'}
                            </button>
                            <button
                                type="button"
                                disabled={isPending}
                                onClick={() => setShowModal(false)}
                                className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-2.5 rounded-xl font-bold transition-colors"
                            >
                                إلغاء
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

