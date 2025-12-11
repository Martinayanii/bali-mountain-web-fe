"use client";
import { useAppStore } from '@/store/useAppStore';
import { FaMountain, FaPenFancy, FaComments } from 'react-icons/fa';

export default function AdminDashboard() {
  // Ambil data real-time dari Store
  const { mountains, newsList, trips } = useAppStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5 animate-fade-in">
        
        {/* Card 1: Total Gunung */}
        <div className="bg-white p-[25px] rounded-lg shadow-[0_2px_5px_rgba(0,0,0,0.05)] flex justify-between items-center">
            <div>
                <h1 className="text-[28px] font-bold text-[#2c3e50] mb-[5px] m-0">{mountains.length}</h1>
                <span className="text-[#777] text-sm">Total Gunung</span>
            </div>
            <FaMountain className="text-[2.5rem] text-[#27ae60] opacity-20" />
        </div>

        {/* Card 2: Artikel Publish */}
        <div className="bg-white p-[25px] rounded-lg shadow-[0_2px_5px_rgba(0,0,0,0.05)] flex justify-between items-center">
            <div>
                <h1 className="text-[28px] font-bold text-[#2c3e50] mb-[5px] m-0">{newsList.length}</h1>
                <span className="text-[#777] text-sm">Artikel Publish</span>
            </div>
            <FaPenFancy className="text-[2.5rem] text-[#27ae60] opacity-20" />
        </div>

        {/* Card 3: Postingan Komunitas */}
        <div className="bg-white p-[25px] rounded-lg shadow-[0_2px_5px_rgba(0,0,0,0.05)] flex justify-between items-center">
            <div>
                <h1 className="text-[28px] font-bold text-[#2c3e50] mb-[5px] m-0">{trips.length}</h1>
                <span className="text-[#777] text-sm">Postingan Komunitas</span>
            </div>
            <FaComments className="text-[2.5rem] text-[#27ae60] opacity-20" />
        </div>

    </div>
  );
}