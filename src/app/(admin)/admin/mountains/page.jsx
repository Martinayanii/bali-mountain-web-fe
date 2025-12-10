"use client";
import { useState } from "react";

export default function MountainAdminPage() {
  // --- STATE ---
  const [view, setView] = useState("list"); // 'list' atau 'form'
  const [editData, setEditData] = useState(null); // Data yang sedang diedit

  // Data Dummy Awal (Mirip admin.html)
  const [mountains, setMountains] = useState([
    {
      id: 1,
      name: "Gunung Rinjani",
      location: "Lombok",
      height: "3,726",
      hasGpx: true,
    },
    {
      id: 2,
      name: "Gunung Semeru",
      location: "Jawa Timur",
      height: "3,676",
      hasGpx: true,
    },
  ]);

  // Fungsi Tombol Edit
  const handleEdit = (gunung) => {
    setEditData(gunung);
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
    alert("Data berhasil disimpan (Simulasi)");
    setView("list");
  };

  return (
    <div className="animate-fade-in">
      
      {/* === TAMPILAN 1: LIST TABEL === */}
      {view === "list" && (
        <div className="bg-white border-radius-lg shadow-[0_2px_5px_rgba(0,0,0,0.05)] rounded-lg p-6">
          <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
            <h3 className="font-bold text-lg text-[#2c3e50]">Database Gunung</h3>
            <button 
              onClick={handleAdd}
              className="bg-[#27ae60] text-white px-4 py-2 rounded flex items-center gap-2 text-sm hover:bg-green-700 transition"
            >
              <span>+</span> Tambah
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8f9fa] text-[#2c3e50]">
                  <th className="p-3 text-sm font-semibold border-b border-gray-100">Nama Gunung</th>
                  <th className="p-3 text-sm font-semibold border-b border-gray-100">Lokasi</th>
                  <th className="p-3 text-sm font-semibold border-b border-gray-100">Tinggi (mdpl)</th>
                  <th className="p-3 text-sm font-semibold border-b border-gray-100">Jalur</th>
                  <th className="p-3 text-sm font-semibold border-b border-gray-100">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {mountains.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="p-3 border-b border-gray-100 font-medium">{item.name}</td>
                    <td className="p-3 border-b border-gray-100">{item.location}</td>
                    <td className="p-3 border-b border-gray-100">{item.height}</td>
                    <td className="p-3 border-b border-gray-100">
                      {item.hasGpx ? (
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-[11px] font-bold">GPX Available</span>
                      ) : (
                        <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded text-[11px]">No Data</span>
                      )}
                    </td>
                    <td className="p-3 border-b border-gray-100 flex gap-2">
                      <button 
                        onClick={() => handleEdit(item)}
                        className="bg-[#3498db] text-white px-2 py-1 rounded hover:bg-blue-600 transition"
                      >
                        ✎
                      </button>
                      <button className="bg-[#e74c3c] text-white px-2 py-1 rounded hover:bg-red-600 transition">
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
              {editData ? "Edit Data Gunung" : "Tambah Gunung Baru"}
            </h3>
            <button 
              onClick={() => setView("list")}
              className="bg-[#95a5a6] text-white px-4 py-2 rounded text-sm hover:bg-gray-500 transition"
            >
              Kembali
            </button>
          </div>

          <form onSubmit={handleSave}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Kolom Kiri */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Gunung</label>
                        <input type="text" defaultValue={editData?.name} className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:border-[#27ae60]" placeholder="Contoh: Gunung Kerinci" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi (Provinsi)</label>
                        <input type="text" defaultValue={editData?.location} className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:border-[#27ae60]" placeholder="Jambi, Sumatera" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ketinggian (mdpl)</label>
                        <input type="number" defaultValue={editData?.height.replace(',','')} className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:border-[#27ae60]" placeholder="3805" />
                    </div>
                </div>

                {/* Kolom Kanan */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Starting Point</label>
                        <input type="text" className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:border-[#27ae60]" placeholder="Basecamp Kersik Tuo" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Jarak Tempuh (KM)</label>
                        <input type="number" className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:border-[#27ae60]" placeholder="12.5" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Upload File Trek (.gpx)</label>
                        <input type="file" accept=".gpx" className="w-full border border-gray-300 rounded p-2 text-sm text-gray-500" />
                        <p className="text-[10px] text-gray-400 mt-1">Format file harus .gpx</p>
                    </div>
                </div>
            </div>

            {/* Full Width Inputs */}
            <div className="space-y-4 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Jalur</label>
                    <textarea className="w-full border border-gray-300 rounded p-2 text-sm h-32 focus:outline-none focus:border-[#27ae60]" placeholder="Jelaskan kondisi medan, sumber air, dll..."></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Foto Utama</label>
                    <input type="file" className="w-full border border-gray-300 rounded p-2 text-sm text-gray-500" />
                </div>
            </div>

            <div className="text-right">
                <button type="submit" className="bg-[#27ae60] text-white px-6 py-2.5 rounded hover:bg-green-700 transition font-medium text-sm">
                    Simpan Data
                </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}