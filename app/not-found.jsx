import Link from 'next/link';
import Navbar from './components/Navbar';

export default function NotFound() {
    return (
        <main className="min-h-screen bg-midnight-900 border-none flex flex-col relative text-right" dir="rtl">
            <Navbar />

            {/* Background cinematic glows */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-500/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-champagne/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="flex-1 flex flex-col justify-center items-center relative z-10 px-6 -mt-20">
                <div className="text-center space-y-4 relative w-full flex flex-col items-center">

                    {/* Massive transparent 404 behind text */}
                    <h1 className="text-[12rem] md:text-[18rem] font-black font-heading text-white opacity-5 relative select-none leading-none tracking-tighter mix-blend-overlay">
                        404
                    </h1>

                    {/* Foreground Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <h2 className="text-3xl md:text-5xl font-bold font-heading text-white bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 drop-shadow-md">
                            هذا المسار مفقود في الزمن
                        </h2>

                        <p className="text-gray-400 font-drama max-w-lg mx-auto text-base md:text-lg leading-relaxed mt-6 pointer-events-auto px-4">
                            يبدو أنك قد خطوت خارج حدود المنصة. المقال أو الدورة التي تبحث عنها غير موجودة، أو ربما تم حذفها.
                        </p>

                        <div className="pt-10 pointer-events-auto">
                            <Link href="/">
                                <button className="px-8 py-4 bg-champagne text-midnight-950 font-bold rounded-xl hover:bg-white transition-all shadow-[0_0_40px_rgba(201,168,76,0.2)] hover:shadow-[0_0_60px_rgba(201,168,76,0.4)] hover:scale-105 active:scale-95 duration-300">
                                    العودة إلى الصفحة الرئيسية
                                </button>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
