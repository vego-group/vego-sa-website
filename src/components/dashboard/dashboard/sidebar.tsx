function Sidebar() {
  return (
    <aside className="w-56 border-r border-white/10 bg-white/5 backdrop-blur-xl">
      <nav className="flex flex-col h-full p-6 text-sm">
        {/* Static content section */}
        <div className="space-y-2 mb-auto">
          <div className="px-4 py-2.5 text-white/90 font-medium">
            Blog Management
          </div>
          {/* "Blog Management" has been removed */}
        </div>
        
        {/* Logout button at the bottom */}
        <div className="pt-4 mt-auto border-t border-white/10">
          <button className="flex items-center gap-2 w-full px-4 py-2.5 rounded-lg text-white/80 hover:text-secondary hover:bg-white/5 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </nav>
    </aside>
  );
}

export { Sidebar };