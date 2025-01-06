import { PrismaClient } from "@prisma/client";
import consola from "consola";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function prismaConnect() {
  /**
   * Load Prsima Client and connect to Prisma Server if failed to connect, throw error.
   */
  const prisma = new PrismaClient();

  await prisma
    .$connect()
    .then(async () => {
      await prisma.$disconnect();
      return consola.ready({
        message: `[Discord Event Logger - ReadyEvt] Connected to Prisma Server`,
        badge: true,
      });
    })
    .catch((err: any) => {
      consola.error({
        message: `[Discord Event Logger - ReadyEvt] Failed to connect to Prisma Server: ${err}`,
        badge: true,
        timestamp: new Date(),
      });
      process.exit(1);
    });
}
