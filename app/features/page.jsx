import Navbar from '../components/Navbar';
import Features from '../components/Features';
import Footer from '../components/Footer';

export const metadata = {
    title: 'الميزات | Editora',
};

export default function FeaturesPage() {
    return (
        <main className="min-h-screen bg-midnight-900">
            <Navbar />
            <div className="pt-32">
                <Features />
            </div>
            <Footer />
        </main>
    );
}
