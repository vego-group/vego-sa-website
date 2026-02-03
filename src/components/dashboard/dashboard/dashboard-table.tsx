import { useState } from "react";
import { ArticleTable } from "./article-table";
import { ArticleEditorPopup } from "./article-editor-popup";
import { DeleteConfirmationPopup } from "./delete-confirmation-popup";

function DashboardTable() {
  const [articles, setArticles] = useState([
    {
      id: "1",
      title: "VEGO Expands to New Regional Markets",
      category: "News",
      date: "Feb 02, 2026",
      news: "Company Updates",
      imageUrl: "https://images.unsplash.com/photo-1713098965471-d324f294a71d?q=80&w=640",
      shortExcerpt: "Leading the electric revolution across the Middle East with new hubs in Jordan and Bahrain.",
      fullContent: "Detailed content about regional expansion... VEGO continues to lead the electric revolution across the Middle East with strategic expansions into new markets. Our new hubs in Jordan and Bahrain will provide enhanced services and support to our growing customer base in these regions."
    },
    {
      id: "2",
      title: "Electric Vehicle Technology Advances",
      category: "Technology",
      date: "Jan 15, 2026",
      news: "Tech Innovations",
      imageUrl: "https://images.unsplash.com/photo-...",
      shortExcerpt: "Latest breakthroughs in EV battery technology and charging infrastructure.",
      fullContent: "Full article about EV technology advances..."
    },
    {
      id: "3",
      title: "Sustainable Energy Solutions Conference",
      category: "Events",
      date: "Mar 10, 2026",
      news: "Upcoming Events",
      imageUrl: "https://images.unsplash.com/photo-...",
      shortExcerpt: "Join us for the annual sustainable energy solutions conference.",
      fullContent: "Full article about the conference..."
    }
  ]);

  const [editingArticle, setEditingArticle] = useState<any>(null);
  const [deletingArticle, setDeletingArticle] = useState<any>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

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
      alert(`"${deletingArticle.title}" has been deleted successfully!`);
    }
    setDeletingArticle(null);
  };

  const handleNewArticle = () => {
    setEditingArticle(null);
    setIsEditorOpen(true);
  };

  const handleSubmitArticle = (articleData: any) => {
    if (editingArticle) {
      // تحديث المقال الموجود
      setArticles(articles.map(article => 
        article.id === editingArticle.id 
          ? { 
              ...article, 
              ...articleData,
              id: editingArticle.id, // الحفاظ على الـ ID
              date: article.date // الحفاظ على تاريخ الإنشاء
            }
          : article
      ));
      alert("Article updated successfully!");
    } else {
      // إضافة مقال جديد
      const newArticle = {
        ...articleData,
        id: Date.now().toString(),
        date: new Date().toLocaleDateString('en-US', { 
          month: 'short', 
          day: '2-digit', 
          year: 'numeric' 
        })
      };
      setArticles([...articles, newArticle]);
      alert("New article created successfully!");
    }
    
    setIsEditorOpen(false);
  };

  return (
    <>
      <ArticleTable
        articles={articles.map(({ id, title, category, date }) => ({ id, title, category, date }))}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        onNew={handleNewArticle}
      />

      {/* Edit/New Article Popup */}
      <ArticleEditorPopup
        isOpen={isEditorOpen}
        onClose={() => {
          setIsEditorOpen(false);
          setEditingArticle(null);
        }}
        onSubmit={handleSubmitArticle}
        article={editingArticle}
      />

      {/* Delete Confirmation Popup */}
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