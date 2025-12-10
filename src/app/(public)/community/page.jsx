"use client";
import { useState } from "react";
import { communityPosts } from "@/lib/data";

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("feed"); // State untuk pindah tab

  return (
    <div className="bg-bg-soft min-h-screen">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">

                {/* --- SIDEBAR KIRI (Profil) --- */}
                <aside className="hidden lg:block lg:col-span-1 space-y-6 sticky top-24">
                    <div className="bg-white p-6 rounded-2xl card-shadow text-center">
                        <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 overflow-hidden mb-4 border-4 border-gray-50">
                            <img src="https://i.pravatar.cc/150?img=12" className="w-full h-full object-cover" />
                        </div>
                        <h3 className="font-bold text-lg text-gray-900">Dimas Anggara</h3>
                        <p className="text-xs text-gray-500">Pendaki Santai</p>
                    </div>

                    <div className="bg-white p-4 rounded-2xl card-shadow space-y-1">
                        <button 
                            onClick={() => setActiveTab('feed')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === 'feed' ? 'bg-green-50 text-primary font-bold border-l-4 border-primary' : 'text-gray-500 hover:bg-gray-50'}`}>
                            <span>🏔</span> Feed Komunitas
                        </button>
                        <button 
                            onClick={() => setActiveTab('mytrips')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === 'mytrips' ? 'bg-green-50 text-primary font-bold border-l-4 border-primary' : 'text-gray-500 hover:bg-gray-50'}`}>
                            <span>🎫</span> Ajakan Saya
                        </button>
                    </div>
                </aside>

                {/* --- KONTEN TENGAH --- */}
                <div className="lg:col-span-3 space-y-6">
                    
                    {/* TAB: FEED KOMUNITAS */}
                    {activeTab === 'feed' && (
                        <div className="space-y-6">
                            {/* Input Box */}
                            <div className="bg-white p-5 rounded-2xl card-shadow">
                                <div className="flex gap-4">
                                    <img src="https://i.pravatar.cc/150?img=12" className="w-12 h-12 rounded-full flex-shrink-0 border border-gray-100" />
                                    <div className="flex-grow">
                                        <input type="text" placeholder="Cari teman nanjak atau bagikan foto..." className="w-full bg-gray-50 rounded-xl px-5 py-3 text-sm outline-none mb-3" />
                                        <div className="flex justify-end">
                                            <button className="bg-primary text-white text-sm font-bold px-6 py-2 rounded-xl hover:bg-green-700">Posting</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Feed Items (Mapping Data) */}
                            {communityPosts.map((post) => (
                                <div key={post.id} className="bg-white p-6 rounded-2xl card-shadow border border-gray-50">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex gap-3">
                                            <img src={post.avatar} className="w-11 h-11 rounded-full border border-gray-200" />
                                            <div>
                                                <h4 className="font-bold text-gray-900">{post.user}</h4>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] bg-blue-50 text-blue-600 px-2 rounded font-medium">{post.role}</span>
                                                    <p className="text-[10px] text-gray-400">{post.time}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <p className="text-gray-600 mb-5 leading-relaxed">{post.content}</p>

                                    {/* Jika Tipe-nya Trip, Tampilkan Detail Kotak */}
                                    {post.type === 'Trip' && (
                                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-5">
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                                                <div><p className="text-xs text-gray-400 mb-1">Tanggal</p><p className="font-bold">{post.tripDetails.date}</p></div>
                                                <div><p className="text-xs text-gray-400 mb-1">Lokasi</p><p className="font-bold">{post.tripDetails.location}</p></div>
                                                <div><p className="text-xs text-gray-400 mb-1">Info</p><span className="bg-red-100 text-red-600 px-2 py-0.5 rounded font-bold text-xs">{post.tripDetails.slot}</span></div>
                                            </div>
                                            <button className="mt-4 w-full bg-primary text-white text-sm font-bold py-2 rounded-lg hover:bg-green-700">Gabung Trip</button>
                                        </div>
                                    )}

                                    {/* Jika Tipe-nya Foto */}
                                    {post.type === 'Status' && post.image && (
                                        <img src={post.image} className="w-full rounded-xl mb-4" />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* TAB: AJAKAN SAYA */}
                    {activeTab === 'mytrips' && (
                        <div className="space-y-6 text-center py-10 bg-white rounded-2xl card-shadow">
                            <h2 className="text-xl font-bold text-gray-900">Belum Ada Ajakan</h2>
                            <p className="text-gray-500 text-sm">Kamu belum membuat trip apapun.</p>
                            <button className="mt-4 bg-primary text-white px-6 py-2 rounded-lg text-sm font-bold">
                                + Buat Ajakan Baru
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </main>
    </div>
  );
}