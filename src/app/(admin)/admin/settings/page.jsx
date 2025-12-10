"use client";
import { useState } from "react";

export default function AdminSettingsPage() {
  // --- STATE ---
  const [formData, setFormData] = useState({
    email: "admin@mountainexplorer.com", // Default value sesuai admin.html
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // Handle Perubahan Input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Simpan
  const handleSave = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulasi API Call
    setTimeout(() => {
      // Validasi sederhana
      if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
        alert("Konfirmasi password baru tidak cocok!");
        setIsLoading(false);
        return;
      }

      alert("Pengaturan akun berhasil diperbarui!");
      setIsLoading(false);
      
      // Reset password fields
      setFormData(prev => ({ ...prev, oldPassword: "", newPassword: "", confirmPassword: "" }));
    }, 1500);
  };

  return (
    <div className="animate-fade-in p-6">
      
      {/* Container Utama - Dibuat max-width kecil agar fokus (Sesuai style form-wrapper admin.html) */}
      <div className="max-w-xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-[#2c3e50]">Pengaturan</h2>
            <p className="text-gray-500 text-sm">Kelola keamanan dan preferensi akun administrator.</p>
        </div>

        {/* CARD: KEAMANAN AKUN */}
        <div className="bg-white rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.05)] p-8">
          <div className="border-b border-gray-100 pb-4 mb-6 flex items-center gap-3">
            <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center">
                <i className="fas fa-shield-alt text-lg"></i>
            </div>
            <div>
                <h3 className="font-bold text-lg text-[#2c3e50]">Keamanan Akun</h3>
                <p className="text-xs text-gray-400">Update email dan password login.</p>
            </div>
          </div>

          <form onSubmit={handleSave}>
            {/* Email Admin */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Administrator</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400"><i className="fas fa-envelope"></i></span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2.5 pl-10 text-sm focus:outline-none focus:border-[#27ae60] text-gray-700"
                  required
                />
              </div>
            </div>

            <hr className="border-gray-100 my-6" />

            {/* Password Lama */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Password Lama</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400"><i className="fas fa-lock"></i></span>
                <input
                  type="password"
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2.5 pl-10 text-sm focus:outline-none focus:border-[#27ae60]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Password Baru */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Password Baru</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400"><i className="fas fa-key"></i></span>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2.5 pl-10 text-sm focus:outline-none focus:border-[#27ae60]"
                  placeholder="Kosongkan jika tidak ingin mengubah"
                />
              </div>
            </div>

            {/* Konfirmasi Password Baru (Tambahan UX) */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">Konfirmasi Password Baru</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400"><i className="fas fa-check-circle"></i></span>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2.5 pl-10 text-sm focus:outline-none focus:border-[#27ae60]"
                  placeholder="Ulangi password baru"
                  disabled={!formData.newPassword} 
                />
              </div>
            </div>

            {/* Tombol Simpan */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-[#2c3e50] text-white font-medium py-3 rounded hover:bg-[#34495e] transition flex justify-center items-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Menyimpan...
                </>
              ) : (
                "Simpan Perubahan"
              )}
            </button>
          </form>
        </div>

        {/* Info Tambahan (Footer) */}
        <div className="mt-6 text-center">
            <p className="text-xs text-gray-400">
                Terakhir login: 10 Des 2025, 08:30 WIB <br/>
                IP Address: 192.168.1.1
            </p>
        </div>

      </div>
    </div>
  );
}