"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../../lib/authOptions";
import prisma from "../../lib/prisma";
import { revalidatePath } from "next/cache";

export async function checkAdmin() {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
        throw new Error("Unauthorized: Admin access required");
    }
}

export async function getSiteSection(key) {
    try {
        const section = await prisma.siteSection.findUnique({
            where: { key },
        });

        if (!section) return null;
        return {
            ...section,
            content: JSON.parse(section.content),
        };
    } catch (error) {
        console.error("Error getting site section:", error);
        return null;
    }
}

export async function getAllSiteSections() {
    try {
        await checkAdmin();
        const sections = await prisma.siteSection.findMany({
            orderBy: { key: 'asc' }
        });

        return sections.map(sec => ({
            ...sec,
            content: JSON.parse(sec.content)
        }));
    } catch (error) {
        console.error("Error getting all site sections:", error);
        return [];
    }
}

export async function updateSiteSection(key, title, contentObj) {
    try {
        await checkAdmin();

        const contentString = JSON.stringify(contentObj);

        // UPSERT
        const section = await prisma.siteSection.upsert({
            where: { key },
            update: {
                title,
                content: contentString,
            },
            create: {
                key,
                title,
                content: contentString,
            },
        });

        revalidatePath("/", "layout"); // Revalidate all paths and layout to apply styles & SEO globally
        revalidatePath("/admin/settings/site"); // Revalidate admin page

        return { success: true, section };
    } catch (error) {
        console.error("Error updating site section:", error);
        return { success: false, error: "Failed to update site section" };
    }
}
