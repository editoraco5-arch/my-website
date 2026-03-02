"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Loader2 } from 'lucide-react';
import { enrollUser } from '../../admin/actions/enrollment';

export default function EnrollButton({ courseId, price, isLoggedIn }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleClick = async () => {
        if (!isLoggedIn) {
            router.push('/login?redirect=/courses/' + courseId);
            return;
        }

        setLoading(true);

        if (price === 0 || price === null) {
            // Free course – enroll directly
            const result = await enrollUser(courseId);
            if (result.success) {
                router.refresh(); // Refresh the page to show enrolled state
            }
        } else {
            // Paid course – go to checkout with course info
            router.push(`/checkout?courseId=${courseId}`);
        }

        setLoading(false);
    };

    return (
        <button
            onClick={handleClick}
            disabled={loading}
            className="w-full bg-champagne text-midnight-900 py-4 px-6 rounded-xl font-bold text-lg flex justify-center items-center gap-2 hover:bg-white hover:-translate-y-1 transition-all shadow-[0_10px_30px_rgba(201,168,76,0.2)] mb-4 disabled:opacity-70 disabled:cursor-not-allowed"
        >
            {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
                <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>{!isLoggedIn ? 'سجل دخولك للمتابعة' : price === 0 ? 'سجل مجاناً' : 'اشترك الآن'}</span>
                </>
            )}
        </button>
    );
}
