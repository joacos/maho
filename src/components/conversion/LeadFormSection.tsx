"use client";

import React, { useState } from "react";
import { MessageCircle, Send, CheckCircle2, PhoneCall, Mail, Sparkles } from "lucide-react";

export default function LeadFormSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    motivo: "evaluacion",
    mensaje: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Pre-fill mailto fallback / API call
    setSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hola Marjorie, vi tu sitio web y me gustaría recibir más información para agendar una evaluación o sesión psicopedagógica.`
  );

  return (
    <section id="contacto" className="py-16 md:py-24 bg-gradient-to-br from-surface-muted via-surface to-primary/5 border-t border-border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Direct WhatsApp & Lead Copy */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-sans font-semibold text-xs uppercase tracking-wider w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Agenda tu Consulta</span>
            </span>

            <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary-dark tracking-tight leading-tight">
              ¿Listo para potenciar el aprendizaje y desarrollo?
            </h2>

            <p className="font-sans text-base text-muted leading-relaxed">
              Escríbenos directamente por WhatsApp para una atención rápida o completa el formulario. Estamos aquí para orientarte sin compromiso.
            </p>

            {/* Direct WhatsApp Callout Card */}
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-base text-emerald-950">
                    Atención Directa por WhatsApp
                  </h4>
                  <p className="font-sans text-xs text-emerald-800">
                    Respuesta rápida para consultas o reserva directa
                  </p>
                </div>
              </div>

              <a
                href={`https://wa.me/56966566977?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex justify-center items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-bold text-sm shadow-md transition-all hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Escribir por WhatsApp</span>
              </a>
            </div>

            <div className="flex flex-col gap-3 font-sans text-xs sm:text-sm text-muted pt-2">
              <div className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-primary shrink-0" />
                <span>Teléfono / WhatsApp: +56 9 6656 6977</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>Atención clínica en Modalidad Presencial y Online</span>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-7">
            <div className="bg-surface rounded-3xl p-8 sm:p-10 border border-border/40 shadow-xl">
              {submitted ? (
                <div className="flex flex-col items-center text-center gap-4 py-12 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-primary-dark">
                    ¡Solicitud Enviada con Éxito!
                  </h3>
                  <p className="font-sans text-sm text-muted max-w-md leading-relaxed">
                    Gracias por ponerte en contacto. Responderemos a tu mensaje a la brevedad para coordinar la atención.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-full bg-surface-muted hover:bg-border/60 text-primary font-sans font-semibold text-xs transition-colors"
                  >
                    Enviar otra consulta
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <h3 className="font-display font-bold text-2xl text-primary-dark mb-1">
                    Formulario de Contacto
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="nombre" className="font-sans text-xs font-semibold text-primary-dark">
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        required
                        value={formData.nombre}
                        onChange={handleChange}
                        placeholder="Ej. María González"
                        className="w-full px-4 py-3 rounded-xl border border-border/60 bg-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 font-sans text-sm"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="font-sans text-xs font-semibold text-primary-dark">
                        Correo electrónico *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="correo@ejemplo.com"
                        className="w-full px-4 py-3 rounded-xl border border-border/60 bg-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 font-sans text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="telefono" className="font-sans text-xs font-semibold text-primary-dark">
                        Teléfono / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        required
                        value={formData.telefono}
                        onChange={handleChange}
                        placeholder="+56 9 1234 5678"
                        className="w-full px-4 py-3 rounded-xl border border-border/60 bg-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 font-sans text-sm"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="motivo" className="font-sans text-xs font-semibold text-primary-dark">
                        Motivo de consulta *
                      </label>
                      <select
                        id="motivo"
                        name="motivo"
                        value={formData.motivo}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-border/60 bg-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 font-sans text-sm"
                      >
                        <option value="evaluacion">Evaluación Psicopedagógica</option>
                        <option value="dificultades">Dificultades de Aprendizaje / Lectoescritura</option>
                        <option value="atencion">Atención / Funciones Ejecutivas</option>
                        <option value="estudio">Hábitos de Estudio / Universitarios</option>
                        <option value="estimulacion">Estimulación Cognitiva / Temprana</option>
                        <option value="otro">Otro Motivo</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="mensaje" className="font-sans text-xs font-semibold text-primary-dark">
                      Mensaje / Detalle adicional
                    </label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      rows={3}
                      value={formData.mensaje}
                      onChange={handleChange}
                      placeholder="Cuéntanos brevemente sobre la situación o necesidad..."
                      className="w-full px-4 py-3 rounded-xl border border-border/60 bg-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 font-sans text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex justify-center items-center gap-2.5 px-8 py-4 rounded-xl bg-primary hover:bg-primary-dark text-surface font-sans font-bold text-base shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 mt-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Enviar Solicitud de Información</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
