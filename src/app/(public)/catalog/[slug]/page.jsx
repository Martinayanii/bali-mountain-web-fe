import { mountains } from "@/lib/data";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function DetailGunungPage({ params }) {
  // 1. Ambil "slug" dari URL (contoh: 'semeru' atau 'merbabu')
  // Di Next.js versi baru, params itu Promise, jadi harus di-await
  const { slug } = await params; 

  // 2. Cari data gunung di file data.js yang cocok dengan slug itu
  const gunung = mountains.find((item) => item.slug === slug);

  // 3. Kalau gunung tidak ditemukan (misal user ketik URL ngawur), tampilkan 404
  if (!gunung) {
    notFound();
  }

  return (
    <div className="bg-bg-soft min-h-screen pb-12">
        
        {/* --- HEADER HERO (GAMBAR BESAR) --- */}
        <header className="relative h-[400px] md:h-[500px] w-full">
            <img 
                src={gunung.image} 
                alt={gunung.name}
                className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Overlay Hitam Transparan */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            <div className="absolute bottom-0 left-0 w-full pb-10 pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-gray-300 text-xs mb-3 font-medium">
                            <Link href="/catalog" className="hover:text-white">Katalog</Link>
                            <span>/</span>
                            <span className="text-white">{gunung.name}</span>
                        </div>
                        
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{gunung.name}</h1>
                        <p className="text-gray-300 text-lg flex items-center gap-2">
                            <span>📍</span> {gunung.location}
                        </p>
                    </div>
                </div>
            </div>
        </header>

        {/* --- KONTEN UTAMA --- */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
            
            {/* INFO GRID (Kotak Putih Melayang) */}
            <div className="bg-white rounded-2xl shadow-xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 border border-gray-100">
                <div className="text-center border-r border-gray-100 last:border-0">
                    <p className="text-xs text-gray-400 font-medium uppercase mb-1">Ketinggian</p>
                    <p className="text-xl md:text-2xl font-bold text-gray-800">{gunung.elevation || '-'}</p>
                </div>
                <div className="text-center border-r border-gray-100 last:border-0">
                    <p className="text-xs text-gray-400 font-medium uppercase mb-1">Kesulitan</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold 
                        ${gunung.difficulty === 'Hard' ? 'bg-red-100 text-red-600' : 
                          gunung.difficulty === 'Medium' ? 'bg-orange-100 text-orange-600' : 
                          'bg-blue-100 text-blue-600'}`}>
                        {gunung.difficulty}
                    </span>
                </div>
                <div className="text-center border-r border-gray-100 last:border-0">
                    <p className="text-xs text-gray-400 font-medium uppercase mb-1">Rating</p>
                    <p className="text-xl md:text-2xl font-bold text-gray-800">★ {gunung.rating}</p>
                </div>
                <div className="text-center">
                    <p className="text-xs text-gray-400 font-medium uppercase mb-1">Status</p>
                    <p className={`text-xl md:text-2xl font-bold ${gunung.status === 'Open' ? 'text-green-600' : 'text-red-500'}`}>
                        {gunung.status}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* DESKRIPSI GUNUNG */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-white p-6 rounded-2xl card-shadow">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Tentang Gunung</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            {gunung.description || "Belum ada deskripsi untuk gunung ini."}
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Jalur ini menawarkan pengalaman pendakian yang tak terlupakan.
                            Pastikan Anda mempersiapkan fisik dan logistik dengan matang sebelum mendaki.
                        </p>
                    </section>

                    <Link href="/catalog" className="inline-block text-primary font-bold hover:underline">
                        ← Kembali ke Katalog
                    </Link>
                </div>

                {/* SIDEBAR INFO PENTING */}
                <aside className="space-y-6 sticky top-24 h-fit">
                    <div className="bg-white p-6 rounded-2xl card-shadow border-l-4 border-yellow-400">
                        <h3 className="font-bold text-gray-900 mb-4 text-sm flex items-center gap-2">
                            <span>⚠</span> Info Penting
                        </h3>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li className="flex gap-3 items-start">
                                <span className="text-green-500 font-bold">•</span>
                                <span>Wajib Booking Online H-3</span>
                            </li>
                            <li className="flex gap-3 items-start">
                                <span className="text-green-500 font-bold">•</span>
                                <span>Bawa Sampah Turun</span>
                            </li>
                            <li className="flex gap-3 items-start">
                                <span className="text-red-500 font-bold">•</span>
                                <span>Dilarang Membawa Tisu Basah</span>
                            </li>
                        </ul>
                    </div>
                </aside>

            </div>
        </main>
    </div>
  );
}