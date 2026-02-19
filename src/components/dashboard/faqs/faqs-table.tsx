"use client";

import { useState, useEffect } from "react";
import { FaqEditorPopup } from "./faq-editor-popup";
import { DeleteFaqConfirmationPopup } from "./delete-faq-confirmation-popup";

type FaqsTableProps = {
  activeTab?: "all" | "published" | "drafts";
  searchQuery?: string;
};

type Faq = {
  id: string;
  order: number;
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
  status: "published" | "draft";
  publishedAt: string | null;
  languages: string[];
};

function FaqsTable({ activeTab = "all", searchQuery = "" }: FaqsTableProps) {
  const [faqs, setFaqs] = useState<Faq[]>([
    {
      id: "1",
      order: 1,
      questionEn: "What is ERP and why does my business need it?",
      questionAr: "ما هو تخطيط موارد المؤسسة ولماذا يحتاجه عملي؟",
      answerEn: "ERP (Enterprise Resource Planning) is an integrated software system that manages core business processes like finance, HR, manufacturing, and supply chain in real-time.",
      answerAr: "نظام تخطيط موارد المؤسسة (ERP) هو نظام برمجي متكامل يدير العمليات التجارية الأساسية مثل المالية والموارد البشرية والتصنيع وسلسلة التوريد في الوقت الفعلي.",
      status: "published",
      publishedAt: "2025-02-10T10:00:00Z",
      languages: ["EN", "AR"]
    },
    {
      id: "2",
      order: 2,
      questionEn: "How long does ERP implementation typically take?",
      questionAr: "كم من الوقت يستغرق تنفيذ نظام تخطيط موارد المؤسسة عادة؟",
      answerEn: "Implementation time varies based on company size and complexity. Small to medium businesses typically take 3-6 months, while larger enterprises may need 6-12 months.",
      answerAr: "يختلف وقت التنفيذ بناءً على حجم الشركة وتعقيدها. تستغرق الشركات الصغيرة والمتوسطة عادة من 3 إلى 6 أشهر، بينما قد تحتاج المؤسسات الأكبر من 6 إلى 12 شهراً.",
      status: "published",
      publishedAt: "2025-02-05T14:30:00Z",
      languages: ["EN", "AR"]
    },
    {
      id: "3",
      order: 3,
      questionEn: "Is cloud ERP more secure than on-premise solutions?",
      questionAr: "هل نظام تخطيط موارد المؤسسة السحابي أكثر أماناً من الحلول المحلية؟",
      answerEn: "Modern cloud ERP solutions offer enterprise-grade security with encryption, regular updates, and compliance certifications that many on-premise systems struggle to match.",
      answerAr: "توفر حلول تخطيط موارد المؤسسة السحابية الحديثة أماناً على مستوى المؤسسات مع التشفير والتحديثات المنتظمة وشهادات الامتثال التي تجد العديد من الأنظمة المحلية صعوبة في مضاهاتها.",
      status: "draft",
      publishedAt: null,
      languages: ["EN", "AR"]
    }
  ]);

  const [editingFaq, setEditingFaq] = useState<Faq | null>(null);
  const [deletingFaq, setDeletingFaq] = useState<Faq | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  // Filter FAQs by status and search query
  const filteredFaqs = faqs.filter(faq => {
    // Filter by status
    if (activeTab === "published" && faq.status !== "published") return false;
    if (activeTab === "drafts" && faq.status !== "draft") return false;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        faq.questionEn.toLowerCase().includes(query) ||
        faq.questionAr.includes(query) ||
        faq.answerEn.toLowerCase().includes(query) ||
        faq.answerAr.includes(query)
      );
    }
    return true;
  });

  useEffect(() => {
    // Handle opening new FAQ editor
    const handleOpenNewFaq = () => {
      setEditingFaq(null);
      setIsEditorOpen(true);
    };

    window.addEventListener('openNewFaq', handleOpenNewFaq);
    return () => window.removeEventListener('openNewFaq', handleOpenNewFaq);
  }, []);

  const handleEdit = (id: string) => {
    const faq = faqs.find(faq => faq.id === id);
    if (faq) {
      setEditingFaq(faq);
      setIsEditorOpen(true);
    }
  };

  const handleDeleteClick = (id: string) => {
    const faq = faqs.find(faq => faq.id === id);
    if (faq) {
      setDeletingFaq(faq);
      setIsDeletePopupOpen(true);
    }
  };

  const handleDeleteConfirm = () => {
    if (deletingFaq) {
      setFaqs(faqs.filter(faq => faq.id !== deletingFaq.id));
    }
    setDeletingFaq(null);
  };

  const handleSubmitFaq = (faqData: any) => {
    if (editingFaq) {
      // Update existing FAQ
      setFaqs(faqs.map(faq => 
        faq.id === editingFaq.id 
          ? { 
              ...faq, 
              ...faqData,
              order: faqData.order,
            }
          : faq
      ));
    } else {
      // Add new FAQ
      const newFaq = {
        ...faqData,
        languages: ["EN", "AR"]
      };
      setFaqs([...faqs, newFaq]);
    }
    
    setIsEditorOpen(false);
  };

  const getStatusBadge = (status: string) => {
    if (status === "published") {
      return (
        <span className="inline-flex px-2 sm:px-3 py-1 sm:py-1.5 text-xs rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          Published
        </span>
      );
    }
    return (
      <span className="inline-flex px-2 sm:px-3 py-1 sm:py-1.5 text-xs rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
        Draft
      </span>
    );
  };

  if (filteredFaqs.length === 0) {
    return (
      <div className="text-center py-12 sm:py-16 px-4">
        <p className="text-white/40 text-base sm:text-lg">No FAQs found</p>
        <p className="text-white/20 text-xs sm:text-sm mt-2">Try changing the filter or create a new FAQ</p>
      </div>
    );
  }

  return (
    <>
      {/* Mobile View (Card Layout) */}
      <div className="block lg:hidden divide-y divide-white/10">
        {filteredFaqs.map((faq) => (
          <div key={faq.id} className="p-4 space-y-3 hover:bg-white/5 transition-colors">
            {/* Order and Status */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-white/40">#{faq.order}</span>
              {getStatusBadge(faq.status)}
            </div>

            {/* Question - Always show English version */}
            <h3 className="text-sm font-medium text-white line-clamp-2">
              {faq.questionEn}
            </h3>

            {/* Answer Preview - Always show English version */}
            <p className="text-xs text-white/50 line-clamp-2">
              {faq.answerEn}
            </p>

            {/* Actions */}
            <div className="flex items-center justify-end gap-1 pt-2">
              <button
                onClick={() => handleEdit(faq.id)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
                title="Edit"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" 
                  />
                </svg>
              </button>
              <button
                onClick={() => handleDeleteClick(faq.id)}
                className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-white/60 hover:text-red-400"
                title="Delete"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View (Table Layout) */}
      <div className="hidden lg:block text-white/70 overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Table Header */}
          <div className="grid grid-cols-10 gap-4 px-6 py-4 border-b border-white/10 text-xs font-medium text-white/50 uppercase tracking-wider">
            <div className="col-span-1">#</div>
            <div className="col-span-7">Question</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-1 text-right">Actions</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-white/10">
            {filteredFaqs.map((faq) => (
              <div key={faq.id} className="grid grid-cols-10 gap-4 px-6 py-5 hover:bg-white/5 transition-colors">
                {/* Order */}
                <div className="col-span-1">
                  <span className="text-sm font-medium text-white/60">
                    #{faq.order}
                  </span>
                </div>

                {/* Question - Always show English version */}
                <div className="col-span-7">
                  <h3 className="text-sm font-medium text-white mb-1 line-clamp-1">
                    {faq.questionEn}
                  </h3>
                  <p className="text-xs text-white/50 line-clamp-1">
                    {faq.answerEn}
                  </p>
                </div>

                {/* Status */}
                <div className="col-span-1">
                  {getStatusBadge(faq.status)}
                </div>

                {/* Actions */}
                <div className="col-span-1 flex items-start justify-end gap-1">
                  <button
                    onClick={() => handleEdit(faq.id)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
                    title="Edit"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" 
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteClick(faq.id)}
                    className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-white/60 hover:text-red-400"
                    title="Delete"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Editor Popup */}
      <FaqEditorPopup
        isOpen={isEditorOpen}
        onClose={() => {
          setIsEditorOpen(false);
          setEditingFaq(null);
        }}
        onSubmit={handleSubmitFaq}
        faq={editingFaq}
      />

      {/* Delete Confirmation Popup - خاص بالـ FAQs */}
      <DeleteFaqConfirmationPopup
        isOpen={isDeletePopupOpen}
        onClose={() => {
          setIsDeletePopupOpen(false);
          setDeletingFaq(null);
        }}
        onConfirm={handleDeleteConfirm}
        faqQuestion={deletingFaq?.questionEn}
      />
    </>
  );
}

export { FaqsTable };