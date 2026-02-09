#!/usr/bin/env bash
#
# sync-prisma.sh
#
# Pulls model/enum definitions from the community-bot monorepo (source of truth)
# and builds the local single-file prisma/schema.prisma with this project's
# generator config.
#
# Source: ../community-bot/packages/db/prisma/schema/*.prisma
# Target: prisma/schema.prisma
#
# Only includes the schema files this project needs (not auth, etc.)
#
# Usage: pnpm prisma:sync

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
MONOREPO_SCHEMA_DIR="$PROJECT_DIR/../community-bot/packages/db/prisma/schema"
TARGET="$PROJECT_DIR/prisma/schema.prisma"

# Schema files this project uses (order matters for readability)
SCHEMA_FILES=(
  "discord.prisma"
  "twitch.prisma"
  "queue.prisma"
)

if [ ! -d "$MONOREPO_SCHEMA_DIR" ]; then
  echo "Error: Monorepo schema directory not found at $MONOREPO_SCHEMA_DIR"
  echo "Make sure community-bot is cloned alongside this project."
  exit 1
fi

# Build the schema: local generator/datasource + selected model files from monorepo
{
  cat <<'HEADER'
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

generator client {
  provider   = "prisma-client"
  engineType = "client"
  output     = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
}
HEADER

  for file in "${SCHEMA_FILES[@]}"; do
    filepath="$MONOREPO_SCHEMA_DIR/$file"
    if [ ! -f "$filepath" ]; then
      echo "Warning: $file not found in monorepo schema directory" >&2
      continue
    fi
    echo ""
    echo "// --- $file ---"
    echo ""
    cat "$filepath"
  done
} > "$TARGET"

echo "✓ Synced prisma/schema.prisma from monorepo"
echo "  Source: $MONOREPO_SCHEMA_DIR"
echo "  Files:  ${SCHEMA_FILES[*]}"
echo ""
echo "  Run 'pnpm db:generate' to regenerate the client."
