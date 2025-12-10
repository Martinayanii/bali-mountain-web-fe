import AdminSidebar from "@/components/layout/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="bg-[#f0f2f5] min-h-screen font-sans text-[#333] flex">
      
      {/* Sidebar Tetap di Kiri */}
      <AdminSidebar />

      {/* Konten Utama di Kanan */}
      <div className="flex-1 ml-[250px]">
        
        {/* Header Admin (Sticky Top) */}
        <header className="bg-white px-8 py-4 flex justify-between items-center shadow-[0_2px_5px_rgba(0,0,0,0.05)] sticky top-0 z-40">
            <h3 className="text-lg font-semibold text-[#2c3e50]">Panel Admin</h3>
            <div className="text-sm text-gray-600 flex items-center gap-2">
                <span className="text-xl">👤</span> Administrator
            </div>
        </header>

        {/* Area Konten */}
        <main className="p-8">
            {children}
        </main>

      </div>
    </div>
  );
}