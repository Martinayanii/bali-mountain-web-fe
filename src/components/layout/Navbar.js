import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-gray-100 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center text-xl font-bold">JK</div>
          <span className="text-xl font-bold text-gray-800">JejakKaki</span>
        </Link>

        {/* MENU TENGAH */}
        <div className="hidden md:flex gap-8 font-medium text-sm text-gray-500">
          <Link href="/" className="hover:text-primary transition">Beranda</Link>
          <Link href="/catalog" className="hover:text-primary transition">Katalog Gunung</Link>
          <Link href="/community" className="hover:text-primary transition">Komunitas</Link>
          <Link href="/news" className="hover:text-primary transition">Berita</Link>
        </div>

        {/* --- BAGIAN INI YANG DIPERBAIKI --- */}
        {/* Bungkus dengan Link href="/profile" */}
        <Link href="/profile" className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition">
          <div className="flex flex-col text-right hidden sm:block">
            <span className="text-xs font-bold text-gray-800">Dimas Anggara</span>
            <span className="text-[10px] text-gray-400">Member Basic</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-primary">
            <img 
                src="https://i.pravatar.cc/150?img=12" 
                alt="User" 
                className="w-full h-full object-cover" 
            />
          </div>
        </Link>
        {/* ---------------------------------- */}

      </div>
    </nav>
  );
}