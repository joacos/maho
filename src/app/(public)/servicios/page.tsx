import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ServiceType } from "@prisma/client";
import { Heart, Calendar, Clock, Banknote, ArrowRight, Sparkles } from "lucide-react";

const MOCK_SERVICES = [
  {
    id: "serv-1",
    slug: "acompanamiento-cognitivo-individual",
    name: "Acompañamiento Cognitivo Individual",
    description: "Sesión personalizada enfocada en potenciar habilidades cognitivas, funciones ejecutivas, memoria y procesos de aprendizaje en niños, adolescentes y adultos.",
    type: ServiceType.INDIVIDUAL,
    duration: 60,
    price: 35000.0,
    isActive: true,
  },
  {
    id: "serv-2",
    slug: "evaluacion-psicopedagogica-completa",
    name: "Evaluación Psicopedagógica Completa",
    description: "Evaluación diagnóstica integral para identificar dificultades de aprendizaje, estilo cognitivo, y áreas fuertes para trazar un plan de apoyo adaptado.",
    type: ServiceType.INDIVIDUAL,
    duration: 90,
    price: 45000.0,
    isActive: true,
  },
  {
    id: "serv-3",
    slug: "taller-estimulacion-temprana",
    name: "Taller de Estimulación Temprana",
    description: "Sesiones grupales lúdicas diseñadas para potenciar el desarrollo integral (motor, social y cognitivo) en niños pequeños de 3 a 5 años.",
    type: ServiceType.WORKSHOP,
    duration: 90,
    price: 15000.0,
    isActive: true,
  },
  {
    id: "serv-4",
    slug: "taller-tecnicas-de-estudio",
    name: "Taller de Técnicas de Estudio y Concentración",
    description: "Taller práctico para estudiantes de educación básica y media, donde aprenderán a organizar su tiempo, hacer resúmenes efectivos y mejorar su foco.",
    type: ServiceType.WORKSHOP,
    duration: 120,
    price: 20000.0,
    isActive: true,
  },
];

async function getServices() {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { price: "asc" },
    });
    return services.length > 0 ? services : MOCK_SERVICES;
  } catch (error) {
    console.warn("Base de datos no conectada para obtener servicios, usando mocks.");
    return MOCK_SERVICES;
  }
}

export default async function ServiciosPage() {
  const services = await getServices();

  const individuales = services.filter((s) => s.type === ServiceType.INDIVIDUAL);
  const talleres = services.filter((s) => s.type === ServiceType.WORKSHOP);

  return (
    <div className="py-16 md:py-24 bg-gradient-to-br from-surface to-surface-muted min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        <div className="max-w-3xl mx-auto text-center mb-16 flex flex-col gap-4">
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-primary-dark tracking-tight">
            Nuestros Servicios y Talleres
          </h1>
          <p className="font-sans text-base sm:text-lg text-muted max-w-2xl mx-auto">
            Explora las diferentes modalidades de acompañamiento psicopedagógico diseñadas 
            para potenciar el aprendizaje en cada etapa de la vida.
          </p>
        </div>

        {/* Section: Sesiones Individuales */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8 border-b border-border/40 pb-4">
            <Heart className="w-6 h-6 text-primary" />
            <h2 className="font-display font-bold text-2xl text-primary-dark">
              Sesiones Individuales
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {individuales.map((service) => (
              <div
                key={service.id}
                className="bg-surface rounded-2xl p-8 border border-border/40 hover:border-primary/20 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="flex flex-col gap-4">
                  <h3 className="font-display font-bold text-xl text-primary-dark">
                    {service.name}
                  </h3>
                  <p className="font-sans text-sm text-muted leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Meta stats */}
                  <div className="flex flex-wrap gap-4 mt-2 text-xs font-sans font-medium text-muted/95">
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-muted border border-border/30">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{service.duration} minutos</span>
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-muted border border-border/30">
                      <Banknote className="w-4 h-4 text-primary" />
                      <span>
                        ${Number(service.price).toLocaleString("es-CL")} CLP
                      </span>
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-8 border-t border-border/20 mt-6 justify-between items-center">
                  <Link
                    href={`/servicios/${service.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-sans font-bold text-primary hover:underline"
                  >
                    <span>Ver detalles</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href={`/agendar?serviceId=${service.id}`}
                    className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full bg-primary hover:bg-primary-dark text-surface font-sans font-semibold text-xs shadow-xs transition-all hover:-translate-y-0.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Reservar hora</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Talleres Escolares y Adultos */}
        <div>
          <div className="flex items-center gap-3 mb-8 border-b border-border/40 pb-4">
            <Sparkles className="w-6 h-6 text-primary" />
            <h2 className="font-display font-bold text-2xl text-primary-dark">
              Talleres Escolares y Grupales
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {talleres.map((service) => (
              <div
                key={service.id}
                className="bg-surface rounded-2xl p-8 border border-border/40 hover:border-primary/20 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="flex flex-col gap-4">
                  <h3 className="font-display font-bold text-xl text-primary-dark">
                    {service.name}
                  </h3>
                  <p className="font-sans text-sm text-muted leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Meta stats */}
                  <div className="flex flex-wrap gap-4 mt-2 text-xs font-sans font-medium text-muted/95">
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-muted border border-border/30">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{service.duration} minutos</span>
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-muted border border-border/30">
                      <Banknote className="w-4 h-4 text-primary" />
                      <span>
                        ${Number(service.price).toLocaleString("es-CL")} CLP
                      </span>
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-8 border-t border-border/20 mt-6 justify-between items-center">
                  <Link
                    href={`/servicios/${service.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-sans font-bold text-primary hover:underline"
                  >
                    <span>Ver detalles</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href={`/agendar?serviceId=${service.id}`}
                    className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full bg-primary hover:bg-primary-dark text-surface font-sans font-semibold text-xs shadow-xs transition-all hover:-translate-y-0.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Inscribirse</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
