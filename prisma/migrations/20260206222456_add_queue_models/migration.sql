-- CreateEnum
CREATE TYPE "QueueStatus" AS ENUM ('OPEN', 'CLOSED', 'PAUSED');

-- CreateTable
CREATE TABLE "QueueEntry" (
    "id" TEXT NOT NULL,
    "twitchUserId" TEXT NOT NULL,
    "twitchUsername" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QueueEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QueueState" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "status" "QueueStatus" NOT NULL DEFAULT 'CLOSED',

    CONSTRAINT "QueueState_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QueueEntry_twitchUserId_key" ON "QueueEntry"("twitchUserId");
