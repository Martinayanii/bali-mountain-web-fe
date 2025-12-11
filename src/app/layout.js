import './globals.css';
import { Poppins } from 'next/font/google';
import { Toaster } from 'react-hot-toast'; // <--- 1. IMPORT INI

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata = {
  title: 'SobatMuncak - Cari Teman Muncak',
  description: 'Platform pendakian gunung Indonesia',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${poppins.variable} font-sans bg-bg-soft text-gray-700 antialiased`}>
        {/* 2. PASANG TOASTER DISINI (Posisi bisa diatur) */}
        <Toaster position="top-center" reverseOrder={false} />
        
        {children}
      </body>
    </html>
  );
}