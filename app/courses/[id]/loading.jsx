import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Loader2 } from 'lucide-react';

export default function CourseLoading() {
    return (
        <main className="min-h-screen bg-midnight-900 relative" dir="rtl">
            <Navbar />

            <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-champagne/5 rounded-full blur-[180px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

            <div className="pt-32 pb-24 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Breadcrumb Skeleton */}
                    <div className="flex gap-2 mb-8">
                        <div className="h-4 w-16 bg-white/5 rounded"></div>
                        <div className="h-4 w-4 bg-white/5 rounded"></div>
                        <div className="h-4 w-24 bg-white/10 rounded"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start relative">
                        {/* Main Course Info Skeleton */}
                        <div className="lg:col-span-2 space-y-10 order-2 lg:order-1 animate-pulse">
                            <div>
                                <div className="h-10 md:h-12 w-3/4 bg-white/10 rounded-lg mb-4 relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"></div>
                                </div>
                                <div className="h-10 md:h-12 w-1/2 bg-white/10 rounded-lg mb-8 relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 delay-75"></div>
                                </div>

                                <div className="space-y-3 mb-8">
                                    <div className="h-4 w-full bg-white/5 rounded"></div>
                                    <div className="h-4 w-full bg-white/5 rounded"></div>
                                    <div className="h-4 w-5/6 bg-white/5 rounded"></div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="h-10 w-32 bg-white/5 rounded-full"></div>
                                    <div className="h-10 w-32 bg-white/5 rounded-full"></div>
                                    <div className="h-10 w-40 bg-white/5 rounded-full"></div>
                                </div>
                            </div>

                            <div className="h-40 w-full bg-obsidian border border-white/5 rounded-3xl"></div>
                            <div className="h-64 w-full bg-obsidian border border-white/5 rounded-3xl"></div>
                        </div>

                        {/* Sticky Sidebar Skeleton */}
                        <div className="lg:col-span-1 order-1 lg:order-2 animate-pulse">
                            <div className="bg-obsidian border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                                <div className="aspect-video bg-white/5 relative flex items-center justify-center">
                                    <Loader2 className="w-8 h-8 text-white/10 animate-spin" />
                                </div>
                                <div className="p-8">
                                    <div className="h-10 w-24 bg-white/10 rounded mb-6"></div>
                                    <div className="h-14 w-full bg-white/5 rounded-xl mb-4"></div>
                                    <div className="h-4 w-3/4 bg-white/5 mx-auto rounded"></div>
                                </div>
                                <div className="h-64 w-full bg-[#0D0D12] border-t border-white/10"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
