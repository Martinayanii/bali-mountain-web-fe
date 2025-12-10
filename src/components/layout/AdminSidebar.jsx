"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: "🏠" },
    { name: "Data Gunung", href: "/admin/mountains", icon: "🏔️" },
    { name: "Blog Artikel", href: "/admin/news", icon: "📰" },
    { name: "Req. Muncak", href: "/admin/community", icon: "👥" },
    { name: "Pengaturan", href: "/admin/settings", icon: "⚙️" },
  ];

  return (
    <aside className="w-[250px] bg-[#2c3e50] text-white h-screen fixed left-0 top-0 flex flex-col shadow-lg z-50">
      {/* Header Sidebar */}
      <div className="p-6 text-center border-b border-white/10">
        <h3 className="text-xl font-bold text-white tracking-wide">
          Mountain<span className="text-[#27ae60]">CMS</span>
        </h3>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 py-4">
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-6 py-4 transition-all duration-300 cursor-pointer text-sm font-medium ${
                isActive
                  ? "bg-white/10 text-[#27ae60] border-l-4 border-[#27ae60]"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="w-6 text-lg">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer Sidebar (Logout) */}
      <div className="p-4 border-t border-white/10">
        <Link href="/" className="flex items-center gap-3 px-4 py-2 text-red-400 hover:text-red-300 transition text-sm">
            <span>🚪</span> Keluar
        </Link>
      </div>
    </aside>
  );
}