/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `ProjectRecord` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tractRecordId]` on the table `ProjectRecord` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `TractRecord` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProjectRecord_id_key" ON "ProjectRecord"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectRecord_tractRecordId_key" ON "ProjectRecord"("tractRecordId");

-- CreateIndex
CREATE UNIQUE INDEX "TractRecord_id_key" ON "TractRecord"("id");
