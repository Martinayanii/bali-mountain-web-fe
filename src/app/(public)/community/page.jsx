"use client";
import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore'; 
import { useAuthStore } from '@/store/useAuthStore'; 
import { FaUser, FaClock, FaMapMarkerAlt, FaCamera, FaCalendarPlus, FaEdit } from 'react-icons/fa';
import toast from 'react-hot-toast'; 

export default function CommunityPage() {
  const { trips, joinTrip, addTrip } = useAppStore(); 
  const { currentUser } = useAuthStore(); 
  
  const [activeTab, setActiveTab] = useState('feed');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- STATE FORM (Pastikan namanya formData) ---
  const [formData, setFormData] = useState({
    title: "", location: "", date: "", type: "Sharecost", slots: 4, description: ""
  });

  // Logika Pemisahan Data
  const currentUserName = currentUser?.name || "Tamu";
  const myTrips = trips.filter(trip => trip.leader === currentUserName);
  const joinedTrips = trips.filter(trip => trip.joined === true && trip.leader !== currentUserName);

  // Handler Join
  const handleJoin = (trip) => {
    if (!currentUser) {
        toast.error("Login dulu bos!");
        return;
    }
    if (trip.leader === currentUser.name) {
        toast("Ini trip buatanmu sendiri.", { icon: '😎' });
        return;
    }
    if (trip.joined) {
        toast("Sudah gabung.", { icon: 'info' });
        return;
    }
    if (trip.slots <= 0) {
        toast.error("Slot penuh!");
        return;
    }
    joinTrip(trip.id);
    toast.success("Berhasil bergabung!");
  };

  // Handler Create Trip
  const handleCreateTrip = (e) => {
    e.preventDefault();
    if (!currentUser) {
        toast.error("Login dulu untuk buat ajakan!");
        return;
    }
    
    if (!formData.title || !formData.location || !formData.date) {
        toast.error("Mohon lengkapi data utama!");
        return;
    }

    addTrip({
        ...formData,
        leader: currentUser.name, 
        leaderImg: currentUser.avatar || "https://i.pravatar.cc/150?img=12",
        joined: true 
    });

    toast.success("Ajakan berhasil diposting!");
    setIsModalOpen(false); 
    
    setFormData({
        title: "", location: "", date: "", 
        type: "Sharecost", slots: 4, description: ""
    });
    
    setActiveTab('mytrips');
  };

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">

            {/* SIDEBAR */}
            <aside className="hidden lg:block lg:col-span-1 space-y-6 sticky top-24">
                <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] text-center">
                    <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 overflow-hidden mb-4 border-4 border-gray-50">
                        <img src={currentUser?.avatar || "https://i.pravatar.cc/150?img=12"} className="w-full h-full object-cover" alt="Profile" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900">{currentUser?.name || "Tamu"}</h3>
                    <p className="text-xs text-gray-500">Pendaki Santai</p>
                    {currentUser && <button className="mt-4 text-xs font-bold text-primary border border-primary px-4 py-1.5 rounded-full hover:bg-primary hover:text-white transition w-full">Edit Profil</button>}
                </div>

                <div className="bg-white p-4 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] space-y-1">
                    <button onClick={() => setActiveTab('feed')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === 'feed' ? 'bg-green-50 text-primary font-bold border-l-4 border-primary' : 'text-gray-600 hover:bg-gray-50'}`}>
                        <span>🏔</span> Feed Komunitas
                    </button>
                    <button onClick={() => setActiveTab('mytrips')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === 'mytrips' ? 'bg-green-50 text-primary font-bold border-l-4 border-primary' : 'text-gray-600 hover:bg-gray-50'}`}>
                        <span>🎫</span> Ajakan Saya 
                        <span className="ml-auto bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full font-bold">{myTrips.length}</span>
                    </button>
                    <button onClick={() => setActiveTab('joined')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === 'joined' ? 'bg-green-50 text-primary font-bold border-l-4 border-primary' : 'text-gray-600 hover:bg-gray-50'}`}>
                        <span>🎒</span> Trip Diikuti 
                        <span className="ml-auto bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded-full font-bold">{joinedTrips.length}</span>
                    </button>
                </div>
            </aside>

            {/* KONTEN TENGAH */}
            <div className="lg:col-span-3 space-y-6">

                {/* FEED */}
                {activeTab === 'feed' && (
                    <div className="space-y-6 animate-fade-in">
                        {currentUser && (
                            <div className="bg-white p-5 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
                                <div className="flex gap-4">
                                    <img src={currentUser.avatar} className="w-12 h-12 rounded-full flex-shrink-0 border border-gray-100" alt="Me" />
                                    <div className="flex-grow">
                                        <input type="text" placeholder={`Mau nanjak kemana, ${currentUser.name}?`} className="w-full bg-gray-50 rounded-xl px-5 py-3 text-sm outline-none cursor-pointer hover:bg-gray-100 transition mb-3 border border-transparent" onClick={() => setIsModalOpen(true)} />
                                        <div className="flex justify-between items-center px-1">
                                            <div className="flex gap-4 text-gray-500">
                                                <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 text-xs hover:text-primary font-bold bg-gray-50 px-3 py-1.5 rounded-lg transition">📅 Buat Ajakan</button>
                                            </div>
                                            <button onClick={() => setIsModalOpen(true)} className="bg-primary text-white text-sm font-bold px-6 py-2 rounded-xl hover:bg-green-700 shadow-md shadow-green-100">Posting</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {trips.map((trip) => <TripCard key={trip.id} trip={trip} onJoin={handleJoin} currentUser={currentUser} />)}
                    </div>
                )}

                {/* JOINED */}
                {activeTab === 'joined' && (
                    <div className="space-y-6 animate-fade-in">
                        <h2 className="font-bold text-xl text-gray-800 mb-4">Trip yang Kamu Ikuti</h2>
                        {joinedTrips.length > 0 ? (
                            joinedTrips.map((trip) => <TripCard key={trip.id} trip={trip} onJoin={handleJoin} currentUser={currentUser} />)
                        ) : <div className="text-center py-10 text-gray-400">Belum ada trip yang diikuti.</div>}
                    </div>
                )}

                {/* MY TRIPS */}
                {activeTab === 'mytrips' && (
                    <div className="space-y-6 animate-fade-in">
                        <h2 className="font-bold text-xl text-gray-800 mb-4">Ajakan Saya</h2>
                        {myTrips.length > 0 ? (
                            myTrips.map((trip) => <TripCard key={trip.id} trip={trip} onJoin={handleJoin} currentUser={currentUser} />)
                        ) : (
                            <div className="bg-white p-10 rounded-2xl shadow-sm text-center border-2 border-dashed border-gray-200">
                                <p className="text-gray-400 mb-3">Belum ada ajakan yang kamu buat.</p>
                                <button onClick={() => setIsModalOpen(true)} className="text-primary font-bold text-sm hover:underline">Buat Sekarang</button>
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
      </main>

      {/* --- MODAL FORM --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
                <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl">×</button>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Buat Ajakan Pendakian ⛺</h3>
                
                <form onSubmit={handleCreateTrip} className="space-y-4">
                    {/* Disini saya menggunakan formData, BUKAN tripForm */}
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Judul Trip</label>
                        <input type="text" required className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary" 
                            value={formData.title} 
                            onChange={(e) => setFormData({...formData, title: e.target.value})} 
                            placeholder="Contoh: Tektok Ceria Gunung Gede" 
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Lokasi</label>
                            <input type="text" required className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary" 
                                value={formData.location} 
                                onChange={(e) => setFormData({...formData, location: e.target.value})} 
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Tanggal</label>
                            <input type="text" required className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary" 
                                value={formData.date} 
                                onChange={(e) => setFormData({...formData, date: e.target.value})} 
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Tipe</label>
                            <select className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm bg-white" 
                                value={formData.type} 
                                onChange={(e) => setFormData({...formData, type: e.target.value})}
                            >
                                <option value="Sharecost">Sharecost</option><option value="Open Trip">Open Trip</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Kuota</label>
                            <input type="number" min="1" className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary" 
                                value={formData.slots} 
                                onChange={(e) => setFormData({...formData, slots: parseInt(e.target.value)})} 
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Deskripsi</label>
                        <textarea className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary h-24" 
                            value={formData.description} 
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                        ></textarea>
                    </div>
                    <div className="pt-2">
                        <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-green-700 transition shadow-lg shadow-green-100">🚀 Posting Ajakan</button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </>
  );
}

// KOMPONEN KARTU
function TripCard({ trip, onJoin, currentUser }) {
    const isMyTrip = currentUser && trip.leader === currentUser.name;
    return (
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-50 hover:border-green-100 transition">
            <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3">
                    <img src={trip.leaderImg} className="w-11 h-11 rounded-full border border-gray-200" alt={trip.leader} />
                    <div>
                        <h4 className="font-bold text-gray-900">{trip.leader}</h4>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] bg-blue-50 text-blue-600 px-2 rounded font-medium">Leader</span>
                            <p className="text-[10px] text-gray-400">Baru Saja • {trip.location}</p>
                        </div>
                    </div>
                </div>
                <button className="text-gray-300 hover:text-gray-600 font-bold text-xl leading-none">...</button>
            </div>
            
            <h3 className="text-xl font-bold text-gray-800 mb-2">{trip.title}</h3>
            <p className="text-gray-600 mb-5 leading-relaxed text-sm">{trip.description}</p>
            
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-5">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                    <div><p className="text-xs text-gray-400 mb-1 font-medium">Tanggal</p><p className="font-bold text-gray-800">{trip.date}</p></div>
                    <div><p className="text-xs text-gray-400 mb-1 font-medium">Lokasi</p><p className="font-bold text-gray-800">{trip.location}</p></div>
                    <div><p className="text-xs text-gray-400 mb-1 font-medium">Tipe</p><span className="text-primary font-bold">{trip.type}</span></div>
                    <div>
                        <p className="text-xs text-gray-400 mb-1 font-medium">Slot Tersisa</p>
                        <span className={`px-2 py-0.5 rounded font-bold text-xs ${trip.slots > 0 ? 'bg-red-100 text-red-600' : 'bg-gray-200 text-gray-500'}`}>
                            {trip.slots > 0 ? `${trip.slots} Slot` : 'Penuh'}
                        </span>
                    </div>
                </div>
            </div>
            
            <div className="flex gap-3 border-t border-gray-100 pt-4">
                <button 
                    onClick={() => onJoin(trip)}
                    disabled={trip.joined || trip.slots === 0 || isMyTrip}
                    className={`flex-1 text-sm font-bold py-2.5 rounded-xl transition shadow-sm
                        ${isMyTrip 
                            ? 'bg-gray-100 text-gray-500 cursor-default' 
                            : trip.joined 
                                ? 'bg-green-100 text-green-700 cursor-default' 
                                : trip.slots === 0 
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                    : 'bg-primary text-white hover:bg-green-700 shadow-green-100'
                        }`}
                >
                    {isMyTrip ? '👑 Ini Ajakan Anda' : trip.joined ? '✓ Anda Telah Bergabung' : trip.slots === 0 ? 'Yah, Slot Penuh' : 'Gabung Trip Ini'}
                </button>
            </div>
        </div>
    );
}