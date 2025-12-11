"use client";
import { useState } from "react"; // Tambahkan useState
import { useAppStore } from "@/store/useAppStore"; 
import { FaTrash, FaUser, FaClock, FaMapMarkerAlt, FaExclamationTriangle } from "react-icons/fa";
import toast from 'react-hot-toast'; // Import Toast

export default function AdminCommunityPage() {
  const { trips, deleteTrip } = useAppStore();

  // STATE UNTUK MODAL
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);

  // 1. KLIK TOMBOL HAPUS (BUKA MODAL)
  const openDeleteModal = (id) => {
    setSelectedDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  // 2. KONFIRMASI HAPUS (EKSEKUSI)
  const confirmDelete = () => {
    if (selectedDeleteId) {
        deleteTrip(selectedDeleteId); // Hapus dari store
        toast.success("Postingan berhasil dihapus!"); // Tampilkan toast
        setIsDeleteModalOpen(false); // Tutup modal
        setSelectedDeleteId(null);
    }
  };

  return (
    <div className="animate-fade-in relative">
      
      <div className="bg-white rounded-lg shadow-[0_2px_5px_rgba(0,0,0,0.05)] p-6">
        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
          <h3 className="font-bold text-lg text-[#2c3e50]">Moderasi Postingan Komunitas</h3>
          <div className="text-sm text-gray-500">Total: {trips.length} Postingan</div>
        </div>

        {/* LIST POSTINGAN */}
        <div className="space-y-4">
          {trips.map((trip) => (
            <div key={trip.id} className="bg-white border border-gray-100 rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-sm transition">
                
                {/* Konten Kiri */}
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-[#2c3e50] text-lg">{trip.title}</h4>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold border 
                            ${trip.type === 'Open' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                            {trip.type}
                        </span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-2">
                        <span className="flex items-center gap-1"><FaUser /> {trip.leader}</span>
                        <span className="flex items-center gap-1"><FaClock /> {trip.date}</span>
                        <span className="flex items-center gap-1"><FaMapMarkerAlt /> {trip.location}</span>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-1">
                        {trip.description}
                    </p>
                </div>

                {/* Tombol Aksi Kanan */}
                <button 
                    onClick={() => openDeleteModal(trip.id)} // Buka Modal
                    className="bg-[#e74c3c] text-white px-4 py-2 rounded text-sm hover:bg-red-700 transition flex items-center gap-2 flex-shrink-0"
                    title="Hapus Postingan"
                >
                    <FaTrash /> Hapus
                </button>

            </div>
          ))}

          {trips.length === 0 && (
            <div className="text-center py-10 text-gray-400">
                Tidak ada postingan komunitas saat ini.
            </div>
          )}
        </div>
      </div>

      {/* === CUSTOM DELETE MODAL === */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
            <div className="bg-white w-full max-w-sm rounded-xl shadow-2xl p-6 text-center transform transition-all scale-100">
                <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                    <FaExclamationTriangle />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Hapus Postingan?</h3>
                <p className="text-sm text-gray-500 mb-6">
                    Apakah Anda yakin ingin menghapus postingan ini? <br/> Tindakan ini tidak dapat dibatalkan.
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