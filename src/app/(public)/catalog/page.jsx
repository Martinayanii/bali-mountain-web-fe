"use client"; // Wajib karena ada interaksi filter & sort

import { useState } from "react";
import MountainCard from "@/components/features/MountainCard";
import { mountains } from "@/lib/data";

export default function CatalogPage() {
  // --- STATE (Penyimpanan Data Sementara) ---
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedProvinces, setSelectedProvinces] = useState([]);
  const [sortBy, setSortBy] = useState("Paling Populer");

  // --- LOGIC HANDLE CHECKBOX PROVINSI ---
  const handleProvinceChange = (province) => {
    if (selectedProvinces.includes(province)) {
      // Kalau sudah dicentang, hapus dari list (uncheck)
      setSelectedProvinces(selectedProvinces.filter((p) => p !== province));
    } else {
      // Kalau belum, masukkan ke list (check)
      setSelectedProvinces([...selectedProvinces, province]);
    }
  };

  // --- LOGIC FILTERING DATA ---
  let filteredMountains = mountains.filter((gunung) => {
    // 1. Filter Nama
    const matchName = gunung.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 2. Filter Kesulitan
    const matchDifficulty = selectedDifficulty === "All" || gunung.difficulty === selectedDifficulty;
    
    // 3. Filter Provinsi (Jika tidak ada yang dicentang, tampilkan semua)
    const matchProvince = selectedProvinces.length === 0 || selectedProvinces.includes(gunung.province);

    return matchName && matchDifficulty && matchProvince;
  });

  // --- LOGIC SORTING DATA ---
  // Urutkan data hasil filter di atas
  filteredMountains.sort((a, b) => {
    if (sortBy === "Rating Tertinggi") return b.rating - a.rating; // Besar ke Kecil
    if (sortBy === "Ketinggian (Rendah-Tinggi)") return parseInt(a.elevation) - parseInt(b.elevation);
    return 0; // Default (Paling Populer/ID)
  });

  return (
    <div className="bg-bg-soft min-h-screen">
      
      {/* --- HEADER HERO --- */}
      <header className="bg-primary relative overflow-hidden h-48 md:h-56 flex items-center">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white text-center md:text-left">
                <h1 className="text-3xl font-bold mb-1">Jelajahi Jalur</h1>
                <p className="text-green-100 text-sm">Temukan destinasi pendakian terbaik di Indonesia</p>
            </div>
            
            {/* Search Bar */}
            <div className="bg-white p-1.5 rounded-xl flex w-full md:w-96 shadow-lg">
                <input 
                    type="text" 
                    placeholder="Cari nama gunung..." 
                    className="flex-1 px-4 outline-none text-sm font-medium rounded-l-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="bg-secondary text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-orange-600 transition">
                    Cari
                </button>
            </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* --- SIDEBAR FILTER --- */}
        <aside className="w-full lg:w-1/4 space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm sticky top-24">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-900">Filter</h3>
                    <button 
                        onClick={() => {
                            setSearchTerm("");
                            setSelectedDifficulty("All");
                            setSelectedProvinces([]);
                        }}
                        className="text-xs text-secondary font-medium hover:underline">
                        Reset
                    </button>
                </div>

                {/* Filter Provinsi (Checkbox) */}
                <div className="mb-6">
                    <h4 className="text-sm font-bold text-gray-800 mb-3">Provinsi</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                        {['Jawa Barat', 'Jawa Tengah', 'Jawa Timur', 'Luar Jawa'].map((prov) => (
                            <label key={prov} className="flex items-center gap-2 cursor-pointer hover:text-primary transition">
                                <input 
                                    type="checkbox" 
                                    className="accent-primary w-4 h-4 rounded"
                                    checked={selectedProvinces.includes(prov)}
                                    onChange={() => handleProvinceChange(prov)}
                                /> 
                                {prov}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Filter Kesulitan (Button) */}
                <div className="mb-2">
                    <h4 className="text-sm font-bold text-gray-800 mb-3">Tingkat Kesulitan</h4>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { label: 'Pemula', val: 'Easy' },
                            { label: 'Menengah', val: 'Medium' },
                            { label: 'Expert', val: 'Hard' }
                        ].map((btn) => (
                            <button 
                                key={btn.val}
                                onClick={() => setSelectedDifficulty(btn.val)}
                                className={`text-xs border px-3 py-1 rounded-full transition font-medium ${
                                    selectedDifficulty === btn.val
                                    ? 'bg-green-50 text-primary border-primary'
                                    : 'border-gray-200 hover:border-primary hover:text-primary text-gray-500'
                                }`}>
                                {btn.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </aside>

        {/* --- KONTEN UTAMA --- */}
        <section className="w-full lg:w-3/4">
            
            {/* Top Bar (Jumlah & Sort) */}
            <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-gray-500">
                    Menampilkan <span className="font-bold text-gray-800">{filteredMountains.length}</span> gunung
                </p>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 hidden sm:block">Urutkan:</span>
                    <select 
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="text-sm font-medium bg-white border border-gray-200 rounded-lg px-3 py-1.5 outline-none focus:border-primary cursor-pointer"
                    >
                        <option>Paling Populer</option>
                        <option>Rating Tertinggi</option>
                        <option>Ketinggian (Rendah-Tinggi)</option>
                    </select>
                </div>
            </div>

            {/* Grid List Gunung */}
            {filteredMountains.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMountains.map((gunung) => (
                        <MountainCard key={gunung.id} {...gunung} />
                    ))}
                </div>
            ) : (
                // State Kosong
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                    <p className="text-gray-400 font-medium mb-2">Tidak ada gunung yang cocok.</p>
                    <button 
                        onClick={() => {setSelectedDifficulty("All"); setSelectedProvinces([]); setSearchTerm("");}}
                        className="text-primary text-sm font-bold hover:underline">
                        Reset Filter
                    </button>
                </div>
            )}

            {/* Pagination Dummy */}
            <div className="mt-12 flex justify-center">
                <nav className="flex gap-2">
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:border-primary hover:text-primary transition">←</button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold shadow-lg shadow-green-200">1</button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 font-medium hover:border-primary hover:text-primary transition">2</button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 font-medium hover:border-primary hover:text-primary transition">3</button>
                    <span className="w-10 h-10 flex items-center justify-center text-gray-400">...</span>
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:border-primary hover:text-primary transition">→</button>
                </nav>
            </div>

        </section>
      </main>
    </div>
  );
}