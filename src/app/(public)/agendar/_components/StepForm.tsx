"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBookingStore } from "@/stores/booking-store";
import { clientDataSchema, type ClientDataInput } from "@/schemas/booking-schemas";
import { Clock, Calendar as CalendarIcon, Heart, User, Mail, Phone, CalendarDays, FileText, Loader2 } from "lucide-react";

export function StepForm() {
  const {
    selectedService,
    selectedDate,
    selectedSlot,
    clientData,
    setClientData,
    nextStep,
    prevStep,
  } = useBookingStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientDataInput>({
    resolver: zodResolver(clientDataSchema),
    defaultValues: {
      name: clientData.name,
      email: clientData.email,
      phone: clientData.phone,
      patientName: clientData.patientName || "",
      patientAge: clientData.patientAge,
      notes: clientData.notes || "",
    },
  });

  const onSubmit = async (data: ClientDataInput) => {
    setLoading(true);
    setError(null);

    // Save in local Zustand store
    setClientData(data);

    try {
      // IMMEDIATE LEAD CAPTURE: Send to POST /api/leads as "agendamiento_incompleto"
      const leadResponse = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          notes: `Datos ingresados en agendamiento. Paciente: ${data.patientName || "N/A"}, Edad: ${data.patientAge || "N/A"}. Motivo: ${data.notes || "N/A"}`,
          origin: "agendamiento_incompleto", // Captures as incomplete booking
        }),
      });

      if (!leadResponse.ok) {
        console.warn("No se pudo registrar el lead en el CRM, pero continuamos con el flujo.");
      }

      // Proceed to confirmation step
      nextStep();
    } catch (err) {
      console.error("Error al capturar lead:", err);
      // We still proceed even if lead capture API fails to avoid blocking the user
      nextStep();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div className="text-left flex justify-between items-start gap-4">
        <div>
          <h2 className="font-display font-bold text-2xl text-primary-dark mb-2">
            Paso 3: Tus Datos de Contacto
          </h2>
          <p className="font-sans text-sm text-muted">
            Por favor ingresa la información del tutor y el paciente para coordinar la cita.
          </p>
        </div>

        {/* Summary side badge */}
        <div className="hidden sm:flex flex-col items-end gap-1 shrink-0 bg-primary/5 px-4 py-2.5 rounded-xl border border-primary/10 text-right">
          <span className="font-display font-bold text-xs text-primary-dark leading-tight">
            {selectedService?.name}
          </span>
          <span className="font-sans text-3xs text-muted">
            {selectedDate} a las {selectedSlot?.startTime} hrs
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Form Fields (8 cols on md) */}
        <div className="md:col-span-8 bg-surface rounded-2xl p-6 border border-border/40 shadow-xs flex flex-col gap-5">
          
          {/* Tutor / Adult Name */}
          <div>
            <label className="flex items-center gap-2 font-display font-semibold text-xs text-primary-dark uppercase tracking-wider mb-2">
              <User className="w-3.5 h-3.5 text-primary" />
              <span>Nombre del Adulto / Tutor *</span>
            </label>
            <input
              {...register("name")}
              type="text"
              placeholder="Ej: María José Carrasco"
              className={`w-full py-2.5 px-4 rounded-xl border font-sans text-sm outline-none transition-all ${
                errors.name
                  ? "border-red-500 bg-red-50/20 focus:ring-2 focus:ring-red-200"
                  : "border-border/60 focus:border-primary/80 focus:ring-2 focus:ring-primary/10"
              }`}
            />
            {errors.name && (
              <p className="font-sans text-2xs text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Contact group */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Email */}
            <div>
              <label className="flex items-center gap-2 font-display font-semibold text-xs text-primary-dark uppercase tracking-wider mb-2">
                <Mail className="w-3.5 h-3.5 text-primary" />
                <span>Correo Electrónico *</span>
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="Ej: maria@correo.cl"
                className={`w-full py-2.5 px-4 rounded-xl border font-sans text-sm outline-none transition-all ${
                  errors.email
                    ? "border-red-500 bg-red-50/20 focus:ring-2 focus:ring-red-200"
                    : "border-border/60 focus:border-primary/80 focus:ring-2 focus:ring-primary/10"
                }`}
              />
              {errors.email && (
                <p className="font-sans text-2xs text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="flex items-center gap-2 font-display font-semibold text-xs text-primary-dark uppercase tracking-wider mb-2">
                <Phone className="w-3.5 h-3.5 text-primary" />
                <span>WhatsApp / Teléfono *</span>
              </label>
              <input
                {...register("phone")}
                type="text"
                placeholder="Ej: +56912345678"
                className={`w-full py-2.5 px-4 rounded-xl border font-sans text-sm outline-none transition-all ${
                  errors.phone
                    ? "border-red-500 bg-red-50/20 focus:ring-2 focus:ring-red-200"
                    : "border-border/60 focus:border-primary/80 focus:ring-2 focus:ring-primary/10"
                }`}
              />
              {errors.phone && (
                <p className="font-sans text-2xs text-red-500 mt-1">{errors.phone.message}</p>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border/20 my-2" />

          {/* Patient group */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Patient Name */}
            <div className="sm:col-span-2">
              <label className="flex items-center gap-2 font-display font-semibold text-xs text-primary-dark uppercase tracking-wider mb-2">
                <Heart className="w-3.5 h-3.5 text-primary" />
                <span>Nombre del Paciente (Opcional)</span>
              </label>
              <input
                {...register("patientName")}
                type="text"
                placeholder="Si aplica (ej: su hijo/a)"
                className="w-full py-2.5 px-4 rounded-xl border border-border/60 focus:border-primary/80 focus:ring-2 focus:ring-primary/10 font-sans text-sm outline-none transition-all"
              />
              {errors.patientName && (
                <p className="font-sans text-2xs text-red-500 mt-1">{errors.patientName.message}</p>
              )}
            </div>

            {/* Patient Age */}
            <div>
              <label className="flex items-center gap-2 font-display font-semibold text-xs text-primary-dark uppercase tracking-wider mb-2">
                <CalendarDays className="w-3.5 h-3.5 text-primary" />
                <span>Edad (Opcional)</span>
              </label>
              <input
                {...register("patientAge")}
                type="number"
                placeholder="Ej: 8"
                className={`w-full py-2.5 px-4 rounded-xl border font-sans text-sm outline-none transition-all ${
                  errors.patientAge
                    ? "border-red-500 bg-red-50/20 focus:ring-2 focus:ring-red-200"
                    : "border-border/60 focus:border-primary/80 focus:ring-2 focus:ring-primary/10"
                }`}
              />
              {errors.patientAge && (
                <p className="font-sans text-2xs text-red-500 mt-1">{errors.patientAge.message}</p>
              )}
            </div>
          </div>

          {/* Notes / Reason for consultation */}
          <div>
            <label className="flex items-center gap-2 font-display font-semibold text-xs text-primary-dark uppercase tracking-wider mb-2">
              <FileText className="w-3.5 h-3.5 text-primary" />
              <span>Motivo de Consulta o Notas Adicionales</span>
            </label>
            <textarea
              {...register("notes")}
              rows={3}
              placeholder="Cuéntanos brevemente cuáles son los desafíos o necesidades que deseas abordar..."
              className="w-full py-2.5 px-4 rounded-xl border border-border/60 focus:border-primary/80 focus:ring-2 focus:ring-primary/10 font-sans text-sm outline-none transition-all resize-none"
            />
            {errors.notes && (
              <p className="font-sans text-2xs text-red-500 mt-1">{errors.notes.message}</p>
            )}
          </div>
        </div>

        {/* Info Column (4 cols on md) */}
        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="bg-surface-muted rounded-2xl p-6 border border-border/40 shadow-xs text-xs font-sans flex flex-col gap-4">
            <h3 className="font-display font-semibold text-sm text-primary-dark tracking-wider uppercase border-b border-border/30 pb-2.5">
              Políticas de Atención
            </h3>
            <ul className="flex flex-col gap-3 text-muted leading-relaxed">
              <li className="list-disc ml-4">
                <strong>Puntualidad:</strong> Te solicitamos llegar 5 minutos antes de tu hora programada.
              </li>
              <li className="list-disc ml-4">
                <strong>Cancelaciones:</strong> Puedes cancelar o reagendar hasta con 24 horas de anticipación sin costo adicional.
              </li>
              <li className="list-disc ml-4">
                <strong>Acompañamiento:</strong> En el caso de niños, se requiere que el tutor esté presente en la primera sesión.
              </li>
            </ul>
          </div>
        </div>

        {/* Buttons inside form context */}
        <div className="md:col-span-12 flex justify-between items-center mt-6 pt-6 border-t border-border/20">
          <button
            type="button"
            onClick={prevStep}
            className="px-5 py-2.5 rounded-full bg-surface-muted hover:bg-border/60 text-primary border border-border/80 font-sans text-sm font-semibold transition-all"
          >
            Atrás
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 rounded-full bg-primary hover:bg-primary-dark text-surface font-sans text-sm font-semibold shadow-xs flex items-center gap-2 hover:-translate-y-0.5 transition-all"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Procesando...</span>
              </>
            ) : (
              <span>Siguiente</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
