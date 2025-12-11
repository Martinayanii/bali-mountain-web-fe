"use client";
import { useState } from "react";
import { useAppStore } from "@/store/useAppStore"; 
import { FaPlus, FaEdit, FaTrash, FaArrowLeft, FaSave, FaExclamationTriangle } from "react-icons/fa";
import toast from 'react-hot-toast'; // 1. IMPORT TOAST

export default function AdminMountainsPage() {
  const { mountains, addMountain, updateMountain, deleteMountain } = useAppStore();

  const [view, setView] = useState("list");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  
  // STATE MODAL HAPUS
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: "", location: "", height: "", basecamp: "", 
    distance: "", difficulty: "Medium", description: "", 
    gpxFile: null, image: null
  });

  // --- HANDLER ---

  const handleAdd = () => {
    setFormData({ 
        name: "", location: "", height: "", basecamp: "", 
        distance: "", difficulty: "Medium", description: "", 
        gpxFile: null, image: null 
    });
    setIsEditing(false);
    setEditId(null);
    setView("form");
  };

  const handleEdit = (item) => {
    setFormData({
        name: item.name,
        location: item.location,
        height: item.height,
        basecamp: item.basecamp || "",
        distance: item.distance || "",
        difficulty: item.difficulty || "Medium",
        description: item.description || "",
        gpxFile: null,
        image: item.image
    });
    setEditId(item.id);
    setIsEditing(true);
    setView("form");
  };

  // 1. KLIK TOMBOL HAPUS (BUKA MODAL)
  const openDeleteModal = (id) => {
    setSelectedDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  // 2. KONFIRMASI HAPUS
  const confirmDelete = () => {
    if (selectedDeleteId) {
        deleteMountain(selectedDeleteId);
        toast.success("Data gunung berhasil dihapus!");
        setIsDeleteModalOpen(false);
        setSelectedDeleteId(null);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    
    if (isEditing && editId) {
        updateMountain(editId, {
            ...formData,
            slug: formData.name.toLowerCase().replace(/ /g, "-")
        });
        toast.success("Data gunung berhasil diupdate!");
    } else {
        addMountain({
          ...formData,
          slug: formData.name.toLowerCase().replace(/ /g, "-"),
          rating: 4.5,
          status: "Open",
          image: "https://images.unsplash.com/photo-1589556264800-08ae9e1f9738?q=80&w=600"
        });
        toast.success("Data gunung berhasil ditambahkan!");
    }
    
    setView("list");
  };

  return (
    <div className="animate-fade-in relative">
      
      {/* TAMPILAN LIST */}
      {view === "list" && (
        <div className="bg-white rounded-lg shadow-[0_2px_5px_rgba(0,0,0,0.05)] p-6">
          <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
            <h3 className="font-bold text-lg text-[#2c3e50]">Database Gunung</h3>
            <button 
              onClick={handleAdd}
              className="bg-[#27ae60] text-white px-4 py-2 rounded flex items-center gap-2 text-sm hover:bg-green-700 transition shadow-sm"
            >
              <FaPlus /> Tambah
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8f9fa] text-[#2c3e50]">
                  <th className="p-3 text-sm font-semibold border-b border-gray-100">Nama Gunung</th>
                  <th className="p-3 text-sm font-semibold border-b border-gray-100">Lokasi</th>
                  <th className="p-3 text-sm font-semibold border-b border-gray-100">Tinggi</th>
                  <th className="p-3 text-sm font-semibold border-b border-gray-100">Jalur</th>
                  <th className="p-3 text-sm font-semibold border-b border-gray-100">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {mountains.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="p-3 border-b border-gray-100 font-medium flex items-center gap-2 text-[#2c3e50]">
                       {item.name}
                    </td>
                    <td className="p-3 border-b border-gray-100">{item.location}</td>
                    <td className="p-3 border-b border-gray-100">{item.height} mdpl</td>
                    <td className="p-3 border-b border-gray-100">
                      <span className="bg-green-50 text-green-600 px-2 py-1 rounded text-[11px] font-bold border border-green-100">
                        GPX Available
                      </span>
                    </td>
                    <td className="p-3 border-b border-gray-100 flex gap-2">
                      
                      <button 
                        onClick={() => handleEdit(item)}
                        className="bg-[#3498db] text-white p-2 rounded hover:bg-blue-600 transition" 
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      
                      {/* TOMBOL HAPUS (BUKA MODAL) */}
                      <button 
                        onClick={() => openDeleteModal(item.id)} 
                        className="bg-[#e74c3c] text-white p-2 rounded hover:bg-red-600 transition" 
                        title="Hapus"
                      >
                        <FaTrash />
                      </button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {mountains.length === 0 && (
                <div className="text-center py-8 text-gray-400 text-sm">Belum ada data gunung.</div>
            )}
          </div>
        </div>
      )}

      {/* TAMPILAN FORM (TETAP SAMA) */}
      {view === "form" && (
        <div className="bg-white max-w-4xl mx-auto rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.05)] p-8 animate-fade-in">
          <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
            <h3 className="font-bold text-lg text-[#2c3e50]">
              {isEditing ? `Edit Data` : "Tambah Gunung Baru"}
            </h3>
            <button 
              onClick={() => setView("list")}
              className="bg-[#95a5a6] text-white px-4 py-2 rounded text-sm hover:bg-gray-500 transition flex items-center gap-2"
            >
              <FaArrowLeft /> Kembali
            </button>
          </div>

          <form onSubmit={handleSave}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Gunung</label>
                        <input type="text" required className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:border-[#27ae60]" placeholder="Contoh: Gunung Kerinci" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi (Provinsi)</label>
                        <input type="text" required className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:border-[#27ae60]" placeholder="Jambi, Sumatera" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ketinggian (mdpl)</label>
                        <input type="number" required className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:border-[#27ae60]" placeholder="3805" value={formData.height} onChange={(e) => setFormData({...formData, height: e.target.value})} />
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Starting Point (Basecamp)</label>
                        <input type="text" className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:border-[#27ae60]" placeholder="Contoh: Basecamp Kersik Tuo" value={formData.basecamp} onChange={(e) => setFormData({...formData, basecamp: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Jarak Tempuh (KM)</label>
                        <input type="number" step="0.1" className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:border-[#27ae60]" placeholder="Contoh: 12.5" value={formData.distance} onChange={(e) => setFormData({...formData, distance: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Upload File Trek (.gpx)</label>
                        <input type="file" accept=".gpx" className="w-full border border-gray-300 rounded p-2 text-sm text-gray-500" />
                        <p className="text-[10px] text-gray-400 mt-1">Format file harus .gpx</p>
                    </div>
                </div>
            </div>

            <div className="space-y-4 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi & Informasi Jalur</label>
                    <textarea className="w-full border border-gray-300 rounded p-2 text-sm h-32 focus:outline-none focus:border-[#27ae60]" placeholder="Jelaskan kondisi medan, sumber air, dan estimasi waktu..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Foto Utama</label>
                    <input type="file" className="w-full border border-gray-300 rounded p-2 text-sm text-gray-500" />
                </div>
            </div>

            <div className="text-right">
                <button type="submit" className="bg-[#27ae60] text-white px-6 py-2.5 rounded hover:bg-green-700 transition font-medium text-sm flex items-center gap-2 ml-auto">
                    <FaSave /> {isEditing ? "Simpan Perubahan" : "Simpan Data"}
                </button>
            </div>
          </form>
        </div>
      )}

      {/* === CUSTOM DELETE MODAL === */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
            <div className="bg-white w-full max-w-sm rounded-xl shadow-2xl p-6 text-center transform transition-all scale-100">
                <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                    <FaExclamationTriangle />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Hapus Data Gunung?</h3>
                <p className="text-sm text-gray-500 mb-6">
                    Apakah Anda yakin ingin menghapus data ini? <br/> Tindakan ini tidak dapat dibatalkan.
                </p>
                <div className="flex gap-3 justify-center">
                    <button 
                        onClick={() => setIsDeleteModalOpen(false)}
                        className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-600 text-sm font-bold hover:bg-gray-50 transition"
                    >
                        Batal
                    </button>
                    <button 
                        onClick={confirmDelete}
                        className="px-5 py-2.5 rounded-lg bg-red-500 text-white text-sm font-bold hover:bg-red-600 shadow-lg shadow-red-200 transition"
                    >
                        Ya, Hapus
                    </button>
                </div>
            </div>
        </div>
      )}

    </div>
  );
}