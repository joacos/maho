"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    id: "cuando-consultar",
    question: "¿Cuándo es recomendable consultar a un especialista en Psicopedagogía?",
    answer: "Es aconsejable consultar cuando observes dificultades persistentes en el aprendizaje, problemas en la lectoescritura o el cálculo, falta de concentración, desorganización escolar, frustración ante las tareas o cuando desees potenciar habilidades neurocognitivas y hábitos de estudio desde edad temprana."
  },
  {
    id: "diferencia-profesor",
    question: "¿Qué diferencia hay entre una sesión psicopedagógica y clases particulares de refuerzo?",
    answer: "A diferencia de un profesor particular que repite contenidos escolares, el psicopedagogo evalúa e interviene en la raíz del aprendizaje: la manera en que el cerebro procesa la información, estimulando la memoria de trabajo, la atención, el control inhibitorio y las funciones ejecutivas."
  },
  {
    id: "duracion-sesiones",
    question: "¿Cuánto duran las sesiones y con qué frecuencia se realizan?",
    answer: "Las sesiones individuales o grupales suelen durar entre 45 y 60 minutos según la edad del paciente. Generalmente se realizan una o dos veces por semana según el plan de intervención personalizado acordado tras la evaluación inicial."
  },
  {
    id: "funciones-ejecutivas",
    question: "¿Qué son las funciones ejecutivas y por qué son tan importantes?",
    answer: "Las funciones ejecutivas son los procesos cognitivos superiores que nos permiten planificar, organizar la información, mantener el foco, regular emociones y resolver problemas. Son determinantes tanto para el éxito escolar como para la autonomía cotidiana."
  },
  {
    id: "coordinacion-colegio",
    question: "¿Se realiza trabajo coordinado con el colegio o establecimiento educativo?",
    answer: "Sí, previa autorización de la familia, mantenemos comunicación con docentes y equipos PIE de los establecimientos educativos para entregar sugerencias concretas, adecuar estrategias de aula y garantizar un apoyo coherente e integral."
  }
];

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>("cuando-consultar");

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-16 md:py-24 bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-sans font-semibold text-xs uppercase tracking-wider mb-4">
            Resuelve tus dudas
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary-dark tracking-tight">
            Preguntas Frecuentes
          </h2>
          <p className="font-sans text-base sm:text-lg text-muted mt-3 leading-relaxed">
            Información transparente para ayudarte a tomar la mejor decisión para tu familia.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 bg-surface overflow-hidden ${
                  isOpen ? "border-primary/40 shadow-sm" : "border-border/40 hover:border-primary/20"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between p-6 text-left font-sans transition-colors hover:bg-surface-muted/50"
                >
                  <div className="flex items-center gap-3.5 pr-4">
                    <HelpCircle className={`w-5 h-5 shrink-0 ${isOpen ? "text-primary" : "text-muted"}`} />
                    <h3 className="font-display font-bold text-base sm:text-lg text-primary-dark">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-muted shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-sm sm:text-base font-sans text-muted leading-relaxed border-t border-border/10 bg-surface-muted/30 animate-fadeIn">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
