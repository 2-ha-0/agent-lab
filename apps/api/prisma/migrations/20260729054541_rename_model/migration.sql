/*
  Warnings:

  - You are about to drop the column `traitKey` on the `TraitInfo` table. All the data in the column will be lost.
  - You are about to drop the `Champion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `name` on the `TraitInfo` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "TraitInfo" DROP COLUMN "traitKey",
DROP COLUMN "name",
ADD COLUMN     "name" "Trait" NOT NULL;

-- DropTable
DROP TABLE "Champion";

-- DropTable
DROP TABLE "Item";

-- CreateTable
CREATE TABLE "ChampionInfo" (
    "id" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "traits" "Trait"[],
    "stat_1star" JSONB NOT NULL,
    "stat_2star" JSONB NOT NULL,
    "stat_3star" JSONB NOT NULL,
    "ability" JSONB NOT NULL,
    "version" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChampionInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemInfo" (
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

    CONSTRAINT "ItemInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TraitInfo_name_version_idx" ON "TraitInfo"("name", "version");
