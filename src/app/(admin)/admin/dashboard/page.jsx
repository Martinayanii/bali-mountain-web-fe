export default function DashboardPage() {
  return (
    <div className="animate-fade-in">
        
        {/* --- CARDS SECTION --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-lg shadow-[0_2px_5px_rgba(0,0,0,0.05)] flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-[#2c3e50] mb-1">54</h1>
                    <span className="text-gray-500 text-sm">Total Gunung</span>
                </div>
                <div className="text-4xl opacity-20 text-[#27ae60]">🏔️</div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-lg shadow-[0_2px_5px_rgba(0,0,0,0.05)] flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-[#2c3e50] mb-1">12</h1>
                    <span className="text-gray-500 text-sm">Artikel Publish</span>
                </div>
                <div className="text-4xl opacity-20 text-[#27ae60]">✍️</div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-lg shadow-[0_2px_5px_rgba(0,0,0,0.05)] flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-[#2c3e50] mb-1">85</h1>
                    <span className="text-gray-500 text-sm">Postingan Komunitas</span>
                </div>
                <div className="text-4xl opacity-20 text-[#27ae60]">💬</div>
            </div>
        </div>

        {/* --- RECENT ACTIVITY TABLE (Contoh Data) --- */}
        <div className="bg-white rounded-lg shadow-[0_2px_5px_rgba(0,0,0,0.05)] p-6">
            <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
                <h3 className="font-semibold text-lg text-[#2c3e50]">Aktivitas Terbaru</h3>
                <button className="bg-[#3498db] text-white px-3 py-1.5 rounded text-xs hover:bg-blue-600 transition">
                    Lihat Semua
                </button>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#f8f9fa] text-[#2c3e50]">
                            <th className="p-3 text-sm font-semibold border-b border-gray-100">User</th>
                            <th className="p-3 text-sm font-semibold border-b border-gray-100">Aktivitas</th>
                            <th className="p-3 text-sm font-semibold border-b border-gray-100">Waktu</th>
                            <th className="p-3 text-sm font-semibold border-b border-gray-100">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-600">
                        <tr>
                            <td className="p-3 border-b border-gray-100 font-medium">Budi Santoso</td>
                            <td className="p-3 border-b border-gray-100">Membuat Trip ke Semeru</td>
                            <td className="p-3 border-b border-gray-100">2 menit lalu</td>
                            <td className="p-3 border-b border-gray-100">
                                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">Active</span>
                            </td>
                        </tr>
                        <tr>
                            <td className="p-3 border-b border-gray-100 font-medium">Siti Aminah</td>
                            <td className="p-3 border-b border-gray-100">Komentar di Artikel Sepatu</td>
                            <td className="p-3 border-b border-gray-100">15 menit lalu</td>
                            <td className="p-3 border-b border-gray-100">
                                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-bold">Published</span>
                            </td>
                        </tr>
                        <tr>
                            <td className="p-3 border-b border-gray-100 font-medium">Anonim User</td>
                            <td className="p-3 border-b border-gray-100 text-red-500">Laporan SPAM Komunitas</td>
                            <td className="p-3 border-b border-gray-100">1 jam lalu</td>
                            <td className="p-3 border-b border-gray-100">
                                <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-bold">Review</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>
  );
}