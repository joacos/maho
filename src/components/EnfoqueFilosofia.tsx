"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Eye, SmilePlus, MapPin, ChevronDown, ChevronUp, Heart } from "lucide-react";

interface PhilosophyItem {
  id: number;
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  image: string;
  imageCaption: string;
}

const PHILOSOPHY_DATA: PhilosophyItem[] = [
  {
    id: 1,
    icon: Brain,
    title: "Desarrollo Cognitivo",
    description: "Estímulo de funciones ejecutivas, atención, memoria y resolución de problemas. Integramos la psicopedagogía y el desarrollo psicomotor para fortalecer habilidades esenciales.",
    image: "/images/desarrollo_cognitivo.png",
    imageCaption: "Estimulación cognitiva a través del juego y materiales sensoriales",
  },
  {
    id: 2,
    icon: Heart,
    title: "Crecimiento Emocional",
    description: "Regulación emocional, autoestima, confianza y manejo del estrés. Cada movimiento es una oportunidad para aprender, crecer y creer en uno mismo.",
    image: "/images/crecimiento_emocional.png",
    imageCaption: "Desarrollo del bienestar emocional y autorregulación en la naturaleza",
  },
  {
    id: 3,
    icon: SmilePlus,
    title: "Habilidades Sociales",
    description: "Trabajo en equipo, respeto, empatía y comunicación asertiva. Disciplina que transforma y relaciones que fortalecen a los niños y niñas.",
    image: "/images/habilidades_sociales.png",
    imageCaption: "Interacción social, empatía y aprendizaje colaborativo",
  },
];

export default function EnfoqueFilosofia() {
  const [expandedId, setExpandedId] = useState<number | null>(1); // Default first expanded

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Find the active item to display its image
  const activeItem = PHILOSOPHY_DATA.find((item) => item.id === expandedId) || PHILOSOPHY_DATA[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      {/* Left: Interactive principles */}
      <div className="lg:col-span-7 flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary-dark tracking-tight leading-tight">
            Enfoque Integral
          </h2>
          <p className="font-sans text-base text-muted leading-relaxed max-w-2xl">
            Mi trabajo une la psicopedagogía y el desarrollo psicomotor para fortalecer habilidades motrices, emocionales, sociales y cognitivas.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {PHILOSOPHY_DATA.map((item) => {
            const Icon = item.icon;
            const isExpanded = expandedId === item.id;

            return (
              <div
                key={item.id}
                onClick={() => toggleExpand(item.id)}
                className={`cursor-pointer rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? "bg-primary border-primary shadow-lg"
                    : "bg-surface border-border/60 hover:border-primary-light/50 shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between px-6 py-4.5">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isExpanded ? "bg-white/20 text-white" : "bg-primary-light/10 text-primary"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`font-sans font-bold text-sm sm:text-base leading-snug transition-colors ${
                        isExpanded ? "text-white" : "text-primary-dark"
                      }`}
                    >
                      {item.title}
                    </span>
                  </div>
                  <div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-white/80" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted" />
                    )}
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 text-sm sm:text-base leading-relaxed font-sans text-surface/90 border-t border-white/10 mt-1">
                        {item.description}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: Connected Dynamic Photo */}
      <div className="lg:col-span-5 flex flex-col items-center justify-center lg:pt-10">
        <div className="w-full max-w-sm aspect-[4/3] lg:aspect-square relative rounded-3xl overflow-hidden shadow-2xl border-4 border-primary/20 bg-surface-muted flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 w-full h-full flex flex-col justify-end"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-16">
                <p className="font-sans text-xs text-white/90 italic text-center">
                  {activeItem.imageCaption}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
