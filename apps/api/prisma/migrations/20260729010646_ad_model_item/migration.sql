-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('AMBLEM', 'COMPONENT', 'COMPLETED_ITEM', 'SET17_SPECIAL_ITEM');

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "type" "ItemType" NOT NULL,
    "name" TEXT NOT NULL,
    "effects" JSONB NOT NULL,
    "composition" JSONB[],
    "unique" BOOLEAN NOT NULL,
    "associatedTraits" "Trait"[],
    "version" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);
