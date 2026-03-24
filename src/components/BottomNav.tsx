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
    <nav className="fixed bottom-0 left-0 w-full sm:w-64 sm:h-[100dvh] sm:border-r sm:border-t-0 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 pb-safe sm:pb-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] sm:shadow-none z-50">
      <div className="flex sm:flex-col justify-around sm:justify-start items-center sm:items-stretch h-16 sm:h-full sm:pt-8 w-full px-2 sm:px-4 sm:space-y-4">
        
        {/* Logo/Header para Desktop */}
        <div className="hidden sm:block mb-8 px-4">
          <h1 className="text-2xl font-extrabold text-blue-700 dark:text-blue-400 flex items-center gap-2">
            UFMIAU 🐾
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Hub de Informações da UFCAT
          </p>
        </div>

        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex sm:flex-row flex-col items-center sm:justify-start justify-center w-full h-full sm:h-auto sm:py-3 sm:px-4 sm:rounded-xl space-y-1 sm:space-y-0 sm:space-x-4 transition-colors ${
                isActive ? "text-blue-600 dark:text-blue-400 font-semibold sm:bg-blue-50 sm:dark:bg-blue-900/20" : "text-zinc-500 dark:text-zinc-400 hover:text-blue-500 sm:hover:bg-zinc-50 sm:dark:hover:bg-zinc-900"
              }`}
            >
              <span className="text-xl">{link.icon}</span>
              <span className="text-[10px] sm:text-sm uppercase sm:normal-case font-medium sm:font-semibold tracking-wider sm:tracking-normal">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
