import Link from "next/link";
import MountainCard from "@/components/features/MountainCard";
import { mountains } from "@/lib/data"; 

export default function HomePage() {
  // Ambil 4 gunung pertama untuk ditampilkan di home sebagai "Populer"
  const popularMountains = mountains.slice(0, 4);

  return (
    <div>
      {/* --- HERO SECTION (Bagian Atas) --- */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Kotak Putih Besar dengan Sudut Melengkung */}
        <div className="bg-white rounded-[2rem] p-6 md:p-10 card-shadow flex flex-col-reverse md:flex-row items-center gap-8 relative overflow-hidden">
            
            {/* Dekorasi Blur Hijau di Belakang */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -z-10 opacity-50"></div>

            {/* Teks & Search Bar (Kiri) */}
            <div className="w-full md:w-1/2 text-center md:text-left z-10">
                <span className="inline-block bg-orange-100 text-secondary text-xs font-bold px-3 py-1 rounded-full mb-3">
                    👋 Gabung Komunitas
                </span>
                <h1 className="text-3xl md:text-5xl font-bold leading-tight text-gray-900 mb-4">
                    Cari Teman Muncak <br />
                    <span className="text-primary">Jadi Lebih Mudah.</span>
                </h1>
                <p className="text-gray-500 mb-6 text-sm md:text-base leading-relaxed">
                    Tidak punya tim buat nanjak? Temukan barengan pendakian yang cocok atau gabung open trip terpercaya di sini.
                </p>
                
                {/* Search Bar Input */}
                <div className="bg-gray-50 p-1.5 rounded-xl border border-gray-200 flex flex-col sm:flex-row gap-2 max-w-md mx-auto md:mx-0">
                    <input 
                        type="text" 
                        placeholder="Mau nanjak ke mana?" 
                        className="flex-1 px-4 py-2 bg-transparent outline-none text-sm font-medium" 
                    />
                    <Link 
                        href="/catalog" 
                        className="bg-secondary text-white rounded-lg px-6 py-2 font-bold hover:bg-orange-600 transition text-sm flex justify-center items-center"
                    >
                        Cari
                    </Link>
                </div>
            </div>

            {/* Gambar Hero (Kanan) */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                <div className="relative w-full max-w-md h-64 md:h-80 overflow-hidden rounded-2xl">
                    <img 
                        src="https://images.unsplash.com/photo-1533240332313-0db49b459ad6?q=80&w=1974" 
                        className="w-full h-full object-cover transform hover:scale-105 transition duration-700" 
                        alt="Hiking Group" 
                    />
                     {/* Floating Info Card (Optional: jika mau persis HTML) */}
                     <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-xl shadow-lg flex items-center gap-3">
                        <div className="text-xs">
                            <p className="font-bold text-gray-800">500+ Pendaki</p>
                            <p className="text-gray-500">Bergabung hari ini</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </header>

      {/* --- POPULAR MOUNTAINS SECTION --- */}
      <section className="py-8 md:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Jalur Populer ⭐</h2>
            <Link href="/catalog" className="text-primary text-sm font-bold hover:underline">
                Lihat Semua
            </Link>
        </div>
        
        {/* Grid Kartu Gunung */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {popularMountains.map((gunung) => (
                <MountainCard 
                    key={gunung.id}
                    {...gunung} // Mengirim semua data (name, image, rating, dll) ke komponen
                />
            ))}
        </div>
      </section>
    </div>
  );
}