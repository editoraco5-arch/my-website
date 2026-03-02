"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function DepthScrollWrapper({ children, index = 0 }) {
    const ref = useRef(null);

    // Track scroll progress related to this specific section
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Map scroll progress (0 to 1) to Z-axis translation and opacity
    // 0 = section is at the bottom of the viewport
    // 0.5 = section is in the middle of the viewport
    // 1 = section has passed above the viewport

    // Approach: Come from deep Z-space, hold at 0 (center), then gently scale and fade out as it passes the camera.
    const z = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [-800, 0, 0, 800]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.15]);

    return (
        <div ref={ref} className="relative w-full min-h-screen flex items-center justify-center perspective-[2000px] preserve-3d">
            <motion.div
                style={{
                    z,
                    opacity,
                    scale,
                    rotateX: useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]) // Slight tilt effect
                }}
                className="w-full origin-center"
            >
                {children}
            </motion.div>
        </div>
    );
}
