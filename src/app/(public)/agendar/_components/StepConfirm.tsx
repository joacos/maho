"use client";

import React, { useState } from "react";
import { useBookingStore } from "@/stores/booking-store";
import { Clock, Calendar, Heart, User, Phone, Mail, FileText, CheckCircle2, Banknote, ShieldAlert, Loader2, Sparkles } from "lucide-react";

export function StepConfirm() {
  const {
    selectedService,
    selectedDate,
    selectedSlot,
    clientData,
    paymentMethod,
    setPaymentMethod,
    prevStep,
    reset,
  } = useBookingStore();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [appointmentId, setAppointmentId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    if (!paymentMethod) {
      setError("Por favor selecciona un método de pago.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (paymentMethod === "TRANSFER") {
        // Create appointment immediately as PENDING
        const response = await fetch("/api/appointments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            serviceId: selectedService?.id,
            date: selectedDate,
            startTime: `${selectedDate}T${selectedSlot?.startTime}:00`,
            endTime: `${selectedDate}T${selectedSlot?.endTime}:00`,
            clientName: clientData.name,
            clientEmail: clientData.email,
            clientPhone: clientData.phone,
            notes: `Paciente: ${clientData.patientName || "N/A"}, Edad: ${clientData.patientAge || "N/A"}. Motivo: ${clientData.notes || "N/A"}`,
            workshopId: selectedSlot?.workshopId,
            paymentMethod: "TRANSFER",
          }),
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message || "Error al registrar la cita.");
        }

        const data = await response.json();
        setAppointmentId(data.appointmentId || "12345");
        setSuccess(true);
        // Clear local storage store state upon successful Transfer booking
        reset();
      } else {
        // GATEWAY (Mercado Pago Integration)
        const response = await fetch("/api/appointments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            serviceId: selectedService?.id,
            date: selectedDate,
            startTime: `${selectedDate}T${selectedSlot?.startTime}:00`,
            endTime: `${selectedDate}T${selectedSlot?.endTime}:00`,
            clientName: clientData.name,
            clientEmail: clientData.email,
            clientPhone: clientData.phone,
            notes: `Paciente: ${clientData.patientName || "N/A"}, Edad: ${clientData.patientAge || "N/A"}. Motivo: ${clientData.notes || "N/A"}`,
            workshopId: selectedSlot?.workshopId,
            paymentMethod: "GATEWAY",
          }),
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message || "Error al crear la orden de pago.");
        }

        const data = await response.json();
        
        // Redirect user to Mercado Pago checkout URL returned by our API
        if (data.initPoint) {
          window.location.href = data.initPoint;
        } else {
          throw new Error("No se pudo iniciar la pasarela de pago.");
        }
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Ocurrió un error inesperado al procesar la cita.");
    } finally {
      setLoading(false);
    }
  };

  // SUCCESS SCREEN FOR BANK TRANSFER
  if (success) {
    return (
      <div className="flex flex-col items-center text-center gap-8 py-10 animate-fade-in max-w-2xl mx-auto">
        <div className="w-16 h-16 rounded-full bg-primary-light/10 text-primary flex items-center justify-center shadow-xs">
          <CheckCircle2 className="w-10 h-10 fill-current text-primary-light" />
        </div>
        
        <div>
          <h2 className="font-display font-bold text-3xl text-primary-dark mb-3">
            ¡Pre-reserva Realizada con Éxito!
          </h2>
          <p className="font-sans text-sm text-muted">
            Tu hora ha sido reservada de forma temporal. Recibirás un correo y un WhatsApp con 
            esta misma información.
          </p>
        </div>

        {/* Bank Details Card */}
        <div className="w-full bg-surface rounded-2xl p-6 border border-border/50 text-left flex flex-col gap-4 shadow-sm">
          <h3 className="font-display font-bold text-sm text-primary-dark uppercase tracking-wider border-b border-border/30 pb-2.5 flex items-center gap-2">
            <Banknote className="w-4 h-4 text-primary" />
            <span>Datos de Transferencia Bancaria</span>
          </h3>
          
          <ul className="flex flex-col gap-2 font-sans text-sm text-muted">
            <li><strong>Banco:</strong> Banco de Chile</li>
            <li><strong>Tipo de Cuenta:</strong> Cuenta Corriente</li>
            <li><strong>Número de Cuenta:</strong> 123-45678-90</li>
            <li><strong>Nombre del Destinatario:</strong> Maho Cayun</li>
            <li><strong>RUT:</strong> 12.345.678-9</li>
            <li><strong>Correo de Envío:</strong> pagos@psicopedagogiavaldivia.cl</li>
            <li><strong>Monto a Transferir:</strong> ${selectedService?.price.toLocaleString("es-CL")} CLP</li>
          </ul>

          <div className="p-3 bg-accent/10 border border-accent/30 rounded-xl flex items-start gap-2.5 mt-2">
            <ShieldAlert className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p className="font-sans text-2xs text-muted leading-relaxed">
              <strong>Importante:</strong> Dispones de <strong>2 horas</strong> para realizar la 
              transferencia y enviar el comprobante a nuestro correo. Transcurrido ese plazo, el 
              bloque horario se liberará automáticamente.
            </p>
          </div>
        </div>

        <button
          onClick={() => (window.location.href = "/")}
          className="px-6 py-3 rounded-full bg-primary hover:bg-primary-dark text-surface font-sans font-bold text-sm shadow-md"
        >
          Volver al Inicio
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div className="text-left">
        <h2 className="font-display font-bold text-2xl text-primary-dark mb-2">
          Paso 4: Confirma tu Cita
        </h2>
        <p className="font-sans text-sm text-muted">
          Revisa el resumen de tu sesión y selecciona tu forma de pago favorita para finalizar.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-left">
          <p className="font-sans text-xs text-red-500">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Summary (7 cols on lg) */}
        <div className="lg:col-span-7 bg-surface rounded-2xl p-6 border border-border/40 shadow-xs flex flex-col gap-6">
          <h3 className="font-display font-bold text-base text-primary-dark border-b border-border/20 pb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <span>Resumen de Reserva</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm font-sans">
            {/* Service & Time */}
            <div className="flex flex-col gap-4 p-4.5 rounded-xl bg-surface-muted border border-border/20">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-primary fill-primary" />
                <span className="font-semibold text-primary-dark">Detalle de Sesión</span>
              </div>
              <ul className="flex flex-col gap-1.5 text-muted text-xs">
                <li><strong>Servicio:</strong> {selectedService?.name}</li>
                <li><strong>Duración:</strong> {selectedService?.duration} minutos</li>
                <li><strong>Fecha:</strong> {selectedDate}</li>
                <li><strong>Hora:</strong> {selectedSlot?.startTime} - {selectedSlot?.endTime} hrs</li>
                <li><strong>Monto:</strong> ${selectedService?.price.toLocaleString("es-CL")} CLP</li>
              </ul>
            </div>

            {/* Patient & Contact */}
            <div className="flex flex-col gap-4 p-4.5 rounded-xl bg-surface-muted border border-border/20">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                <span className="font-semibold text-primary-dark">Datos de Contacto</span>
              </div>
              <ul className="flex flex-col gap-1.5 text-muted text-xs">
                <li><strong>Tutor:</strong> {clientData.name}</li>
                <li><strong>Correo:</strong> {clientData.email}</li>
                <li><strong>WhatsApp:</strong> {clientData.phone}</li>
                {clientData.patientName && (
                  <li>
                    <strong>Paciente:</strong> {clientData.patientName} 
                    {clientData.patientAge && ` (${clientData.patientAge} años)`}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Payments Option (5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-surface rounded-2xl p-6 border border-border/40 shadow-xs flex flex-col gap-6">
            <h3 className="font-display font-semibold text-base text-primary-dark border-b border-border/20 pb-3 flex items-center gap-2">
              <Banknote className="w-5 h-5 text-primary" />
              <span>Método de Pago</span>
            </h3>

            <div className="flex flex-col gap-4">
              {/* Option A: Mercado Pago */}
              <button
                type="button"
                onClick={() => setPaymentMethod("GATEWAY")}
                className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all relative ${
                  paymentMethod === "GATEWAY"
                    ? "border-primary bg-primary/5 shadow-xs"
                    : "border-border/60 hover:bg-surface-muted"
                }`}
              >
                <div className="w-5 h-5 rounded-full border border-border/80 flex items-center justify-center shrink-0 mt-0.5">
                  {paymentMethod === "GATEWAY" && (
                    <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-bold text-xs text-primary-dark flex items-center gap-1.5">
                    <span>Pago en Línea</span>
                    <span className="text-[9px] bg-accent/25 text-primary-dark px-1.5 py-0.5 rounded-full font-semibold">
                      Pasarela
                    </span>
                  </span>
                  <span className="font-sans text-3xs text-muted mt-1">
                    Paga con Tarjeta de Crédito, Débito o Cuenta Rut mediante Mercado Pago.
                  </span>
                </div>
              </button>

              {/* Option B: Bank Transfer */}
              <button
                type="button"
                onClick={() => setPaymentMethod("TRANSFER")}
                className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all relative ${
                  paymentMethod === "TRANSFER"
                    ? "border-primary bg-primary/5 shadow-xs"
                    : "border-border/60 hover:bg-surface-muted"
                }`}
              >
                <div className="w-5 h-5 rounded-full border border-border/80 flex items-center justify-center shrink-0 mt-0.5">
                  {paymentMethod === "TRANSFER" && (
                    <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-bold text-xs text-primary-dark">
                    Transferencia Bancaria
                  </span>
                  <span className="font-sans text-3xs text-muted mt-1">
                    Realiza una transferencia manual y envía tu comprobante dentro de 2 horas.
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons inside form context */}
      <div className="flex justify-between items-center mt-6 pt-6 border-t border-border/20">
        <button
          onClick={prevStep}
          disabled={loading}
          className="px-5 py-2.5 rounded-full bg-surface-muted hover:bg-border/60 text-primary border border-border/80 font-sans text-sm font-semibold transition-all"
        >
          Atrás
        </button>
        <button
          onClick={handleConfirm}
          disabled={loading || !paymentMethod}
          className="px-6 py-2.5 rounded-full bg-primary hover:bg-primary-dark text-surface font-sans text-sm font-semibold shadow-xs flex items-center gap-2 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:pointer-events-none"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Procesando...</span>
            </>
          ) : (
            <span>Confirmar Cita</span>
          )}
        </button>
      </div>
    </div>
  );
}
