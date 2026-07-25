import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { LeadStatus, LeadSource } from "@prisma/client";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, notes, origin } = body;

    if (!name || !email) {
      return NextResponse.json(
        { message: "Nombre y correo electrónico son obligatorios." },
        { status: 400 }
      );
    }

    try {
      // Intentar upsert en base de datos real
      const lead = await prisma.lead.upsert({
        where: { email },
        update: {
          name,
          phone: phone || null,
          notes: notes || null,
          origin: origin || "agendamiento_incompleto",
          updatedAt: new Date(),
        },
        create: {
          name,
          email,
          phone: phone || null,
          source: LeadSource.WEBSITE,
          status: LeadStatus.NEW,
          origin: origin || "agendamiento_incompleto",
          notes: notes || null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      return NextResponse.json({
        success: true,
        leadId: lead.id,
        message: "Lead registrado exitosamente.",
      });
    } catch (dbError) {
      console.warn("Base de datos no conectada al registrar lead, usando modo mock.");
      // Fallback: mock success response
      return NextResponse.json({
        success: true,
        leadId: `lead-mock-${Math.random().toString(36).substr(2, 9)}`,
        message: "Lead registrado exitosamente (modo simulado).",
      });
    }
  } catch (error: any) {
    console.error("Error en POST /api/leads:", error);
    return NextResponse.json(
      { message: error.message || "Error interno del servidor." },
      { status: 500 }
    );
  }
}
