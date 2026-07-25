"use client";

import React, { useState } from "react";
import { Baby, BookOpen, GraduationCap, HeartHandshake, ChevronDown, CheckCircle2 } from "lucide-react";

interface AudienceItem {
  id: string;
  icon: React.ElementType;
  title: string;
  badge: string;
  description: string;
  benefits: string[];
}

const AUDIENCE_DATA: AudienceItem[] = [
  {
    id: "parvulos",
    icon: Baby,
    title: "Párvulos y Primera Infancia",
    badge: "3 a 6 años",
    description: "Estimulación temprana del desarrollo cognitivo, psicomotor y del lenguaje.",
    benefits: [
      "Estimulación cognitiva y sensorial temprana",
      "Desarrollo de habilidades preescolares esenciales",
      "Preparación adaptativa para el ingreso escolar",
      "Detección oportuna de necesidades específicas"
    ]
  },
  {
    id: "escolares",
    icon: BookOpen,
    title: "Niños y Escolares",
    badge: "Educación Básica",
    description: "Abordaje de dificultades de aprendizaje, atención y habilidades académicas.",
    benefits: [
      "Acompañamiento en dificultades de lectoescritura y cálculo",
      "Desarrollo de la atención, concentración y autorregulación",
      "Estrategias para la comprensión lectora y memoria de trabajo",
      "Refuerzo de la confianza y motivación por el aprendizaje"
    ]
  },
  {
    id: "adolescentes",
    icon: GraduationCap,
    title: "Adolescentes y Universitarios",
    badge: "Media y Superior",
    description: "Organización del tiempo, funciones ejecutivas y técnicas de estudio efectivas.",
    benefits: [
      "Métodos y hábitos de estudio personalizados",
      "Planificación, organización y gestión del tiempo",
      "Preparación de exámenes y manejo del estrés académico",
      "Desarrollo de autonomía y funciones ejecutivas"
    ]
  },
  {
    id: "adultos",
    icon: HeartHandshake,
    title: "Adultos y Adultos Mayores",
    badge: "Estimulación Continua",
    description: "Mantenimiento y potenciación de habilidades neurocognitivas y bienestar.",
    benefits: [
      "Programas de estimulación y reserva cognitiva",
      "Prevención y entrenamiento de la memoria y atención",
      "Estrategias adaptativas para el día a día",
      "Fortalecimiento de la plasticidad cerebral"
    ]
  }
];

export default function AudienceSection() {
  const [openCard, setOpenCard] = useState<string | null>("escolares");

  const toggleCard = (id: string) => {
    setOpenCard(openCard === id ? null : id);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-surface via-surface-muted/40 to-surface border-b border-border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-sans font-semibold text-xs uppercase tracking-wider mb-4">
            ¿Para quién está dirigida?
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary-dark tracking-tight">
            Atención Adaptada a Cada Etapa del Desarrollo
          </h2>
          <p className="font-sans text-base sm:text-lg text-muted mt-3 leading-relaxed">
            Diseñamos planes psicopedagógicos específicos considerando la edad, ritmo y objetivos únicos de cada persona.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {AUDIENCE_DATA.map((item) => {
            const Icon = item.icon;
            const isOpen = openCard === item.id;

            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-300 bg-surface flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md ${
                  isOpen ? "border-primary/40 ring-2 ring-primary/10" : "border-border/40 hover:border-primary/20"
                }`}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-surface-muted border border-border/40 font-sans text-xs font-semibold text-primary-light">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-primary-dark mb-2">
                    {item.title}
                  </h3>

                  <p className="font-sans text-sm text-muted leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <button
                    type="button"
                    onClick={() => toggleCard(item.id)}
                    aria-expanded={isOpen}
                    className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-surface-muted hover:bg-primary/5 text-primary font-sans font-semibold text-xs transition-colors"
                  >
                    <span>{isOpen ? "Ocultar detalles" : "Ver qué trabajamos"}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isOpen && (
                    <div className="mt-4 pt-4 border-t border-border/20 space-y-2.5 animate-fadeIn">
                      {item.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs font-sans text-muted leading-snug">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
