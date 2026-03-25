/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Paper` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Competition" ADD COLUMN     "coverImageUrl" TEXT,
ADD COLUMN     "creatorId" TEXT,
ADD COLUMN     "maxEntries" INTEGER,
ADD COLUMN     "prizes" JSONB;

-- AlterTable
ALTER TABLE "CompetitionEntry" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'SUBMITTED';

-- AlterTable
ALTER TABLE "Paper" ADD COLUMN     "coverImageUrl" TEXT,
ADD COLUMN     "slug" TEXT,
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "viewCount" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Paper_slug_key" ON "Paper"("slug");

-- AddForeignKey
ALTER TABLE "Competition" ADD CONSTRAINT "Competition_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
