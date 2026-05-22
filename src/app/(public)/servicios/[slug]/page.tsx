import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ServiceType } from "@prisma/client";
import { Heart, Calendar, Clock, Banknote, CheckCircle, ArrowLeft } from "lucide-react";

const MOCK_SERVICES = [
  {
    id: "serv-1",
    slug: "acompanamiento-cognitivo-individual",
    name: "Acompañamiento Cognitivo Individual",
    description: "Sesión personalizada enfocada en potenciar habilidades cognitivas, funciones ejecutivas, memoria y procesos de aprendizaje en niños, adolescentes y adultos.",
    type: ServiceType.INDIVIDUAL,
    duration: 60,
    price: 35000.0,
    features: [
      "Evaluación y diagnóstico continuo del progreso.",
      "Plan de trabajo 100% personalizado según necesidades.",
      "Ejercicios prácticos de memoria, atención y razonamiento lógico.",
      "Acompañamiento y orientación a los padres/tutores.",
      "Estimulación de funciones ejecutivas (planificación y organización)."
    ]
  },
  {
    id: "serv-2",
    slug: "evaluacion-psicopedagogica-completa",
    name: "Evaluación Psicopedagógica Completa",
    description: "Evaluación diagnóstica integral para identificar dificultades de aprendizaje, estilo cognitivo, y áreas fuertes para trazar un plan de apoyo adaptado.",
    type: ServiceType.INDIVIDUAL,
    duration: 90,
    price: 45000.0,
    features: [
      "Aplicación de pruebas psicométricas estandarizadas.",
      "Análisis exhaustivo del estilo de aprendizaje y ritmo cognitivo.",
      "Entrevista en profundidad con los padres/tutores.",
      "Informe clínico psicopedagógico detallado.",
      "Recomendaciones concretas para el colegio y el hogar."
    ]
  },
  {
    id: "serv-3",
    slug: "taller-estimulacion-temprana",
    name: "Taller de Estimulación Temprana",
    description: "Sesiones grupales lúdicas diseñadas para potenciar el desarrollo integral (motor, social y cognitivo) en niños pequeños de 3 a 5 años.",
    type: ServiceType.WORKSHOP,
    duration: 90,
    price: 15000.0,
    features: [
      "Actividades de motricidad fina y coordinación espacial.",
      "Juegos y dinámicas de sociabilización grupal.",
      "Estimulación de lenguaje y vocabulario a través de cuentos y cantos.",
      "Grupos reducidos (máximo 8 niños) para atención focalizada.",
      "Incluye todos los materiales lúdicos e interactivos."
    ]
  },
  {
    id: "serv-4",
    slug: "taller-tecnicas-de-estudio",
    name: "Taller de Técnicas de Estudio y Concentración",
    description: "Taller práctico para estudiantes de educación básica y media, donde aprenderán a organizar su tiempo, hacer resúmenes efectivos y mejorar su foco.",
    type: ServiceType.WORKSHOP,
    duration: 120,
    price: 20000.0,
    features: [
      "Método Pomodoro aplicado a la dosificación del estudio.",
      "Técnicas de síntesis: mapas mentales, resúmenes y esquemas visuales.",
      "Estrategias de concentración y reducción de distractores.",
      "Control de la ansiedad y técnicas de relajación ante exámenes.",
      "Entrega de una bitácora o planificador de estudio personalizado."
    ]
  },
];

export async function generateStaticParams() {
  try {
    const services = await prisma.service.findMany({ select: { slug: true } });
    return services.map((s) => ({ slug: s.slug }));
  } catch (error) {
    return MOCK_SERVICES.map((s) => ({ slug: s.slug }));
  }
}

async function getServiceBySlug(slug: string) {
  try {
    const service = await prisma.service.findUnique({ where: { slug } });
    if (service) {
      // Agregar features por defecto o personalizadas según el slug
      const mockMatch = MOCK_SERVICES.find((m) => m.slug === slug);
      return {
        ...service,
        features: mockMatch?.features || ["Sesión con profesional certificada.", "Materiales incluidos.", "Reportes de avance."]
      };
    }
  } catch (error) {
    console.warn("Base de datos no conectada para obtener servicio específico, usando mocks.");
  }
  return MOCK_SERVICES.find((s) => s.slug === slug);
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function DetalleServicioPage({ params }: PageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="py-16 md:py-24 bg-gradient-to-br from-surface to-surface-muted min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/servicios"
          className="inline-flex items-center gap-2 text-sm font-sans font-bold text-muted hover:text-primary mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Volver a Servicios</span>
        </Link>

        {/* Card wrapper */}
        <div className="bg-surface rounded-3xl p-8 md:p-12 border border-border/40 shadow-md">
          {/* Header */}
          <div className="flex flex-col gap-4 border-b border-border/20 pb-8 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-sans font-semibold text-xs uppercase tracking-wider w-fit">
              {service.type === ServiceType.INDIVIDUAL ? "Sesión Individual" : "Taller Grupal"}
            </div>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-primary-dark">
              {service.name}
            </h1>
            <p className="font-sans text-base text-muted leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Details & Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            <div className="flex items-center gap-4 p-4.5 rounded-2xl bg-surface-muted border border-border/30">
              <Clock className="w-8 h-8 text-primary shrink-0" />
              <div>
                <span className="block font-sans text-xs text-muted uppercase font-semibold">
                  Duración
                </span>
                <span className="font-display font-bold text-lg text-primary-dark">
                  {service.duration} minutos
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4.5 rounded-2xl bg-surface-muted border border-border/30">
              <Banknote className="w-8 h-8 text-primary shrink-0" />
              <div>
                <span className="block font-sans text-xs text-muted uppercase font-semibold">
                  Inversión
                </span>
                <span className="font-display font-bold text-lg text-primary-dark">
                  ${Number(service.price).toLocaleString("es-CL")} CLP
                </span>
              </div>
            </div>
          </div>

          {/* Features Checklist */}
          <div className="mb-10">
            <h3 className="font-display font-bold text-lg text-primary-dark mb-5">
              ¿Qué incluye este servicio?
            </h3>
            <ul className="flex flex-col gap-4.5">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-light shrink-0 mt-0.5" />
                  <span className="font-sans text-sm text-muted leading-relaxed">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Row */}
          <div className="border-t border-border/20 pt-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="text-left">
              <span className="block font-sans text-xs text-muted font-medium">
                ¿Listo para agendar?
              </span>
              <span className="font-sans text-sm text-primary font-bold">
                Slots disponibles esta semana
              </span>
            </div>

            <Link
              href={`/agendar?serviceId=${service.id}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-primary hover:bg-primary-dark text-surface font-sans font-bold text-base shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
            >
              <Calendar className="w-5 h-5" />
              <span>Agendar una Sesión</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
