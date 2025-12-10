"use client"; // Wajib karena ada interaksi tombol (Pindah Tab)

import { useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  // State untuk melacak tab mana yang sedang aktif
  const [activeTab, setActiveTab] = useState("profile"); // Default: 'profile'

  return (
    <div className="bg-bg-soft min-h-screen py-10">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="flex flex-col md:flex-row gap-8">
                
                {/* --- SIDEBAR MENU --- */}
                <aside className="w-full md:w-64 flex-shrink-0">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">Pengaturan</h1>
                    <nav className="space-y-1">
                        {/* Tombol Edit Profil */}
                        <button 
                            onClick={() => setActiveTab('profile')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                                activeTab === 'profile' 
                                ? 'bg-white text-primary font-bold shadow-sm border border-gray-50' 
                                : 'text-gray-500 hover:bg-white hover:text-gray-900'
                            }`}
                        >
                            <span>👤</span> Edit Profil
                        </button>

                        {/* Tombol Kata Sandi */}
                        <button 
                            onClick={() => setActiveTab('password')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                                activeTab === 'password' 
                                ? 'bg-white text-primary font-bold shadow-sm border border-gray-50' 
                                : 'text-gray-500 hover:bg-white hover:text-gray-900'
                            }`}
                        >
                            <span>🔒</span> Kata Sandi
                        </button>
                        
                        <div className="border-t border-gray-200 my-2"></div>
                        
                        {/* Tombol Keluar (Dummy) */}
                        <Link href="/" className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition font-medium">
                            <span>🚪</span> Keluar
                        </Link>
                    </nav>
                </aside>

                {/* --- KONTEN UTAMA --- */}
                <div className="flex-grow">
                    
                    {/* === TAB 1: EDIT PROFIL === */}
                    {activeTab === 'profile' && (
                        <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-50 p-6 md:p-8 animate-fade-in">
                            <h2 className="text-xl font-bold text-gray-900 mb-1">Informasi Dasar</h2>
                            <p className="text-sm text-gray-500 mb-8">Perbarui foto dan detail data dirimu di sini.</p>

                            <form>
                                {/* Foto Profil */}
                                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-100">
                                    <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow">
                                        <img src="https://i.pravatar.cc/150?img=12" className="w-full h-full object-cover" alt="Profile" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-900 mb-1">Foto Profil</h3>
                                        <div className="flex gap-3">
                                            <button type="button" className="text-xs bg-white border border-gray-300 text-gray-700 font-bold px-3 py-1.5 rounded-lg hover:bg-gray-50 transition">
                                                Upload Baru
                                            </button>
                                            <button type="button" className="text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1.5">
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Form Input Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1.5">Nama Depan</label>
                                        <input type="text" defaultValue="Dimas" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-green-100 transition" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1.5">Nama Belakang</label>
                                        <input type="text" defaultValue="Anggara" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-green-100 transition" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1.5">Username</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">@</span>
                                            <input type="text" defaultValue="dimas_pendaki" className="w-full bg-white border border-gray-200 rounded-xl pl-8 pr-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-green-100 transition" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1.5">Email</label>
                                        <input type="email" defaultValue="dimas@example.com" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-500 outline-none" readOnly />
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-xs font-bold text-gray-500 mb-1.5">Bio Singkat</label>
                                    <textarea className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-green-100 transition" rows="4" defaultValue="Hobby nanjak santai, cari temen ngopi di ketinggian. Target tahun ini: 7 Summits Indonesia (2/7)."></textarea>
                                    <p className="text-[10px] text-gray-400 mt-1 text-right">0 / 160 karakter</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1.5">Domisili / Kota</label>
                                        <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-green-100 transition">
                                            <option>Jakarta Selatan</option>
                                            <option>Bandung</option>
                                            <option>Surabaya</option>
                                            <option>Yogyakarta</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1.5">Nomor WhatsApp</label>
                                        <input type="text" defaultValue="+62 812-3456-7890" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-green-100 transition" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-4 border-t border-gray-100 pt-6">
                                    <button type="button" className="text-sm font-bold text-gray-500 hover:text-gray-800 transition">Batal</button>
                                    <button type="button" className="bg-primary text-white text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-green-700 shadow-lg shadow-green-100 transition transform hover:-translate-y-0.5">
                                        Simpan Perubahan
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* === TAB 2: KATA SANDI === */}
                    {activeTab === 'password' && (
                        <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-50 p-6 md:p-8 animate-fade-in">
                            <h2 className="text-xl font-bold text-gray-900 mb-1">Ganti Kata Sandi</h2>
                            <p className="text-sm text-gray-500 mb-8">Amankan akunmu dengan kata sandi yang kuat.</p>

                            <form>
                                <div className="max-w-md space-y-6">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1.5">Kata Sandi Saat Ini</label>
                                        <input type="password" placeholder="••••••••" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-green-100 transition" />
                                    </div>
                                    
                                    <div className="border-t border-gray-100 my-4"></div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1.5">Kata Sandi Baru</label>
                                        <input type="password" placeholder="Minimal 8 karakter" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-green-100 transition" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1.5">Konfirmasi Kata Sandi Baru</label>
                                        <input type="password" placeholder="Ulangi kata sandi baru" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-green-100 transition" />
                                    </div>
                                </div>

                                <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <h4 className="text-xs font-bold text-gray-700 mb-2">Syarat Kata Sandi:</h4>
                                    <ul className="text-xs text-gray-500 space-y-1">
                                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span> Minimal 8 karakter</li>
                                        <li className="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-gray-300"></span> Mengandung huruf besar & kecil</li>
                                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span> Mengandung minimal 1 angka</li>
                                    </ul>
                                </div>

                                <div className="flex items-center justify-end gap-4 border-t border-gray-100 pt-6 mt-8">
                                    <button type="button" className="text-sm font-bold text-gray-500 hover:text-gray-800 transition">Batal</button>
                                    <button type="button" className="bg-primary text-white text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-green-700 shadow-lg shadow-green-100 transition transform hover:-translate-y-0.5">
                                        Update Kata Sandi
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                </div>
            </div>
        </main>
    </div>
  );
}