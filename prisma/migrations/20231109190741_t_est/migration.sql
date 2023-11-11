/*
  Warnings:

  - A unique constraint covering the columns `[stakeholderId]` on the table `Package` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Package" DROP CONSTRAINT "Package_id_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Package_stakeholderId_key" ON "Package"("stakeholderId");

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_stakeholderId_fkey" FOREIGN KEY ("stakeholderId") REFERENCES "Stakeholder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
