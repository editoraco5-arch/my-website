import { getServerSession } from "next-auth";
import { authOptions } from "../lib/authOptions";
import { redirect } from "next/navigation";
import AdminSidebar from "./components/AdminSidebar";

export const metadata = {
    title: 'لوحة التحكم | Editora',
};

export default async function AdminLayout({ children }) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
        redirect("/login");
    }

    return (
        <div className="min-h-screen bg-midnight-950 flex flex-col md:flex-row relative">
            <AdminSidebar />

            {/* Main Content Area */}
            <main className="flex-1 w-full min-w-0 flex flex-col pt-16 md:pt-0">

                {/* Desktop Topbar Context (Optional, simple user greeting) */}
                <header className="hidden md:flex h-20 items-center justify-between px-8 bg-obsidian border-b border-white/5">
                    <div className="text-gray-400 font-medium">نظام إدارة المحتوى (CMS)</div>
                    <div className="flex items-center gap-4 border border-white/10 px-4 py-1.5 rounded-full bg-midnight-900 shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <div className="text-sm text-gray-300">مرحباً <span className="text-white font-bold">{session.user.name}</span></div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 p-6 md:p-10 overflow-x-hidden text-right" dir="rtl">
                    {children}
                </div>
            </main>
        </div>
    );
}
