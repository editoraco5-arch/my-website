import Link from 'next/link';
import { Lock } from 'lucide-react';
import prisma from '../lib/prisma';
import CheckoutClient from './CheckoutClient';
import { redirect } from 'next/navigation';
import { getSiteSection } from '../admin/actions/site';

export const metadata = {
    title: 'إتمام الطلب | Editora',
};

export default async function CheckoutPage({ searchParams }) {
    const resolvedParams = await searchParams;
    const courseId = resolvedParams?.courseId;

    if (!courseId) {
        redirect('/courses');
    }

    const course = await prisma.content.findUnique({
        where: { id: courseId },
        select: {
            id: true,
            title: true,
            imageUrl: true,
            price: true,
        }
    });

    if (!course) {
        redirect('/courses');
    }

    const integrationsSection = await getSiteSection('integrations_payments');
    const integrationsData = integrationsSection?.content || {};

    return (
        <main className="min-h-screen bg-midnight-900 text-right" dir="rtl">
            {/* Header */}
            <header className="py-6 px-6 border-b border-white/5 bg-obsidian">
                <div className="max-w-5xl mx-auto flex justify-between items-center">
                    <Link href="/">
                        <div className="text-2xl font-bold tracking-tighter text-ivory font-heading select-none hover:text-champagne transition-colors">
                            Editora<span className="text-champagne">.</span>
                        </div>
                    </Link>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <span>دفع آمن</span>
                        <Lock className="w-4 h-4 text-green-500" />
                    </div>
                </div>
            </header>

            <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">
                <h1 className="text-3xl font-bold text-white mb-10 font-heading">إتمام الطلب</h1>

                <CheckoutClient course={course} integrations={integrationsData} />
            </div>
        </main>
    );
}
