"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { DashboardShell } from "./dashboard-shell";
import { DashboardCard } from "./dashboard-card";
import { DashboardHeader } from "./dashboard-header";
import { DashboardStats } from "./dashboard-stats";
import { DashboardSearch } from "./dashboard-search";
import { DashboardTable } from "./dashboard-table";
import { ArticleEditorPopup } from "./article-editor-popup"; // إضافة الاستيراد

import { cardVariants, contentVariants } from "@/lib";

function Dashboard() {
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const handleOpenEditor = () => setIsEditorOpen(true);
  const handleCloseEditor = () => setIsEditorOpen(false);

  const handleSubmitArticle = (articleData: any) => {
    console.log("Article submitted:", articleData);
    // هنا يمكنك إضافة منطق حفظ المقال في قاعدة البيانات
    handleCloseEditor();
  };

  return (
    <>
      <DashboardShell>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="w-full space-y-8"
        >
          <DashboardHeader onNewArticle={handleOpenEditor} />

          <DashboardCard>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={contentVariants}
              className="space-y-6"
            >
              <DashboardStats />
            </motion.div>
          </DashboardCard>

          <DashboardCard>
            <DashboardSearch />
          </DashboardCard>

          <DashboardCard>
            <DashboardTable />
          </DashboardCard>
        </motion.div>
      </DashboardShell>

      <ArticleEditorPopup
        isOpen={isEditorOpen}
        onClose={handleCloseEditor}
        onSubmit={handleSubmitArticle}
      />
    </>
  );
}

export default Dashboard;