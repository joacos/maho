import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

let prismaInstance: any;

try {
  const connectionString = process.env.DATABASE_URL || "";
  
  if (
    !connectionString ||
    connectionString.includes("[password]") ||
    connectionString.includes("tu_") ||
    connectionString.includes("placeholder")
  ) {
    throw new Error("Missing or invalid connection string (contains placeholder).");
  }

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  
  prismaInstance = new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
} catch (error) {
  console.warn("⚠️ Base de datos no conectada. Activando modo mock de alta fidelidad.", error);
  
  // High-fidelity proxy fallback that catches all prisma calls and throws,
  // allowing the application's native try-catch logic to serve beautiful mock data
  prismaInstance = new Proxy({} as any, {
    get(target, prop) {
      if (prop === "$on" || prop === "$connect" || prop === "$disconnect" || prop === "$use") {
        return () => Promise.resolve();
      }
      return new Proxy({} as any, {
        get(target2, prop2) {
          return () => {
            throw new Error("Database not connected. Fallback mocks are active.");
          };
        }
      });
    }
  });
}

export const prisma = globalForPrisma.prisma || prismaInstance;

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
