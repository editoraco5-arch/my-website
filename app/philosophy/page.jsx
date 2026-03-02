import Navbar from '../components/Navbar';
import Philosophy from '../components/Philosophy';
import Footer from '../components/Footer';

export const metadata = {
    title: 'الفلسفة | Editora',
};

export default function PhilosophyPage() {
    return (
        <main className="min-h-screen bg-midnight-900">
            <Navbar />
            <div className="pt-32">
                <Philosophy />
            </div>
            <Footer />
        </main>
    );
}
