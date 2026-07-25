import React from "react";
import Link from "next/link";
import { Heart, LayoutDashboard, Calendar, Lock, Home, Sparkles } from "lucide-react";

export const metadata = {
  title: "Admin - Mente y Aprendizaje Valdivia",
  description: "Panel de administración exclusiva de disponibilidad y reservas.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 antialiased">
      {/* Admin Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/admin" className="flex items-center gap-2 group">
              <img
                src="/logo.png"
                alt="Mente y Aprendizaje Logo"
                className="h-10 w-auto object-contain rounded-lg transition-transform duration-300 group-hover:scale-103"
              />
              <span className="font-sans text-[10px] tracking-wider text-slate-400 font-bold uppercase leading-none bg-slate-100 p-1.5 rounded-md border border-slate-200">
                Admin
              </span>
            </Link>

            {/* Navigation links (Desktop) */}
            <nav className="hidden sm:flex items-center gap-6 font-sans font-semibold text-xs text-slate-600">
              <Link
                href="/"
                className="hover:text-primary transition-colors flex items-center gap-1.5 py-1.5"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Sitio Público</span>
              </Link>
              <Link
                href="/admin"
                className="text-primary hover:text-primary-dark transition-colors flex items-center gap-1.5 py-1.5 border-b-2 border-primary"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Gestión de Box</span>
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-sans font-bold text-[10px] uppercase border border-emerald-250">
                <Sparkles className="w-3 h-3" />
                <span>Admin Activo</span>
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Admin Section */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Admin Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-400 font-sans">
        <p>&copy; {new Date().getFullYear()} Mente y Aprendizaje Valdivia &bull; Maho Cayun &bull; Panel de Control Privado</p>
      </footer>
    </div>
  );
}
