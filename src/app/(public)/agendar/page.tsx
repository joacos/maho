"use client";

import React, { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useBookingStore } from "@/stores/booking-store";
import { StepService } from "./_components/StepService";
import { StepDateTime } from "./_components/StepDateTime";
import { StepForm } from "./_components/StepForm";
import { StepConfirm } from "./_components/StepConfirm";
import { ServiceType } from "@prisma/client";
import { Heart, Sparkles, CalendarDays, CheckCircle2 } from "lucide-react";

// Mock de servicios por si la base de datos no está conectada
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

function BookingWizardContent() {
  const searchParams = useSearchParams();
  const {
    currentStep,
    setCurrentStep,
    selectedService,
    setSelectedService,
  } = useBookingStore();

  const [services, setServices] = React.useState<any[]>(MOCK_SERVICES);

  // Fetch actual services if available, else fallback to mock
  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch("/api/services");
        if (res.ok) {
          const data = await res.json();
          if (data.services && data.services.length > 0) {
            setServices(data.services);
          }
        }
      } catch (err) {
        console.warn("No se pudieron cargar los servicios de la API, usando mocks.");
      }
    }
    fetchServices();
  }, []);

  // Pre-select service from URL query param if present
  useEffect(() => {
    const serviceId = searchParams.get("serviceId");
    if (serviceId && services.length > 0) {
      const matched = services.find((s) => s.id === serviceId);
      if (matched) {
        setSelectedService({
          id: matched.id,
          name: matched.name,
          duration: matched.duration,
          price: Number(matched.price),
          type: matched.type as "INDIVIDUAL" | "WORKSHOP",
        });
        setCurrentStep(2); // Jump directly to date/time selection
      }
    }
  }, [searchParams, services, setSelectedService, setCurrentStep]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepService services={services} />;
      case 2:
        return <StepDateTime />;
      case 3:
        return <StepForm />;
      case 4:
        return <StepConfirm />;
      default:
        return <StepService services={services} />;
    }
  };

  const steps = [
    { number: 1, label: "Servicio", icon: Heart },
    { number: 2, label: "Horario", icon: CalendarDays },
    { number: 3, label: "Tus Datos", icon: Sparkles },
    { number: 4, label: "Confirmación", icon: CheckCircle2 },
  ];

  return (
    <div className="max-w-4xl mx-auto bg-surface rounded-3xl border border-border/40 shadow-xl overflow-hidden mt-6 md:mt-12 mb-20">
      {/* Step Indicator Header */}
      <div className="bg-gradient-to-r from-primary/10 via-surface to-primary/5 border-b border-border/30 px-6 py-6 md:px-12">
        <div className="flex justify-between items-center relative">
          {/* Connector Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border/40 -translate-y-1/2 z-0 hidden sm:block" />
          <div
            className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 z-0 transition-all duration-300 hidden sm:block"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />

          {steps.map((step) => {
            const Icon = step.icon;
            const isCompleted = currentStep > step.number;
            const isActive = currentStep === step.number;

            return (
              <div key={step.number} className="flex flex-col items-center gap-2 z-10">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold font-sans text-xs transition-all border ${
                    isCompleted
                      ? "bg-primary text-surface border-primary shadow-xs"
                      : isActive
                      ? "bg-surface text-primary border-primary ring-4 ring-primary/10 shadow-md font-bold"
                      : "bg-surface text-muted/60 border-border"
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-5 h-5 fill-current text-primary-light" /> : <Icon className="w-4 h-4" />}
                </div>
                <span
                  className={`font-sans text-3xs uppercase tracking-wider font-bold ${
                    isActive ? "text-primary" : "text-muted/60"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Wizard Content Area */}
      <div className="p-6 md:p-12">
        {renderStep()}
      </div>
    </div>
  );
}

export default function AgendarPage() {
  return (
    <div className="py-12 md:py-20 bg-gradient-to-br from-surface to-surface-muted min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8 flex flex-col gap-3">
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-primary-dark tracking-tight">
            Reserva tu Sesión
          </h1>
          <p className="font-sans text-sm text-muted">
            Planifica tu cita de forma rápida e inteligente. Sigue los pasos para confirmar tu bloque de atención.
          </p>
        </div>

        <Suspense fallback={
          <div className="max-w-4xl mx-auto bg-surface rounded-3xl border border-border/40 shadow-xl overflow-hidden mt-6 md:mt-12 p-12 text-center flex flex-col items-center justify-center gap-4">
            <div className="w-8 h-8 text-primary animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
            <p className="font-sans text-sm text-muted">Cargando asistente de reserva...</p>
          </div>
        }>
          <BookingWizardContent />
        </Suspense>
      </div>
    </div>
  );
}
