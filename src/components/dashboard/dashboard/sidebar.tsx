"use client";

import { usePathname, useRouter } from "next/navigation";

function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊", path: "/dashboard" },
    { id: "blogs", label: "Blogs", icon: "📝", path: "/dashboard/blogs" },
    { id: "faqs", label: "FAQs", icon: "❓", path: "/dashboard/faqs" },
    { id: "leads", label: "Contact Leads", icon: "✉️", path: "/dashboard/leads" }, // تمت الإضافة
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <aside className="w-64 h-screen fixed top-0 left-0 border-r border-white/10 bg-white/5 backdrop-blur-xl z-50">
      <nav className="flex flex-col h-full px-4 py-6 text-sm text-white/80">
        
        {/* Brand */}
        <div className="flex items-center gap-3 px-3 mb-8">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary text-white font-semibold text-lg">
            Vego
          </div>
          <div>
            <div className="font-semibold text-white">My Vego</div>
            <div className="text-xs text-white/50">Admin Panel</div>
          </div>
        </div>

        {/* Navigation */}
        <ul className="space-y-1 mb-auto">
          {navItems.map(({ id, label, icon, path }) => {
            const isActive = pathname === path;
            
            return (
              <li key={id}>
                <button
                  onClick={() => handleNavigation(path)}
                  className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg transition-colors
                    ${
                      isActive
                        ? "bg-secondary/90 text-white shadow-sm"
                        : "hover:bg-white/5 hover:text-white"
                    }`}
                >
                  <span className="text-lg">{icon}</span>
                  <span className="text-sm">{label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Logout Button */}
        <div className="pt-4 mt-6 border-t border-white/10">
          <button className="flex items-center justify-center gap-3 w-full px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors">
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
              />
            </svg>
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}

export { Sidebar };