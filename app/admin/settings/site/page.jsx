"use client";

import { useState, useEffect } from "react";
import { updateSiteSection, getAllSiteSections } from "../../actions/site";
import { Save, Loader2, LayoutTemplate, Info, PanelBottom, CheckCircle2, X, Image as ImageIcon, Video, Type, Link as LinkIcon, BookOpen, MessageCircleQuestion, Palette, Globe, Megaphone, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { HexColorPicker } from "react-colorful";

// Helper icons mapping
const ICONS = {
    branding_theme: Palette,
    seo_social: Globe,
    general_content: Megaphone,
    home_hero: LayoutTemplate,
    home_courses: BookOpen,
    home_about: Info,
    home_faq: MessageCircleQuestion,
    footer_info: PanelBottom,
};

const AVAILABLE_SECTIONS = [
    {
        key: "branding_theme",
        title: "الهوية البصرية (Branding)",
        description: "تغيير شعار الموقع، الألوان الأساسية، والأيقونة المصغرة (Favicon).",
        fields: [
            { name: "logoUrl", type: "text", label: "رابط الشعار (SVG/PNG)", icon: ImageIcon, placeholder: "/images/logo.png" },
            { name: "faviconUrl", type: "text", label: "رابط الأيقونة (Favicon)", icon: ImageIcon, placeholder: "/favicon.ico" },
            { name: "primaryColor", type: "color", label: "اللون الأساسي للموقع", icon: Palette, default: "#C9A84C" },
            { name: "heroBackgroundUrl", type: "text", label: "رابط خلفية الهيرو (فيديو أو صورة)", icon: Video },
        ]
    },
    {
        key: "seo_social",
        title: "السيو والتواصل (SEO & Social)",
        description: "إعدادات محركات البحث، نصوص المشاركة، وروابط التواصل الاجتماعي.",
        fields: [
            { name: "metaTitle", type: "text", label: "عنوان الموقع لمحركات البحث (SEO Title)", icon: Type },
            { name: "metaDescription", type: "textarea", label: "وصف الموقع (SEO Description)", icon: Type },
            { name: "ogImage", type: "text", label: "صورة المشاركة (OG Image)", icon: ImageIcon },
            { name: "whatsapp", type: "text", label: "رابط الواتساب", icon: MessageCircleQuestion },
            { name: "facebook", type: "text", label: "رابط الفيسبوك", icon: Share2 },
        ]
    },
    {
        key: "general_content",
        title: "المحتوى العام (General)",
        description: "النصوص الأساسية التي تظهر في شريط التنقل والتذييل.",
        fields: [
            { name: "siteTitle", type: "text", label: "اسم الموقع الرئيسي", icon: Type, placeholder: "Editora" },
            { name: "navLink1", type: "text", label: "رابط التنقل 1", icon: LinkIcon, placeholder: "/courses" },
            { name: "navText1", type: "text", label: "نص الرابط 1", icon: Type, placeholder: "الدورات" },
        ]
    },
    {
        key: "home_hero",
        title: "الرئيسية - القسم الأعلى (Hero)",
        description: "واجهة الموقع الرئيسية، النص الترحيبي، والأزرار وخلفية الفيديو.",
        fields: [
            { name: "heading", type: "text", label: "العنوان الرئيسي", icon: Type },
            { name: "subheading", type: "textarea", label: "الوصف الفرعي", icon: Type },
            { name: "buttonText", type: "text", label: "نص زر التشويقة (Trailer)", icon: Type },
            { name: "buttonLink", type: "text", label: "رابط الزر الرئيسي (تصفح الدورات)", icon: LinkIcon, placeholder: "/courses" },
            { name: "videoUrl", type: "text", label: "رابط فيديو الخلفية (MP4)", icon: Video, placeholder: "https://player.vimeo.com/external/..." },
            { name: "trailerUrl", type: "text", label: "رابط فيديو التشويقة (Vimeo/YouTube iframe url)", icon: Video, placeholder: "https://player.vimeo.com/video/..." },
        ]
    },
    {
        key: "home_courses",
        title: "قسم الكورسات المميزة",
        description: "عنوان ونصوص قسم أحدث الدورات المعروض على الرئيسية.",
        fields: [
            { name: "title", type: "text", label: "العنوان الرئيسي (مثال: أحدث الدورات)", icon: Type },
            { name: "subtitle", type: "text", label: "الكلمة المميزة (تظهر بلون مختلف، مثال: الدورات)", icon: Type },
            { name: "description", type: "textarea", label: "الوصف الفرعي", icon: Type },
            { name: "buttonText", type: "text", label: "نص زر تصفح الكل", icon: Type },
        ]
    },
    {
        key: "home_about",
        title: "قسم عن المدرب",
        description: "معلومات المدرب، نبذة عنه وصورته الشخصية.",
        fields: [
            { name: "title", type: "text", label: "عنوان القسم", icon: Type },
            { name: "description", type: "textarea", label: "عن المدرب", icon: Type },
            { name: "imageUrl", type: "text", label: "رابط صورة المدرب", icon: ImageIcon, placeholder: "https://images.unsplash.com/..." },
        ]
    },
    {
        key: "home_faq",
        title: "الأسئلة الشائعة (FAQ)",
        description: "مجموعة الأسئلة الشائعة وأجوبتها التي تظهر في الصفحة الرئيسية. (بحد أقصى 5 أسئلة)",
        fields: [
            { name: "faqTitle", type: "text", label: "عنوان القسم الرئيسي (مثال: الأسئلة الشائعة)", icon: Type },
            { name: "faqDescription", type: "textarea", label: "الوصف الفرعي لقسم الأسئلة", icon: Type },

            { name: "q1", type: "text", label: "السؤال الأول", icon: MessageCircleQuestion },
            { name: "a1", type: "textarea", label: "إجابة السؤال الأول", icon: Type },

            { name: "q2", type: "text", label: "السؤال الثاني", icon: MessageCircleQuestion },
            { name: "a2", type: "textarea", label: "إجابة السؤال الثاني", icon: Type },

            { name: "q3", type: "text", label: "السؤال الثالث", icon: MessageCircleQuestion },
            { name: "a3", type: "textarea", label: "إجابة السؤال الثالث", icon: Type },

            { name: "q4", type: "text", label: "السؤال الرابع", icon: MessageCircleQuestion },
            { name: "a4", type: "textarea", label: "إجابة السؤال الرابع", icon: Type },

            { name: "q5", type: "text", label: "السؤال الخامس", icon: MessageCircleQuestion },
            { name: "a5", type: "textarea", label: "إجابة السؤال الخامس", icon: Type },
        ]
    },
    {
        key: "footer_info",
        title: "معلومات التذييل (Footer)",
        description: "النصوص والروابط الخاصة بتذييل الموقع.",
        fields: [
            { name: "aboutText", type: "textarea", label: "نبذة تعريفية في الأسفل", icon: Type },
            { name: "twitter", type: "text", label: "رابط حساب X (Twitter)", icon: LinkIcon, placeholder: "https://twitter.com/..." },
            { name: "instagram", type: "text", label: "رابط حساب Instagram", icon: LinkIcon, placeholder: "https://instagram.com/..." },
        ]
    }
];

export default function SiteSettingsPage() {
    const [sectionsData, setSectionsData] = useState({});
    const [loading, setLoading] = useState(true);
    const [savingKey, setSavingKey] = useState(null);
    const [activeTab, setActiveTab] = useState(AVAILABLE_SECTIONS[0].key);

    // Toast state
    const [toast, setToast] = useState({ show: false, message: "", type: "success" });

    useEffect(() => {
        async function loadSections() {
            try {
                const sections = await getAllSiteSections();
                const mapped = {};
                if (sections) {
                    sections.forEach(sec => {
                        mapped[sec.key] = sec.content;
                    });
                }
                setSectionsData(mapped);
            } catch (err) {
                console.error("Failed to load sections", err);
            } finally {
                setLoading(false);
            }
        }
        loadSections();
    }, []);

    const showToast = (message, type = "success") => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
    };

    const handleChange = (sectionKey, fieldName, value) => {
        setSectionsData(prev => ({
            ...prev,
            [sectionKey]: {
                ...(prev[sectionKey] || {}),
                [fieldName]: value
            }
        }));
    };

    const handleSave = async (sectionInfo) => {
        setSavingKey(sectionInfo.key);
        try {
            const content = sectionsData[sectionInfo.key] || {};
            await updateSiteSection(sectionInfo.key, sectionInfo.title, content);
            showToast(`تم حفظ وتحديث "${sectionInfo.title}" بنجاح!`);
        } catch (error) {
            showToast(`فشل تحديث "${sectionInfo.title}". حاول مرة أخرى.`, "error");
        } finally {
            setSavingKey(null);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="flex flex-col items-center gap-4 text-champagne">
                    <Loader2 className="w-12 h-12 animate-spin" />
                    <p className="animate-pulse font-medium text-lg font-heading tracking-widest text-champagne/80">جاري تحميل الإعدادات...</p>
                </div>
            </div>
        );
    }

    const activeSection = AVAILABLE_SECTIONS.find(s => s.key === activeTab);

    return (
        <div dir="rtl" className="max-w-6xl mx-auto pb-20 px-4 sm:px-6 lg:px-8 font-heading">
            {/* Header */}
            <div className="mb-12 border-b border-white/5 pb-8 relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-champagne/5 rounded-full blur-[100px] pointer-events-none" />
                <h1 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 drop-shadow-lg">إعدادات الموقع الشاملة</h1>
                <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                    لوحة التحكم المركزية (Super Admin Panel) للتحكم بكامل هوية، محتوى، إعدادات الدفع، والسيو (SEO) للموقع دون الحاجة لأي كود برمجي. التعديلات تطبق فوراً.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Sidebar Navigation */}
                <aside className="lg:w-1/3 xl:w-1/4 shrink-0 w-full sticky top-8">
                    <nav className="flex flex-col gap-3">
                        {AVAILABLE_SECTIONS.map((section) => {
                            const Icon = ICONS[section.key] || LayoutTemplate;
                            const isActive = activeTab === section.key;
                            return (
                                <button
                                    key={section.key}
                                    onClick={() => setActiveTab(section.key)}
                                    className={`
                                        flex items-center gap-4 px-5 py-4 rounded-xl text-right transition-all duration-300 relative overflow-hidden group
                                        ${isActive
                                            ? "bg-champagne/10 border border-champagne/30 text-champagne shadow-[0_0_20px_rgba(201,168,76,0.15)]"
                                            : "bg-[#0b0c10] border border-white/5 text-gray-400 hover:bg-white/5 hover:text-white"}
                                    `}
                                >
                                    {isActive && <div className="absolute inset-0 bg-gradient-to-l from-champagne/5 to-transparent blur-xl" />}
                                    <div className={`p-2 rounded-lg ${isActive ? 'bg-champagne/20' : 'bg-white/5 group-hover:bg-white/10'} transition-colors`}>
                                        <Icon className={`w-5 h-5 ${isActive ? "text-champagne" : "text-gray-500 group-hover:text-white"}`} />
                                    </div>
                                    <span className="font-bold text-sm sm:text-base tracking-wide z-10">{section.title}</span>
                                    {isActive && (
                                        <motion.div layoutId="activeTabIndicator" className="absolute right-0 top-0 bottom-0 w-1 bg-champagne shadow-[0_0_10px_rgba(201,168,76,0.8)]" />
                                    )}
                                </button>
                            );
                        })}
                    </nav>

                    <div className="mt-8 bg-gradient-to-b from-[#0b0c10] to-black border border-white/5 rounded-2xl p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl"></div>
                        <div className="flex items-start gap-4 relative z-10">
                            <Info className="w-6 h-6 text-champagne/70 shrink-0 mt-0.5" />
                            <p className="text-sm text-gray-400 leading-loose">
                                <strong>تنويه:</strong> تأكد من استخدام روابط صالحة للصور ومقاطع الفيديو (<span className="text-champagne/80 text-xs font-mono" dir="ltr">https://...</span>) لضمان ظهورها بشكل احترافي للزوار.
                            </p>
                        </div>
                    </div>
                </aside>

                {/* Content Area */}
                <div className="flex-1 w-full relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="bg-[#0b0c10] border border-white/10 rounded-3xl shadow-2xl shadow-black/50 overflow-hidden relative"
                        >
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-champagne/30 to-transparent opacity-50" />

                            {/* Panel Header */}
                            <div className="p-8 border-b border-white/5 bg-black/20 flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                                <div>
                                    <h2 className="text-2xl font-black text-white mb-2">{activeSection.title}</h2>
                                    <p className="text-gray-400 text-sm leading-relaxed">{activeSection.description}</p>
                                </div>
                                <button
                                    onClick={() => handleSave(activeSection)}
                                    disabled={savingKey === activeSection.key}
                                    className="group relative inline-flex items-center justify-center gap-3 bg-champagne hover:bg-yellow-400 text-obsidian px-8 py-3.5 rounded-xl text-base font-extrabold transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(201,168,76,0.3)] hover:shadow-[0_0_30px_rgba(201,168,76,0.5)] focus:outline-none"
                                >
                                    {savingKey === activeSection.key ? (
                                        <Loader2 className="w-5 h-5 animate-spin shrink-0" />
                                    ) : (
                                        <Save className="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" />
                                    )}
                                    <span>
                                        {savingKey === activeSection.key ? 'جاري الحفظ...' : 'حفظ التعديلات'}
                                    </span>
                                </button>
                            </div>

                            {/* Form Fields */}
                            <div className="p-8 space-y-8 relative z-10">
                                {activeSection.fields.map(field => {
                                    const value = sectionsData[activeSection.key]?.[field.name] || "";
                                    const FieldIcon = field.icon || Type;

                                    return (
                                        <div key={field.name} className="space-y-3">
                                            <label className="flex items-center gap-2 text-sm font-bold text-gray-200">
                                                <FieldIcon className="w-4 h-4 text-champagne/70" />
                                                {field.label}
                                            </label>
                                            {field.type === "textarea" && (
                                                <div className="relative group">
                                                    <textarea
                                                        value={value}
                                                        onChange={(e) => handleChange(activeSection.key, field.name, e.target.value)}
                                                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-champagne/50 focus:ring-1 focus:ring-champagne/50 transition-all duration-300 min-h-[160px] resize-y placeholder:text-gray-600 focus:bg-black/60 shadow-inner leading-loose"
                                                        placeholder={field.placeholder || `أدخل ${field.label}...`}
                                                        dir="auto"
                                                    />
                                                </div>
                                            )}

                                            {field.type === "text" && (
                                                <div className="relative group">
                                                    <input
                                                        type={field.name.toLowerCase().includes('secret') ? "password" : "text"}
                                                        value={value}
                                                        onChange={(e) => handleChange(activeSection.key, field.name, e.target.value)}
                                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-champagne/50 focus:ring-1 focus:ring-champagne/50 transition-all duration-300 placeholder:text-gray-600 focus:bg-black/60 shadow-inner"
                                                        placeholder={field.placeholder || `أدخل ${field.label}...`}
                                                        dir={field.name.toLowerCase().includes('url') || field.name.toLowerCase().includes('key') ? "ltr" : "auto"}
                                                    />
                                                </div>
                                            )}

                                            {field.type === "color" && (
                                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-4 bg-black/20 rounded-2xl border border-white/5">
                                                    <div dir="ltr">
                                                        <HexColorPicker
                                                            color={value || field.default || "#C9A84C"}
                                                            onChange={(newColor) => handleChange(activeSection.key, field.name, newColor)}
                                                        />
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <div
                                                            className="w-16 h-16 rounded-xl border-2 border-white/20 shadow-lg"
                                                            style={{ backgroundColor: value || field.default || "#C9A84C" }}
                                                        />
                                                        <div className="font-mono text-gray-300 text-lg bg-black/50 px-4 py-2 rounded-lg border border-white/10" dir="ltr">
                                                            {(value || field.default || "#C9A84C").toUpperCase()}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {field.type === "toggle" && (
                                                <label className="relative inline-flex items-center cursor-pointer pt-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={value !== undefined && value !== "" ? Boolean(value) : Boolean(field.default)}
                                                        onChange={(e) => handleChange(activeSection.key, field.name, e.target.checked)}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-14 h-7 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[10px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-6 after:transition-all peer-checked:bg-champagne shadow-inner border border-white/5"></div>
                                                    <span className="mr-4 text-sm font-medium text-gray-400">
                                                        {(value !== undefined && value !== "" ? Boolean(value) : Boolean(field.default)) ? 'مفعل (Active)' : 'معطل (Disabled)'}
                                                    </span>
                                                </label>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Toast Notification */}
            <AnimatePresence>
                {toast.show && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100]"
                    >
                        <div className={`
                            flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-xl
                            ${toast.type === "success"
                                ? "bg-[#0b0c10]/95 border-emerald-500/30 text-emerald-400"
                                : "bg-[#0b0c10]/95 border-red-500/30 text-red-400"}
                        `}>
                            {toast.type === "success" ? (
                                <div className="p-1 bg-emerald-500/10 rounded-full">
                                    <CheckCircle2 className="w-6 h-6 shrink-0" />
                                </div>
                            ) : (
                                <div className="p-1 bg-red-500/10 rounded-full">
                                    <X className="w-6 h-6 shrink-0" />
                                </div>
                            )}
                            <p className="font-bold text-sm text-white tracking-wide">{toast.message}</p>
                            <button
                                onClick={() => setToast({ show: false, message: "", type: "success" })}
                                className="text-gray-500 hover:text-white transition-colors mr-6"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
