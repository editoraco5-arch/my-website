import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Loader2 } from 'lucide-react';

export default function Loading() {
    return (
        <main className="min-h-screen bg-midnight-900 relative" dir="rtl">
            <Navbar />

            {/* Cinematic Background Glows */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-champagne/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="pt-32 pb-24 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Header Skeleton */}
                    <div className="text-center mb-16 flex flex-col items-center">
                        <div className="h-10 bg-white/5 w-64 rounded-xl mb-6 relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"></div>
                        </div>
                        <div className="h-4 bg-white/5 w-96 max-w-full rounded relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 delay-75"></div>
                        </div>
                        <div className="h-4 bg-white/5 w-72 max-w-full rounded mt-3 relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 delay-150"></div>
                        </div>
                    </div>

                    {/* Grid Skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-obsidian border border-white/5 rounded-3xl overflow-hidden relative">
                                {/* Image Placeholder */}
                                <div className="aspect-video bg-white/5 w-full relative overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Loader2 className="w-8 h-8 text-white/10 animate-spin" />
                                    </div>
                                </div>
                                {/* Content Placeholder */}
                                <div className="p-6">
                                    <div className="h-7 w-3/4 bg-white/5 rounded-lg mb-4 relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"></div>
                                    </div>
                                    <div className="h-4 w-full bg-white/5 rounded relative overflow-hidden mb-2">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 delay-75"></div>
                                    </div>
                                    <div className="h-4 w-5/6 bg-white/5 rounded relative overflow-hidden mb-6">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 delay-150"></div>
                                    </div>

                                    {/* Footer line */}
                                    <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                                        <div className="h-4 w-24 bg-white/5 rounded relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"></div>
                                        </div>
                                        <div className="h-4 w-16 bg-white/5 rounded relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 delay-75"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
