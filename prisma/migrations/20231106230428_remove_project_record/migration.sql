/*
  Warnings:

  - You are about to drop the `ProjectRecord` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProjectRecord" DROP CONSTRAINT "ProjectRecord_tractRecordId_fkey";

-- DropTable
DROP TABLE "ProjectRecord";
