"use client";
import { useState } from 'react'; // 1. Import useState
import { useRouter } from 'next/navigation'; // 2. Import useRouter untuk navigasi
import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore';

export default function HomePage() {
  const { trips, newsList, mountains } = useAppStore();
  const router = useRouter(); // Init Router
  const [searchQuery, setSearchQuery] = useState(""); // State untuk input pencarian

  // Data Filter
  const popularMountains = mountains.slice(0, 4); 
  const recentTrips = trips.slice(0, 2);
  const recentNews = newsList.slice(0, 3); 

  // --- FUNGSI PENCARIAN ---
  const handleSearch = () => {
    // Saat tombol cari diklik, arahkan user ke halaman katalog
    // Nanti di katalog mereka bisa melihat hasil filter yang lebih lengkap
    router.push('/catalog');
  };

  return (
    <>
      {/* --- HERO HEADER --- */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex flex-col-reverse md:flex-row items-center gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -z-10 opacity-50"></div>
            <div className="w-full md:w-1/2 text-center md:text-left z-10">
                <span className="inline-block bg-orange-100 text-secondary text-xs font-bold px-3 py-1 rounded-full mb-3">👋 Gabung Komunitas</span>
                <h1 className="text-3xl md:text-5xl font-bold leading-tight text-gray-900 mb-4">
                    Cari Teman Muncak <br />
                    <span className="text-primary">Jadi Lebih Mudah.</span>
                </h1>
                <p className="text-gray-500 mb-6 text-sm md:text-base leading-relaxed">
                    Tidak punya tim buat nanjak? Temukan barengan pendakian yang cocok atau gabung open trip terpercaya di sini.
                </p>
                
                {/* SEARCH BAR BERFUNGSI */}
                <div className="bg-gray-50 p-1.5 rounded-xl border border-gray-200 flex flex-col sm:flex-row gap-2 max-w-md mx-auto md:mx-0">
                    <input 
                        type="text" 
                        placeholder="Mau nanjak ke mana?" 
                        className="flex-1 px-4 py-2 bg-transparent outline-none text-sm font-medium" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Bisa tekan Enter
                    />
                    <button 
                        onClick={handleSearch}
                        className="bg-secondary text-white rounded-lg px-6 py-2 font-bold hover:bg-orange-600 transition text-sm"
                    >
                        Cari
                    </button>
                </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                <div className="relative w-full max-w-md h-64 md:h-80 overflow-hidden rounded-2xl">
                    <img src="https://images.unsplash.com/photo-1533240332313-0db49b459ad6?q=80&w=1974&auto=format&fit=crop" className="w-full h-full object-cover object-center transform hover:scale-105 transition duration-700" alt="Hiking" />
                </div>
            </div>
        </div>
      </header>

      {/* --- SECTION AKTIVITAS KOMUNITAS --- */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">Aktivitas Komunitas ⛺</h2>
                    <p className="text-gray-500 text-sm">Lihat siapa yang sedang mencari tim.</p>
                </div>
                <div className="bg-white p-1 rounded-lg flex text-xs font-medium shadow-sm">
                    <Link href="/community" className="bg-primary text-white shadow px-3 py-1.5 rounded-md">Cari Barengan</Link>
                    <Link href="/community" className="text-gray-500 px-3 py-1.5 hover:text-gray-700">Feed Foto</Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                    {recentTrips.map((trip) => (
                        <div key={trip.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:border-primary transition flex flex-col md:flex-row gap-4 items-start">
                            <div className="flex-shrink-0 text-center md:w-16">
                                <img src={trip.leaderImg} className="w-10 h-10 rounded-full mx-auto mb-1 border-2 border-primary" alt={trip.leader} />
                                <p className="text-[10px] font-bold text-gray-900">{trip.leader}</p>
                            </div>
                            <div className="flex-grow">
                                <div className="flex justify-between items-start">
                                    <h4 className="text-base font-bold text-gray-800">{trip.title}</h4>
                                    <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2 py-1 rounded border border-red-100">{trip.slots} Slot</span>
                                </div>
                                <p className="text-gray-500 text-xs mt-1 mb-2 line-clamp-2">{trip.description}</p>
                                <div className="flex flex-wrap gap-2 text-[10px] font-medium text-gray-600">
                                    <span className="bg-gray-50 px-2 py-1 rounded">🗓 {trip.date}</span>
                                    <span className="bg-gray-50 px-2 py-1 rounded">📍 {trip.location}</span>
                                    <span className="bg-gray-50 px-2 py-1 rounded">💰 {trip.type}</span>
                                </div>
                            </div>
                            <div className="w-full md:w-auto mt-2 md:mt-0">
                                <Link href="/community" className="block w-full text-center bg-primary text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-green-700">Gabung</Link>
                            </div>
                        </div>
                    ))}

                    <Link href="/community" className="block w-full py-3 border-2 border-dashed border-gray-300 text-gray-400 text-sm font-bold rounded-xl hover:border-primary hover:text-primary transition flex items-center justify-center gap-2">
                        <span>+</span> Buat Ajakan Pendakian
                    </Link>
                </div>

                <div className="space-y-4">
                    <div className="bg-white p-4 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] h-full">
                        <h3 className="font-bold text-gray-800 mb-3 text-sm">Momen Hari Ini 📸</h3>
                        <div className="grid grid-cols-2 gap-2">
                            <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=300" className="rounded-lg w-full h-24 object-cover" alt="Momen" />
                            <img src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=300" className="rounded-lg w-full h-24 object-cover" alt="Momen" />
                            <img src="https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=300" className="rounded-lg w-full h-24 object-cover col-span-2" alt="Momen" />
                        </div>
                        <Link href="/community" className="block text-primary text-xs font-bold hover:underline w-full text-center mt-3">Lihat Galeri →</Link>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* --- SECTION JALUR POPULER --- */}
      <section className="py-8 md:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Jalur Populer ⭐</h2>
            <Link href="/catalog" className="text-primary text-sm font-bold hover:underline">Lihat Semua</Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {popularMountains.map((gunung) => (
                <div key={gunung.id} className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] group hover:shadow-xl transition">
                    
                    {/* GAMBAR BISA DIKLIK (Dibungkus Link) */}
                    <div className="h-40 overflow-hidden relative cursor-pointer">
                        <Link href={`/catalog/${gunung.slug}`}>
                            <img src={gunung.image} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt={gunung.name} />
                        </Link>
                        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded flex items-center gap-1 shadow-sm">
                            <span className="text-yellow-500 text-[10px]">★</span> <span className="text-[10px] font-bold">{gunung.rating}</span>
                        </div>
                    </div>

                    <div className="p-4">
                        {/* Judul juga bisa diklik */}
                        <Link href={`/catalog/${gunung.slug}`}>
                            <h3 className="font-bold text-sm text-gray-800 hover:text-primary transition">{gunung.name}</h3>
                        </Link>
                        <p className="text-[10px] text-gray-500 mb-2">{gunung.location}</p>
                        <div className="flex items-center justify-between">
                            <span className={`text-[10px] font-medium px-2 py-0.5 rounded border 
                                ${gunung.difficulty === 'Hard' ? 'bg-red-50 text-red-700 border-red-100' : 
                                  gunung.difficulty === 'Medium' ? 'bg-orange-50 text-orange-700 border-orange-100' : 
                                  'bg-green-50 text-green-700 border-green-100'}`}>
                                {gunung.difficulty}
                            </span>
                            <Link href={`/catalog/${gunung.slug}`} className="text-primary text-xs font-bold hover:underline">Detail</Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* --- SECTION BERITA TERBARU --- */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Berita Terbaru 📰</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {recentNews.length > 0 && (
                    <div className="md:col-span-2 bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col justify-center">
                        <span className="text-[10px] font-bold text-white bg-red-500 px-2 py-0.5 rounded-full w-fit mb-2">HOT</span>
                        <h3 className="text-lg font-bold mb-2">{recentNews[0].title}</h3>
                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{recentNews[0].content}</p>
                        <Link href={`/news/${recentNews[0].slug}`} className="text-primary font-bold text-sm hover:underline">Baca Selengkapnya</Link>
                    </div>
                )}
                
                <div className="space-y-4">
                    {recentNews.slice(1).map((news) => (
                        <Link key={news.id} href={`/news/${news.slug}`} className="flex gap-3 items-center hover:bg-gray-50 p-2 rounded-lg transition cursor-pointer">
                            <div className="bg-gray-200 w-12 h-12 rounded-lg flex-shrink-0 overflow-hidden">
                                <img src={news.image} className="w-full h-full object-cover" alt={news.title} />
                            </div>
                            <div>
                                <h4 className="font-bold text-xs text-gray-800 line-clamp-2">{news.title}</h4>
                                <p className="text-[10px] text-gray-400 mt-1">{news.date}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
      </section>
    </>
  );
}