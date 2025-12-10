import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "SobatMuncak",
  description: "Cari Teman Muncak",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${poppins.variable} font-sans antialiased bg-bg-soft text-gray-700`}>
        {children}
      </body>
    </html>
  );
}