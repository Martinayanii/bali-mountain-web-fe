import Link from 'next/link';

export default function NewsCard({ title, category, date, image, slug, content }) {
  // Logic Warna Label Kategori
  const categoryColor = 
    category === 'Info Jalur' ? 'bg-blue-100 text-blue-600' :
    category === 'Tips & Trik' ? 'bg-green-100 text-green-600' :
    'bg-gray-100 text-gray-600';

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 group flex flex-col h-full cursor-pointer">
        
        {/* --- BAGIAN GAMBAR --- */}
        <div className="h-48 overflow-hidden relative">
            {/* Pakai <img> biasa agar gambar pasti muncul */}
            <img 
                src={image} 
                alt={title} 
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
            />
            
            {/* Label Kategori di pojok kiri atas gambar */}
            <div className="absolute top-3 left-3">
                <span className={`text-[10px] font-bold px-2 py-1 rounded shadow-sm ${categoryColor}`}>
                    {category}
                </span>
            </div>
        </div>

        {/* --- BAGIAN KONTEN --- */}
        <div className="p-5 flex flex-col flex-grow">
            <div className="text-[10px] text-gray-400 mb-2 flex items-center gap-2">
                <span>📅 {date}</span>
            </div>
            
            <h4 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-primary transition line-clamp-2">
                {title}
            </h4>
            
            <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-grow">
                {content}
            </p>
            
            {/* Link ke Detail Berita */}
            <Link href={`/news/${slug}`} className="text-xs font-bold text-secondary flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                Baca Selengkapnya →
            </Link>
        </div>
    </div>
  );
}