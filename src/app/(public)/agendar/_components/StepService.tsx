"use client";

import React from "react";
import { useBookingStore, type SelectedService } from "@/stores/booking-store";
import { ServiceType } from "@prisma/client";
import { Clock, Banknote, Heart, Sparkles, Check } from "lucide-react";

interface ServiceProps {
  id: string;
  name: string;
  duration: number;
  price: number;
  type: ServiceType;
  description: string | null;
}

interface StepServiceProps {
  services: ServiceProps[];
}

export function StepService({ services }: StepServiceProps) {
  const { selectedService, setSelectedService, nextStep } = useBookingStore();

  const handleSelect = (service: ServiceProps) => {
    setSelectedService({
      id: service.id,
      name: service.name,
      duration: service.duration,
      price: Number(service.price),
      type: service.type as "INDIVIDUAL" | "WORKSHOP",
    });
    nextStep();
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div className="text-left">
        <h2 className="font-display font-bold text-2xl text-primary-dark mb-2">
          Paso 1: Elige un Servicio
        </h2>
        <p className="font-sans text-sm text-muted">
          Selecciona la sesión individual o taller grupal de tu interés para continuar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => {
          const isSelected = selectedService?.id === service.id;

          return (
            <button
              key={service.id}
              onClick={() => handleSelect(service)}
              className={`text-left flex flex-col justify-between p-6 rounded-2xl border transition-all relative ${
                isSelected
                  ? "border-primary bg-primary/5 shadow-md ring-2 ring-primary/20"
                  : "border-border/40 hover:border-primary/20 hover:bg-surface-muted bg-surface shadow-xs"
              }`}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-surface shadow-xs animate-scale-in">
                  <Check className="w-4 h-4" />
                </div>
              )}

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  {service.type === ServiceType.INDIVIDUAL ? (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary font-sans font-semibold text-2xs uppercase tracking-wider">
                      <Heart className="w-3 h-3 fill-current" />
                      <span>Individual</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/15 text-primary-dark font-sans font-semibold text-2xs uppercase tracking-wider">
                      <Sparkles className="w-3 h-3" />
                      <span>Taller</span>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-display font-bold text-lg text-primary-dark mb-2.5 leading-snug">
                    {service.name}
                  </h3>
                  <p className="font-sans text-xs text-muted leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Specs */}
              <div className="flex gap-4 mt-6 pt-4 border-t border-border/20 text-2xs font-sans font-semibold text-muted/90 w-full">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span>{service.duration} mins</span>
                </span>
                <span className="flex items-center gap-1">
                  <Banknote className="w-3.5 h-3.5 text-primary" />
                  <span>${Number(service.price).toLocaleString("es-CL")} CLP</span>
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
