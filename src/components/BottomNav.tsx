"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Início", icon: "🏠" },
    { href: "/editais", label: "Editais", icon: "📄" },
    { href: "/ru", label: "Menu R.U", icon: "🍽️" },
    { href: "/chat", label: "I.A UFMIAU", icon: "🤖" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto px-2">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                isActive ? "text-blue-600 dark:text-blue-400 font-semibold" : "text-zinc-500 dark:text-zinc-400 hover:text-blue-500"
              }`}
            >
              <span className="text-xl">{link.icon}</span>
              <span className="text-[10px] uppercase tracking-wider">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
