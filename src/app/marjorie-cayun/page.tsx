"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Briefcase,
  Award,
  Heart,
  MapPin,
  ChevronDown,
  Calendar,
  Building,
  BookOpen,
  Users,
  Brain,
  ShieldCheck,
  CheckCircle2,
  Mail,
  Phone,
  MessageCircle,
  X
} from "lucide-react";

// --- DATA ---

const EXPERIENCIA_LABORAL = [
  {
    id: "iacc",
    periodo: "Ene 2024 – Dic 2025",
    cargo: "Docente Virtual",
    institucion: "IACC – Escuela de Desarrollo Social",
    ubicacion: "Remoto",
    detalles: [
      "Impartir módulos de 'Evaluación en procesos cognitivos en el adulto mayor' y 'Bases teóricas de la psicopedagogía'.",
      "Planificar y desarrollar clases online estructuradas.",
      "Uso de herramientas tecnológicas y manejo de plataforma virtual educativa.",
      "Moderación de grupos de estudiantes, fomentando la participación y el aprendizaje colaborativo.",
      "Elaboración de material didáctico (videos, documentos, recursos de apoyo)."
    ]
  },
  {
    id: "kunstmann",
    periodo: "Dic 2025 – Mar 2026 / Dic 2026 – Mar 2026",
    cargo: "Monitor, Guía de Procesos",
    institucion: "Cervecería Kunstmann",
    ubicacion: "Valdivia",
    detalles: [
      "Impartir tours de aprendizaje sobre el proceso de elaboración cervecera.",
      "Gestionar sesiones de cata y maridajes (comprensión sensorial).",
      "Adaptar lenguaje y metodología de explicación según el tipo de público.",
      "Crear experiencias de visita dinámicas y participativas."
    ]
  },
  {
    id: "integra",
    periodo: "Sep 2024 – Nov 2024",
    cargo: "Evaluador Integra",
    institucion: "INTEGRA",
    ubicacion: "Valdivia",
    detalles: [
      "Realizar visitas de evaluación en terreno según protocolos y normativa vigente.",
      "Ingresar, validar y sistematizar datos en plataformas digitales institucionales.",
      "Revisión de documentación para validación de test.",
      "Aplicación del instrumento PLAEP para estandarización de prueba y registro de información."
    ]
  },
  {
    id: "aiep",
    periodo: "May 2023 – Oct 2023",
    cargo: "Docente Ed. Superior",
    institucion: "IP AIEP",
    ubicacion: "Temuco",
    detalles: [
      "Escuela de Desarrollo Social, carreras Psicopedagogía y Educación Diferencial.",
      "Aplicar estrategias avanzadas en psicopedagogía para promover entornos inclusivos.",
      "Desarrollar enfoques para la diversidad, aplicando técnicas innovadoras y aprendizaje activo.",
      "Conocimiento sobre políticas educativas sociales y laborales que respaldan la inclusión."
    ]
  },
  {
    id: "tiang-ming",
    periodo: "Jun 2023 – Oct 2023",
    cargo: "Instructor Clases Kung Fu Niños",
    institucion: "Tiang Ming",
    ubicacion: "Temuco",
    detalles: [
      "Desarrollar habilidades motrices y conciencia corporal mediante actividades adaptadas.",
      "Implementar ejercicios inspirados en el kung fu, reforzando cooperación y respeto.",
      "Fomentar concentración, disciplina y atención mediante instrucciones claras.",
      "Impulsar autorregulación emocional, calma, autocontrol y responsabilidad personal."
    ]
  },
  {
    id: "ymca",
    periodo: "Ene 2023 – Feb 2023",
    cargo: "Monitor Programa Verano",
    institucion: "YMCA",
    ubicacion: "Temuco",
    detalles: [
      "Apoyar a jóvenes en actividades dinámicas adaptadas a sus necesidades.",
      "Enfoque en desarrollo integral, habilidades motoras y regulación emocional.",
      "Dirección de taller motor con nociones de artes marciales (disciplina, trabajo en equipo).",
      "Fomentar el bienestar emocional mediante propuestas lúdicas."
    ]
  },
  {
    id: "el-crucero",
    periodo: "Feb 2022 – Feb 2023",
    cargo: "Psicopedagoga",
    institucion: "Escuela El Crucero 484",
    ubicacion: "Temuco",
    detalles: [
      "Apoyo psicopedagógico a estudiantes de contextos vulnerables (Programa PIE).",
      "Acompañamiento especializado a estudiante con Síndrome de Down, promoviendo inclusión.",
      "Confección y adecuación de material educativo según necesidades específicas.",
      "Implementación de plan de intervención individualizado centrado en estimulación cognitiva.",
      "Encargado de actividades de la biblioteca CRA (programa lector)."
    ]
  },
  {
    id: "araucania-aprende",
    periodo: "Jun 2019 – Sep 2021",
    cargo: "Profesor Lectoescritura",
    institucion: "Fundación Araucanía Aprende",
    ubicacion: "Remoto",
    detalles: [
      "Diseñar funciones educativas orientadas a lectoescritura (apoyo escolar y familiar).",
      "Evaluaciones detalladas de habilidades para potenciar competencias.",
      "Elaborar actividades de aprendizaje personalizadas y procesos de enseñanza efectivos.",
      "Gestión de procesos de egreso y transición de los participantes."
    ]
  },
  {
    id: "cecrea",
    periodo: "Ene 2019",
    cargo: "Monitor de Actividades",
    institucion: "Centro de Creación - CECREA",
    ubicacion: "Temuco",
    detalles: [
      "Actividades centradas en conocimiento y percepción de niños con NEE (Escuela Especial Claret).",
      "Enfoque de aprendizaje basado en emociones, respeto e inclusión.",
      "Diseño de estrategias pedagógicas orientadas a la autoestima y autoconcepto."
    ]
  }
];

