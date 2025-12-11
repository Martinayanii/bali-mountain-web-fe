"use client";
import Link from 'next/link';
import { useParams } from 'next/navigation'; // Hook URL
import { useAppStore } from '@/store/useAppStore'; // Import Store

export default function NewsDetailPage() {
  const params = useParams(); 
  const { newsList } = useAppStore();

  // 1. Cari berita berdasarkan slug
  const news = newsList.find((item) => item.slug === params.slug);

  // 2. Handling jika berita tidak ketemu
  if (!news) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold text-gray-800">Artikel Tidak Ditemukan</h2>
            <Link href="/news" className="text-primary hover:underline mt-2">Kembali ke Berita</Link>
        </div>
    );
  }

  return (
    <>
      <header className="bg-white pt-10 pb-8 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mb-4 font-medium">
                <Link href="/news" className="hover:text-primary">Berita</Link>
                <span>/</span>
                <span className="text-primary font-bold">{news.category}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {news.title}
            </h1>

            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                    <img src="https://i.pravatar.cc/150?img=60" className="w-8 h-8 rounded-full border border-gray-200" alt="Admin" />
                    <span className="font-bold text-gray-900">Admin JejakKaki</span>
                </div>
                <span>•</span>
                <span>{news.date}</span>
                <span>•</span>
                <span>5 Menit Baca</span>
            </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* KONTEN UTAMA */}
            <article className="lg:col-span-2">
                <div className="rounded-2xl overflow-hidden mb-8 shadow-lg">
                    <img src={news.image} className="w-full h-auto object-cover" alt={news.title} />
                    <p className="text-xs text-center text-gray-400 mt-2 italic">Sumber: Unsplash</p>
                </div>

                <div className="prose max-w-none text-gray-800 leading-loose text-lg space-y-6">
                    <p><span className="font-bold text-5xl float-left mr-3 mt-[-10px] text-primary">{news.content.charAt(0)}</span>{news.content.substring(1)}</p>
                    
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    
                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Pembahasan Lebih Lanjut</h2>
                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    
                    <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 my-8">
                        <h3 class="font-bold text-blue-800 mb-2 text-lg">💡 Info Tambahan:</h3>
                        <p className="text-sm text-blue-700">Pastikan selalu mengecek informasi terkini dari pihak Taman Nasional sebelum melakukan pendakian.</p>
                    </div>
                </div>
            </article>

            {/* SIDEBAR REKOMENDASI (Ambil acak dari newsList) */}
            <aside className="lg:col-span-1 space-y-8">
                <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-50 sticky top-24">
                    <h3 className="font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Baca Juga</h3>
                    <div className="space-y-4">
                        {newsList.filter(n => n.id !== news.id).slice(0, 3).map((item) => (
                            <Link key={item.id} href={`/news/${item.slug}`} className="flex gap-3 group">
                                <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                                    <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition" alt={item.title} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-800 leading-snug group-hover:text-primary transition line-clamp-2">
                                        {item.title}
                                    </h4>
                                    <p className="text-[10px] text-gray-400 mt-1">{item.category}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </aside>

        </div>
      </main>
    </>
  );
}