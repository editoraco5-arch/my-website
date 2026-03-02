"use client";

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, Loader2, Tag, CheckCircle2, XCircle } from 'lucide-react';
import { validatePromoCode, applyPromoCode } from '../admin/actions/promo';

export default function CheckoutClient({ course, integrations }) {
    const router = useRouter();

    const [isProcessing, setIsProcessing] = useState(false);
    const [promoCode, setPromoCode] = useState('');
    const [promoStatus, setPromoStatus] = useState(null); // { valid, discount, message, error }
    const [promoLoading, setPromoLoading] = useState(false);

    const handleApplyPromo = useCallback(async () => {
        if (!promoCode.trim()) return;
        setPromoLoading(true);
        setPromoStatus(null);

        const result = await validatePromoCode(promoCode, course.id);
        setPromoStatus(result);
        setPromoLoading(false);
    }, [promoCode, course.id]);

    const handleCheckout = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        // If promo code is 100% off, apply it directly (auto-enroll)
        if (promoStatus?.valid && promoStatus?.discount === 100) {
            const result = await applyPromoCode(promoCode, course.id);
            if (result.success && result.enrolled) {
                router.push('/checkout/success?enrolled=true&courseId=' + course.id);
                return;
            }
        }

        // Simulate payment flow for partial discounts or no promo
        // In a real production app, you would integrate Stripe or Moyasar here

        setTimeout(() => {
            router.push('/checkout/success?courseId=' + course.id);
        }, 2000);
    };

    const isFreeWithPromo = promoStatus?.valid && promoStatus?.discount === 100;

    return (
        <div className="flex flex-col lg:flex-row gap-12">
            {/* Left: Checkout Form */}
            <div className="flex-1 order-2 lg:order-1 space-y-6">

                {/* Promo Code Section */}
                <div className="bg-obsidian border border-white/10 rounded-3xl p-6 md:p-8">
                    <h2 className="text-xl font-bold text-white mb-6 font-heading flex items-center gap-2">
                        <Tag className="w-5 h-5 text-champagne" />
                        كود الخصم (برومو كود)
                    </h2>
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={promoCode}
                            onChange={(e) => {
                                setPromoCode(e.target.value.toUpperCase());
                                setPromoStatus(null);
                            }}
                            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleApplyPromo(); } }}
                            placeholder="ادخل الكود هنا"
                            dir="ltr"
                            className="flex-1 bg-midnight-950 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-champagne/50 transition-colors text-left tracking-widest font-mono"
                        />
                        <button
                            type="button"
                            onClick={handleApplyPromo}
                            disabled={promoLoading || !promoCode.trim()}
                            className="px-6 py-3 bg-champagne/10 border border-champagne/30 text-champagne rounded-xl font-bold hover:bg-champagne hover:text-midnight-900 transition-all disabled:opacity-50 whitespace-nowrap"
                        >
                            {promoLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'تطبيق'}
                        </button>
                    </div>

                    {/* Promo Status */}
                    {promoStatus && (
                        <div className={`mt-4 flex items-start gap-3 p-4 rounded-xl border ${promoStatus.valid ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
                            {promoStatus.valid ? <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" /> : <XCircle className="w-5 h-5 shrink-0 mt-0.5" />}
                            <span className="text-sm font-medium">{promoStatus.valid ? promoStatus.message : promoStatus.error}</span>
                        </div>
                    )}
                </div>

                {/* Payment Form - hidden if promo is 100% */}
                {!isFreeWithPromo && (
                    <div className="bg-obsidian border border-white/10 rounded-3xl p-6 md:p-8">
                        <h2 className="text-xl font-bold text-white mb-6 font-heading">طريقة الدفع</h2>
                        <form className="space-y-6" onSubmit={handleCheckout} id="checkout-form">
                            <label className="flex items-center gap-4 p-4 border border-champagne/50 bg-champagne/5 rounded-xl cursor-pointer">
                                <input type="radio" name="paymentMethod" value="card" defaultChecked className="w-5 h-5 accent-champagne" />
                                <div className="flex-1 font-medium text-white">البطاقة الائتمانية / مدى</div>
                            </label>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">الاسم الموجود على البطاقة</label>
                                    <input required type="text" placeholder="الاسم كامل" className="w-full bg-midnight-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-champagne/50 transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">رقم البطاقة</label>
                                    <input required type="text" placeholder="0000 0000 0000 0000" dir="ltr" className="w-full bg-midnight-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-champagne/50 transition-colors text-right" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">تاريخ الانتهاء</label>
                                        <input required type="text" placeholder="MM/YY" dir="ltr" className="w-full bg-midnight-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-champagne/50 transition-colors text-right" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">رمز الأمان (CVC)</label>
                                        <input required type="text" placeholder="123" dir="ltr" className="w-full bg-midnight-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-champagne/50 transition-colors text-right" />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                )}

                {/* CTA Button */}
                <button
                    type={isFreeWithPromo ? 'button' : 'submit'}
                    form={isFreeWithPromo ? undefined : 'checkout-form'}
                    onClick={isFreeWithPromo ? handleCheckout : undefined}
                    disabled={isProcessing}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-champagne text-obsidian rounded-xl font-bold text-lg hover:bg-white transition-all shadow-[0_0_30px_rgba(201,168,76,0.2)] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isProcessing ? (
                        <><Loader2 className="w-5 h-5 animate-spin" /> جارٍ التفعيل...</>
                    ) : isFreeWithPromo ? (
                        <><CheckCircle2 className="w-5 h-5" /> تفعيل الوصول المجاني</>
                    ) : (
                        'أكمل الطلب'
                    )}
                </button>

                <p className="text-gray-500 text-xs text-center">
                    بالنقر على الزر، فإنك توافق على شروط الخدمة وسياسة الخصوصية.
                </p>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:w-[400px] order-1 lg:order-2">
                <div className="bg-obsidian border border-white/10 rounded-3xl p-6 md:p-8 sticky top-6">
                    <h2 className="text-xl font-bold text-white mb-6 font-heading border-b border-white/5 pb-4">ملخص الطلب</h2>

                    <div className="flex gap-4 mb-6">
                        <div className="w-24 h-16 bg-midnight-950 rounded border border-white/5 overflow-hidden flex-shrink-0">
                            {course.imageUrl ? (
                                <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-midnight-800 flex items-center justify-center text-champagne/30 text-xs">لا توجد صورة</div>
                            )}
                        </div>
                        <div>
                            <h3 className="text-white font-medium text-sm lg:text-base leading-tight">{course.title}</h3>
                        </div>
                    </div>

                    <div className="space-y-3 text-sm text-gray-400 border-b border-white/5 pb-6 mb-6">
                        <div className="flex justify-between items-center">
                            <span>السعر الأصلي:</span>
                            <span className={promoStatus?.valid ? 'line-through text-gray-600' : ''}>${course.price}</span>
                        </div>
                        {promoStatus?.valid && (
                            <div className="flex justify-between items-center text-green-400 font-bold">
                                <span>خصم {promoStatus.discount}%:</span>
                                <span>- {promoStatus.discount === 100 ? `$${course.price}` : `$${(course.price * promoStatus.discount / 100).toFixed(2)}`}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-between items-center mb-6">
                        <span className="text-lg font-medium text-white">الإجمالي:</span>
                        <span className="text-3xl font-bold font-heading">
                            {promoStatus?.valid && promoStatus?.discount === 100
                                ? <span className="text-green-400">مجاني 🎉</span>
                                : <span className="text-white">
                                    ${promoStatus?.valid ? (course.price - (course.price * promoStatus.discount / 100)).toFixed(2) : course.price}
                                </span>
                            }
                        </span>
                    </div>

                    <div className="bg-midnight-950 rounded-xl p-4 flex items-start gap-3 border border-white/5">
                        <ShieldCheck className="w-6 h-6 text-champagne shrink-0 mt-0.5" />
                        <div>
                            <h4 className="text-white text-sm font-medium mb-1">ضمان استرجاع 30 يوم</h4>
                            <p className="text-xs text-gray-500 leading-relaxed">إذا لم تكن راضياً عن محتوى الدورة، يمكنك استرداد أموالك كاملة خلال أول 30 يوماً.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
