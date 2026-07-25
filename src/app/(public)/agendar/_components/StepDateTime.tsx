"use client";

import React, { useState, useEffect } from "react";
import { useBookingStore } from "@/stores/booking-store";
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isBefore, isSameDay, getDay, isSunday, isToday } from "date-fns";
import { es } from "date-fns/locale";
import { Clock, Calendar as CalendarIcon, ArrowLeft, ArrowRight, Loader2, Sparkles } from "lucide-react";

interface Slot {
  id?: string;
  startTime: string; // HH:mm
  endTime: string;   // HH:mm
  workshopId?: string;
  capacityLeft?: number;
}

export function StepDateTime() {
  const {
    selectedService,
    selectedDate,
    setSelectedDate,
    selectedSlot,
    setSelectedSlot,
    nextStep,
    prevStep,
  } = useBookingStore();

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generate calendar days for the current month view
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Add padding days at the beginning of the calendar grid
  const startDayOfWeek = getDay(monthStart); // 0=Sunday, 1=Monday...
  // Adjust so Monday is 0, Sunday is 6
  const adjustedStartDay = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
  const paddingDays = Array(adjustedStartDay).fill(null);

  const handlePrevMonth = () => {
    setCurrentMonth(addMonths(currentMonth, -1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const isDateDisabled = (date: Date) => {
    // Disable dates within 2 days from today
    const minDate = new Date();
    minDate.setHours(0, 0, 0, 0);
    minDate.setDate(minDate.getDate() + 2); // At least 2 days in advance

    if (isBefore(date, minDate)) return true;

    // Disable Sundays
    if (getDay(date) === 0) return true;

    return false;
  };


  const handleDateSelect = (date: Date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    setSelectedDate(formattedDate);
    setSelectedSlot(null); // Clear selected slot when date changes
  };

  // Fetch slots when selectedDate or selectedService changes
  useEffect(() => {
    if (!selectedDate || !selectedService) return;

    const fetchSlots = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `/api/slots?serviceId=${selectedService.id}&date=${selectedDate}`
        );
        if (!response.ok) {
          throw new Error("No se pudieron cargar los horarios disponibles.");
        }
        const data = await response.json();
        setSlots(data.slots || []);
      } catch (err: any) {
        console.error(err);
        setError("Error de conexión. Inténtalo de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [selectedDate, selectedService]);

  const handleSlotSelect = (slot: Slot) => {
    setSelectedSlot({
      id: slot.id,
      startTime: slot.startTime,
      endTime: slot.endTime,
      workshopId: slot.workshopId,
    });
  };

  const handleContinue = () => {
    if (selectedSlot) {
      nextStep();
    }
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div className="text-left flex justify-between items-start gap-4">
        <div>
          <h2 className="font-display font-bold text-2xl text-primary-dark mb-2">
            Paso 2: Fecha y Hora
          </h2>
          <p className="font-sans text-sm text-muted">
            Elige el día y bloque de horario disponible. Por coordinación y arriendo de box, las reservas requieren al menos 48 horas de anticipación.
          </p>
        </div>
        
        {/* Service summary badge */}
        <div className="hidden sm:flex flex-col items-end gap-1 shrink-0 bg-primary/5 px-4 py-2.5 rounded-xl border border-primary/10">
          <span className="font-sans text-3xs font-semibold uppercase tracking-wider text-primary">
            Servicio
          </span>
          <span className="font-display font-bold text-xs text-primary-dark leading-tight max-w-[150px] text-right truncate">
            {selectedService?.name}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Calendar Column (7 cols on lg) */}
        <div className="lg:col-span-7 bg-surface rounded-2xl p-6 border border-border/40 shadow-xs flex flex-col gap-6">
          {/* Calendar Header */}
          <div className="flex justify-between items-center">
            <span className="font-display font-bold text-base text-primary-dark uppercase tracking-wider">
              {format(currentMonth, "MMMM yyyy", { locale: es })}
            </span>
            <div className="flex gap-2">
              <button
                onClick={handlePrevMonth}
                disabled={isBefore(currentMonth, new Date())}
                className="p-1.5 rounded-lg border border-border/40 hover:bg-surface-muted transition-colors disabled:opacity-30 disabled:pointer-events-none text-primary"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextMonth}
                className="p-1.5 rounded-lg border border-border/40 hover:bg-surface-muted transition-colors text-primary"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-7 gap-1.5 text-center font-sans text-xs">
            {/* Week Headers */}
            {["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"].map((day, idx) => (
              <span key={idx} className="font-bold text-primary py-2">
                {day}
              </span>
            ))}

            {/* Padding days */}
            {paddingDays.map((_, idx) => (
              <span key={`pad-${idx}`} className="py-2" />
            ))}

            {/* Day grid */}
            {days.map((date) => {
              const formatted = format(date, "yyyy-MM-dd");
              const isSelected = selectedDate === formatted;
              const disabled = isDateDisabled(date);
              const isCurrentDay = isToday(date);

              return (
                <button
                  key={formatted}
                  onClick={() => handleDateSelect(date)}
                  disabled={disabled}
                  className={`py-2.5 rounded-lg text-sm font-sans font-medium transition-all relative ${
                    isSelected
                      ? "bg-primary text-surface font-bold shadow-xs scale-102"
                      : disabled
                      ? "text-muted/40 cursor-not-allowed"
                      : isCurrentDay
                      ? "text-primary font-bold border border-primary/30 bg-primary/5 hover:bg-primary/10"
                      : "text-foreground hover:bg-surface-muted hover:text-primary"
                  }`}
                >
                  <span>{format(date, "d")}</span>
                  {isCurrentDay && !isSelected && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Slots Column (5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-surface rounded-2xl p-6 border border-border/40 shadow-xs min-h-[300px] flex flex-col justify-between">
            <div>
              <h3 className="font-display font-semibold text-base text-primary-dark border-b border-border/20 pb-3 mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>Horarios Disponibles</span>
              </h3>

              {!selectedDate ? (
                <div className="flex flex-col items-center justify-center py-12 text-center text-muted font-sans text-sm gap-2">
                  <CalendarIcon className="w-8 h-8 text-primary-light animate-pulse-slow" />
                  <p>Por favor selecciona un día del calendario para ver las horas libres.</p>
                </div>
              ) : loading ? (
                <div className="flex flex-col items-center justify-center py-16 text-center text-muted font-sans text-sm gap-2">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  <p>Buscando horas disponibles...</p>
                </div>
              ) : error ? (
                <p className="text-center text-red-500 font-sans text-sm py-12">{error}</p>
              ) : slots.length === 0 ? (
                <div className="text-center text-muted font-sans text-sm py-12 flex flex-col items-center gap-2">
                  <Clock className="w-8 h-8 text-primary-light/60" />
                  <p>No hay bloques disponibles para el día seleccionado.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 max-h-[250px] overflow-y-auto pr-1">
                  {slots.map((slot, idx) => {
                    const isSelected =
                      selectedSlot?.startTime === slot.startTime &&
                      selectedSlot?.endTime === slot.endTime;

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSlotSelect(slot)}
                        className={`py-3 px-4 rounded-xl border text-center font-sans text-xs font-semibold transition-all relative ${
                          isSelected
                            ? "bg-primary text-surface border-primary shadow-xs"
                            : "bg-surface hover:bg-surface-muted hover:border-primary/20 border-border/40 text-primary-dark"
                        }`}
                      >
                        <span>{slot.startTime} - {slot.endTime}</span>
                        {slot.capacityLeft !== undefined && (
                          <span className="block text-[9px] mt-1 font-sans opacity-70">
                            {slot.capacityLeft} cupos libres
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Bottom Actions inside the Slot Card */}
            {selectedSlot && (
              <div className="pt-6 border-t border-border/20 mt-6 flex justify-between items-center text-xs font-sans">
                <div className="text-left">
                  <span className="block text-muted">Hora elegida:</span>
                  <span className="font-semibold text-primary">
                    {selectedSlot.startTime} a {selectedSlot.endTime} hrs
                  </span>
                </div>
                <button
                  onClick={handleContinue}
                  className="px-5 py-2.5 rounded-full bg-primary hover:bg-primary-dark text-surface font-semibold shadow-xs"
                >
                  Siguiente
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Form buttons */}
      <div className="flex justify-between items-center mt-6 pt-6 border-t border-border/20">
        <button
          onClick={prevStep}
          className="px-5 py-2.5 rounded-full bg-surface-muted hover:bg-border/60 text-primary border border-border/80 font-sans text-sm font-semibold transition-all"
        >
          Atrás
        </button>
      </div>
    </div>
  );
}
