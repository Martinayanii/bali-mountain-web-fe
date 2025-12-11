"use client"; 
import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore'; 
import { useState, useMemo } from 'react'; 

export default function CatalogPage() {
  const { mountains } = useAppStore();

  // --- 1. STATE FILTER ---
  const [search, setSearch] = useState(""); 
  const [selectedLocations, setSelectedLocations] = useState([]); 
  const [selectedDifficulty, setSelectedDifficulty] = useState([]); // State baru untuk Kesulitan
  const [sortBy, setSortBy] = useState("popular"); 

  // --- 2. LOGIKA FILTERING ---
  const filteredMountains = useMemo(() => {
    return mountains
      .filter((gunung) => {
        // A. Filter Search
        const matchSearch = gunung.name.toLowerCase().includes(search.toLowerCase());
        
        // B. Filter Lokasi (Provinsi)
        const matchLocation = selectedLocations.length === 0 || selectedLocations.some(loc => gunung.location.includes(loc));

        // C. Filter Kesulitan (LOGIKA BARU)
        // Mapping: Tombol UI -> Data di Database
        // Pemula = Beginner & Easy
        // Menengah = Medium
        // Expert = Hard
        const matchDifficulty = selectedDifficulty.length === 0 || selectedDifficulty.some(level => {
            if (level === "Pemula") return ["Beginner", "Easy"].includes(gunung.difficulty);
            if (level === "Menengah") return gunung.difficulty === "Medium";
            if (level === "Expert") return gunung.difficulty === "Hard";
            return false;
        });

        return matchSearch && matchLocation && matchDifficulty;
      })
      .sort((a, b) => {
        if (sortBy === "popular") return b.rating - a.rating; 
        if (sortBy === "highest") return parseFloat(b.height.replace('.','')) - parseFloat(a.height.replace('.','')); 
        return 0;
      });
  }, [mountains, search, selectedLocations, selectedDifficulty, sortBy]);

  // Handler Checkbox Lokasi
  const handleLocationChange = (loc) => {
    setSelectedLocations(prev => 
      prev.includes(loc) ? prev.filter(p => p !== loc) : [...prev, loc]
    );
  };

  // Handler Tombol Kesulitan
  const handleDifficultyToggle = (level) => {
    setSelectedDifficulty(prev => 
      prev.includes(level) ? prev.filter(p => p !== level) : [...prev, level]
    );
  };

  return (
    <>
      <header className="bg-primary relative overflow-hidden h-48 md:h-56 flex items-center">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white text-center md:text-left">
                <h1 className="text-3xl font-bold mb-1">Jelajahi Jalur</h1>
                <p className="text-green-100 text-sm">Temukan 150+ destinasi pendakian di Indonesia</p>
            </div>
            <div className="bg-white p-1.5 rounded-xl flex w-full md:w-96 shadow-lg">
                <input 
                    type="text" 
                    placeholder="Cari nama gunung..." 
                    className="flex-1 px-4 outline-none text-sm font-medium rounded-l-lg"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button className="bg-secondary text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-orange-600 transition">Cari</button>
            </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* SIDEBAR FILTER */}
        <aside className="w-full lg:w-1/4 space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm sticky top-24">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-900">Filter</h3>
                    <button 
                        onClick={() => {setSearch(""); setSelectedLocations([]); setSelectedDifficulty([]);}} 
                        className="text-xs text-secondary font-medium hover:underline"
                    >
                        Reset
                    </button>
                </div>

                {/* Filter Provinsi */}
                <div className="mb-6">
                    <h4 className="text-sm font-bold text-gray-800 mb-3">Provinsi</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                        {['Jawa Barat', 'Jawa Tengah', 'Jawa Timur'].map((loc) => (
                            <label key={loc} className="flex items-center gap-2 cursor-pointer hover:text-primary transition select-none">
                                <input 
                                    type="checkbox" 
                                    className="accent-primary w-4 h-4 rounded" 
                                    checked={selectedLocations.includes(loc)}
                                    onChange={() => handleLocationChange(loc)}
                                /> 
                                {loc}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Filter Tingkat Kesulitan (AKTIF) */}
                <div className="mb-2">
                    <h4 className="text-sm font-bold text-gray-800 mb-3">Tingkat Kesulitan</h4>
                    <div className="flex flex-wrap gap-2">
                        {['Pemula', 'Menengah', 'Expert'].map((level) => {
                            const isActive = selectedDifficulty.includes(level);
                            return (
                                <button 
                                    key={level}
                                    onClick={() => handleDifficultyToggle(level)}
                                    className={`text-xs border px-3 py-1 rounded-full transition font-medium 
                                        ${isActive 
                                            ? 'bg-primary text-white border-primary' 
                                            : 'border-gray-200 text-gray-600 hover:border-primary hover:text-primary'}`}
                                >
                                    {level}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </aside>

        {/* LIST GUNUNG */}
        <section className="w-full lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-gray-500">Menampilkan <span className="font-bold text-gray-800">{filteredMountains.length}</span> gunung</p>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 hidden sm:block">Urutkan:</span>
                    <select 
                        className="text-sm font-medium bg-white border border-gray-200 rounded-lg px-3 py-1.5 outline-none focus:border-primary"
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="popular">Paling Populer (Rating)</option>
                        <option value="highest">Tertinggi (mdpl)</option>
                    </select>
                </div>
            </div>

            {filteredMountains.length === 0 && (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                    <p className="text-gray-400 font-bold">Gunung tidak ditemukan.</p>
                    <button onClick={() => {setSearch(""); setSelectedLocations([]); setSelectedDifficulty([])}} className="text-primary text-sm hover:underline mt-2">Reset Pencarian</button>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMountains.map((gunung) => (
                    <div key={gunung.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition duration-300 group flex flex-col h-full animate-fade-in">
                        <div className="relative h-48 overflow-hidden">
                            <img src={gunung.image} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" alt={gunung.name} />
                            
                            <div className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide border 
                                ${gunung.difficulty === 'Hard' ? 'bg-red-100 text-red-600 border-red-200' : 
                                  gunung.difficulty === 'Medium' ? 'bg-orange-100 text-orange-600 border-orange-200' : 
                                  'bg-green-100 text-green-600 border-green-200'}`}>
                                {gunung.difficulty}
                            </div>
                        </div>
                        
                        <div className="p-4 flex flex-col flex-grow">
                            <div className="flex items-start justify-between mb-1">
                                <div>
                                    <h3 className="font-bold text-gray-800 text-lg">{gunung.name}</h3>
                                    <p className="text-xs text-gray-400">{gunung.location}</p>
                                </div>
                                <div className="flex items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded text-yellow-600 text-xs font-bold border border-yellow-100">
                                    <span>★</span> {gunung.rating}
                                </div>
                            </div>
                            
                            <div className="mt-4 space-y-2 mb-6 text-xs text-gray-500">
                                <div className="flex items-center gap-2">
                                    <span className="w-4 text-center">⛰</span> {gunung.height} mdpl
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-4 text-center">⏱</span> {gunung.estTime}
                                </div>
                            </div>

                            <div className="mt-auto pt-4 border-t border-gray-100">
                                <Link href={`/catalog/${gunung.slug}`} className="block w-full text-center bg-primary text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-green-700 transition shadow-lg shadow-green-100">
                                    Lihat Detail Jalur
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
      </main>
    </>
  );
}