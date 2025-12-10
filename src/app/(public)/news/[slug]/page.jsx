import { articles } from "@/lib/data";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function NewsDetailPage({ params }) {
  // 1. Ambil slug dari URL
  const { slug } = await params;

  // 2. Cari artikel yang sesuai
  const article = articles.find((item) => item.slug === slug);
  
  // 3. Filter artikel lain untuk Sidebar "Baca Juga" (kecuali artikel yg sedang dibuka)
  const relatedArticles = articles.filter((item) => item.slug !== slug).slice(0, 3);

  if (!article) {
    notFound();
  }

  return (
    <div className="bg-bg-soft min-h-screen">
        
        {/* --- HEADER ARTIKEL --- */}
        <header className="bg-white pt-10 pb-8 border-b border-gray-100">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                
                {/* Breadcrumbs */}
                <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mb-4 font-medium">
                    <Link href="/news" className="hover:text-primary">Berita</Link>
                    <span>/</span>
                    <span className="text-primary font-bold">{article.category}</span>
                </div>

                {/* Judul Utama */}
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    {article.title}
                </h1>

                {/* Info Penulis */}
                <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                        <img src="https://i.pravatar.cc/150?img=60" className="w-8 h-8 rounded-full border border-gray-200" alt="Admin" />
                        <span className="font-bold text-gray-900">{article.author}</span>
                    </div>
                    <span>•</span>
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime || '3 Menit Baca'}</span>
                </div>
            </div>
        </header>

        {/* --- MAIN CONTENT & SIDEBAR --- */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                
                {/* KOLOM KIRI: ISI BERITA */}
                <article className="lg:col-span-2">
                    
                    {/* Gambar Utama */}
                    <div className="rounded-2xl overflow-hidden mb-8 shadow-lg">
                        <img src={article.image} alt={article.title} className="w-full h-auto object-cover" />
                        <p className="text-xs text-center text-gray-400 mt-2 italic">Ilustrasi pendaki. (Sumber: Unsplash)</p>
                    </div>

                    {/* Isi Konten (HTML Render) */}
                    <div 
                        className="prose max-w-none text-gray-800 font-serif leading-loose text-lg space-y-6"
                        dangerouslySetInnerHTML={{ __html: article.content }} 
                    />

                    {/* Tombol Share */}
                    <div className="border-y border-gray-200 py-6 mt-10 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm font-bold text-gray-500">Bagikan artikel ini:</p>
                        <div className="flex gap-3">
                            <button className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:opacity-90 font-bold text-xs">WA</button>
                            <button className="w-10 h-10 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:opacity-90 font-bold text-xs">TW</button>
                            <button className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 font-bold text-xs">FB</button>
                            <button className="w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-300">🔗</button>
                        </div>
                    </div>

                    {/* Kolom Komentar (Dummy) */}
                    <div className="mt-10">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Komentar (2)</h3>
                        
                        <div className="flex gap-4 mb-8">
                            <img src="https://i.pravatar.cc/150?img=12" className="w-10 h-10 rounded-full" />
                            <div className="flex-grow">
                                <textarea className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-primary transition h-24 mb-2" placeholder="Tulis tanggapanmu..."></textarea>
                                <button className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-green-700 float-right">Kirim Komentar</button>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <img src="https://i.pravatar.cc/150?img=8" className="w-10 h-10 rounded-full" />
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-bold text-sm text-gray-900">Rina Suka Jalan</h4>
                                        <span className="text-[10px] text-gray-400">1 jam yang lalu</span>
                                    </div>
                                    <p className="text-sm text-gray-600">Wah bener banget poin nomor 2. Dulu aku beli pas-pasan, alhasil kuku jempol copot pas turun Ciremai. Trauma wkwk.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>

                {/* KOLOM KANAN: SIDEBAR BACA JUGA */}
                <aside className="lg:col-span-1 space-y-8">
                    <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-50 sticky top-24">
                        <h3 className="font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Baca Juga</h3>
                        <div className="space-y-4">
                            
                            {/* Looping Artikel Terkait */}
                            {relatedArticles.map((rel) => (
                                <Link key={rel.id} href={`/news/${rel.slug}`} className="flex gap-3 group">
                                    <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                                        <img src={rel.image} className="w-full h-full object-cover group-hover:scale-110 transition" alt={rel.title} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-800 leading-snug group-hover:text-primary transition line-clamp-2">
                                            {rel.title}
                                        </h4>
                                        <p className="text-[10px] text-gray-400 mt-1">{rel.category}</p>
                                    </div>
                                </Link>
                            ))}

                        </div>
                        
                        <Link href="/news">
                            <button className="w-full mt-6 bg-gray-50 text-gray-600 text-xs font-bold py-3 rounded-xl hover:bg-gray-100 transition">
                                Lihat Semua Berita
                            </button>
                        </Link>
                    </div>
                </aside>

            </div>
        </main>
    </div>
  );
}