"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, User } from "lucide-react";

// List of random Arabic names and cities for the simulation
const notifications = [
    { name: "محمد من الرياض", time: "منذ دقيقتين" },
    { name: "أحمد من جدة", time: "منذ 5 دقائق" },
    { name: "خالد من الدمام", time: "منذ 10 دقائق" },
    { name: "سارة من الكويت", time: "منذ 15 دقيقة" },
    { name: "فهد من دبي", time: "منذ 20 دقيقة" },
    { name: "عمر من البحرين", time: "منذ نصف ساعة" },
    { name: "عبدالله من مكة", time: "منذ 45 دقيقة" },
    { name: "علي من مسقط", time: "منذ ساعة" }
];

export default function SocialProofNotification() {
    const [currentNotification, setCurrentNotification] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Function to show a random notification
        const showRandomNotification = () => {
            const randomIndex = Math.floor(Math.random() * notifications.length);
            setCurrentNotification(notifications[randomIndex]);
            setIsVisible(true);

            // Hide after 5 seconds
            setTimeout(() => {
                setIsVisible(false);
            }, 5000);
        };

        // Initial delay before showing the very first notification (10 seconds)
        const initialTimer = setTimeout(() => {
            showRandomNotification();

            // Set up a recurring interval to show notifications every 20-30 seconds
            const recurringTimer = setInterval(() => {
                showRandomNotification();
            }, Math.floor(Math.random() * 10000) + 20000); // Between 20s and 30s

            return () => clearInterval(recurringTimer);
        }, 10000);

        return () => clearTimeout(initialTimer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && currentNotification && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: 20 }}
                    animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9, rotateX: -20 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    className="fixed bottom-6 left-6 z-[100] preserve-3d perspective-1000 pointer-events-none"
                    dir="rtl"
                >
                    <div className="bg-obsidian/95 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] flex items-center gap-4 w-72">
                        <div className="w-10 h-10 rounded-full bg-champagne/10 flex items-center justify-center shrink-0 border border-champagne/30">
                            <User className="w-5 h-5 text-champagne" />
                        </div>
                        <div className="flex-1">
                            <p className="text-white text-sm font-bold font-heading leading-tight mb-1">
                                {currentNotification.name}
                            </p>
                            <p className="text-gray-400 text-xs flex items-center gap-1 font-medium">
                                <CheckCircle2 className="w-3 h-3 text-green-400" />
                                اشترى الدورة للتو
                            </p>
                            <span className="text-gray-500 text-[10px] absolute top-4 left-4">
                                {currentNotification.time}
                            </span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
