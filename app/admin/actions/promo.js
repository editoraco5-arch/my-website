"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../../lib/authOptions";
import prisma from "../../lib/prisma";
import { enrollUser } from "./enrollment";

// Validate a promo code (without redeeming it yet)
export async function validatePromoCode(code, contentId) {
    if (!code) return { valid: false, error: "الرجاء إدخال كود الخصم" };

    const promo = await prisma.promoCode.findUnique({
        where: { code: code.trim().toUpperCase() }
    });

    if (!promo) return { valid: false, error: "كود الخصم غير صحيح" };
    if (!promo.active) return { valid: false, error: "كود الخصم غير فعال" };
    if (promo.expiresAt && new Date(promo.expiresAt) < new Date()) {
        return { valid: false, error: "انتهت صلاحية كود الخصم" };
    }
    if (promo.maxUses !== null && promo.usedCount >= promo.maxUses) {
        return { valid: false, error: "لقد تجاوز هذا الكود الحد الأقصى للاستخدام" };
    }
    if (promo.contentId && promo.contentId !== contentId) {
        return { valid: false, error: "هذا الكود مخصص لدورة مختلفة" };
    }

    return {
        valid: true,
        discount: promo.discount,
        promoId: promo.id,
        message: promo.discount === 100
            ? "🎉 وصول مجاني 100%! سيتم تفعيل الدورة مباشرة"
            : `✅ خصم ${promo.discount}% سيُطبق على السعر`
    };
}

// Apply a promo code and enroll user if 100% discount
export async function applyPromoCode(code, contentId) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return { success: false, error: "يجب تسجيل الدخول أولاً" };

    // Re-validate before applying
    const validation = await validatePromoCode(code, contentId);
    if (!validation.valid) return { success: false, error: validation.error };

    const promo = await prisma.promoCode.findUnique({
        where: { code: code.trim().toUpperCase() }
    });

    // Increment usage counter
    await prisma.promoCode.update({
        where: { id: promo.id },
        data: { usedCount: { increment: 1 } }
    });

    // If 100% discount, auto-enroll user immediately
    if (promo.discount === 100) {
        const enrollResult = await enrollUser(contentId);
        return {
            success: true,
            enrolled: true,
            discount: 100,
            message: "🎉 تم التسجيل في الدورة بنجاح! يمكنك البدء الآن."
        };
    }

    // For partial discounts, return the discount info for checkout
    return {
        success: true,
        enrolled: false,
        discount: promo.discount,
        promoId: promo.id,
        message: `تم تطبيق خصم ${promo.discount}%`
    };
}

// Admin: Create a new promo code
export async function createPromoCode({ code, discount, maxUses, contentId, expiresAt }) {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "ADMIN") throw new Error("غير مصرح");

    const promo = await prisma.promoCode.create({
        data: {
            code: code.trim().toUpperCase(),
            discount: parseInt(discount),
            maxUses: maxUses ? parseInt(maxUses) : null,
            contentId: contentId || null,
            expiresAt: expiresAt ? new Date(expiresAt) : null,
        }
    });

    return { success: true, promo };
}

// Admin: Get all promo codes
export async function getAllPromoCodes() {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "ADMIN") return [];

    return await prisma.promoCode.findMany({
        orderBy: { createdAt: 'desc' }
    });
}

// Admin: Toggle promo code active state
export async function togglePromoCode(id) {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "ADMIN") throw new Error("غير مصرح");

    const promo = await prisma.promoCode.findUnique({ where: { id } });
    return await prisma.promoCode.update({
        where: { id },
        data: { active: !promo.active }
    });
}

// Admin: Delete a promo code
export async function deletePromoCode(id) {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "ADMIN") throw new Error("غير مصرح");
    await prisma.promoCode.delete({ where: { id } });
    return { success: true };
}
