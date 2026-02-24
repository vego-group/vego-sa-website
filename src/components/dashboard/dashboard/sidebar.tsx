"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

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
          MOBILE HEADER WITH MENU BUTTON (below md)
          ============================================ */}
      
      {/* Mobile header with menu button */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-primary/95 backdrop-blur-xl border-b border-white/10 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Page title */}
          <span className="text-white font-medium">
            {navItems.find(item => item.path === pathname)?.label ?? "Dashboard"}
          </span>

          {/* Placeholder for balance */}
          <div className="w-10" />
        </div>
      </div>

      {/* Spacer for fixed header */}
      <div className="md:hidden h-[57px]" />

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Side drawer */}
      <aside
        className={`md:hidden fixed top-0 left-0 h-full w-64 bg-primary/95 backdrop-blur-xl border-r border-white/10 z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="flex flex-col h-full px-4 py-6 text-sm text-white/80">
          
          {/* Header with close button */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3 px-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary text-white font-semibold text-lg flex-shrink-0">
                V
              </div>
              <div>
                <div className="font-semibold text-white">My Vego</div>
                <div className="text-xs text-white/50">Admin Panel</div>
              </div>
            </div>
            
            {/* Close button */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <ul className="space-y-1 mb-auto">
            {navItems.map(({ id, label, icon, path }) => {
              const isActive = pathname === path;
              return (
                <li key={id}>
                  <button
                    onClick={() => handleNavigation(path)}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors
                      ${isActive
                        ? "bg-secondary/90 text-white shadow-sm"
                        : "hover:bg-white/5 hover:text-white"
                      }`}
                  >
                    <span className="text-lg">{icon}</span>
                    <span className="text-sm font-medium">{label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Logout */}
          <div className="pt-4 mt-6 border-t border-white/10">
            <button className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
}

export { Sidebar };