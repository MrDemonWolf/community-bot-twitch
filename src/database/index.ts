import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import consola from "consola";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function prismaConnect() {
  try {
    await prisma.$connect();
    consola.ready({
      message: "[Twitch Bot - Database] Connected to Prisma Server",
      badge: true,
    });
  } catch (err) {
    consola.error({
      message: `[Twitch Bot - Database] Failed to connect to Prisma Server: ${err}`,
      badge: true,
      timestamp: new Date(),
    });
    process.exit(1);
  }
}
