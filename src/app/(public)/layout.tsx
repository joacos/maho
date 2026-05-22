import React from "react";
import Link from "next/link";
import { BookOpen, Calendar, Menu, Phone, Mail, MapPin, Heart } from "lucide-react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* HEADER */}
      <header className="sticky top-0 z-50 glass shadow-xs border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-surface shadow-md group-hover:scale-105 transition-transform">
                <Heart className="w-5.5 h-5.5 fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl leading-none text-primary-dark">
                  Psicopedagogía
                </span>
                <span className="font-sans text-xs tracking-wider text-muted font-medium">
                  VALDIVIA
                </span>
              </div>
            </Link>

            {/* Navigation links (Desktop) */}
            <nav className="hidden md:flex items-center gap-8 font-sans font-medium text-sm text-foreground/80">
              <Link
                href="/"
                className="hover:text-primary transition-colors py-2 border-b-2 border-transparent hover:border-primary-light"
              >
                Inicio
              </Link>
              <Link
                href="/servicios"
                className="hover:text-primary transition-colors py-2 border-b-2 border-transparent hover:border-primary-light"
              >
                Servicios
              </Link>
              <Link
                href="/novedades"
                className="hover:text-primary transition-colors py-2 border-b-2 border-transparent hover:border-primary-light"
              >
                Novedades
              </Link>
            </nav>

            {/* CTA Button */}
            <div className="flex items-center gap-4">
              <Link
                href="/agendar"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary-dark text-surface font-sans font-semibold text-sm shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar Sesión</span>
              </Link>

              {/* Mobile Menu Icon (Simple toggle or placeholder for now) */}
              <button className="md:hidden p-2 rounded-lg hover:bg-surface-muted transition-colors text-primary">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-grow">{children}</main>

      {/* FOOTER */}
      <footer className="bg-primary-dark text-surface/90 pt-16 pb-8 border-t border-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Col 1: About */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-primary-light flex items-center justify-center text-primary-dark">
                  <Heart className="w-5 h-5 fill-current" />
                </div>
                <span className="font-display font-bold text-lg text-surface">
                  Psicopedagogía Valdivia
                </span>
              </div>
              <p className="text-sm text-surface/70 leading-relaxed max-w-sm">
                Acompañamiento psicopedagógico integral centrado en el paciente. 
                Potenciamos el aprendizaje, la estimulación cognitiva y el desarrollo 
                de habilidades ejecutivas desde la hermosa ciudad de Valdivia.
              </p>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="flex flex-col gap-4">
              <h3 className="font-display font-semibold text-base text-surface tracking-wide">
                Explorar
              </h3>
              <ul className="flex flex-col gap-2.5 text-sm text-surface/70 font-sans">
                <li>
                  <Link href="/" className="hover:text-primary-light transition-colors">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link href="/servicios" className="hover:text-primary-light transition-colors">
                    Servicios y Talleres
                  </Link>
                </li>
                <li>
                  <Link href="/novedades" className="hover:text-primary-light transition-colors">
                    Blog de Novedades
                  </Link>
                </li>
                <li>
                  <Link href="/agendar" className="hover:text-primary-light transition-colors">
                    Agendar una Cita
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Contact & Location */}
            <div className="flex flex-col gap-4">
              <h3 className="font-display font-semibold text-base text-surface tracking-wide">
                Contacto
              </h3>
              <ul className="flex flex-col gap-3.5 text-sm text-surface/70 font-sans">
                <li className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary-light shrink-0" />
                  <span>Valdivia, Región de Los Ríos, Chile</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary-light shrink-0" />
                  <a href="tel:+56912345678" className="hover:text-primary-light transition-colors">
                    +56 9 1234 5678
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary-light shrink-0" />
                  <a href="mailto:contacto@psicopedagogiavaldivia.cl" className="hover:text-primary-light transition-colors">
                    contacto@psicopedagogiavaldivia.cl
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-surface/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-surface/50 font-sans">
            <p>
              &copy; {new Date().getFullYear()} Psicopedagogía Valdivia. Todos los derechos reservados.
            </p>
            <p className="flex items-center gap-1">
              Desarrollado con <Heart className="w-3.5 h-3.5 fill-primary-light text-primary-light" /> en Valdivia.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
