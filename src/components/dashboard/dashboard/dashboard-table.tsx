"use client";

import { useState, useEffect } from "react";
import { ArticleTable } from "./article-table";
import { ArticleEditorPopup } from "./article-editor-popup";
import { DeleteConfirmationPopup } from "./delete-confirmation-popup";

type DashboardTableProps = {
  activeTab?: "all" | "published" | "drafts";
};

function DashboardTable({ activeTab = "all" }: DashboardTableProps) {
  const [articles, setArticles] = useState([
    {
      id: "1",
      title: "VEGO Expands to New Regional Markets",
      category: "News",
      date: "Feb 02, 2026",
      news: "Company Updates",
      status: "Published",
      imageUrl: "https://images.unsplash.com/photo-1713098965471-d324f294a71d?q=80&w=640",
      shortExcerpt: "Leading the electric revolution across the Middle East with new hubs in Jordan and Bahrain.",
      fullContent: "Detailed content about regional expansion..."
    },
    {
      id: "2",
      title: "Electric Vehicle Technology Advances",
      category: "Technology",
      date: "Jan 15, 2026",
      news: "Tech Innovations",
      status: "Published",
      imageUrl: "",
      shortExcerpt: "Latest breakthroughs in EV battery technology and charging infrastructure.",
      fullContent: "Full article about EV technology advances..."
    },
    {
      id: "3",
      title: "Sustainable Energy Solutions Conference",
      category: "Events",
      date: "Mar 10, 2026",
      news: "Upcoming Events",
      status: "Draft",
      imageUrl: "",
      shortExcerpt: "Join us for the annual sustainable energy solutions conference.",
      fullContent: "Full article about the conference..."
    }
  ]);

  const [editingArticle, setEditingArticle] = useState<any>(null);
  const [deletingArticle, setDeletingArticle] = useState<any>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  // فلترة المقالات حسب التبويب النشط
  const filteredArticles = articles.filter(article => {
    if (activeTab === "published") return article.status === "Published";
    if (activeTab === "drafts") return article.status === "Draft";
    return true; // all
  });

  useEffect(() => {
    // استقبال حدث فتح نافذة المقال الجديد
    const handleOpenNewArticle = () => {
      setEditingArticle(null);
      setIsEditorOpen(true);
    };

    window.addEventListener('openNewArticle', handleOpenNewArticle);
    return () => window.removeEventListener('openNewArticle', handleOpenNewArticle);
  }, []);

  const handleEdit = (id: string) => {
    const article = articles.find(article => article.id === id);
    if (article) {
      setEditingArticle(article);
      setIsEditorOpen(true);
    }
  };

  const handleDeleteClick = (id: string) => {
    const article = articles.find(article => article.id === id);
    if (article) {
      setDeletingArticle(article);
      setIsDeletePopupOpen(true);
    }
  };

  const handleDeleteConfirm = () => {
    if (deletingArticle) {
      setArticles(articles.filter(article => article.id !== deletingArticle.id));
    }
    setDeletingArticle(null);
  };

  const handleSubmitArticle = (articleData: any) => {
    if (editingArticle) {
      // تحديث المقال الموجود
      setArticles(articles.map(article => 
        article.id === editingArticle.id 
          ? { 
              ...article, 
              ...articleData,
              status: article.status // الحفاظ على الحالة
            }
          : article
      ));
    } else {
      // إضافة مقال جديد
      const newArticle = {
        ...articleData,
        id: Date.now().toString(),
        date: new Date().toLocaleDateString('en-US', { 
          month: 'short', 
          day: '2-digit', 
          year: 'numeric' 
        }),
        status: "Draft" // المقالات الجديدة تكون Draft افتراضياً
      };
      setArticles([...articles, newArticle]);
    }
    
    setIsEditorOpen(false);
  };

  return (
    <>
      <ArticleTable
        articles={filteredArticles.map(({ id, title, category, date, status }) => ({ 
          id, 
          title, 
          category, 
          date,
          status 
        }))}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      <ArticleEditorPopup
        isOpen={isEditorOpen}
        onClose={() => {
          setIsEditorOpen(false);
          setEditingArticle(null);
        }}
        onSubmit={handleSubmitArticle}
        article={editingArticle}
      />

      <DeleteConfirmationPopup
        isOpen={isDeletePopupOpen}
        onClose={() => {
          setIsDeletePopupOpen(false);
          setDeletingArticle(null);
        }}
        onConfirm={handleDeleteConfirm}
        articleTitle={deletingArticle?.title}
      />
    </>
  );
}

export { DashboardTable };