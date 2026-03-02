import Navbar from '../components/Navbar';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';

export const metadata = {
    title: 'الباقات | Editora',
};

export default function PricingPage() {
    return (
        <main className="min-h-screen bg-midnight-900 border-b border-white/5">
            <Navbar />
            <Pricing />
            <Footer />
        </main>
    );
}
