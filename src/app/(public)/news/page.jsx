"use client"; // Wajib karena ada Filter

import { useState } from "react";
import NewsCard from "@/components/features/NewsCard";
import { articles } from "@/lib/data";

export default function NewsPage() {
  const [filter, setFilter] = useState("Semua");

  // Logic Filter
  const filteredArticles = filter === "Semua" 
    ? articles 
    : articles.filter((item) => item.category === filter);

  return (
    <div className="bg-bg-soft min-h-screen">
        
        {/* --- HEADER --- */}
        <header className="bg-white border-b border-gray-100 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Jurnal Pendaki 📰</h1>
                <p className="text-gray-500">Info terbaru seputar jalur, tips survival, dan review alat pendakian.</p>
            </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            {/* --- HERO SECTION (BERITA UTAMA) --- */}
            <section className="mb-12">
                <div className="group relative rounded-[2rem] overflow-hidden h-[400px] shadow-lg cursor-pointer">
                    <img 
                        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070" 
                        className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105"
                        alt="Hero News"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full md:w-2/3">
                        <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">HOT NEWS</span>
                        <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 leading-tight group-hover:text-green-300 transition">
                            Resmi: Jalur Pendakian Gunung Semeru Dibuka Kembali Mulai Bulan Depan
                        </h2>
                        <p className="text-gray-300 text-sm md:text-base mb-4 line-clamp-2">
                            Setelah ditutup selama hampir satu tahun untuk pemulihan ekosistem pasca erupsi, TNBTS akhirnya mengumumkan pembukaan kembali dengan kuota terbatas...
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-400 font-medium">
                            <span className="flex items-center gap-1">🗓 10 Des 2024</span>
                            <span className="flex items-center gap-1">🕒 4 min read</span>
                            <span className="flex items-center gap-1">✍ Admin JejakKaki</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FILTER & GRID ARTIKEL --- */}
            <section>
                <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-8">
                    <h3 className="font-bold text-xl text-gray-900">Artikel Terbaru</h3>
                    <div className="flex gap-2">
                        {['Semua', 'Tips', 'Info Jalur', 'Gear'].map((cat) => (
                            <button 
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`text-xs font-medium px-4 py-1.5 rounded-full transition shadow-sm ${
                                    filter === cat 
                                    ? 'bg-primary text-white font-bold' 
                                    : 'bg-white text-gray-500 hover:bg-gray-50'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredArticles.map((item) => (
                        <NewsCard key={item.id} {...item} />
                    ))}
                </div>

                <div className="text-center pt-12 pb-4">
                    <button className="bg-white border border-gray-300 text-gray-600 font-bold py-3 px-8 rounded-full hover:bg-primary hover:text-white hover:border-primary transition shadow-sm">
                        Muat Artikel Lainnya
                    </button>
                </div>
            </section>

        </main>
    </div>
  );
}