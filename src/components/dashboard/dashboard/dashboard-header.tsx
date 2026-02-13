function DashboardHeader() {
  return (
    <div className="space-y-6 mb-8">
      {/* Title Row */}
      <div className="flex items-center justify-between">
        {/* Left: Dashboard Title */}
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          Dashboard
        </h1>
        
        {/* Right: User Info */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm font-medium text-white">Admin User</div>
            <div className="text-xs text-white/50">admin@vego                                                                               .com</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <svg 
              className="w-4 h-4 text-emerald-400" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" 
                clipRule="evenodd" 
              />
            </svg>
          </div>
        </div>
      </div>
  
    </div>
  );
}

export { DashboardHeader };