const CURSOS = [
  { group: "SENDA", title: "Innovación Social Efectiva en Prevención del Consumo de Sustancia" },
  { group: "SENDA", title: "Parentalidad y Prevención del Consumo de Drogas" },
  { group: "SENDA", title: "Consumo de Alcohol y Otras Drogas en el Embarazo (FASD)" },
  { group: "SENDA", title: "Ética en el Tratamiento del Consumo de Drogas" },
  { group: "USS", title: "Programa de Salud Mental" },
  { group: "USS", title: "Taller de Planificación y Organización" },
  { group: "USS", title: "Taller de Liderazgo y Trabajo en Equipo" },
  { group: "Otros", title: "Creación de Contenidos Digitales en el Entorno Educativo", inst: "Fundación Conecta" },
  { group: "Otros", title: "Salud Familiar y Comunitaria en APS", inst: "SEPROTEC" },
  { group: "Otros", title: "Autismo: Diagnóstico y Estrategias de Intervención", inst: "Neuroclass" }
];

export default function MarjorieProfilePage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-background pb-20">

      {/* 1. HERO SECTION */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-surface-muted/50" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary-light/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-accent/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 items-center">

            {/* Foto Profile */}
            <div className="lg:w-1/3 shrink-0">
              <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-white shadow-xl overflow-hidden z-10">
                  <img
                    src="/images/marjorie-profile.jpeg"
                    alt="Marjorie Cayún Bustos"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decoraciones circulares */}
                <div className="absolute -inset-4 rounded-full border border-primary/20 animate-[spin_10s_linear_infinite]" />
                <div className="absolute -inset-8 rounded-full border border-accent/20 animate-[spin_15s_linear_infinite_reverse]" />
              </div>
            </div>

            {/* Presentación */}
            <div className="lg:w-2/3 text-center lg:text-left flex flex-col items-center lg:items-start">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-sans text-sm font-semibold mb-6">
                <MapPin className="w-4 h-4" />
                Valdivia, Región de Los Ríos
              </div>

              <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-primary-dark tracking-tight mb-4">
                Marjorie Cayún Bustos
              </h1>

              <h2 className="font-sans text-lg md:text-xl text-primary-light font-medium mb-6">
                Psicopedagoga · Enfoque Clínico Integral Cualitativo
              </h2>

              <p className="font-sans text-base md:text-lg text-muted leading-relaxed max-w-2xl mb-8">
                Acompaño procesos de aprendizaje y desarrollo neurocognitivo desde una mirada integral, integrando estrategias psicopedagógicas, estimulación sensorial y movimiento consciente para potenciar el bienestar y la autonomía de cada persona.
              </p>

              <div className="flex gap-4 flex-wrap justify-center lg:justify-start">
                <button
                  onClick={() => setIsContactModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-primary-dark text-white font-sans font-bold text-base shadow-md transition-all hover:-translate-y-0.5"
                >
                  Contactar
                </button>
                {/* Botón de CV */}
                <a 
                  href="/cv-marjorie-cayun.pdf" 
                  download="CV_Marjorie_Cayun.pdf"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-surface hover:bg-surface-muted text-primary border border-border font-sans font-bold text-base shadow-sm transition-all hover:-translate-y-0.5"
                >
                  <Briefcase className="w-4 h-4" />
                  Descargar CV
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. FORMACIÓN ACADÉMICA */}
      <section className="py-16 bg-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10 justify-center">
            <GraduationCap className="w-8 h-8 text-primary" />
            <h2 className="font-display font-bold text-3xl text-primary-dark">Formación Académica</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-muted p-8 rounded-3xl border border-border/50 shadow-sm flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-2">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-2xl text-primary-dark">Psicopedagogía</h3>
              <p className="font-sans text-muted">Instituto Profesional AIEP</p>
              <div className="mt-auto pt-4 inline-flex items-center gap-2 text-sm font-bold text-primary">
                <CheckCircle2 className="w-5 h-5" />
                Titulada
              </div>
            </div>

            <div className="bg-surface-muted p-8 rounded-3xl border border-border/50 shadow-sm flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-2">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-2xl text-primary-dark">Psicología</h3>
              <p className="font-sans text-muted">Universidad San Sebastián (USS)</p>
              <div className="mt-auto pt-4 inline-flex items-center gap-2 text-sm font-bold text-accent">
                <Calendar className="w-5 h-5" />
                En curso (4° Año)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EXPERIENCIA LABORAL (TIMELINE) */}
      <section className="py-20 bg-background relative border-t border-border/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-16 justify-center">
            <Briefcase className="w-8 h-8 text-primary" />
            <h2 className="font-display font-bold text-3xl text-primary-dark">Experiencia Profesional</h2>
          </div>

          <div className="relative border-l-2 border-primary/20 ml-4 md:ml-0 md:border-none space-y-12 md:space-y-0">
            {/* Línea central visible solo en MD hacia arriba */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 -translate-x-1/2" />

            {EXPERIENCIA_LABORAL.map((exp, index) => {
              const isEven = index % 2 === 0;
              const isExpanded = expandedId === exp.id;

              return (
                <div key={exp.id} className="relative md:w-full md:flex md:items-center md:justify-between md:mb-16 last:mb-0">
                  {/* Nodo central */}
                  <div className="absolute -left-[25px] md:left-1/2 top-0 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-12 h-12 rounded-full bg-surface border-4 border-primary-light flex items-center justify-center z-10">
                    <Building className="w-5 h-5 text-primary-light" />
                  </div>

                  {/* Espacio invisible para equilibrar flex */}
                  <div className={`hidden md:block w-5/12 ${isEven ? 'order-2' : 'order-1'}`} />

                  {/* Contenido de la tarjeta */}
                  <div className={`w-full pl-10 md:pl-0 md:w-5/12 ${isEven ? 'order-1 md:text-right' : 'order-2 md:text-left'}`}>
                    <motion.div
                      layout
                      onClick={() => toggleExpand(exp.id)}
                      className={`bg-surface p-6 rounded-2xl border transition-all cursor-pointer shadow-sm hover:shadow-md ${isExpanded ? 'border-primary/50' : 'border-border/60 hover:border-primary/30'}`}
                    >
                      <span className="inline-block px-3 py-1 rounded-full bg-primary/5 text-primary font-sans text-xs font-bold mb-3">
                        {exp.periodo}
                      </span>
                      <h3 className="font-display font-bold text-xl text-primary-dark mb-1">{exp.cargo}</h3>
                      <p className="font-sans text-muted font-medium flex items-center gap-1.5 mb-2 justify-start md:justify-start">
                        <span className="block truncate">{exp.institucion}</span>
                        <span className="text-border mx-1">•</span>
                        <span className="text-primary-light">{exp.ubicacion}</span>
                      </p>

                      {/* Accordion para detalles */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <ul className={`mt-4 space-y-2 text-sm text-muted/90 font-sans text-left`}>
                              {exp.detalles.map((detalle, i) => (
                                <li key={i} className="flex gap-2">
                                  <span className="text-primary-light shrink-0 mt-0.5">•</span>
                                  <span>{detalle}</span>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className={`mt-4 flex items-center text-xs font-semibold text-primary/70 transition-colors ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                        {isExpanded ? 'Ocultar detalles' : 'Ver detalles'}
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          className="ml-1"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.div>
                      </div>

                    </motion.div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. CURSOS Y CERTIFICACIONES */}
      <section className="py-16 bg-surface-muted border-y border-border/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10 justify-center">
            <Award className="w-8 h-8 text-primary" />
            <h2 className="font-display font-bold text-3xl text-primary-dark">Cursos y Certificaciones</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CURSOS.map((curso, index) => (
              <div key={index} className="bg-surface p-5 rounded-2xl border border-border/50 shadow-xs flex items-start gap-4 hover:border-primary/30 transition-colors">
                <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-primary-dark leading-snug mb-1">
                    {curso.title}
                  </h4>
                  <p className="font-sans text-xs text-primary-light/80 font-medium">
                    {curso.group === "SENDA" || curso.group === "USS" ? curso.group : curso.inst}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ACTIVIDADES EXTRACURRICULARES */}
      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10 justify-center">
            <Heart className="w-8 h-8 text-accent" />
            <h2 className="font-display font-bold text-3xl text-primary-dark">Actividades Extracurriculares</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-surface p-6 rounded-3xl border border-border/40 text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-sans font-bold text-lg text-primary-dark mb-2">Taller de Nociones Motrices</h3>
              <p className="font-sans text-sm text-muted mb-4">Talleres autogestionados de habilidades motrices (malabar) para niños en escuela especial.</p>
              <span className="mt-auto font-sans text-xs font-bold text-accent/80 px-3 py-1 bg-accent/5 rounded-full">
                Mayo 2023
              </span>
            </div>

            <div className="bg-surface p-6 rounded-3xl border border-border/40 text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-sans font-bold text-lg text-primary-dark mb-2">Artes Marciales</h3>
              <p className="font-sans text-sm text-muted mb-4">Practicante de Artes Marciales en la escuela Liu Pi Tiang Ming. Constancia y disciplina.</p>
              <span className="mt-auto font-sans text-xs font-bold text-primary/80 px-3 py-1 bg-primary/5 rounded-full">
                2019 — Actualidad
              </span>
            </div>

            <div className="bg-surface p-6 rounded-3xl border border-border/40 text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-primary-light/10 flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-primary-light" />
              </div>
              <h3 className="font-sans font-bold text-lg text-primary-dark mb-2">Salud Mental USS</h3>
              <p className="font-sans text-sm text-muted mb-4">Promotor del Programa de Salud Mental de la Universidad San Sebastián.</p>
              <span className="mt-auto font-sans text-xs font-bold text-primary-light/80 px-3 py-1 bg-primary-light/5 rounded-full">
                Marzo 2025
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* MODAL CONTACTO */}
      <AnimatePresence>
        {isContactModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsContactModalOpen(false)}
              className="absolute inset-0 bg-primary-dark/60 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-md bg-surface rounded-3xl overflow-hidden shadow-2xl z-10 border border-white/20 flex flex-col"
            >
              <div className="p-8 text-center border-b border-border/40 bg-surface-muted/30">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
                  <Phone className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-2xl text-primary-dark mb-2">Contactar a Marjorie</h3>
                <p className="font-sans text-sm text-muted">Selecciona tu método preferido para ponerte en contacto.</p>
              </div>

              <div className="p-8 flex flex-col gap-4">
                <a href="mailto:m.cayunbustos@gmail.com" className="flex items-center gap-4 p-4 rounded-2xl border border-border/40 hover:border-primary/40 bg-surface hover:bg-surface-muted transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <span className="block font-sans font-bold text-primary-dark">Enviar Correo</span>
                    <span className="block font-sans text-xs text-muted">:m.cayunbustos@gmail.com</span>
                  </div>
                </a>

                <a href="tel:+56974103256" className="flex items-center gap-4 p-4 rounded-2xl border border-border/40 hover:border-primary/40 bg-surface hover:bg-surface-muted transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <span className="block font-sans font-bold text-primary-dark">Llamar</span>
                    <span className="block font-sans text-xs text-muted">+56 9 7410 3256</span>
                  </div>
                </a>

                <a href="https://wa.me/56974103256" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl border border-border/40 hover:border-[#25D366]/40 bg-surface hover:bg-[#25D366]/5 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors">
                    <MessageCircle className="w-6 h-6 text-[#25D366]" />
                  </div>
                  <div className="text-left">
                    <span className="block font-sans font-bold text-primary-dark">WhatsApp</span>
                    <span className="block font-sans text-xs text-muted">Escribir un mensaje</span>
                  </div>
                </a>
              </div>

              <button
                onClick={() => setIsContactModalOpen(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-primary-dark" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
