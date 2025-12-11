"use client";
import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore'; // 1. Import Store

export default function NewsPage() {
  const { newsList } = useAppStore(); // 2. Ambil Data

  // Kita anggap berita pertama adalah "Hot News"
  const hotNews = newsList[0]; 
  const recentNews = newsList.slice(1); // Berita sisanya

  return (
    <>
      <header className="bg-white border-b border-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Jurnal Pendaki 📰</h1>
            <p className="text-gray-500">Info terbaru seputar jalur, tips survival, dan review alat pendakian.</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* HERO NEWS SECTION (HOT NEWS) */}
        {hotNews && (
            <section className="mb-12">
                <Link href={`/news/${hotNews.slug}`}>
                    <div className="group relative rounded-[2rem] overflow-hidden h-[400px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] cursor-pointer">
                        <img src={hotNews.image} className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105" alt="Hot News" />
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                        
                        <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full md:w-2/3">
                            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">HOT NEWS</span>
                            <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 leading-tight group-hover:text-green-300 transition">
                                {hotNews.title}
                            </h2>
                            <p className="text-gray-300 text-sm md:text-base mb-4 line-clamp-2">
                                {hotNews.content}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-gray-400 font-medium">
                                <span className="flex items-center gap-1">🗓 {hotNews.date}</span>
                                <span className="flex items-center gap-1">🕒 5 min read</span>
                            </div>
                        </div>
                    </div>
                </Link>
            </section>
        )}

        {/* LIST ARTIKEL LAINNYA */}
        <section>
            <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-8">
                <h3 className="font-bold text-xl text-gray-900">Artikel Terbaru</h3>
                <div className="flex gap-2">
                    <button className="text-xs font-bold bg-primary text-white px-4 py-1.5 rounded-full shadow-sm">Semua</button>
                    {/* Tombol filter ini visual saja dulu */}
                    <button className="text-xs font-medium text-gray-500 hover:bg-white hover:shadow-sm px-4 py-1.5 rounded-full transition">Tips</button>
                    <button className="text-xs font-medium text-gray-500 hover:bg-white hover:shadow-sm px-4 py-1.5 rounded-full transition">Info Jalur</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                {/* Looping Sisa Berita */}
                {recentNews.map((news) => (
                    <Link key={news.id} href={`/news/${news.slug}`} className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] group cursor-pointer overflow-hidden flex flex-col h-full hover:-translate-y-1 transition duration-300">
                        <div className="h-48 overflow-hidden relative">
                            <img src={news.image} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" alt={news.title} />
                            <div className="absolute top-3 left-3">
                                <span className="text-[10px] font-bold text-primary bg-white/90 backdrop-blur px-2 py-1 rounded shadow-sm uppercase">
                                    {news.category}
                                </span>
                            </div>
                        </div>
                        <div className="p-5 flex flex-col flex-grow">
                            <div className="text-[10px] text-gray-400 mb-2 flex items-center gap-2">
                                <span>📅 {news.date}</span>
                            </div>
                            <h4 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-primary transition line-clamp-2">
                                {news.title}
                            </h4>
                            <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-grow">
                                {news.content}
                            </p>
                            <span className="text-xs font-bold text-secondary flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                                Baca Selengkapnya →
                            </span>
                        </div>
                    </Link>
                ))}

            </div>
        </section>
      </main>
    </>
  );
}