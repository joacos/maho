import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ServiceType } from "@prisma/client";

// Mocks temporales en memoria para persistir estados del admin en modo demo
let mockBlockedDays: string[] = ["2026-05-28"];
let mockBlockedSlots: { date: string; startTime: string; endTime: string }[] = [
  { date: "2026-05-27", startTime: "10:30", endTime: "12:00" },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const dateStr = searchParams.get("date"); // YYYY-MM-DD

  try {
    // 1. Intentar base de datos real
    const dbBlockedDays = await prisma.availabilityException.findMany({
      where: { isBlocked: true },
    });

    const dbBlockedSlots = await prisma.timeSlot.findMany({
      where: { isBooked: true },
    });

    const dbAppointments = await prisma.appointment.findMany({
      include: { service: true },
    });

    return NextResponse.json({
      blockedDays: dbBlockedDays.map((d: any) => d.date.toISOString().split("T")[0]),
      blockedSlots: dbBlockedSlots.map((s: any) => ({
        id: s.id,
        date: s.date.toISOString().split("T")[0],
        startTime: s.startTime.toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit", hour12: false }),
        endTime: s.endTime.toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit", hour12: false }),
      })),
      appointments: dbAppointments,
    });
  } catch (error) {
    // 2. Fallback modo mock
    return NextResponse.json({
      blockedDays: mockBlockedDays,
      blockedSlots: mockBlockedSlots,
      appointments: [
        {
          id: "appt-1",
          clientName: "Juan Pérez",
          clientEmail: "juan@correo.cl",
          clientPhone: "+56911112222",
          notes: "Paciente: Diego (8 años). Motivo: Evaluación inicial de lectoescritura.",
          status: "CONFIRMED",
          createdAt: new Date(),
          service: { name: "Acompañamiento Cognitivo Individual" },
          startTime: "2026-05-25T10:30:00",
          endTime: "2026-05-25T11:30:00",
        },
        {
          id: "appt-2",
          clientName: "Ana Silva",
          clientEmail: "ana@correo.cl",
          clientPhone: "+56933334444",
          notes: "Paciente: Sofía (14 años). Motivo: Técnicas de concentración.",
          status: "PENDING",
          createdAt: new Date(),
          service: { name: "Evaluación Psicopedagógica Completa" },
          startTime: "2026-05-26T15:00:00",
          endTime: "2026-05-26T16:30:00",
        },
      ],
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, date, startTime, endTime, serviceId } = body;

    if (!date) {
      return NextResponse.json({ message: "La fecha es obligatoria." }, { status: 400 });
    }

    try {
      if (action === "BLOCK_DAY") {
        await prisma.availabilityException.upsert({
          where: {
            id: `block-${date}`, // Just a deterministic ID for convenience
          },
          update: {
            isBlocked: true,
          },
          create: {
            id: `block-${date}`,
            date: new Date(date),
            isBlocked: true,
            reason: "Bloqueo administrativo",
          },
        });
      } else if (action === "BLOCK_SLOT") {
        if (!startTime || !endTime) {
          return NextResponse.json({ message: "startTime y endTime son requeridos." }, { status: 400 });
        }
        
        // Crear slot reservado en la DB para bloquearlo de cara al público
        await prisma.timeSlot.create({
          data: {
            serviceId: serviceId || "serv-1",
            date: new Date(date),
            startTime: new Date(`${date}T${startTime}:00`),
            endTime: new Date(`${date}T${endTime}:00`),
            isBooked: true,
          },
        });
      } else if (action === "UNBLOCK_DAY") {
        await prisma.availabilityException.deleteMany({
          where: {
            date: new Date(date),
          },
        });
      }

      return NextResponse.json({ success: true, message: "Operación realizada con éxito." });
    } catch (dbError) {
      // Fallback mocks
      if (action === "BLOCK_DAY") {
        if (!mockBlockedDays.includes(date)) {
          mockBlockedDays.push(date);
        }
      } else if (action === "BLOCK_SLOT") {
        if (startTime && endTime) {
          mockBlockedSlots.push({ date, startTime, endTime });
        }
      } else if (action === "UNBLOCK_DAY") {
        mockBlockedDays = mockBlockedDays.filter((d) => d !== date);
        mockBlockedSlots = mockBlockedSlots.filter((s) => s.date !== date);
      }

      return NextResponse.json({
        success: true,
        message: "Operación realizada con éxito (modo simulado).",
      });
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Error del servidor." }, { status: 500 });
  }
}
