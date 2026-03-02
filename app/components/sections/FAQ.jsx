"use client";
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function FAQ({ data }) {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFaq = (index) => {
        if (openIndex === index) {
            setOpenIndex(null);
        } else {
            setOpenIndex(index);
        }
    };

    const defaultFaqs = [
        {
            question: "هل أحتاج لخبرة سابقة في المونتاج للبدء؟",
            answer: "لا أبداً. الدورة تبدأ معك من الصفر، كيف تحمل البرنامج وتثبته، مروراً بالأساسيات، وحتى الوصول لمرحلة الاحتراف والتلوين السينمائي المعقد."
        },
        {
            question: "هل برنامج دافينشي ريزولف مجاني؟",
            answer: "نعم، النسخة المجانية من البرنامج قوية جداً وتكفي بنسبة 95% من الاحتياجات. وهناك نسخة مدفوعة (Studio) نغطي الفروقات بينهما في الدورة."
        },
        {
            question: "هل الدورة محدثة لآخر إصدار من البرنامج؟",
            answer: "نعم، محتوى الدورة يتم تحديثه باستمرار بأحدث الإضافات والتحديثات الجديدة للبرنامج بمجرد صدورها."
        },
        {
            question: "إلى متى ستكون الفيديوهات متاحة لي؟",
            answer: "بمجرد اشتراكك بالدورة، ستحصل على وصول مدى الحياة للمحتوى ولأي تحديثات مستقبلية بدون أي اشتراكات إضافية."
        },
        {
            question: "هل من الممكن التواصل مع المدرب حال كان لدي أسئلة؟",
            answer: "بالتأكيد، هناك مجتمع خاص بالطلاب داخل المنصة، يمكنك طرح أسئلتك وسيتم الرد عليك شخصياً."
        }
    ];

    let faqs = [];
    if (data && Object.keys(data).length > 2) { // More than just title/desc
        for (let i = 1; i <= 5; i++) {
            if (data[`q${i}`] && data[`a${i}`]) {
                faqs.push({ question: data[`q${i}`], answer: data[`a${i}`] });
            }
        }
    }

    if (faqs.length === 0) {
        faqs = defaultFaqs;
    }

    return (
        <section className="py-28 bg-transparent relative z-10">
            <div className="max-w-3xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold font-heading text-white mb-4">
                        {data?.faqTitle || "الأسئلة الشائعة"}
                    </h2>
                    <p className="text-gray-400 font-drama">
                        {data?.faqDescription || "إجابات على أهم الاستفسارات التي تهمك قبل الاشتراك"}
                    </p>
                </div>

                <div className="space-y-4 text-right">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div key={index} className="bg-midnight-950/50 border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/10">
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full p-6 text-right flex justify-between items-center group bg-white/[0.01] hover:bg-white/[0.03] transition-colors"
                                >
                                    <h3 className="text-lg font-bold text-gray-200 group-hover:text-champagne transition-colors">{faq.question}</h3>
                                    {isOpen ? (
                                        <Minus className="w-5 h-5 text-champagne shrink-0" />
                                    ) : (
                                        <Plus className="w-5 h-5 text-gray-500 group-hover:text-champagne shrink-0 transition-colors" />
                                    )}
                                </button>

                                {isOpen && (
                                    <div className="p-6 pt-0 text-gray-400 font-drama leading-relaxed border-t border-white/5">
                                        <p className="pt-4 animate-fade-in">{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
