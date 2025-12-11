"use client";
import { useState } from "react";
import { useAppStore } from "@/store/useAppStore"; 
import { FaPlus, FaEdit, FaTrash, FaArrowLeft, FaSave, FaBold, FaItalic, FaUnderline, FaListUl, FaListOl, FaImage, FaLink, FaAlignLeft, FaExclamationTriangle } from "react-icons/fa";
import toast from 'react-hot-toast';

export default function AdminNewsPage() {
  const { newsList, addNews, updateNews, deleteNews } = useAppStore();
  
  const [view, setView] = useState("list");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  
  // STATE BARU UNTUK MODAL HAPUS
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    title: "", category: "Tips & Trik", content: "", image: null
  });

  // --- HANDLER ---
  const handleAdd = () => {
    setFormData({ title: "", category: "Tips & Trik", content: "", image: null });
    setIsEditing(false);
    setEditId(null);
    setView("form");
  };

  const handleEdit = (item) => {
    setFormData({
        title: item.title,
        category: item.category,
        content: item.content || "", 
        image: item.image
    });
    setEditId(item.id);
    setIsEditing(true);
    setView("form");
  };

  // 1. KLIK TOMBOL HAPUS (Hanya Buka Modal)
  const openDeleteModal = (id) => {
    setSelectedDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  // 2. KONFIRMASI HAPUS (Eksekusi Hapus)
  const confirmDelete = () => {
    if (selectedDeleteId) {
        deleteNews(selectedDeleteId);
        toast.success("Artikel berhasil dihapus!");
        setIsDeleteModalOpen(false); // Tutup modal
        setSelectedDeleteId(null);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (isEditing && editId) {
        updateNews(editId, {
            ...formData,
            slug: formData.title.toLowerCase().replace(/ /g, "-") 
        });
        toast.success("Artikel berhasil diperbarui!");
    } else {
        addNews({
          ...formData,
          image: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=800",
          slug: formData.title.toLowerCase().replace(/ /g, "-")
        });
        toast.success("Artikel baru diterbitkan!");
    }
    setView("list");
  };

  return (
    <div className="animate-fade-in relative">
      
      {/* === TAMPILAN 1: LIST ARTIKEL === */}
      {view === "list" && (
        <div className="bg-white rounded-lg shadow-[0_2px_5px_rgba(0,0,0,0.05)] p-6">
          <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
            <h3 className="font-bold text-lg text-[#2c3e50]">Daftar Artikel</h3>
            <button 
              onClick={handleAdd}
              className="bg-[#27ae60] text-white px-4 py-2 rounded flex items-center gap-2 text-sm hover:bg-green-700 transition shadow-sm"
            >
              <FaPlus /> Tulis Artikel
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8f9fa] text-[#2c3e50]">
                  <th className="p-3 text-sm font-semibold border-b border-gray-100">Judul Artikel</th>
                  <th className="p-3 text-sm font-semibold border-b border-gray-100">Kategori</th>
                  <th className="p-3 text-sm font-semibold border-b border-gray-100">Tanggal</th>
                  <th className="p-3 text-sm font-semibold border-b border-gray-100">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {newsList.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="p-3 border-b border-gray-100 font-medium text-[#2c3e50]">{item.title}</td>
                    <td className="p-3 border-b border-gray-100">
                        <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs font-bold border border-blue-100">
                            {item.category}
                        </span>
                    </td>
                    <td className="p-3 border-b border-gray-100">{item.date}</td>
                    <td className="p-3 border-b border-gray-100 flex gap-2">
                      
                      <button onClick={() => handleEdit(item)} className="bg-[#3498db] text-white p-2 rounded hover:bg-blue-600 transition" title="Edit">
                        <FaEdit />
                      </button>

                      {/* GANTI DENGAN OPEN MODAL */}
                      <button onClick={() => openDeleteModal(item.id)} className="bg-[#e74c3c] text-white p-2 rounded hover:bg-red-600 transition" title="Hapus">
                        <FaTrash />
                      </button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {newsList.length === 0 && (
                <div className="text-center py-8 text-gray-400 text-sm">Belum ada artikel.</div>
            )}
          </div>
        </div>
      )}

      {/* === TAMPILAN 2: FORM EDITOR (Sama seperti sebelumnya) === */}
      {view === "form" && (
        <div className="bg-white max-w-4xl mx-auto rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.05)] p-8 animate-fade-in">
          <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
            <h3 className="font-bold text-lg text-[#2c3e50]">{isEditing ? "Edit Artikel" : "Editor Artikel"}</h3>
            <button onClick={() => setView("list")} className="bg-[#95a5a6] text-white px-4 py-2 rounded text-sm hover:bg-gray-500 transition flex items-center gap-2">
              <FaArrowLeft /> Kembali
            </button>
          </div>
          <form onSubmit={handleSave}>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Judul Artikel</label>
                <input type="text" required className="w-full border border-gray-300 rounded p-3 text-lg font-bold focus:outline-none focus:border-[#27ae60]" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                    <select className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:border-[#27ae60] bg-white" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                        <option>Tips & Trik</option><option>Review Gear</option><option>Info Jalur</option><option>Berita Alam</option><option>Cerita Pendaki</option>
                    </select>
                </div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Foto Cover</label><input type="file" className="w-full border border-gray-300 rounded p-2 text-sm text-gray-500" /></div>
            </div>
            <div className="mb-6"><label className="block text-sm font-medium text-gray-700 mb-1">Konten Artikel</label><div className="border border-gray-300 rounded overflow-hidden bg-white"><div className="bg-[#f8f9fa] p-2 border-b border-gray-300 flex gap-1 flex-wrap"><ToolBtn icon={<FaBold />} /><ToolBtn icon={<FaItalic />} /></div><textarea className="w-full p-4 min-h-[300px] outline-none text-sm text-gray-700 leading-relaxed resize-y" value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})}></textarea></div></div>
            <div className="text-right"><button type="submit" className="bg-[#27ae60] text-white px-6 py-2.5 rounded hover:bg-green-700 transition font-medium text-sm flex items-center gap-2 ml-auto"><FaSave /> {isEditing ? "Simpan Perubahan" : "Terbitkan Artikel"}</button></div>
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
                <h3 className="text-xl font-bold text-gray-800 mb-2">Hapus Artikel?</h3>
                <p className="text-sm text-gray-500 mb-6">
                    Apakah Anda yakin ingin menghapus artikel ini? <br/> Tindakan ini tidak dapat dibatalkan.
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

function ToolBtn({ icon, text, title }) {
    return <button type="button" className="p-1.5 min-w-[30px] rounded hover:bg-gray-200 text-gray-600 text-sm flex items-center justify-center transition" title={title}>{icon || <span className="font-bold text-xs">{text}</span>}</button>;
}