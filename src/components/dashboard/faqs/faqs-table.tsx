"use client";

import { useState, useEffect } from "react";
import { FaqEditorPopup } from "./faq-editor-popup";
import { DeleteConfirmationPopup } from "../dashboard/delete-confirmation-popup";

type TabType = "all" | "general" | "implementation" | "security";

type FaqsTableProps = {
  activeTab?: TabType;
};

type Faq = {
  id: string;
  order: number;
  question: string;
  category: string;
  answer: string;
  languages: string[];
};

function FaqsTable({ activeTab = "all" }: FaqsTableProps) {
  const [faqs, setFaqs] = useState<Faq[]>([
    {
      id: "1",
      order: 1,
      question: "What is ERP and why does my business need it?",
      category: "General",
      answer: "ERP (Enterprise Resource Planning) is an integrated software system that manages core business processes like finance, HR, manufacturing, and supply chain in real-time.",
      languages: ["EN", "AR"]
    },
    {
      id: "2",
      order: 2,
      question: "How long does ERP implementation typically take?",
      category: "Implementation",
      answer: "Implementation time varies based on company size and complexity. Small to medium businesses typically take 3-6 months, while larger enterprises may need 6-12 months.",
      languages: ["EN", "AR"]
    },
    {
      id: "3",
      order: 3,
      question: "Is cloud ERP more secure than on-premise solutions?",
      category: "Security",
      answer: "Modern cloud ERP solutions offer enterprise-grade security with encryption, regular updates, and compliance certifications that many on-premise systems struggle to match.",
      languages: ["EN", "AR"]
    }
  ]);

  const [editingFaq, setEditingFaq] = useState<Faq | null>(null);
  const [deletingFaq, setDeletingFaq] = useState<Faq | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  // Filter FAQs by category
  const filteredFaqs = faqs.filter(faq => {
    if (activeTab === "all") return true;
    return faq.category.toLowerCase() === activeTab.toLowerCase();
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
              order: faq.order // Keep original order
            }
          : faq
      ));
    } else {
      // Add new FAQ
      const newFaq = {
        ...faqData,
        id: Date.now().toString(),
        order: faqs.length + 1,
        languages: ["EN", "AR"]
      };
      setFaqs([...faqs, newFaq]);
    }
    
    setIsEditorOpen(false);
  };

  if (filteredFaqs.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-white/40 text-lg">No FAQs found</p>
        <p className="text-white/20 text-sm mt-2">Try changing the filter or create a new FAQ</p>
      </div>
    );
  }

  return (
    <>
      <div className="text-white/70">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/10 text-xs font-medium text-white/50 uppercase tracking-wider">
          <div className="col-span-1">Order</div>
          <div className="col-span-4">Question (EN)</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-2">Languages</div>
          <div className="col-span-3 text-right">Actions</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-white/10">
          {filteredFaqs.map((faq) => (
            <div key={faq.id} className="grid grid-cols-12 gap-4 px-6 py-5 hover:bg-white/5 transition-colors">
              {/* Order */}
              <div className="col-span-1">
                <span className="text-sm font-medium text-white">
                  {faq.order}
                </span>
              </div>

              {/* Question */}
              <div className="col-span-4">
                <h3 className="text-sm font-medium text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-xs text-white/50 line-clamp-2">
                  {faq.answer}
                </p>
              </div>

              {/* Category */}
              <div className="col-span-2">
                <span className="inline-flex px-3 py-1.5 text-xs rounded-full bg-secondary/20 text-secondary border border-secondary/30">
                  {faq.category}
                </span>
              </div>

              {/* Languages */}
              <div className="col-span-2">
                <div className="flex gap-1">
                  {faq.languages.map((lang) => (
                    <span 
                      key={lang}
                      className="px-2 py-1 text-xs bg-white/10 text-white/70 rounded"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="col-span-3 flex items-start justify-end gap-1">
                <button
                  onClick={() => handleEdit(faq.id)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
                  title="Edit FAQ"
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
                  title="Delete FAQ"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                    />
                  </svg>
                </button>
                <button
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
                  title="View details"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102-1.101" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FaqEditorPopup
        isOpen={isEditorOpen}
        onClose={() => {
          setIsEditorOpen(false);
          setEditingFaq(null);
        }}
        onSubmit={handleSubmitFaq}
        faq={editingFaq}
      />

      <DeleteConfirmationPopup
        isOpen={isDeletePopupOpen}
        onClose={() => {
          setIsDeletePopupOpen(false);
          setDeletingFaq(null);
        }}
        onConfirm={handleDeleteConfirm}
        articleTitle={deletingFaq?.question}
      />
    </>
  );
}

export { FaqsTable };