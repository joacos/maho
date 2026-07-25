"use client";

import React, { useState } from "react";
import {
  Brain,
  FileCheck,
  BookOpen,
  Baby,
  Smile,
  Target,
  PenTool,
  Puzzle,
  Users,
  ShieldCheck,
  ChevronDown
} from "lucide-react";

interface AreaItem {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
}

const AREAS_LEFT: AreaItem[] = [
  {
    id: "potencial",
    icon: Brain,
    title: "Evaluación del Potencial de Aprendizaje",
    description: "Evaluación integral de las capacidades cognitivas y del potencial de aprendizaje. Identificamos fortalezas y áreas prioritarias de desarrollo."
  },
  {
    id: "pep3",
    icon: FileCheck,
    title: "Evaluación del Perfil Psicoeducativo (PEP-3)",
    description: "Evaluación especializada para niños con TEA y neurodivergencias para estructurar intervenciones educativas y funcionales personalizadas."
  },
  {
    id: "habitos",
    icon: BookOpen,
    title: "Hábitos y Estrategias de Estudio",
    description: "Enseñanza de técnicas efectivas de estudio, organización del tiempo, métodos de síntesis y memoria para un rendimiento académico óptimo."
  },
  {
    id: "estimulacion_temprana",
    icon: Baby,
    title: "Estimulación Temprana a Párvulos",
    description: "Programa lúdico y cognitivo para niños pequeños, potenciando habilidades motoras, de lenguaje y preparación para el entorno escolar."
  },
  {
    id: "mindfulness",
    icon: Smile,
    title: "Legoterapia y Mindfulness Infantil",
    description: "Metodologías vivenciales innovadoras para fomentar habilidades sociales, autorregulación emocional y atención plena mediante el juego."
  }
];

const AREAS_RIGHT: AreaItem[] = [
  {
    id: "funciones_ejecutivas",
    icon: Target,
    title: "Evaluación de Funciones Ejecutivas",
    description: "Medición y estimulación de habilidades de planificación, organización, memoria de trabajo, flexibilidad cognitiva y control de impulsos."
  },
  {
    id: "test_aprendizaje",
    icon: PenTool,
    title: "Test Específicos de Aprendizaje",
    description: "Pruebas psicopedagógicas focalizadas en lectoescritura, razonamiento matemático y comprensión para identificar necesidades puntuales."
  },
  {
    id: "estimulacion_cognitiva",
    icon: Puzzle,
    title: "Estimulación y Reserva Cognitiva",
    description: "Ejercitación dirigida a fortalecer atención, razonamiento y memoria en niños, adolescentes y adultos."
  },
  {
    id: "talleres",
    icon: Users,
    title: "Talleres Psicopedagógicos Grupales",
    description: "Espacios de aprendizaje colaborativo orientados al desarrollo de habilidades socioemocionales y técnicas de autorregulación."
  },
  {
    id: "mediacion",
    icon: ShieldCheck,
    title: "Mediación y Acompañamiento Escolar",
    description: "Coordinación y entrega de sugerencias adaptativas a familias y establecimientos educativos para asegurar un entorno de apoyo consistente."
  }
];

export default function InterventionAreasSection() {
  const [openId, setOpenId] = useState<string | null>("potencial");

  const toggleArea = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const renderAccordionColumn = (items: AreaItem[]) => (
    <div className="flex flex-col gap-4">
      {items.map((item) => {
        const Icon = item.icon;
        const isOpen = openId === item.id;

        return (
          <div
            key={item.id}
            className={`rounded-2xl border transition-all duration-200 bg-surface overflow-hidden ${
              isOpen ? "border-primary/40 shadow-sm" : "border-border/40 hover:border-primary/20"
            }`}
          >
            <button
              type="button"
              onClick={() => toggleArea(item.id)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between p-5 text-left font-sans transition-colors hover:bg-surface-muted/50"
            >
              <div className="flex items-center gap-3.5 pr-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-base text-primary-dark">
                  {item.title}
                </h3>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-muted shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-primary" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-5 pb-5 pt-1 text-sm font-sans text-muted leading-relaxed border-t border-border/10 bg-surface-muted/30 animate-fadeIn">
                <p>{item.description}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <section className="py-16 md:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-sans font-semibold text-xs uppercase tracking-wider mb-4">
            Servicios Especializados
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary-dark tracking-tight">
            Áreas de Intervención Psicopedagógica
          </h2>
          <p className="font-sans text-base sm:text-lg text-muted mt-3 leading-relaxed">
            Haz clic en cada área para conocer cómo abordamos los desafíos de aprendizaje y desarrollo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {renderAccordionColumn(AREAS_LEFT)}
          {renderAccordionColumn(AREAS_RIGHT)}
        </div>
      </div>
    </section>
  );
}
