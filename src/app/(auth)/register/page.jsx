"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore"; // <--- IMPORT BARU
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuthStore(); // <--- PAKAI AUTH STORE
  
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleRegister = (e) => {
    e.preventDefault();
    const result = register(formData);

    if (result.success) {
      toast.success("Akun berhasil dibuat! Otomatis login.");
      router.push('/');
    } else {
      toast.error(result.message);
    }
  };

  // ... (SISA TAMPILAN SAMA SEPERTI SEBELUMNYA) ...
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#2c3e50] mb-2">Buat Akun Baru 🚀</h1>
          <p className="text-gray-500 text-sm">Bergabung dengan komunitas pendaki Indonesia</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div><label className="block text-xs font-bold text-gray-600 mb-1">Nama Lengkap</label><input type="text" required className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#27ae60] focus:ring-2 focus:ring-green-100 outline-none text-sm transition" placeholder="Contoh: Budi Santoso" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} /></div>
          <div><label className="block text-xs font-bold text-gray-600 mb-1">Email Address</label><input type="email" required className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#27ae60] focus:ring-2 focus:ring-green-100 outline-none text-sm transition" placeholder="nama@email.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} /></div>
          <div><label className="block text-xs font-bold text-gray-600 mb-1">Password</label><input type="password" required className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#27ae60] focus:ring-2 focus:ring-green-100 outline-none text-sm transition" placeholder="••••••••" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} /></div>
          <button type="submit" className="w-full bg-[#27ae60] text-white font-bold py-3 rounded-xl hover:bg-green-700 transition shadow-lg shadow-green-100">Daftar Sekarang</button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Sudah punya akun? <Link href="/login" className="text-[#27ae60] font-bold hover:underline">Login disini</Link>
        </div>
      </div>
    </div>
  );
}