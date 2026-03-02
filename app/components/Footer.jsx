import { getSiteSection } from '../admin/actions/site';

export default async function Footer() {
    const generalSection = await getSiteSection('general_content');
    const seoSection = await getSiteSection('seo_social');

    const generalData = generalSection?.content || {};
    const seoData = seoSection?.content || {};

    const siteTitle = generalData.siteTitle || "Editora";
    const aboutText = generalData.footerText || "منصة تعليمية متكاملة لتمكين صناع المحتوى من احتراف التصوير والمونتاج والخدع البصرية باستخدام أقوى البرامج العالمية.";
    return (
        <footer className="w-full bg-[#050508] border-t border-white/5 rounded-t-[4rem] text-ivory/80 pt-24 pb-8 px-6 lg:px-20 mt-[-2rem] relative z-20">
            <div className="max-w-6xl mx-auto flex flex-col gap-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="md:col-span-2 flex flex-col items-start gap-6">
                        <h2 className="text-3xl font-heading font-bold text-ivory tracking-tighter">
                            {siteTitle}<span className="text-champagne">.</span>
                        </h2>
                        <p className="font-heading text-sm text-ivory/50 max-w-sm leading-relaxed whitespace-pre-line">
                            {aboutText}
                        </p>
                        {/* System Status */}
                        <div className="mt-4 flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-white/5 w-max">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                            </span>
                            <span className="font-data text-xs text-ivory/70 tracking-widest uppercase mt-[2px]">System Operational</span>
                        </div>
                    </div>

                    {/* Nav */}
                    <div className="flex flex-col gap-4">
                        <h4 className="font-heading font-bold text-ivory mb-2">المنصة</h4>
                        {['الكورسات', 'المسارات', 'المجتمع', 'التسعير'].map(item => (
                            <a key={item} href="#" className="font-heading text-sm text-ivory/50 hover:text-champagne hover:translate-x-[-2px] transition-all">{item}</a>
                        ))}
                    </div>

                    {/* Legal */}
                    <div className="flex flex-col gap-4">
                        <h4 className="font-heading font-bold text-ivory mb-2">قانوني</h4>
                        {['الشروط والأحكام', 'سياسة الخصوصية', 'حقوق الطبع والنشر'].map(item => (
                            <a key={item} href="#" className="font-heading text-sm text-ivory/50 hover:text-champagne hover:translate-x-[-2px] transition-all">{item}</a>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 gap-4">
                    <p className="font-data text-xs text-ivory/40 tracking-wider">
                        © {new Date().getFullYear()} {siteTitle.toUpperCase()}. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex flex-row-reverse gap-4 font-heading text-xs text-ivory/40">
                        {seoData?.twitterUrl ? (
                            <a href={seoData.twitterUrl} target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:text-champagne transition-colors border border-white/5 rounded-full px-3 py-1">X/Twitter</a>
                        ) : (
                            <span className="cursor-pointer hover:text-champagne transition-colors border border-white/5 rounded-full px-3 py-1">X/Twitter</span>
                        )}
                        {seoData?.instagramUrl ? (
                            <a href={seoData.instagramUrl} target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:text-champagne transition-colors border border-white/5 rounded-full px-3 py-1">Instagram</a>
                        ) : (
                            <span className="cursor-pointer hover:text-champagne transition-colors border border-white/5 rounded-full px-3 py-1">Instagram</span>
                        )}
                        {seoData?.youtubeUrl && (
                            <a href={seoData.youtubeUrl} target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:text-champagne transition-colors border border-white/5 rounded-full px-3 py-1">YouTube</a>
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
}
