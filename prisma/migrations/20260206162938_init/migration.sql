-- CreateEnum
CREATE TYPE "TwitchResponseType" AS ENUM ('SAY', 'MENTION', 'REPLY');

-- CreateEnum
CREATE TYPE "TwitchAccessLevel" AS ENUM ('EVERYONE', 'SUBSCRIBER', 'REGULAR', 'VIP', 'MODERATOR', 'BROADCASTER');

-- CreateEnum
CREATE TYPE "TwitchStreamStatus" AS ENUM ('ONLINE', 'OFFLINE', 'BOTH');

-- CreateTable
CREATE TABLE "DiscordGuild" (
    "id" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DiscordGuild_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TwitchChannel" (
    "id" TEXT NOT NULL,
    "twitchChannelId" TEXT NOT NULL,
    "guildId" TEXT,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TwitchChannel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TwitchCredential" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "expiresIn" INTEGER NOT NULL,
    "obtainmentTimestamp" BIGINT NOT NULL,
    "scope" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TwitchCredential_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TwitchChatCommand" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "response" TEXT NOT NULL,
    "responseType" "TwitchResponseType" NOT NULL DEFAULT 'SAY',
    "globalCooldown" INTEGER NOT NULL DEFAULT 0,
    "userCooldown" INTEGER NOT NULL DEFAULT 0,
    "accessLevel" "TwitchAccessLevel" NOT NULL DEFAULT 'EVERYONE',
    "limitToUser" TEXT,
    "streamStatus" "TwitchStreamStatus" NOT NULL DEFAULT 'BOTH',
    "hidden" BOOLEAN NOT NULL DEFAULT false,
    "aliases" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "keywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "regex" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TwitchChatCommand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TwitchRegular" (
    "id" TEXT NOT NULL,
    "twitchUserId" TEXT NOT NULL,
    "twitchUsername" TEXT NOT NULL,
    "addedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TwitchRegular_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DiscordGuild_guildId_key" ON "DiscordGuild"("guildId");

-- CreateIndex
CREATE UNIQUE INDEX "TwitchChannel_twitchChannelId_key" ON "TwitchChannel"("twitchChannelId");

-- CreateIndex
CREATE UNIQUE INDEX "TwitchCredential_userId_key" ON "TwitchCredential"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "TwitchChatCommand_name_key" ON "TwitchChatCommand"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TwitchRegular_twitchUserId_key" ON "TwitchRegular"("twitchUserId");

-- AddForeignKey
ALTER TABLE "TwitchChannel" ADD CONSTRAINT "TwitchChannel_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "DiscordGuild"("id") ON DELETE SET NULL ON UPDATE CASCADE;
