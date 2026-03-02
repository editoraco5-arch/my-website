import Navbar from '../components/Navbar';
import Protocol from '../components/Protocol';
import Footer from '../components/Footer';

export const metadata = {
    title: 'المسار | Editora',
};

export default function ProtocolPage() {
    return (
        <main className="min-h-screen bg-midnight-900">
            <Navbar />
            <div className="pt-32">
                <Protocol />
            </div>
            <Footer />
        </main>
    );
}
