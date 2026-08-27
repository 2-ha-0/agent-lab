-- CreateEnum
CREATE TYPE "TraitKind" AS ENUM ('MAIN', 'UNIQUE', 'STARGAZER');

-- CreateTable
CREATE TABLE "TraitInfo" (
    "id" TEXT NOT NULL,
    "apiName" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "kind" "TraitKind" NOT NULL,
    "description" TEXT NOT NULL,
    "breakpoints" JSONB NOT NULL,
    "champions" JSONB NOT NULL,
    "constellation" TEXT,
    "traitKey" "Trait",
    "version" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TraitInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TraitInfo_kind_version_idx" ON "TraitInfo"("kind", "version");

-- CreateIndex
CREATE INDEX "TraitInfo_name_version_idx" ON "TraitInfo"("name", "version");

-- CreateIndex
CREATE UNIQUE INDEX "TraitInfo_apiName_version_key" ON "TraitInfo"("apiName", "version");
