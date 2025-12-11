"use client";
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore'; 
import { FaHome, FaMountain, FaNewspaper, FaUsers, FaCog, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  
  const { currentUser, logout } = useAuthStore();

  // --- BYPASS LOGIC (ADMIN PALSU) ---
  // Jika yang login adalah admin asli, pakai datanya.
  // Jika bukan (Guest/User Biasa), kita pakai data dummy agar panel tetap bisa dibuka.
  const adminUser = (currentUser && currentUser.role === 'admin') ? currentUser : {
    name: "Administrator",
    role: "Super Admin",
    avatar: null // Pakai icon default
  };

  // ❌ PROTEKSI DIHAPUS (Agar bisa masuk tanpa login)
  /* useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin') {
        router.push('/login');
    }
  }, [currentUser, router]);
  */

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const menuItems = [
    { name: 'Dashboard', icon: <FaHome />, href: '/admin/dashboard' },
    { name: 'Data Gunung', icon: <FaMountain />, href: '/admin/mountains' },
    { name: 'Blog Artikel', icon: <FaNewspaper />, href: '/admin/news' },
    { name: 'Req. Muncak', icon: <FaUsers />, href: '/admin/community' },
    { name: 'Pengaturan', icon: <FaCog />, href: '/admin/settings' },
  ];

  return (
    <div className="flex min-h-screen bg-[#f0f2f5] font-sans text-[#333]">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-[250px] bg-[#2c3e50] text-white fixed h-full flex flex-col z-50">
        <div className="p-[25px] text-center border-b border-white/10">
          {/* Klik logo untuk kembali ke halaman depan */}
          <h3 className="text-2xl font-bold m-0 cursor-pointer" onClick={() => router.push('/')}>
            Mountain<span className="text-[#27ae60]">CMS</span>
          </h3>
        </div>
        
        <nav className="flex-1 mt-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center px-[25px] py-[15px] transition-all duration-300 cursor-pointer text-[#bdc3c7] hover:bg-white/10 hover:text-[#27ae60] hover:border-l-4 hover:border-[#27ae60]
                  ${isActive ? 'bg-white/10 text-[#27ae60] border-l-4 border-[#27ae60]' : 'border-l-4 border-transparent'}`
                }
              >
                <span className="w-[25px] mr-[10px] text-lg">{item.icon}</span>
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
            <button 
                onClick={handleLogout}
                className="flex items-center w-full px-[25px] py-[10px] text-[#e74c3c] hover:bg-white/10 hover:text-red-400 transition rounded"
            >
                <span className="w-[25px] mr-[10px] text-lg"><FaSignOutAlt /></span>
                <span className="text-sm font-bold">Logout</span>
            </button>
        </div>
      </aside>

      {/* --- KONTEN UTAMA --- */}
      <main className="ml-[250px] flex-1 flex flex-col min-w-0">
        
        <header className="bg-white px-[30px] py-[15px] shadow-[0_2px_5px_rgba(0,0,0,0.05)] sticky top-0 z-40 flex justify-between items-center">
            <h3 className="text-xl font-bold m-0 text-[#2c3e50]">Panel Admin</h3>
            
            {/* Profil Admin (Menggunakan adminUser bypass) */}
            <div className="flex items-center gap-3 text-sm text-[#333]">
                <div className="text-right hidden sm:block">
                    <div className="font-bold text-[#2c3e50]">{adminUser.name}</div>
                    <div className="text-xs text-gray-400 uppercase">{adminUser.role}</div>
                </div>
                {adminUser.avatar ? (
                    <img src={adminUser.avatar} alt="Admin" className="w-10 h-10 rounded-full border border-gray-200" />
                ) : (
                    <FaUserCircle className="text-3xl text-gray-400" />
                )}
            </div>
        </header>

        <div className="p-[30px]">
            {children}
        </div>

      </main>
    </div>
  );
}