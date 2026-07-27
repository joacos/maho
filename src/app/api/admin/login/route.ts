import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    const expectedPassword = process.env.ADMIN_PASSWORD || "maho2026";

    if (password === expectedPassword) {
      const response = NextResponse.json({ success: true, message: "Acceso concedido" });

      response.cookies.set("admin_session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
    } else {
      return NextResponse.json(
        { success: false, error: "Contraseña incorrecta" },
        { status: 401 }
      );
    }
  } catch {
    return NextResponse.json(
      { success: false, error: "Error procesando la solicitud" },
      { status: 500 }
    );
  }
}
