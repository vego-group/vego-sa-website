"use client";

import { useState, useEffect } from "react";
import { UserBlogHeader } from "./user-blog-header";
import { UserBlogSearch } from "./user-blog-search";
import { UserBlogGrid } from "./user-blog-grid";
import { UserBlogFeatured } from "./user-blog-featured";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
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

function UserBlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  // استخدام locale من next-intl بدلاً من state داخلية
  const locale = useLocale();
  const language = locale as "en" | "ar";

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // البيانات الحقيقية من الصورة المرفقة
        const realBlogs: Blog[] = [
          {
            id: "1",
            titleEn: "Vego Group Showcases the Future of Electric Mobility and Launches Micromobility Project at Mobility Live 2025 in Riyadh",
            titleAr: "فيجو جروب تستعرض مستقبل التنقل الكهربائي وتدشن مشروع المايكرو موبيليتي في معرض موبيليتي اليف 2025 بالرياض",
            excerptEn: "With high-level attendance from transportation and technology leaders, the event witnessed...",
            excerptAr: "الرياض – 20 أكتوبر 2025م وسط حضور رفيع من قادة قطاع النقل والتقنية، شهدت [...]",
            contentEn: "<p>With high-level attendance from transportation and technology leaders, the event witnessed...</p>",
            contentAr: "<p>الرياض – 20 أكتوبر 2025م وسط حضور رفيع من قادة قطاع النقل والتقنية، شهدت [...]</p>",
            status: "published",
            coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format",
            publishedAt: "2025-10-20T10:00:00Z",
            languages: ["EN", "AR"],
            author: language === "en" ? "Vego Team" : "فريق فيجو",
          },
          {
            id: "2",
            titleEn: "Vego Group and Sweitz Sign Agreement to Enhance Sustainable Electric Mobility Solutions in Saudi Cities",
            titleAr: "فنجو جروب و سويتز توقعان اتفاقية لتعزيز حلول التنقل الكهربائي المستدام في مدن المملكة",
            excerptEn: "Signing of an agreement between 'Vego Group' and 'Sweitz' to enhance sustainable mobility in the Kingdom",
            excerptAr: "توقيع اتفاقية بين 'فنجو جروب' و'سويتر' لتعزيز التنقل المستدام في المملكة الرياض، نوفمبر 7 شهد [...]",
            contentEn: "<p>Signing of an agreement between 'Vego Group' and 'Sweitz' to enhance sustainable mobility in the Kingdom...</p>",
            contentAr: "<p>توقيع اتفاقية بين 'فنجو جروب' و'سويتر' لتعزيز التنقل المستدام في المملكة الرياض، نوفمبر 7 شهد [...]</p>",
            status: "published",
            coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format",
            publishedAt: "2025-11-07T14:30:00Z",
            languages: ["EN", "AR"],
            author: language === "en" ? "Vego Team" : "فريق فيجو",
          },
          {
            id: "3",
            titleEn: "Worth 5 Million Riyals... Saudi 'Vego' Signs Strategic Agreement to Export 1000 Electric Motorcycles to Syria with 'Beeroder'",
            titleAr: "بقيمة 5 ملايين ريال... «فيجو» السعودية توقّع اتفاقية استراتيجية لتصدير 1000 دباب كهربائي إلى سوريا مع «Beeroder»",
            excerptEn: "In a qualitative achievement that confirms the development of national industry and its ability to compete regionally, it was announced...",
            excerptAr: "الرياض – في إنجاز نوعي يؤكد على تطور الصناعة الوطنية وقدرتها على المنافسة إقليمياً، أعلنت [...]",
            contentEn: "<p>In a qualitative achievement that confirms the development of national industry and its ability to compete regionally, it was announced...</p>",
            contentAr: "<p>الرياض – في إنجاز نوعي يؤكد على تطور الصناعة الوطنية وقدرتها على المنافسة إقليمياً، أعلنت [...]</p>",
            status: "published",
            coverImage: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format",
            publishedAt: "2025-09-15T09:15:00Z",
            languages: ["EN", "AR"],
            author: language === "en" ? "Vego Team" : "فريق فيجو",
          },
          {
            id: "4",
            titleEn: "Our Journey Began at the Accelerator",
            titleAr: "بدأت رحلتنا في مسرعة",
            excerptEn: "We prepare to grow, learn, and make a real impact",
            excerptAr: "غـرس نستعد للنمو والتعلم وصناعة أثر حقيقي",
            contentEn: "<p>We prepare to grow, learn, and make a real impact...</p>",
            contentAr: "<p>غـرس نستعد للنمو والتعلم وصناعة أثر حقيقي</p>",
            status: "published",
            coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format",
            publishedAt: "2025-08-10T11:45:00Z",
            languages: ["EN", "AR"],
            author: language === "en" ? "Vego Team" : "فريق فيجو",
          },
          {
            id: "5",
            titleEn: "Exclusive Agency in the Kingdom of Bahrain",
            titleAr: "وكالة حصرية في مملكة البحرين",
            excerptEn: "As part of its expansion plan in the Gulf markets, Vego Group signed an exclusive agency contract in...",
            excerptAr: "في إطار خطتها التوسعية في أسواق الخليج، أبرمت شركة فيجو جروب عقد وكالة حصرية في [...]",
            contentEn: "<p>As part of its expansion plan in the Gulf markets, Vego Group signed an exclusive agency contract in...</p>",
            contentAr: "<p>في إطار خطتها التوسعية في أسواق الخليج، أبرمت شركة فيجو جروب عقد وكالة حصرية في [...]</p>",
            status: "published",
            coverImage: "https://images.unsplash.com/photo-1578894381163-e3c7aff9be9e?w=800&auto=format",
            publishedAt: "2025-07-22T10:30:00Z",
            languages: ["EN", "AR"],
            author: language === "en" ? "Vego Team" : "فريق فيجو",
          },
          {
            id: "6",
            titleEn: "Vego Group Signs Exclusive Agency Contract in Kuwait with Al-Mubarak Al-Mutlaq Group",
            titleAr: "فيجو جروب توقّع عقد وكالة حصرية في الكويت مع مجموعة المبارك المطلق",
            excerptEn: "Vego Group signs exclusive agency contract in Kuwait with Al-Mubarak Al-Mutlaq Group",
            excerptAr: "فيجو جروب توقّع عقد وكالة حصرية في الكويمت مع مجموعة المبارك المطلق الرياض – ضمن [...]",
            contentEn: "<p>Vego Group signs exclusive agency contract in Kuwait with Al-Mubarak Al-Mutlaq Group...</p>",
            contentAr: "<p>فيجو جروب توقّع عقد وكالة حصرية في الكويمت مع مجموعة المبارك المطلق الرياض – ضمن [...]</p>",
            status: "published",
            coverImage: "https://images.unsplash.com/photo-1560179707-f14e90ef36e3?w=800&auto=format",
            publishedAt: "2025-06-18T13:45:00Z",
            languages: ["EN", "AR"],
            author: language === "en" ? "Vego Team" : "فريق فيجو",
          },
          {
            id: "7",
            titleEn: "Vego Company Joins Ghras Accelerator to Develop Innovative Environmental Solutions",
            titleAr: "شركة فيجو تنضم إلى مسرعة غراس لتطوير حلول بيئية مبتكرة",
            excerptEn: "Vego Group, the leading company in developing sustainable electric transport solutions, announced its joining to Ghras Accelerator...",
            excerptAr: "أعلنت فيجو جروب، الشركة الرائدة في تطوير حلول النقل الكهربائي المستدام، عن انضمامها إلى مسرعة [...]",
            contentEn: "<p>Vego Group, the leading company in developing sustainable electric transport solutions, announced its joining to Ghras Accelerator...</p>",
            contentAr: "<p>أعلنت فيجو جروب، الشركة الرائدة في تطوير حلول النقل الكهربائي المستدام، عن انضمامها إلى مسرعة [...]</p>",
            status: "published",
            coverImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&auto=format",
            publishedAt: "2025-05-30T08:20:00Z",
            languages: ["EN", "AR"],
            author: language === "en" ? "Vego Team" : "فريق فيجو",
          },
          {
            id: "8",
            titleEn: "Our Participation in Middle East Energy",
            titleAr: "مشاركتنا في Middle East Energy",
            excerptEn: "From the heart of the Dubai World Energy Exhibition, and continuing Vego Group's success...",
            excerptAr: "من قلب معرض #ديبي العالمي للطاقة AE ، واستمراراً لنجاح فيجو جروب [...] تواصل حضورها",
            contentEn: "<p>From the heart of the Dubai World Energy Exhibition, and continuing Vego Group's success...</p>",
            contentAr: "<p>من قلب معرض #ديبي العالمي للطاقة AE ، واستمراراً لنجاح فيجو جروب [...] تواصل حضورها</p>",
            status: "published",
            coverImage: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=800&auto=format",
            publishedAt: "2025-04-12T09:00:00Z",
            languages: ["EN", "AR"],
            author: language === "en" ? "Vego Team" : "فريق فيجو",
          },
          {
            id: "9",
            titleEn: "Our Participation in EVS Saudi Arabia 2025 Exhibition",
            titleAr: "مشاركتنا في معرض EVS Saudi Arabia 2025",
            excerptEn: "Our participation in the EVS Saudi Arabia exhibition and a look at the first Saudi company specialized in manufacturing...",
            excerptAr: "EVS Saudi Arabia مشاركتنا في معرض ونظرة على أول شركة سعودية متخصصة في صناعة [...]",
            contentEn: "<p>Our participation in the EVS Saudi Arabia exhibition and a look at the first Saudi company specialized in manufacturing...</p>",
            contentAr: "<p>EVS Saudi Arabia مشاركتنا في معرض ونظرة على أول شركة سعودية متخصصة في صناعة [...]</p>",
            status: "published",
            coverImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format",
            publishedAt: "2025-03-05T11:15:00Z",
            languages: ["EN", "AR"],
            author: language === "en" ? "Vego Team" : "فريق فيجو",
          },
          {
            id: "10",
            titleEn: "Vego Group Actively Participates in the Hajj Conference and Exhibition 2025",
            titleAr: "مجموعة فيجو جروب تشارك بفاعلية في مؤتمر ومعرض الحج 2025",
            excerptEn: "Vego Group participated in the activities of the Hajj Conference and Exhibition in its fourth edition held in...",
            excerptAr: "شاركت مجموعة فيجو جروب في فعاليات أعمال مؤتمر ومعرض الحج بنسخة الرابعة المقام في [...]",
            contentEn: "<p>Vego Group participated in the activities of the Hajj Conference and Exhibition in its fourth edition held in...</p>",
            contentAr: "<p>شاركت مجموعة فيجو جروب في فعاليات أعمال مؤتمر ومعرض الحج بنسخة الرابعة المقام في [...]</p>",
            status: "published",
            coverImage: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&auto=format",
            publishedAt: "2025-02-18T10:00:00Z",
            languages: ["EN", "AR"],
            author: language === "en" ? "Vego Team" : "فريق فيجو",
          }
        ];
        
        setBlogs(realBlogs);
        setFilteredBlogs(realBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [language]);

  useEffect(() => {
    let filtered = blogs;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(blog => {
        const title = language === "en" ? blog.titleEn : blog.titleAr;
        const excerpt = language === "en" ? blog.excerptEn : blog.excerptAr;
        return title.toLowerCase().includes(query) || excerpt.toLowerCase().includes(query);
      });
    }

    setFilteredBlogs(filtered);
  }, [searchQuery, blogs, language]);

  const featuredBlog = blogs.length > 0 ? blogs[0] : null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-600 text-lg">
              {language === "en" ? "Loading articles..." : "جاري تحميل المقالات..."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden bg-gradient-to-br from-emerald-900 via-primary to-emerald-800">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="mb-6"
          >
            <Sparkles className="h-16 w-16 text-secondary/60" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white"
          >
            <span className="bg-gradient-to-r from-emerald-300 to-white bg-clip-text text-transparent">
              {language === "en" ? "Vego Group Blog" : "مدونة فيجو جروب"}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-emerald-100/80 sm:text-xl"
          >
            {language === "en" 
              ? "Latest news, updates, and achievements in electric mobility and sustainable solutions"
              : "آخر الأخبار والتحديثات والإنجازات في مجال التنقل الكهربائي والحلول المستدامة"}
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Featured Blog */}
        {featuredBlog && (
          <div className="mb-20">
            <div className="text-center mb-10">
              <motion.span
                className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-6 py-2 text-sm font-semibold uppercase tracking-wider text-secondary"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                <Sparkles className="h-4 w-4" />
                {language === "en" ? "Featured Article" : "أحدث المقالات"}
              </motion.span>

              <motion.h2
                className="mt-4 text-3xl font-bold text-primary sm:text-4xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                viewport={{ once: true }}
              >
                {language === "en" ? "Latest News" : "آخر الأخبار"}
              </motion.h2>

              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100px" }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
                className="mx-auto mt-4 h-1 bg-secondary rounded-full"
              />
            </div>
            
            <UserBlogFeatured blog={featuredBlog} language={language} />
          </div>
        )}

        {/* Search */}
        <div className="max-w-4xl mx-auto mb-16">
          <UserBlogSearch 
            onSearch={setSearchQuery} 
            value={searchQuery}
            language={language}
          />
        </div>

        {/* Blog Grid */}
        <div className="mt-16">
          <UserBlogGrid 
            blogs={filteredBlogs} 
            language={language}
          />
        </div>
      </div>
    </div>
  );
}

export default UserBlogPage;