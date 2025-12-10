"use client";
import { useState } from "react";
// Jika nanti Anda sudah siap dengan Store, import useNewsStore di sini
// import { useNewsStore } from '@/store/useNewsStore';

export default function AdminNewsPage() {
  // --- STATE ---
  const [view, setView] = useState("list"); // 'list' atau 'form'
  const [editData, setEditData] = useState(null); // Data yang sedang diedit

  // Data Dummy Awal (Nanti bisa dipindahkan ke src/lib/data.js atau useNewsStore.js)
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "Tips Packing Ultralight: Ringan & Aman",
      category: "Tips & Trik",
      date: "10 Des 2025",
      status: "Published",
    },
    {
      id: 2,
      title: "Review Tenda Kapasitas 4 Terbaik 2025",
      category: "Review Gear",
      date: "08 Des 2025",
      status: "Draft",
    },
    {
      id: 3,
      title: "Estimasi Biaya Pendakian Rinjani via Sembalun",
      category: "Jalur & Ekspedisi",
      date: "05 Des 2025",
      status: "Published",
    },
  ]);

  // Fungsi Tombol Edit
  const handleEdit = (blog) => {
    setEditData(blog);
    setView("form");
  };

  // Fungsi Tombol Tambah
  const handleAdd = () => {
    setEditData(null); // Kosongkan form
    setView("form");
  };

  // Fungsi Simpan (Dummy)
  const handleSave = (e) => {
    e.preventDefault();
    alert("Artikel berhasil disimpan (Simulasi)");
    setView("list");
  };

  return (
    <div className="animate-fade-in p-6"> {/* Tambahkan padding container */}
      
      {/* === TAMPILAN 1: LIST TABEL === */}
      {view === "list" && (
        <div className="bg-white border-radius-lg shadow-[0_2px_5px_rgba(0,0,0,0.05)] rounded-lg p-6">
          <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
            <h3 className="font-bold text-lg text-[#2c3e50]">Manajemen Berita & Artikel</h3>
            <button 
              onClick={handleAdd}
              className="bg-[#27ae60] text-white px-4 py-2 rounded flex items-center gap-2 text-sm hover:bg-green-700 transition"
            >
              <span>+</span> Tulis Artikel
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8f9fa] text-[#2c3e50]">
                  <th className="p-3 text-sm font-semibold border-b border-gray-100">Judul Artikel</th>
                  <th className="p-3 text-sm font-semibold border-b border-gray-100">Kategori</th>
                  <th className="p-3 text-sm font-semibold border-b border-gray-100">Tanggal</th>
                  <th className="p-3 text-sm font-semibold border-b border-gray-100">Status</th>
                  <th className="p-3 text-sm font-semibold border-b border-gray-100">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {blogs.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="p-3 border-b border-gray-100 font-medium">{item.title}</td>
                    <td className="p-3 border-b border-gray-100">
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs border border-gray-200">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-3 border-b border-gray-100">{item.date}</td>
                    <td className="p-3 border-b border-gray-100">
                      {item.status === "Published" ? (
                        <span className="text-green-600 font-medium flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-green-500"></span> Terbit
                        </span>
                      ) : (
                        <span className="text-orange-500 font-medium flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-orange-400"></span> Draft
                        </span>
                      )}
                    </td>
                    <td className="p-3 border-b border-gray-100 flex gap-2">
                      <button 
                        onClick={() => handleEdit(item)}
                        className="bg-[#3498db] text-white px-2 py-1 rounded hover:bg-blue-600 transition"
                        title="Edit Artikel"
                      >
                        ✎
                      </button>
                      <button className="bg-[#e74c3c] text-white px-2 py-1 rounded hover:bg-red-600 transition" title="Hapus Artikel">
                        🗑
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* === TAMPILAN 2: FORM TAMBAH/EDIT === */}
      {view === "form" && (
        <div className="bg-white max-w-5xl mx-auto rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.05)] p-8">
          <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
            <h3 className="font-bold text-lg text-[#2c3e50]">
              {editData ? "Edit Artikel" : "Tulis Artikel Baru"}
            </h3>
            <button 
              onClick={() => setView("list")}
              className="bg-[#95a5a6] text-white px-4 py-2 rounded text-sm hover:bg-gray-500 transition"
            >
              Kembali
            </button>
          </div>

          <form onSubmit={handleSave}>
            {/* Judul Artikel (Full Width) */}
            <div className="mb-6">
               <label className="block text-sm font-medium text-gray-700 mb-1">Judul Artikel</label>
               <input 
                 type="text" 
                 defaultValue={editData?.title} 
                 className="w-full border border-gray-300 rounded p-3 text-base focus:outline-none focus:border-[#27ae60] font-medium" 
                 placeholder="Contoh: Tips Mendaki Saat Musim Hujan..." 
               />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Kolom Kiri */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                        <select className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:border-[#27ae60] bg-white">
                            <option>Tips & Trik</option>
                            <option>Review Gear</option>
                            <option>Jalur & Ekspedisi</option>
                            <option>Berita Alam</option>
                            <option>Cerita Pendaki</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Foto Cover</label>
                        <input type="file" className="w-full border border-gray-300 rounded p-2 text-sm text-gray-500" />
                    </div>
                </div>

                {/* Kolom Kanan */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status Publikasi</label>
                        <select className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:border-[#27ae60] bg-white">
                            <option value="published">Langsung Terbitkan</option>
                            <option value="draft">Simpan sebagai Draft</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Penulis (Author)</label>
                        <input type="text" defaultValue="Admin" className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:border-[#27ae60]" readOnly />
                    </div>
                </div>
            </div>

            {/* Area Editor Konten */}
            <div className="space-y-4 mb-8">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Isi Artikel</label>
                    <div className="border border-gray-300 rounded overflow-hidden">
                        {/* Toolbar Simulasi */}
                        <div className="bg-gray-50 border-b border-gray-300 p-2 flex gap-2">
                             <button type="button" className="p-1 px-2 hover:bg-gray-200 rounded font-bold text-xs">B</button>
                             <button type="button" className="p-1 px-2 hover:bg-gray-200 rounded italic text-xs">I</button>
                             <button type="button" className="p-1 px-2 hover:bg-gray-200 rounded underline text-xs">U</button>
                             <span className="border-r border-gray-300 mx-1"></span>
                             <button type="button" className="p-1 px-2 hover:bg-gray-200 rounded text-xs">H1</button>
                             <button type="button" className="p-1 px-2 hover:bg-gray-200 rounded text-xs">H2</button>
                        </div>
                        <textarea 
                            className="w-full p-4 text-sm h-64 focus:outline-none" 
                            placeholder="Mulai menulis cerita petualanganmu di sini..."
                        ></textarea>
                    </div>
                </div>
            </div>

            <div className="text-right flex justify-end gap-3">
                <button type="button" onClick={() => setView('list')} className="px-6 py-2.5 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 transition font-medium text-sm">
                    Batal
                </button>
                <button type="submit" className="bg-[#27ae60] text-white px-6 py-2.5 rounded hover:bg-green-700 transition font-medium text-sm">
                    {editData ? "Update Artikel" : "Terbitkan Artikel"}
                </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}