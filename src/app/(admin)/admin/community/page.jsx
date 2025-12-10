"use client";
import { useState } from "react";
// Jika nanti Store Community sudah siap, import di sini
// import { useCommunityStore } from '@/store/useCommunityStore';

export default function AdminCommunityPage() {
  // --- STATE ---
  const [view, setView] = useState("list"); // 'list' atau 'form'
  const [editData, setEditData] = useState(null); // Data yang sedang diedit

  // Data Dummy Awal (Data Postingan Komunitas)
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Cari Barengan Merbabu via Selo",
      user: "Rian_Pendaki",
      destination: "Gunung Merbabu",
      dateTrip: "20-22 Des 2025",
      status: "Open", // Open, Full, Closed
      quota: "Butuh 2 orang",
      description: "Halo, cari barengan buat sharecost mobil dari Jogja..."
    },
    {
      id: 2,
      title: "Open Trip Rinjani Premium",
      user: "Sinta_Outdoor",
      destination: "Gunung Rinjani",
      dateTrip: "31 Des 2025",
      status: "Open",
      quota: "Sisa 1 Seat",
      description: "Include porter, tenda, makan. Tinggal bawa badan."
    },
    {
      id: 3,
      title: "Tektok Prau Sunrise",
      user: "Budi_Santoso",
      destination: "Gunung Prau",
      dateTrip: "Besok Pagi",
      status: "Full",
      quota: "Penuh",
      description: "Cari temen jalan aja biar ga sepi."
    },
  ]);

  // Fungsi Tombol Edit
  const handleEdit = (post) => {
    setEditData(post);
    setView("form");
  };

  // Fungsi Tombol Tambah (Admin posting pengumuman/ajakan resmi)
  const handleAdd = () => {
    setEditData(null); // Kosongkan form
    setView("form");
  };

  // Fungsi Simpan (Dummy)
  const handleSave = (e) => {
    e.preventDefault();
    alert("Data postingan berhasil disimpan (Simulasi)");
    setView("list");
  };

  return (
    <div className="animate-fade-in p-6">
      
      {/* === TAMPILAN 1: LIST TABEL === */}
      {view === "list" && (
        <div className="bg-white border-radius-lg shadow-[0_2px_5px_rgba(0,0,0,0.05)] rounded-lg p-6">
          <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
            <h3 className="font-bold text-lg text-[#2c3e50]">Moderasi Req. Muncak</h3>
            <button 
              onClick={handleAdd}
              className="bg-[#27ae60] text-white px-4 py-2 rounded flex items-center gap-2 text-sm hover:bg-green-700 transition"
            >
              <span>+</span> Buat Postingan
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8f9fa] text-[#2c3e50]">
                  <th className="p-3 text-sm font-semibold border-b border-gray-100">Judul / Info</th>
                  <th className="p-3 text-sm font-semibold border-b border-gray-100">Oleh</th>
                  <th className="p-3 text-sm font-semibold border-b border-gray-100">Tujuan</th>
                  <th className="p-3 text-sm font-semibold border-b border-gray-100">Status</th>
                  <th className="p-3 text-sm font-semibold border-b border-gray-100">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {posts.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="p-3 border-b border-gray-100">
                        <div className="font-medium text-[#2c3e50]">{item.title}</div>
                        <div className="text-xs text-gray-400">{item.dateTrip}</div>
                    </td>
                    <td className="p-3 border-b border-gray-100 font-medium">{item.user}</td>
                    <td className="p-3 border-b border-gray-100">{item.destination}</td>
                    <td className="p-3 border-b border-gray-100">
                      {item.status === "Open" ? (
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold border border-green-200">
                          Open
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-semibold border border-red-200">
                          {item.status}
                        </span>
                      )}
                    </td>
                    <td className="p-3 border-b border-gray-100 flex gap-2">
                      <button 
                        onClick={() => handleEdit(item)}
                        className="bg-[#3498db] text-white px-2 py-1 rounded hover:bg-blue-600 transition"
                        title="Edit / Moderasi"
                      >
                        ✎
                      </button>
                      <button className="bg-[#e74c3c] text-white px-2 py-1 rounded hover:bg-red-600 transition" title="Hapus Postingan">
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
        <div className="bg-white max-w-4xl mx-auto rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.05)] p-8">
          <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
            <h3 className="font-bold text-lg text-[#2c3e50]">
              {editData ? "Edit Postingan" : "Buat Postingan Baru"}
            </h3>
            <button 
              onClick={() => setView("list")}
              className="bg-[#95a5a6] text-white px-4 py-2 rounded text-sm hover:bg-gray-500 transition"
            >
              Kembali
            </button>
          </div>

          <form onSubmit={handleSave}>
            {/* Input Judul */}
            <div className="mb-6">
               <label className="block text-sm font-medium text-gray-700 mb-1">Judul Rencana</label>
               <input 
                 type="text" 
                 defaultValue={editData?.title} 
                 className="w-full border border-gray-300 rounded p-3 text-base focus:outline-none focus:border-[#27ae60] font-medium" 
                 placeholder="Contoh: Cari Barengan Merbabu Sharecost..." 
               />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Kolom Kiri */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tujuan Gunung</label>
                        <select className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:border-[#27ae60] bg-white">
                            <option>Gunung Rinjani</option>
                            <option>Gunung Semeru</option>
                            <option>Gunung Merbabu</option>
                            <option>Gunung Prau</option>
                            <option>Gunung Kerinci</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Trip</label>
                        <input type="text" defaultValue={editData?.dateTrip} className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:border-[#27ae60]" placeholder="20 Des 2025" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">User Pembuat</label>
                        <input type="text" defaultValue={editData?.user || "Admin"} className="w-full border border-gray-300 rounded p-2 text-sm bg-gray-50" readOnly={!!editData} />
                    </div>
                </div>

                {/* Kolom Kanan */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status Kuota</label>
                        <select className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:border-[#27ae60] bg-white">
                            <option value="Open">Masih Dibuka (Open)</option>
                            <option value="Full">Penuh (Full)</option>
                            <option value="Closed">Ditutup/Selesai</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Info Kuota</label>
                        <input type="text" defaultValue={editData?.quota} className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:border-[#27ae60]" placeholder="Misal: Butuh 2 orang lagi" />
                    </div>
                </div>
            </div>

            {/* Deskripsi */}
            <div className="space-y-4 mb-8">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Lengkap</label>
                    <textarea 
                        defaultValue={editData?.description}
                        className="w-full border border-gray-300 rounded p-4 text-sm h-32 focus:outline-none focus:border-[#27ae60]" 
                        placeholder="Jelaskan detail meeting point, biaya, dan persyaratan..."
                    ></textarea>
                </div>
            </div>

            <div className="text-right flex justify-end gap-3">
                <button type="button" onClick={() => setView('list')} className="px-6 py-2.5 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 transition font-medium text-sm">
                    Batal
                </button>
                <button type="submit" className="bg-[#27ae60] text-white px-6 py-2.5 rounded hover:bg-green-700 transition font-medium text-sm">
                    {editData ? "Update Postingan" : "Terbitkan"}
                </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}