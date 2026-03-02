import Navbar from './components/Navbar';
import HomeHero from './components/sections/HomeHero';
import FeaturedCourses from './components/sections/FeaturedCourses';
import Instructor from './components/sections/Instructor';
import FAQ from './components/sections/FAQ';
import Footer from './components/Footer';
import SocialProofNotification from './components/SocialProofNotification';
import DepthScrollWrapper from './components/3d/DepthScrollWrapper';
import { getSiteSection } from './admin/actions/site';
import prisma from './lib/prisma';

export const dynamic = 'force-dynamic';

export default async function Home() {
    const brandingSection = await getSiteSection('branding_theme');
    const brandingData = brandingSection?.content || {};

    const generalSection = await getSiteSection('general_content');
    const generalData = generalSection?.content || {};

    const heroSection = await getSiteSection('home_hero');
    const heroData = heroSection?.content || {
        buttonText: "شاهد النبذة التعريفية",
        buttonLink: "#"
    };

    const footerSection = await getSiteSection('footer_info');
    const footerData = footerSection?.content || {};

    const aboutSection = await getSiteSection('home_about');
    const aboutData = aboutSection?.content || {};

    const coursesSection = await getSiteSection('home_courses');
    const coursesData = coursesSection?.content || {};

    const faqSection = await getSiteSection('home_faq');
    const faqData = faqSection?.content || {};

    const featuredCourses = await prisma.content.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' },
        take: 3,
        include: {
            author: {
                select: { name: true }
            }
        }
    });

    return (
        <main className="min-h-screen relative pb-20 md:pb-0 bg-midnight-900">
            <Navbar />

            <div className="w-full relative overflow-hidden">
                <HomeHero data={heroData} branding={brandingData} general={generalData} />
                <DepthScrollWrapper index={1}>
                    <FeaturedCourses data={coursesData} courses={featuredCourses} />
                </DepthScrollWrapper>
                <DepthScrollWrapper index={2}>
                    <Instructor data={aboutData} />
                </DepthScrollWrapper>
                <DepthScrollWrapper index={3}>
                    <FAQ data={faqData} />
                </DepthScrollWrapper>
            </div>

            <SocialProofNotification />
            <Footer data={footerData} />
        </main>
    );
}
