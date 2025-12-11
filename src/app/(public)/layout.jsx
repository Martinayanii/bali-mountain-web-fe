"use client";
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore'; // 1. Import Store Auth
import { useRouter } from 'next/navigation';

export default function PublicLayout({ children }) {
  // 2. Ambil data user & fungsi logout
  const { currentUser, logout } = useAuthStore(); 
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login'); // Redirect ke login setelah logout
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="bg-white sticky top-0 z-50 border-b border-gray-100 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 cursor-pointer">
                <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center text-xl font-bold">SM</div>
                <span className="text-xl font-bold text-gray-800">SobatMuncak</span>
            </Link>

            {/* Menu Tengah */}
            <div className="hidden md:flex gap-8 font-medium text-sm text-gray-500">
                <Link href="/" className="hover:text-primary transition">Beranda</Link>
                <Link href="/catalog" className="hover:text-primary transition">Katalog Gunung</Link>
                <Link href="/community" className="hover:text-primary transition">Komunitas</Link>
                <Link href="/news" className="hover:text-primary transition">Berita</Link> 
            </div>

            {/* Area Kanan (Logika Auth) */}
            <div className="flex items-center gap-3">
                
                {/* JIKA SUDAH LOGIN (currentUser ada isinya) */}
                {currentUser ? (
                    <div className="flex items-center gap-4">
                        {/* Jika Admin, munculkan tombol ke Panel */}
                        {currentUser.role === 'admin' && (
                            <Link href="/admin/dashboard" className="text-xs font-bold bg-gray-800 text-white px-3 py-1 rounded">
                                Panel Admin
                            </Link>
                        )}

                        {/* Profil User */}
                        <div className="flex items-center gap-2 border-r border-gray-200 pr-4">
                            <img 
                                src={currentUser.avatar} 
                                alt="Profile" 
                                className="w-8 h-8 rounded-full border border-gray-200" 
                            />
                            <div className="text-sm">
                                <p className="font-bold text-gray-700 leading-none">{currentUser.name}</p>
                                <p className="text-[10px] text-gray-400 capitalize">{currentUser.role}</p>
                            </div>
                        </div>

                        {/* Tombol Logout */}
                        <button 
                            onClick={handleLogout} 
                            className="text-sm font-semibold text-red-500 hover:text-red-700"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    // JIKA BELUM LOGIN (Tampilkan Tombol Masuk/Daftar)
                    <>
                        <Link href="/login">
                            <button className="text-sm font-semibold text-gray-600 hover:text-primary px-3 py-2">
                                Masuk
                            </button>
                        </Link>
                        <Link href="/register">
                            <button className="bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-green-700 transition shadow-lg shadow-green-200">
                                Daftar Akun
                            </button>
                        </Link>
                    </>
                )}

            </div>
        </div>
      </nav>

      {/* KONTEN HALAMAN */}
      {children}

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-xl font-bold text-primary mb-2">SobatMuncak</h2>
            <div className="text-gray-400 text-xs">
                &copy; 2025 SobatMuncak Project.
            </div>
        </div>
      </footer>
    </>
  );
}