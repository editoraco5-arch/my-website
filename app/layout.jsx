import './globals.css';
import { Providers } from './providers';
import CookieConsent from './components/CookieConsent';
import ScarcityBanner from './components/ScarcityBanner';
import Scene3D from './components/3d/Scene3D';

import { getSiteSection } from './admin/actions/site';

export async function generateMetadata() {
    const seoSection = await getSiteSection('seo_social');
    const brandingSection = await getSiteSection('branding_theme');
    const generalSection = await getSiteSection('general_content');

    const seoData = seoSection?.content || {};
    const brandingData = brandingSection?.content || {};
    const generalData = generalSection?.content || {};

    return {
        title: seoData.metaTitle || generalData.siteTitle || 'Editora | منصة تعليم المونتاج والخدع البصرية',
        description: seoData.metaDescription || 'منصة تعليمية متكاملة لتمكين صناع المحتوى من احتراف التصوير والمونتاج والخدع البصرية باستخدام أقوى البرامج العالمية.',
        icons: {
            icon: brandingData.faviconUrl || '/favicon.ico',
        }
    };
}

export default async function RootLayout({ children }) {
    const brandingSection = await getSiteSection('branding_theme');
    const brandingData = brandingSection?.content || {};
    const primaryColor = brandingData.primaryColor || '#C9A84C'; // Default champagne

    return (
        <html lang="ar" dir="rtl" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Alexandria:wght@300;400;600;800&family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=JetBrains+Mono:wght@400;700&family=Cairo:wght@400;600;700&family=Tajawal:wght@400;500;700;800&family=Inter:wght@400;500;600;700&display=swap"
                    rel="stylesheet"
                />
                <style dangerouslySetInnerHTML={{
                    __html: `
                    :root {
                        --color-champagne-hex: ${primaryColor};
                    }
                `}} />
            </head>
            <body className="bg-midnight-950 text-white antialiased overflow-x-hidden font-arabic" suppressHydrationWarning autoFocus={false}>
                <Providers>
                    <Scene3D />

                    <div className="relative z-10 w-full min-h-screen flex flex-col">
                        <ScarcityBanner />
                        {children}
                    </div>
                    <CookieConsent />
                </Providers>
            </body>
        </html>
    );
}
