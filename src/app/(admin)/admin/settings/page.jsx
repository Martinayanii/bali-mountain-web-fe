"use client";
import { useState } from "react";
import { FaSave, FaLock, FaEnvelope, FaUserShield } from "react-icons/fa";

export default function AdminSettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "admin@mountainexplorer.com",
    oldPassword: "",
    newPassword: ""
  });

  const handleSave = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulasi loading simpan data
    setTimeout(() => {
      alert("Pengaturan akun berhasil diperbarui!");
      setIsLoading(false);
      // Reset password field
      setFormData(prev => ({ ...prev, oldPassword: "", newPassword: "" }));
    }, 1500);
  };

  return (
    <div className="animate-fade-in">
      
      {/* Container Tengah (Mirip style .form-wrapper di admin.html) */}
      <div className="bg-white max-w-lg mx-auto rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.05)] p-8">
        
        <div className="border-b border-gray-100 pb-4 mb-6 flex items-center gap-3">
            <div className="bg-blue-50 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center text-lg">
                <FaUserShield />
            </div>
            <div>
                <h3 className="font-bold text-lg text-[#2c3e50]">Keamanan Akun</h3>
                <p className="text-xs text-gray-400">Update email dan password login.</p>
            </div>
        </div>

        <form onSubmit={handleSave}>
            {/* Email */}
            <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Administrator</label>
                <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400"><FaEnvelope /></span>
                    <input 
                        type="email" 
                        className="w-full border border-gray-300 rounded p-2.5 pl-10 text-sm focus:outline-none focus:border-[#27ae60] text-gray-600"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                </div>
            </div>

            <hr className="border-gray-50 my-6" />

            {/* Password Lama */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Password Lama</label>
                <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400"><FaLock /></span>
                    <input 
                        type="password" 
                        className="w-full border border-gray-300 rounded p-2.5 pl-10 text-sm focus:outline-none focus:border-[#27ae60]"
                        placeholder="••••••••"
                        value={formData.oldPassword}
                        onChange={(e) => setFormData({...formData, oldPassword: e.target.value})}
                    />
                </div>
            </div>

            {/* Password Baru */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Password Baru</label>
                <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400"><FaLock /></span>
                    <input 
                        type="password" 
                        className="w-full border border-gray-300 rounded p-2.5 pl-10 text-sm focus:outline-none focus:border-[#27ae60]"
                        placeholder="Kosongkan jika tidak ingin mengubah"
                        value={formData.newPassword}
                        onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                    />
                </div>
            </div>

            <button 
                type="submit" 
                disabled={isLoading}
                className={`w-full bg-[#2c3e50] text-white font-bold py-3 rounded hover:bg-[#34495e] transition flex justify-center items-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
                {isLoading ? (
                    <span>Menyimpan...</span>
                ) : (
                    <>
                        <FaSave /> Simpan Perubahan
                    </>
                )}
            </button>
        </form>

      </div>

      <div className="text-center mt-8 text-xs text-gray-400">
        <p>Versi Aplikasi v1.0.0 • MountainCMS</p>
      </div>

    </div>
  );
}