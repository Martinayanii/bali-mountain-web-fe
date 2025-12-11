"use client";
import Link from 'next/link';
import { useParams } from 'next/navigation'; // Hook untuk baca URL
import { useAppStore } from '@/store/useAppStore'; // Import Store

export default function MountainDetailPage() {
  const params = useParams(); // Ambil parameter dari URL
  const { mountains } = useAppStore();

  // 1. Cari gunung berdasarkan slug dari URL
  const mountain = mountains.find((item) => item.slug === params.slug);

  // 2. Jika gunung tidak ditemukan (misal user ketik url ngawur)
  if (!mountain) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Gunung Tidak Ditemukan</h2>
        <p className="text-gray-500 mb-6">Maaf, data gunung yang Anda cari belum tersedia di database kami.</p>
        <Link href="/catalog" className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition">
          Kembali ke Katalog
        </Link>
      </div>
    );
  }

  // 3. Data Dummy Tambahan (Karena di Store belum lengkap ada galeri/review)
  // Kita buat simulasi agar tampilan tetap bagus seperti desain asli
  const dummyGallery = [
    mountain.image,
    "https://images.unsplash.com/photo-1623832793282-3d4349195b0c?q=80&w=600",
    "https://images.unsplash.com/photo-1605537964076-3cb0ea2800c8?q=80&w=600"
  ];

  return (
    <>
      {/* --- HERO HEADER --- */}
      <header className="relative h-[400px] md:h-[500px] w-full">
        {/* Gambar diambil dari Data Store */}
        <img src={mountain.image} className="absolute inset-0 w-full h-full object-cover" alt={mountain.name} />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

        <div className="absolute bottom-0 left-0 w-full pb-10 pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-gray-300 text-xs mb-3 font-medium">
                        <Link href="/catalog" className="hover:text-white">Katalog</Link>
                        <span>/</span>
                        <span className="hover:text-white cursor-pointer">Indonesia</span>
                        <span>/</span>
                        <span className="text-white">{mountain.name}</span>
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{mountain.name}</h1>
                    <p className="text-gray-300 text-lg flex items-center gap-2">
                        <span>📍</span> {mountain.location}
                    </p>
                </div>
            </div>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-8 relative z-10">
        
        {/* STATS GRID (Data dari Store) */}
        <div className="bg-white rounded-2xl shadow-xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 border border-gray-100">
            <div className="text-center border-r border-gray-100 last:border-0">
                <p className="text-xs text-gray-400 font-medium uppercase mb-1">Ketinggian</p>
                <p className="text-xl md:text-2xl font-bold text-gray-800">{mountain.height} <span className="text-xs text-gray-400 font-normal">mdpl</span></p>
            </div>
            <div className="text-center border-r border-gray-100 last:border-0">
                <p className="text-xs text-gray-400 font-medium uppercase mb-1">Kesulitan</p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold
                    ${mountain.difficulty === 'Hard' ? 'bg-red-100 text-red-600' : 
                      mountain.difficulty === 'Medium' ? 'bg-orange-100 text-orange-600' : 
                      'bg-green-100 text-green-600'}`}>
                    {mountain.difficulty.toUpperCase()}
                </span>
            </div>
            <div className="text-center border-r border-gray-100 last:border-0">
                <p className="text-xs text-gray-400 font-medium uppercase mb-1">Estimasi Waktu</p>
                <p className="text-xl md:text-2xl font-bold text-gray-800">{mountain.estTime}</p>
            </div>
            <div className="text-center">
                <p className="text-xs text-gray-400 font-medium uppercase mb-1">Suhu Rata-rata</p>
                <p className="text-xl md:text-2xl font-bold text-gray-800">{mountain.temp}</p>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT COLUMN */}
            <div className="lg:col-span-2 space-y-8">
                
                {/* Description */}
                <section className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Tentang {mountain.name}</h2>
                    <p className="text-gray-600 leading-relaxed mb-4 whitespace-pre-line">
                        {mountain.description}
                    </p>
                </section>

                {/* Gallery (Simulasi dari array dummyGallery di atas) */}
                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Galeri Foto</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {dummyGallery.map((img, idx) => (
                            <img key={idx} src={img} className="rounded-xl h-32 w-full object-cover hover:opacity-90 cursor-pointer transition" alt={`Gallery ${idx}`} />
                        ))}
                    </div>
                </section>

                {/* Reviews (Masih Hardcoded Visual Saja) */}
                <section className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)]" id="reviews">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Ulasan Pendaki (24)</h2>
                        <button className="text-primary font-bold text-sm hover:underline">Tulis Ulasan</button>
                    </div>

                    <div className="flex items-center gap-6 mb-8 bg-gray-50 p-4 rounded-xl">
                        <div className="text-center">
                            <span className="text-4xl font-bold text-gray-800 block">{mountain.rating}</span>
                            <div className="text-yellow-400 text-sm">★★★★★</div>
                        </div>
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2 text-xs">
                                <span className="w-12">Jalur</span>
                                <div className="w-full bg-gray-200 rounded-full h-1.5"><div className="bg-primary h-1.5 rounded-full" style={{width: '90%'}}></div></div>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                                <span className="w-12">View</span>
                                <div className="w-full bg-gray-200 rounded-full h-1.5"><div className="bg-primary h-1.5 rounded-full" style={{width: '100%'}}></div></div>
                            </div>
                        </div>
                    </div>

                    {/* Dummy Review List */}
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <img src="https://i.pravatar.cc/150?img=3" className="w-10 h-10 rounded-full" alt="User" />
                            <div>
                                <h4 className="font-bold text-sm text-gray-900">Rendi Pratama</h4>
                                <div className="text-yellow-400 text-xs mb-1">★★★★★</div>
                                <p className="text-sm text-gray-600">Jalurnya mantap, pemandangannya juara banget!</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* RIGHT SIDEBAR */}
            <aside className="space-y-6 lg:sticky lg:top-24 h-fit">
                
                {/* Info Penting */}
                <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-l-4 border-yellow-400">
                    <h3 className="font-bold text-gray-900 mb-4 text-sm flex items-center gap-2">
                        <span>⚠</span> Info Penting
                    </h3>
                    <ul className="space-y-3 text-sm text-gray-600">
                        <li className="flex gap-3 items-start">
                            <span className="text-green-500 font-bold">•</span>
                            <span>Status: <span className={mountain.status === 'Open' ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>{mountain.status}</span></span>
                        </li>
                        <li className="flex gap-3 items-start">
                            <span className="text-green-500 font-bold">•</span>
                            <span>Wajib Booking Online</span>
                        </li>
                        <li className="flex gap-3 items-start">
                            <span className="text-red-500 font-bold">•</span>
                            <span>Sampah wajib dibawa turun</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-white p-2 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] h-56 relative overflow-hidden group cursor-pointer">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Semeru_topographic_map.png" className="w-full h-full object-cover rounded-xl opacity-90 group-hover:opacity-100 transition" alt="Map" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="bg-white/90 backdrop-blur px-4 py-2 rounded-lg text-xs font-bold shadow text-gray-800 flex items-center gap-2">
                            <span>🗺</span> Lihat Peta Jalur
                        </span>
                    </div>
                </div>

            </aside>
        </div>
      </main>
    </>
  );
}