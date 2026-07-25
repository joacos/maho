"use client";

import React, { useState, useEffect } from "react";
import { format, addDays, getDay, startOfMonth, endOfMonth, eachDayOfInterval, isBefore, isSameDay, isToday } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar as CalendarIcon, Clock, Lock, Unlock, Eye, Sparkles, Loader2, CheckCircle2, AlertCircle, ShieldAlert, AlertTriangle } from "lucide-react";

interface Appointment {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  notes?: string;
  status: string;
  startTime: string;
  endTime: string;
  service: {
    name: string;
  };
}

interface BlockedSlot {
  id?: string;
  date: string;
  startTime: string;
  endTime: string;
}

export default function AdminDashboardPage() {
  const [selectedDate, setSelectedDate] = useState<string>(format(addDays(new Date(), 2), "yyyy-MM-dd"));
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // States for availability exception CRUD
  const [blockedDays, setBlockedDays] = useState<string[]>([]);
  const [blockedSlots, setBlockedSlots] = useState<BlockedSlot[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  
  const [blockAction, setBlockAction] = useState<"DAY" | "SLOT">("DAY");
  const [startTime, setStartTime] = useState<string>("09:00");
  const [endTime, setEndTime] = useState<string>("10:30");
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Fetch admin dashboard details (blocked slots, appointments)
  const fetchDashboardData = async () => {
    setFetching(true);
    try {
      const res = await fetch("/api/admin/slots");
      if (res.ok) {
        const data = await res.json();
        setBlockedDays(data.blockedDays || []);
        setBlockedSlots(data.blockedSlots || []);
        setAppointments(data.appointments || []);
      }
    } catch (err) {
      console.error("Error al cargar datos del dashboard:", err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleActionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const payload = {
      action: blockAction === "DAY" ? "BLOCK_DAY" : "BLOCK_SLOT",
      date: selectedDate,
      startTime: blockAction === "SLOT" ? startTime : undefined,
      endTime: blockAction === "SLOT" ? endTime : undefined,
    };

    try {
      const res = await fetch("/api/admin/slots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMessage({
          text: blockAction === "DAY" 
            ? "¡Día bloqueado con éxito!" 
            : `¡Bloque horario ${startTime} - ${endTime} bloqueado con éxito!`,
          type: "success",
        });
        fetchDashboardData(); // Refresh list
      } else {
        const errData = await res.json();
        setMessage({ text: errData.message || "Error al aplicar el bloqueo.", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "Error de conexión con el servidor.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleUnblockDay = async (date: string) => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/slots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "UNBLOCK_DAY", date }),
      });

      if (res.ok) {
        setMessage({ text: "¡Día desbloqueado con éxito!", type: "success" });
        fetchDashboardData();
      } else {
        setMessage({ text: "Error al desbloquear el día.", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "Error de conexión.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Calendar rendering math
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDayOfWeek = getDay(monthStart);
  const adjustedStartDay = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
  const paddingDays = Array(adjustedStartDay).fill(null);

  const isSelectedDateBlocked = blockedDays.includes(selectedDate);
  const selectedDateBlockedSlots = blockedSlots.filter((s) => s.date === selectedDate);

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      {/* Overview Banner */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="flex flex-col gap-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-sans font-bold text-xs uppercase tracking-wider w-fit">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Coordinación de Boxes</span>
          </div>
          <h1 className="font-display font-bold text-2xl md:text-3xl text-slate-800 tracking-tight leading-tight">
            Gestión Exclusiva de Disponibilidad
          </h1>
          <p className="font-sans text-sm text-slate-500">
            Controla y bloquea días u horarios específicos para sincronizar con el arriendo de box.
          </p>
        </div>

        {/* Rule Alert Card */}
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4 max-w-sm">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1 font-sans text-xs text-amber-800">
            <span className="font-bold">Regla de Triangulación de Box:</span>
            <span className="leading-relaxed">
              El calendario público restringe reservas automáticas a partir de <strong>2 días después de hoy</strong>.
            </span>
          </div>
        </div>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl flex items-center gap-3 text-sm font-sans ${
            message.type === "success"
              ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
              : "bg-red-50 border border-red-200 text-red-800"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Grid: Calendar / Block Tools & Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Calendar and Admin Availability Form */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          
          {/* Calendar Picker Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col gap-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h2 className="font-display font-bold text-lg text-slate-800 flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-primary" />
                <span>1. Elige una Fecha a Gestionar</span>
              </h2>
              <span className="font-sans text-xs tracking-wider text-primary font-bold uppercase">
                {format(currentMonth, "MMMM yyyy", { locale: es })}
              </span>
            </div>

            <div className="grid grid-cols-7 gap-1.5 text-center font-sans text-xs">
              {["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"].map((day, idx) => (
                <span key={idx} className="font-bold text-primary py-1.5 uppercase tracking-wide">
                  {day}
                </span>
              ))}

              {paddingDays.map((_, idx) => (
                <span key={`pad-${idx}`} className="py-2" />
              ))}

              {days.map((date) => {
                const formatted = format(date, "yyyy-MM-dd");
                const isSelected = selectedDate === formatted;
                const isSunday = getDay(date) === 0;
                const isBlocked = blockedDays.includes(formatted);
                const hasBlockedSlots = blockedSlots.some((s) => s.date === formatted);
                const isCurrent = isToday(date);

                return (
                  <button
                    key={formatted}
                    type="button"
                    onClick={() => setSelectedDate(formatted)}
                    className={`py-3 rounded-xl text-sm font-sans font-semibold transition-all relative flex flex-col items-center justify-center gap-0.5 ${
                      isSelected
                        ? "bg-primary text-white font-bold shadow-xs scale-102"
                        : isBlocked
                        ? "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
                        : hasBlockedSlots
                        ? "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
                        : isSunday
                        ? "text-slate-300 cursor-not-allowed bg-slate-50"
                        : isCurrent
                        ? "text-primary border border-primary/20 bg-primary/5 hover:bg-primary/10"
                        : "text-slate-700 hover:bg-slate-50 hover:text-primary"
                    }`}
                  >
                    <span>{format(date, "d")}</span>
                    {/* Visual Status Dot */}
                    {isBlocked ? (
                      <span className="w-1 h-1 rounded-full bg-red-600" />
                    ) : hasBlockedSlots ? (
                      <span className="w-1 h-1 rounded-full bg-amber-500" />
                    ) : null}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-4 text-3xs font-sans text-slate-500 font-bold border-t border-slate-100 pt-4">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 bg-primary rounded-xs" />
                <span>Fecha Seleccionada</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 bg-red-50 border border-red-200 rounded-xs" />
                <span>Día Completo Bloqueado</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 bg-amber-50 border border-amber-200 rounded-xs" />
                <span>Bloque Específico Bloqueado</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 bg-slate-50 border border-slate-200 rounded-xs text-slate-300" />
                <span>Domingo (No Atendido)</span>
              </span>
            </div>
          </div>

          {/* Action configuration form */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col gap-5">
            <h2 className="font-display font-bold text-lg text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              <span>2. Configurar Bloqueo Administrativo</span>
            </h2>

            <form onSubmit={handleActionSubmit} className="flex flex-col gap-5">
              <div className="flex items-center gap-2.5 text-xs font-sans text-slate-650 bg-slate-50 p-2.5 rounded-xl border border-slate-150">
                <span className="font-bold">Fecha de Aplicación:</span>
                <span className="font-bold text-primary bg-white border border-primary/20 px-2.5 py-0.5 rounded-md">
                  {selectedDate}
                </span>
              </div>

              {/* Action type */}
              <div>
                <label className="block font-display font-semibold text-xs text-slate-700 uppercase tracking-wider mb-2">
                  Tipo de Bloqueo
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setBlockAction("DAY")}
                    className={`py-3 px-4 rounded-xl border text-center font-sans text-xs font-bold transition-all ${
                      blockAction === "DAY"
                        ? "border-primary bg-primary/5 text-primary shadow-2xs"
                        : "border-slate-200 hover:bg-slate-50 text-slate-650"
                    }`}
                  >
                    Día Completo
                  </button>
                  <button
                    type="button"
                    onClick={() => setBlockAction("SLOT")}
                    className={`py-3 px-4 rounded-xl border text-center font-sans text-xs font-bold transition-all ${
                      blockAction === "SLOT"
                        ? "border-primary bg-primary/5 text-primary shadow-2xs"
                        : "border-slate-200 hover:bg-slate-50 text-slate-650"
                    }`}
                  >
                    Bloque Horario Específico
                  </button>
                </div>
              </div>

              {/* Custom Hours form block */}
              {blockAction === "SLOT" && (
                <div className="grid grid-cols-2 gap-4 animate-scale-in">
                  <div>
                    <label className="block font-display font-semibold text-xs text-slate-700 uppercase tracking-wider mb-2">
                      Hora de Inicio
                    </label>
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full py-2.5 px-4 rounded-xl border border-slate-200 font-sans text-sm focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-display font-semibold text-xs text-slate-700 uppercase tracking-wider mb-2">
                      Hora de Fin
                    </label>
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="w-full py-2.5 px-4 rounded-xl border border-slate-200 font-sans text-sm focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none"
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-4 items-center justify-between mt-4 border-t border-slate-100 pt-4">
                {isSelectedDateBlocked ? (
                  <button
                    type="button"
                    onClick={() => handleUnblockDay(selectedDate)}
                    disabled={loading}
                    className="px-5 py-2.5 rounded-full bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 font-sans text-xs font-bold flex items-center gap-1.5"
                  >
                    <Unlock className="w-4 h-4 text-emerald-600 animate-pulse" />
                    <span>Liberar Día Completo</span>
                  </button>
                ) : (
                  <div className="text-xs text-slate-405 font-sans italic">
                    Día transitable sin bloqueos globales.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 rounded-full bg-primary hover:bg-primary-dark text-white font-sans text-xs font-bold flex items-center gap-1.5 shadow-2xs hover:-translate-y-0.5 transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Procesando...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Aplicar Bloqueo</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Bookings Status & Active exceptions */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          
          {/* Active Exceptions List Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col gap-4">
            <h3 className="font-display font-bold text-base text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Lock className="w-4.5 h-4.5 text-primary" />
              <span>Bloqueos del Sistema</span>
            </h3>

            {fetching ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 text-primary animate-spin" />
              </div>
            ) : blockedDays.length === 0 && blockedSlots.length === 0 ? (
              <p className="font-sans text-xs text-slate-450 italic py-4">No hay días ni bloques bloqueados administrativamente.</p>
            ) : (
              <div className="flex flex-col gap-3 max-h-[220px] overflow-y-auto pr-1">
                {/* Blocked Days */}
                {blockedDays.map((day) => (
                  <div key={day} className="flex justify-between items-center p-3 rounded-xl bg-red-50 border border-red-100 font-sans text-xs text-red-800">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-red-600" />
                      <span className="font-bold">Día Completo: {day}</span>
                    </div>
                    <button
                      onClick={() => handleUnblockDay(day)}
                      className="px-2.5 py-1 bg-white hover:bg-red-100 text-red-700 font-bold border border-red-200 rounded-lg shadow-3xs"
                    >
                      Liberar
                    </button>
                  </div>
                ))}

                {/* Blocked Slots */}
                {blockedSlots.map((slot, index) => (
                  <div key={index} className="flex justify-between items-center p-3 rounded-xl bg-amber-50 border border-amber-100 font-sans text-xs text-amber-800">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-600" />
                      <div>
                        <span className="block font-bold">Bloque Horario</span>
                        <span>{slot.date} de {slot.startTime} a {slot.endTime} hrs</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Active Appointments Dashboard List */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col gap-4">
            <h3 className="font-display font-bold text-base text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
              <CalendarIcon className="w-4.5 h-4.5 text-primary" />
              <span>Agenda de Citas</span>
            </h3>

            {fetching ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 text-primary animate-spin" />
              </div>
            ) : appointments.length === 0 ? (
              <p className="font-sans text-xs text-slate-450 italic py-4">No hay reservas de horas registradas.</p>
            ) : (
              <div className="flex flex-col gap-3.5 max-h-[350px] overflow-y-auto pr-1">
                {appointments.map((appt) => {
                  const isConfirmed = appt.status === "CONFIRMED";
                  const start = new Date(appt.startTime);
                  const formattedDate = format(start, "eeee d 'de' MMMM", { locale: es });
                  const formattedTime = start.toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit", hour12: false });

                  return (
                    <div key={appt.id} className="p-4 rounded-xl border border-slate-200/80 bg-slate-50 flex flex-col gap-3 font-sans text-xs relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />

                      <div className="flex justify-between items-start gap-4 pl-1">
                        <div>
                          <span className="block font-bold text-slate-800 text-sm">{appt.clientName}</span>
                          <span className="block text-slate-500 text-3xs font-semibold uppercase">{appt.service.name}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] border ${
                          isConfirmed 
                            ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
                            : "bg-amber-50 border-amber-200 text-amber-800"
                        }`}>
                          {isConfirmed ? "Confirmada" : "Pendiente"}
                        </span>
                      </div>

                      <div className="pl-1 text-slate-600 flex flex-col gap-1 text-[11px]">
                        <div><strong>Fecha y Hora:</strong> <span className="capitalize">{formattedDate}</span> a las {formattedTime} hrs</div>
                        <div><strong>Email:</strong> {appt.clientEmail} &bull; <strong>WhatsApp:</strong> {appt.clientPhone || "No provisto"}</div>
                        {appt.notes && <div className="mt-1 bg-white p-2 rounded-lg border border-slate-150 text-[10px] text-slate-550 leading-relaxed italic">{appt.notes}</div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
