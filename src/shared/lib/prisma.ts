import { PrismaClient } from "@prisma/client";

declare global {
  // Reused across hot reloads in development so we don't exhaust database connections.

  var prismaClient: PrismaClient | undefined;
}

export const prisma = globalThis.prismaClient ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaClient = prisma;
}
