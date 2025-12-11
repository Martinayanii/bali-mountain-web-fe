import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useAppStore = create(
  persist(
    (set) => ({
      
      // =========================================
      // 1. DATA GUNUNG (Untuk Katalog & Detail)
      // =========================================
      mountains: [
        {
          id: 1,
          slug: "semeru",
          name: "Gunung Semeru",
          location: "Malang, Jawa Timur",
          height: "3.676",
          difficulty: "Hard",
          rating: 4.8,
          estTime: "3 Hari 2 Malam",
          temp: "5°C - 15°C",
          status: "Open",
          image: "https://resort.co.id/wp-content/uploads/2025/08/gunung-semeru.jpg",
          description: `Gunung Semeru atau Mahameru adalah gunung tertinggi di Pulau Jawa, dengan puncaknya Mahameru, 3.676 meter dari permukaan laut (mdpl). Gunung ini merupakan salah satu gunung berapi paling aktif di Indonesia.`
        },
        {
          id: 2,
          slug: "prau",
          name: "Gunung Prau",
          location: "Wonosobo, Jawa Tengah",
          height: "2.565",
          difficulty: "Easy",
          rating: 4.7,
          estTime: "3-4 Jam",
          temp: "10°C - 20°C",
          status: "Open",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/GUNUNG_PRAU.jpg/1200px-GUNUNG_PRAU.jpg",
          description: "Gunung Prau terkenal dengan Golden Sunrise terbaik se-Asia Tenggara. Jalurnya ramah untuk pemula dengan waktu tempuh singkat."
        },
        {
          id: 3,
          slug: "merbabu",
          name: "Gunung Merbabu",
          location: "Boyolali, Jawa Tengah",
          height: "3.145",
          difficulty: "Medium",
          rating: 4.9,
          estTime: "2 Hari 1 Malam",
          temp: "8°C - 18°C",
          status: "Open",
          image: "https://s3-us-west-1.amazonaws.com/peakery-media/images/items/main/cache/gunung-merbabu-2.jpg.1920x1440_q95_crop.jpg",
          description: "Gunung Merbabu memiliki sabana yang sangat indah dan luas. Pemandangan Gunung Merapi terlihat gagah dari sini."
        },
        {
          id: 4,
          slug: "andong",
          name: "Gunung Andong",
          location: "Magelang, Jawa Tengah",
          height: "1.726",
          difficulty: "Easy",
          rating: 4.5,
          estTime: "2 Jam",
          temp: "18°C - 25°C",
          status: "Open",
          image: "https://thumb.viva.id/vivasemarang/1265x711/2025/06/14/684cbdb181494-gunung-andong-meski-gunung-bocil-tapi-bikin-gemas-pendaki_semarang.jpg",
          description: "Gunung kecil yang cocok untuk latihan fisik tipis-tipis atau camping ceria bersama keluarga."
        },
        {
          id: 5,
          slug: "gede",
          name: "Gunung Gede",
          location: "Cianjur, Jawa Barat",
          height: "2.958",
          difficulty: "Medium",
          rating: 4.6,
          estTime: "2 Hari 1 Malam",
          temp: "10°C - 20°C",
          status: "Closed", 
          image: "https://is3.cloudhost.id/jakarta/images/image-article/2025-04/-67fba4c7301b7.jpeg",
          description: "Gunung favorit pendaki Jakarta. Memiliki Alun-alun Surya Kencana yang ditumbuhi Bunga Edelweis."
        },
        {
          id: 6,
          slug: "papandayan",
          name: "Gunung Papandayan",
          location: "Garut, Jawa Barat",
          height: "2.665",
          difficulty: "Beginner",
          rating: 4.4,
          estTime: "4-5 Jam",
          temp: "15°C - 22°C",
          status: "Open",
          image: "https://www.eigeradventure.com/blog/wp-content/uploads/2024/02/gunung-papandayan-1.jpg",
          description: "Terkenal dengan Hutan Mati yang eksotis dan kawah belerang yang aktif."
        }
      ],

      // =========================================
      // 2. DATA BERITA (Untuk Halaman News)
      // =========================================
      newsList: [
        {
          id: 1,
          slug: "semeru-buka",
          title: "Resmi: Jalur Pendakian Gunung Semeru Dibuka Kembali Mulai Bulan Depan",
          category: "Hot News",
          date: "10 Des 2024",
          image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070",
          content: "Setelah ditutup selama hampir satu tahun untuk pemulihan ekosistem pasca erupsi..."
        },
        {
          id: 2,
          slug: "tips-sepatu",
          title: "Cara Memilih Sepatu Hiking Agar Kaki Tidak Lecet",
          category: "Tips & Trik",
          date: "2 Jam lalu",
          image: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=800",
          content: "Memilih sepatu gunung tidak boleh sembarangan..."
        },
        {
          id: 3,
          slug: "review-tenda",
          title: "Review Tenda Eiger vs Arei: Mana yang Lebih Worth It?",
          category: "Gear Review",
          date: "1 Hari lalu",
          image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=800",
          content: "Bingung memilih tenda lokal dengan budget terbatas?..."
        },
        {
          id: 4,
          slug: "cuaca-gede",
          title: "Update Cuaca Gunung Gede: Waspada Angin Kencang",
          category: "Info Jalur",
          date: "3 Hari lalu",
          image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=800",
          content: "BMKG mengeluarkan peringatan dini..."
        }
      ],

      // =========================================
      // 3. DATA KOMUNITAS (Untuk Halaman Feed)
      // =========================================
      trips: [
        {
          id: 1,
          title: "Tektok Gunung Gede via Putri",
          leader: "Raka",
          leaderImg: "https://i.pravatar.cc/150?img=11",
          date: "12-13 Des",
          location: "Cibodas",
          type: "Sharecost",
          slots: 2,
          description: "Mencari teman yang santai tapi pace stabil. Kita berangkat jumat malam dari Jakarta naik travel bareng.",
          joined: false
        },
        {
          id: 2,
          title: "Camp Ceria Prau (Pemula Welcome)",
          leader: "Sarah",
          leaderImg: "https://i.pravatar.cc/150?img=5",
          date: "Akhir Tahun",
          location: "Patak Banteng",
          type: "Open",
          slots: 5,
          description: "Aku baru pertama kali mau ke Prau, cari barengan biar rame.",
          joined: false
        }
      ],

      // =========================================
      // 4. ACTIONS (Fungsi untuk Mengubah Data)
      // =========================================
      
      // --- Create (Tambah) ---
      addMountain: (newMountain) => set((state) => ({ 
        mountains: [...state.mountains, { ...newMountain, id: Date.now() }] 
      })),

      addNews: (newNews) => set((state) => ({ 
        newsList: [ { ...newNews, id: Date.now(), date: 'Baru Saja' }, ...state.newsList] 
      })),

      addTrip: (newTrip) => set((state) => ({
        trips: [ { ...newTrip, id: Date.now() }, ...state.trips ]
      })),

      // --- Update (Edit) ---
      updateNews: (id, updatedData) => set((state) => ({
        newsList: state.newsList.map((item) => 
          item.id === id ? { ...item, ...updatedData } : item
        )
      })),

      updateMountain: (id, updatedData) => set((state) => ({
        mountains: state.mountains.map((item) => 
          item.id === id ? { ...item, ...updatedData } : item
        )
      })),

      // --- Delete (Hapus) ---
      deleteTrip: (id) => set((state) => ({
        trips: state.trips.filter((trip) => trip.id !== id)
      })),

      deleteMountain: (id) => set((state) => ({
        mountains: state.mountains.filter((item) => item.id !== id)
      })),

      deleteNews: (id) => set((state) => ({
        newsList: state.newsList.filter((item) => item.id !== id)
      })),

      // --- Join Trip (Gabung) ---
      joinTrip: (id) => set((state) => ({
        trips: state.trips.map((trip) => {
          if (trip.id === id) {
            if (trip.slots > 0 && !trip.joined) {
               return { ...trip, slots: trip.slots - 1, joined: true };
            }
          }
          return trip;
        })
      })),

    }),
    {
      name: 'jejak-kaki-content', // Nama kunci di localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);