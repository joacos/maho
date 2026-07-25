import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ServiceType } from "@prisma/client";

const MOCK_SERVICES = [
  {
    id: "serv-1",
    name: "Acompañamiento Cognitivo Individual",
    type: ServiceType.INDIVIDUAL,
    duration: 60,
  },
  {
    id: "serv-2",
    name: "Evaluación Psicopedagógica Completa",
    type: ServiceType.INDIVIDUAL,
    duration: 90,
  },
  {
    id: "serv-3",
    name: "Taller de Estimulación Temprana",
    type: ServiceType.WORKSHOP,
    duration: 90,
  },
  {
    id: "serv-4",
    name: "Taller de Técnicas de Estudio y Concentración",
    type: ServiceType.WORKSHOP,
    duration: 120,
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const serviceId = searchParams.get("serviceId");
  const dateStr = searchParams.get("date");

  if (!serviceId || !dateStr) {
    return NextResponse.json(
      { message: "Faltan parámetros obligatorios: serviceId y date" },
      { status: 400 }
    );
  }

  try {
    // 1. Verificar si el día completo está bloqueado en base de datos
    const isDayBlocked = await prisma.availabilityException.findFirst({
      where: {
        date: new Date(dateStr),
        isBlocked: true,
        startTime: null,
      },
    });

    if (isDayBlocked) {
      return NextResponse.json({ slots: [] });
    }

    // Intentar consultar desde base de datos real si está conectada
    const dbService = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (dbService) {
      if (dbService.type === ServiceType.WORKSHOP) {
        // Consultar workshops reales
        const dbWorkshops = await prisma.workshop.findMany({
          where: {
            serviceId,
            date: new Date(dateStr),
            isActive: true,
          },
        });

        if (dbWorkshops.length > 0) {
          const slots = dbWorkshops.map((w: any) => {
            const start = new Date(w.startTime);
            const end = new Date(w.endTime);
            const formatTime = (d: Date) =>
              d.toLocaleTimeString("es-CL", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              });

            return {
              id: w.id,
              startTime: formatTime(start),
              endTime: formatTime(end),
              workshopId: w.id,
              capacityLeft: w.maxCapacity - w.currentBookings,
            };
          });
          return NextResponse.json({ slots });
        }
      } else {
        // Consultar slots individuales reales
        const dbSlots = await prisma.timeSlot.findMany({
          where: {
            serviceId,
            date: new Date(dateStr),
            isBooked: false,
          },
          orderBy: { startTime: "asc" },
        });

        if (dbSlots.length > 0) {
          const slots = dbSlots.map((s: any) => {
            const start = new Date(s.startTime);
            const end = new Date(s.endTime);
            const formatTime = (d: Date) =>
              d.toLocaleTimeString("es-CL", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              });

            return {
              id: s.id,
              startTime: formatTime(start),
              endTime: formatTime(end),
            };
          });
          return NextResponse.json({ slots });
        }
      }
    }

    // Si la DB está conectada pero no hay datos, o si falla la DB, caemos en el fallback de mocks
    throw new Error("No data found or database disconnected. Fallback to mocks.");
  } catch (error) {
    // 2. Fallback de alta fidelidad con datos simulados
    // Simular que el día "2026-05-28" está bloqueado por defecto
    if (dateStr === "2026-05-28") {
      return NextResponse.json({ slots: [] });
    }

    const service = MOCK_SERVICES.find((s) => s.id === serviceId) || MOCK_SERVICES[0];
    const duration = service.duration;


    if (service.type === ServiceType.WORKSHOP) {
      // Retornar talleres simulados en dos horarios típicos
      const slots = [
        {
          id: `w-mock-${serviceId}-morning`,
          startTime: "10:00",
          endTime: calculateEndTime("10:00", duration),
          workshopId: `w-mock-${serviceId}-morning`,
          capacityLeft: 5,
        },
        {
          id: `w-mock-${serviceId}-afternoon`,
          startTime: "16:00",
          endTime: calculateEndTime("16:00", duration),
          workshopId: `w-mock-${serviceId}-afternoon`,
          capacityLeft: 3,
        },
      ];
      return NextResponse.json({ slots });
    } else {
      // Retornar slots individuales simulados
      const startTimes = ["09:00", "10:30", "12:00", "15:00", "16:30", "18:00"];
      const slots = startTimes.map((start, index) => ({
        id: `slot-mock-${serviceId}-${index}`,
        startTime: start,
        endTime: calculateEndTime(start, duration),
      }));
      return NextResponse.json({ slots });
    }
  }
}

// Función auxiliar para calcular hora de término
function calculateEndTime(startTime: string, durationMinutes: number): string {
  const [hours, minutes] = startTime.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes + durationMinutes;
  const endHours = Math.floor(totalMinutes / 60) % 24;
  const endMinutes = totalMinutes % 60;
  return `${String(endHours).padStart(2, "0")}:${String(endMinutes).padStart(2, "0")}`;
}
