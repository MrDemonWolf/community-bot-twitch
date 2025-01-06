import { PrismaClient } from "@prisma/client";
import consola from "consola";

export async function connectDatabase() {
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
