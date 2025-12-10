export const mountains = [
  {
    id: 1,
    slug: 'semeru',
    name: 'Gunung Semeru',
    location: 'Malang, Jawa Timur',
    elevation: '3.676 mdpl',
    difficulty: 'Hard', 
    rating: 4.8,
    image: 'https://images.bisnis.com/posts/2021/12/04/1473827/semeru21.jpg',
    status: 'Open',
    description: 'Gunung tertinggi di Pulau Jawa dengan puncaknya Mahameru. Jalur pendakian yang menantang dengan trek pasir yang legendaris.',
    province: 'Jawa Timur',
    duration: '3 Hari 2 Malam', // Data Baru
    temp: '5°C - 15°C'          // Data Baru
  },
  {
    id: 2,
    slug: 'andong',
    name: 'Gunung Andong',
    location: 'Magelang, Jawa Tengah',
    elevation: '1.726 mdpl',
    difficulty: 'Easy',
    rating: 4.5,
    image: 'https://image.idntimes.com/post/20250830/unnamed-45-_11zon_f75282f2-aad8-4db8-be75-3800f9dc309f.jpg',
    status: 'Open',
    description: 'Gunung ramah pemula dengan view 360 derajat yang memukau. Cocok untuk tektok atau camping ceria.',
    province: 'Jawa Tengah',
    duration: '2-3 Jam',
    temp: '18°C - 25°C'
  },
  {
    id: 3,
    slug: 'merbabu',
    name: 'Gunung Merbabu',
    location: 'Boyolali, Jawa Tengah',
    elevation: '3.145 mdpl',
    difficulty: 'Medium',
    rating: 4.7,
    image: 'https://asset-2.tribunnews.com/travel/foto/bank/images/Ilustrasi-pendakian-Gunung-Merbabu-via-Suwanting.jpg',
    status: 'Open',
    description: 'Terkenal dengan sabana yang luas dan indah seperti bukit Teletubbies.',
    province: 'Jawa Tengah',
    duration: '2 Hari 1 Malam',
    temp: '10°C - 20°C'
  },
  {
    id: 4,
    slug: 'papandayan',
    name: 'Gunung Papandayan',
    location: 'Garut, Jawa Barat',
    elevation: '2.665 mdpl',
    difficulty: 'Easy',
    rating: 4.6,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Indonesia_-_papandayan_4.jpg/500px-Indonesia_-_papandayan_4.jpg',
    status: 'Open',
    description: 'Gunung wisata dengan kawah belerang aktif dan hutan mati yang eksotis.',
    province: 'Jawa Barat',
    duration: '4-5 Jam',
    temp: '15°C - 22°C'
  },
  {
    id: 5,
    slug: 'gede',
    name: 'Gunung Gede',
    location: 'Cianjur, Jawa Barat',
    elevation: '2.958 mdpl',
    difficulty: 'Medium',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1541355966453-33df57452d3a?q=80&w=1934', 
    status: 'Closed', 
    description: 'Tutup sementara untuk pemulihan ekosistem rutin tahunan.',
    province: 'Jawa Barat',
    duration: '2 Hari 1 Malam',
    temp: '8°C - 18°C'
  }
];

  export const articles = [
  {
    id: 1,
    slug: 'jalur-rinjani-tutup',
    title: 'Penutupan Jalur Rinjani: Pemulihan Ekosistem',
    category: 'Info Jalur',
    date: '10 Des 2024',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=800',
    content: 'Mulai tanggal 1 Januari hingga 31 Maret, jalur pendakian Gunung Rinjani akan ditutup total untuk pemulihan ekosistem rutin tahunan. Balai TNGR menghimbau pendaki untuk menunda rencana pendakian.'
  },
  {
    id: 2,
    slug: 'tips-sepatu-hiking',
    title: 'Tips Memilih Sepatu Hiking agar Tidak Lecet',
    category: 'Tips & Trik',
    date: '12 Des 2024',
    image: 'https://images.unsplash.com/photo-1541355966453-33df57452d3a?q=80&w=800',
    content: 'Memilih sepatu gunung tidak boleh sembarangan. Pastikan ukuran dilebihkan 1 nomor (up size) untuk menghindari kuku jari kaki menghitam saat perjalanan turun.'
  },
  {
    id: 3,
    slug: 'cuaca-buruk-gede',
    title: 'Cuaca Buruk: Pendaki Gunung Gede Dihimbau Turun',
    category: 'Berita',
    date: '13 Des 2024',
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=800',
    content: 'Badai angin kencang melanda alun-alun Surya Kencana. Petugas menghimbau pendaki untuk segera turun demi keselamatan.'
  }
];

export const communityPosts = [
  {
    id: 1,
    user: 'Budi Santoso',
    role: 'Leader',
    avatar: 'https://i.pravatar.cc/150?img=33',
    time: '2 jam yang lalu',
    content: 'Halo kawan-kawan! Saya rencana mau tektok Ciremai minggu depan. Butuh 2 orang lagi buat sharecost mobil dari Bekasi.',
    type: 'Trip', // Trip atau Status
    tripDetails: {
      date: '20 - 21 Des',
      location: 'Stasiun Bekasi',
      slot: '2 Slot'
    }
  },
  {
    id: 2,
    user: 'Siti Aminah',
    role: 'Member',
    avatar: 'https://i.pravatar.cc/150?img=5',
    time: '5 jam yang lalu',
    content: 'Akhirnya kesampaian juga naik ke Prau. Sunrise-nya juara banget! 😍',
    type: 'Status',
    image: 'https://images.unsplash.com/photo-1623832793282-3d4349195b0c?q=80&w=800'
  }
];