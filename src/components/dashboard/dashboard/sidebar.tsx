"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊", path: "/dashboard" },
    { id: "blogs", label: "Blogs", icon: "📝", path: "/dashboard/blogs" },
    { id: "faqs", label: "FAQs", icon: "❓", path: "/dashboard/faqs" },
    { id: "leads", label: "Contact Leads", icon: "✉️", path: "/dashboard/leads" },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* ============================================
          DESKTOP SIDEBAR (lg+) — Fixed, full width
          ============================================ */}
      <aside className="hidden lg:flex w-64 h-screen fixed top-0 left-0 border-r border-white/10 bg-white/5 backdrop-blur-xl z-50 flex-col">
        <nav className="flex flex-col h-full px-4 py-6 text-sm text-white/80">
          
          {/* Brand */}
          <div className="flex items-center gap-3 px-3 mb-8">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary text-white font-semibold text-lg flex-shrink-0">
              V
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
                      ${isActive
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

          {/* Logout */}
          <div className="pt-4 mt-6 border-t border-white/10">
            <button className="flex items-center justify-center gap-3 w-full px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* ============================================
          TABLET SIDEBAR (md) — Icon-only collapsed
          ============================================ */}
      <aside className="hidden md:flex lg:hidden w-16 h-screen fixed top-0 left-0 border-r border-white/10 bg-white/5 backdrop-blur-xl z-50 flex-col">
        <nav className="flex flex-col h-full py-6 text-sm text-white/80 items-center">

          {/* Brand icon only */}
          <div className="mb-8">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary text-white font-semibold text-base">
              V
            </div>
          </div>

          {/* Navigation icons */}
          <ul className="space-y-1 mb-auto w-full px-2">
            {navItems.map(({ id, label, icon, path }) => {
              const isActive = pathname === path;
              return (
                <li key={id}>
                  <button
                    onClick={() => handleNavigation(path)}
                    title={label}
                    className={`flex items-center justify-center w-full py-2.5 rounded-lg transition-colors relative group
                      ${isActive
                        ? "bg-secondary/90 text-white shadow-sm"
                        : "hover:bg-white/5 hover:text-white"
                      }`}
                  >
                    <span className="text-xl">{icon}</span>
                    {/* Tooltip on hover */}
                    <span className="absolute left-full ml-2 px-2 py-1 rounded-md bg-gray-900 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 border border-white/10">
                      {label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Logout icon */}
          <div className="pt-4 mt-6 border-t border-white/10 w-full px-2">
            <button
              title="Logout"
              className="flex items-center justify-center w-full py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors group relative"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="absolute left-full ml-2 px-2 py-1 rounded-md bg-gray-900 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 border border-white/10">
                Logout
              </span>
            </button>
          </div>
        </nav>
      </aside>

      {/* ============================================
          MOBILE TOP BAR + DROPDOWN MENU (sm-)
          ============================================ */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-primary/95 backdrop-blur-xl border-b border-white/10">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-secondary text-white font-semibold text-sm">
              V
            </div>
            <div>
              <div className="font-semibold text-white text-sm leading-tight">My Vego</div>
              <div className="text-[10px] text-white/50 leading-tight">Admin Panel</div>
            </div>
          </div>

          {/* Current page label */}
          <span className="text-sm text-white/70 font-medium">
            {navItems.find(item => item.path === pathname)?.label ?? "Dashboard"}
          </span>

          {/* Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {/* Dropdown Menu */}
        <div className={`overflow-hidden transition-all duration-300 ease-in-out bg-primary/95 backdrop-blur-xl border-b border-white/10 ${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
          <nav className="px-4 py-3 space-y-1">
            {navItems.map(({ id, label, icon, path }) => {
              const isActive = pathname === path;
              return (
                <button
                  key={id}
                  onClick={() => handleNavigation(path)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-colors text-left
                    ${isActive
                      ? "bg-secondary/90 text-white shadow-sm"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                >
                  <span className="text-lg">{icon}</span>
                  <span className="text-sm font-medium">{label}</span>
                  {isActive && (
                    <svg className="w-4 h-4 ml-auto text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </button>
              );
            })}

            {/* Logout in dropdown */}
            <div className="pt-2 mt-2 border-t border-white/10">
              <button className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

export { Sidebar };