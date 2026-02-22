"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Share2, Linkedin, Twitter, Facebook } from "lucide-react";
import { useLocale } from "next-intl";

type Blog = {
  id: string;
  titleEn: string;
  titleAr: string;
  excerptEn: string;
  excerptAr: string;
  contentEn: string;
  contentAr: string;
  metaTitleEn?: string;
  metaTitleAr?: string;
  metaDescriptionEn?: string;
  metaDescriptionAr?: string;
  status: "published" | "draft";
  coverImage?: string;
  publishedAt: string | null;
  languages: string[];
  author?: string;
};

function BlogDetailPage() {
  const params = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // استخدام locale من next-intl
  const locale = useLocale();
  const language = locale as "en" | "ar";

  useEffect(() => {
    const fetchBlog = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        
        const mockBlog: Blog = {
          id: params.id as string,
          titleEn: "Vego Group Showcases the Future of Electric Mobility and Launches Micromobility Project at Mobility Live 2025 in Riyadh",
          titleAr: "فيجو جروب تستعرض مستقبل التنقل الكهربائي وتدشن مشروع المايكرو موبيليتي في معرض موبيليتي اليف 2025 بالرياض",
          excerptEn: "With high-level attendance from transportation and technology leaders, the event witnessed...",
          excerptAr: "الرياض – 20 أكتوبر 2025م وسط حضور رفيع من قادة قطاع النقل والتقنية، شهدت [...]",
          contentEn: `
            <h2 class="text-2xl font-bold text-primary mt-8 mb-4">A Landmark Event for Electric Mobility</h2>
            <p class="text-slate-600 leading-relaxed mb-6">With high-level attendance from transportation and technology leaders, the event witnessed the launch of Vego Group's micromobility project, marking a significant milestone in Saudi Arabia's journey towards sustainable urban transportation.</p>
            
            <h2 class="text-2xl font-bold text-primary mt-8 mb-4">Key Highlights</h2>
            <ul class="list-disc pl-6 text-slate-600 leading-relaxed mb-6 space-y-2">
              <li>Launch of innovative micromobility solutions</li>
              <li>Partnership announcements with international tech companies</li>
              <li>Showcasing of latest electric vehicle models</li>
              <li>Discussions on future of urban transportation</li>
            </ul>
          `,
          contentAr: `
            <h2 class="text-2xl font-bold text-primary mt-8 mb-4">حدث بارز في مجال التنقل الكهربائي</h2>
            <p class="text-slate-600 leading-relaxed mb-6">وسط حضور رفيع من قادة قطاع النقل والتقنية، شهد المعرض إطلاق مشروع المايكرو موبيليتي من فيجو جروب، مما يمثل علامة فارقة في رحلة السعودية نحو النقل الحضري المستدام.</p>
            
            <h2 class="text-2xl font-bold text-primary mt-8 mb-4">أبرز النقاط</h2>
            <ul class="list-disc pr-6 text-slate-600 leading-relaxed mb-6 space-y-2" style={{ listStylePosition: 'inside' }}>
              <li>إطلاق حلول مبتكرة للتنقل الصغير</li>
              <li>الإعلان عن شراكات مع شركات تقنية دولية</li>
              <li>عرض أحدث موديلات المركبات الكهربائية</li>
              <li>مناقشات حول مستقبل النقل الحضري</li>
            </ul>
          `,
          status: "published",
          coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format",
          publishedAt: "2025-10-20T10:00:00Z",
          languages: ["EN", "AR"],
          author: language === "en" ? "Vego Team" : "فريق فيجو",
        };
        
        setBlog(mockBlog);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchBlog();
    }
  }, [params.id, language]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString(language === "en" ? "en-US" : "ar-SA", {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-600 text-lg">
              {language === "en" ? "Loading article..." : "جاري تحميل المقال..."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl text-slate-900 mb-4">
            {language === "en" ? "Article not found" : "المقال غير موجود"}
          </h1>
          <Link href="/blog" className="text-secondary hover:underline inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            {language === "en" ? "Back to blog" : "العودة إلى المدونة"}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Hero Section - مصغرة ومنظمة */}
<section className="relative h-[30vh] overflow-hidden bg-gradient-to-br from-emerald-900 via-primary to-emerald-800">
  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
  
  <div className="relative z-10 mx-auto flex h-full max-w-3xl flex-col items-center justify-center px-4 text-center">
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-white line-clamp-3 px-2"
    >
      {language === "en" ? blog.titleEn : blog.titleAr}
    </motion.h1>
    
    {/* اختصار النص في وصف صغير */}
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="text-white/80 text-sm sm:text-base mt-2 line-clamp-2 max-w-2xl"
    >
      {language === "en" ? blog.excerptEn : blog.excerptAr}
    </motion.p>
  </div>
</section>

      {/* Main Content */}
      <div className="container mx-auto max-w-4xl px-4 py-12">
        {/* Back Link */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-slate-600 hover:text-secondary mb-8 transition-colors group"
        >
          <ArrowLeft className={`w-5 h-5 transition-transform group-hover:-translate-x-1 ${language === "ar" ? "rotate-180" : ""}`} />
          <span>{language === "en" ? "Back to all articles" : "العودة إلى جميع المقالات"}</span>
        </Link>

        {/* Article Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(blog.publishedAt)}</span>
          </div>
          {blog.author && (
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{blog.author}</span>
            </div>
          )}
        </div>

        {/* Cover Image */}
        {blog.coverImage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[400px] rounded-2xl overflow-hidden mb-10 shadow-xl"
          >
            <Image
              src={blog.coverImage}
              alt={language === "en" ? blog.titleEn : blog.titleAr}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        )}

        {/* Article Content */}
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ 
            __html: language === "en" ? blog.contentEn : blog.contentAr 
          }}
        />

        {/* Share Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 pt-8 border-t border-slate-200"
        >
          <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            {language === "en" ? "Share this article" : "شارك هذا المقال"}
          </h3>
          <div className="flex gap-3">
            <button className="p-3 bg-slate-100 hover:bg-[#1DA1F2] hover:text-white rounded-xl transition-all text-slate-600">
              <Twitter className="w-5 h-5" />
            </button>
            <button className="p-3 bg-slate-100 hover:bg-[#0A66C2] hover:text-white rounded-xl transition-all text-slate-600">
              <Linkedin className="w-5 h-5" />
            </button>
            <button className="p-3 bg-slate-100 hover:bg-[#4267B2] hover:text-white rounded-xl transition-all text-slate-600">
              <Facebook className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Related Articles Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-primary mb-8 text-center">
            {language === "en" ? "Related Articles" : "مقالات ذات صلة"}
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Link
                key={i}
                href={`/blog/${i}`}
                className="group bg-slate-50 rounded-xl overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="h-32 bg-gradient-to-br from-secondary/20 to-secondary/5" />
                <div className="p-4">
                  <h4 className="font-medium text-slate-900 group-hover:text-secondary transition-colors line-clamp-2">
                    {language === "en" 
                      ? "Sample related article title" 
                      : "عنوان مقال ذي صلة"}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}

export default BlogDetailPage;