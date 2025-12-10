import Link from 'next/link';

export default function MountainCard({ name, location, rating, difficulty, slug, image, status }) {
  // 1. Logic Warna Label Kesulitan (Hard=Merah, Medium=Orange, Easy=Biru)
  const badgeColor = 
    difficulty === 'Hard' ? 'bg-red-50 text-red-700 border-red-100' :
    difficulty === 'Medium' ? 'bg-orange-50 text-orange-700 border-orange-100' :
    'bg-blue-50 text-blue-700 border-blue-100';

  // 2. Logic Status Tutup (Closed)
  const isClosed = status === 'Closed';

  return (
    <div className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 group flex flex-col h-full ${isClosed ? 'grayscale opacity-80' : ''}`}>
        
        {/* --- BAGIAN GAMBAR --- */}
        <div className="h-40 overflow-hidden relative">
            {/* Menggunakan tag IMG biasa agar bisa baca link dari Google/Mana saja tanpa error config */}
            <img 
                src={image} 
                alt={name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            
            {/* Rating Bintang (Pojok Kanan Atas) */}
            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded flex items-center gap-1 shadow-sm z-10">
                <span className="text-yellow-500 text-[10px]">★</span> <span className="text-[10px] font-bold">{rating}</span>
            </div>

            {/* Overlay Jika Status Tutup */}
            {isClosed && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                    <span className="text-white font-bold border-2 border-white px-3 py-1 rounded transform -rotate-12 text-sm">JALUR DITUTUP</span>
                </div>
            )}
        </div>

        {/* --- BAGIAN KONTEN BAWAH --- */}
        <div className="p-4 flex flex-col flex-grow">
            <div className="flex-grow">
                <h3 className="font-bold text-sm text-gray-800">{name}</h3>
                <p className="text-[10px] text-gray-500 mb-2">{location}</p>
            </div>
            
            <div className="flex items-center justify-between mt-auto">
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${badgeColor}`}>
                    {difficulty}
                </span>
                
                {/* Tombol Link ke Halaman Detail */}
                <Link href={`/catalog/${slug}`} className="text-primary text-xs font-bold hover:underline">
                    Detail
                </Link>
            </div>
        </div>
    </div>
  );
}