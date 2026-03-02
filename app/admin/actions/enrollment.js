"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../../lib/authOptions";
import prisma from "../../lib/prisma";
import { revalidatePath } from "next/cache";

// Check if a specific user is enrolled in a specific course
export async function isEnrolled(userId, contentId) {
    if (!userId || !contentId) return false;
    try {
        const enrollment = await prisma.enrollment.findUnique({
            where: { userId_contentId: { userId, contentId } }
        });
        return !!enrollment;
    } catch (error) {
        console.error("Error checking enrollment:", error);
        return false;
    }
}

// Enroll the current authenticated user in a course
export async function enrollUser(contentId) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) throw new Error("يجب تسجيل الدخول أولاً");

    try {
        const enrollment = await prisma.enrollment.create({
            data: {
                userId: session.user.id,
                contentId,
            }
        });
        revalidatePath(`/courses/${contentId}`);
        revalidatePath("/dashboard");
        return { success: true, enrollment };
    } catch (error) {
        // Handle duplicate enrollment gracefully
        if (error.code === 'P2002') {
            return { success: true, message: "أنت مسجل بالفعل في هذه الدورة" };
        }
        console.error("Error enrolling user:", error);
        return { success: false, error: "فشل التسجيل في الدورة" };
    }
}

// Enroll a user by admin (manual enrollment)
export async function adminEnrollUser(userId, contentId) {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "ADMIN") {
        throw new Error("غير مصرح: يلزم صلاحيات الأدمن");
    }

    try {
        const enrollment = await prisma.enrollment.create({
            data: { userId, contentId }
        });
        revalidatePath("/admin");
        return { success: true, enrollment };
    } catch (error) {
        if (error.code === 'P2002') {
            return { success: true, message: "المستخدم مسجل بالفعل" };
        }
        return { success: false, error: "فشل التسجيل" };
    }
}

// Unenroll a user by admin
export async function adminUnenrollUser(enrollmentId) {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "ADMIN") {
        throw new Error("غير مصرح: يلزم صلاحيات الأدمن");
    }
    await prisma.enrollment.delete({ where: { id: enrollmentId } });
    revalidatePath("/admin");
    return { success: true };
}

// Get all courses for the currently logged-in user (for "My Courses" dashboard)
export async function getMyEnrollments() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return [];

    try {
        const enrollments = await prisma.enrollment.findMany({
            where: { userId: session.user.id },
            include: {
                content: {
                    include: {
                        chapters: { orderBy: { order: 'asc' } }
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
        return enrollments;
    } catch (error) {
        console.error("Error fetching enrollments:", error);
        return [];
    }
}

// Get all enrollments (for admin panel)
export async function getAllEnrollments() {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "ADMIN") return [];

    try {
        return await prisma.enrollment.findMany({
            include: {
                user: { select: { name: true, email: true, id: true } },
                content: { select: { title: true, id: true } }
            },
            orderBy: { createdAt: 'desc' }
        });
    } catch (error) {
        console.error("Error fetching all enrollments:", error);
        return [];
    }
}
