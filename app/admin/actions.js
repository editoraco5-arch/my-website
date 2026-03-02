"use server";

import prisma from "../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/authOptions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createContent(formData) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
        throw new Error("Unauthorized");
    }

    const title = formData.get("title")?.trim();
    const description = formData.get("description")?.trim() || null;
    const type = formData.get("type");
    const published = formData.get("published") === "on";
    const imageUrl = formData.get("imageUrl")?.trim() || null;
    const videoUrl = formData.get("videoUrl")?.trim() || null;
    const requirements = formData.get("requirements")?.trim() || null;
    const benefits = formData.get("benefits")?.trim() || null;
    const targetAudience = formData.get("targetAudience")?.trim() || null;

    // Convert price properly or nullify
    const priceRaw = formData.get("price");
    const price = (priceRaw && !isNaN(parseFloat(priceRaw))) ? parseFloat(priceRaw) : null;

    const duration = formData.get("duration")?.trim() || null;
    const level = formData.get("level")?.trim() || "مبتدئ";

    if (!title) {
        throw new Error("العنوان مطلوب");
    }

    await prisma.content.create({
        data: {
            title,
            description,
            type,
            published,
            imageUrl,
            videoUrl,
            requirements,
            benefits,
            targetAudience,
            price,
            duration,
            level,
            authorId: session.user.id,
        }
    });

    revalidatePath("/admin/courses");
    revalidatePath("/courses");
    redirect("/admin/courses");
}

export async function updateContent(id, formData) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
        throw new Error("Unauthorized");
    }

    const title = formData.get("title")?.trim();
    const description = formData.get("description")?.trim() || null;
    const type = formData.get("type");
    const published = formData.get("published") === "on";
    const imageUrl = formData.get("imageUrl")?.trim() || null;
    const videoUrl = formData.get("videoUrl")?.trim() || null;
    const requirements = formData.get("requirements")?.trim() || null;
    const benefits = formData.get("benefits")?.trim() || null;
    const targetAudience = formData.get("targetAudience")?.trim() || null;

    // Convert price properly or nullify
    const priceRaw = formData.get("price");
    const price = (priceRaw && !isNaN(parseFloat(priceRaw))) ? parseFloat(priceRaw) : null;

    const duration = formData.get("duration")?.trim() || null;
    const level = formData.get("level")?.trim() || "مبتدئ";

    if (!title) {
        throw new Error("العنوان مطلوب");
    }

    await prisma.content.update({
        where: { id },
        data: {
            title,
            description,
            type,
            published,
            imageUrl,
            videoUrl,
            requirements,
            benefits,
            targetAudience,
            price,
            duration,
            level,
        }
    });

    revalidatePath("/admin/courses");
    revalidatePath("/courses");
    redirect("/admin/courses");
}

export async function deleteContent(id) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
        throw new Error("Unauthorized");
    }

    await prisma.content.delete({
        where: { id }
    });

    revalidatePath("/admin/courses");
    revalidatePath("/courses");
}

export async function createChapter(contentId, formData) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
        throw new Error("Unauthorized");
    }

    const title = formData.get("title")?.trim();
    const videoUrl = formData.get("videoUrl")?.trim() || null;
    const orderRaw = formData.get("order");
    const order = (orderRaw && !isNaN(parseInt(orderRaw))) ? parseInt(orderRaw) : 0;

    if (!title) {
        throw new Error("عنوان الدرس مطلوب");
    }

    await prisma.chapter.create({
        data: {
            title,
            videoUrl,
            order,
            contentId,
            authorId: session.user.id
        }
    });

    revalidatePath(`/admin/courses/${contentId}/edit`);
    revalidatePath(`/courses/${contentId}`);
}

export async function deleteChapter(id, contentId) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
        throw new Error("Unauthorized");
    }

    try {
        await prisma.chapter.delete({
            where: { id }
        });
    } catch (error) {
        console.error("Error deleting chapter:", error);
        throw new Error("Failed to delete chapter");
    }

    revalidatePath(`/admin/courses/${contentId}/edit`);
    revalidatePath(`/courses/${contentId}`);
}

export async function updateChapter(id, contentId, formData) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
        throw new Error("Unauthorized");
    }

    const title = formData.get("title")?.trim();
    const videoUrl = formData.get("videoUrl")?.trim() || null;
    const orderRaw = formData.get("order");
    const order = (orderRaw && !isNaN(parseInt(orderRaw))) ? parseInt(orderRaw) : 0;

    if (!title) {
        throw new Error("عنوان الدرس مطلوب");
    }

    await prisma.chapter.update({
        where: { id },
        data: {
            title,
            videoUrl,
            order,
        }
    });

    revalidatePath(`/admin/courses/${contentId}/edit`);
    revalidatePath(`/courses/${contentId}`);
    redirect(`/admin/courses/${contentId}/edit`);
}
