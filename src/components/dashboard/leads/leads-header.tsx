"use client";

function LeadsHeader() {
  const handleExportCSV = () => {
    // Get leads data from localStorage or state management
    const leads = [
      {
        name: "John Smith",
        email: "john.smith@abccorp.com",
        phone: "+1 (555) 123-4567",
        company: "ABC Corporation",
        message: "We are interested in implementing an ERP solution for our manufacturing business. Could you provide information about your ERP system, pricing, and implementation timeline? We have 200+ employees and need a scalable solution.",
        date: "Feb 9, 2025",
      },
      {
        name: "Emma Wilson",
        email: "emma.wilson@techstart.com",
        phone: "+1 (555) 987-6543",
        company: "TechStart",
        message: "Looking for a cloud-based ERP solution for our growing startup. What modules do you offer for small businesses? We're particularly interested in finance and HR modules.",
        date: "Feb 8, 2025",
      },
      {
        name: "Ahmed Hassan",
        email: "ahmed.hassan@globaltech.ae",
        phone: "+971 50 123 4567",
        company: "GlobalTech",
        message: "We need ERP implementation support for our Dubai office. Do you provide training and ongoing support? We're specifically looking for Arabic language support.",
        date: "Feb 7, 2025",
      }
    ];

    // Create CSV content
    const headers = ["Name", "Email", "Phone", "Company", "Message", "Date"];
    const csvRows = [];
    
    csvRows.push(headers.join(','));
    
    for (const lead of leads) {
      const values = [
        `"${lead.name}"`,
        `"${lead.email}"`,
        `"${lead.phone}"`,
        `"${lead.company || ''}"`,
        `"${lead.message.replace(/"/g, '""')}"`,
        `"${lead.date}"`,
      ];
      csvRows.push(values.join(','));
    }
    
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-2">
          Contact Leads
        </h1>
        <p className="text-sm sm:text-base text-white/70">
          View and manage customer inquiries
        </p>
      </div>
      
      <button
        onClick={handleExportCSV}
        className="flex items-center justify-center sm:justify-start gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white/80 hover:text-white transition-colors group w-full sm:w-auto"
      >
        <svg 
          className="w-4 h-4 shrink-0" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 10v6m0 0l-3-3m3 3l3-3M3 17v2a2 2 0 002 2h14a2 2 0 002-2v-2M5 10V7a2 2 0 012-2h10a2 2 0 012 2v3" 
          />
        </svg>
        <span className="text-sm font-medium whitespace-nowrap">Export CSV</span>
      </button>
    </div>
  );
}

export { LeadsHeader };