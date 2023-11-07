/*
  Warnings:

  - You are about to drop the column `projectId` on the `ProjectRecord` table. All the data in the column will be lost.
  - You are about to drop the column `stakeholderId` on the `ProjectRecord` table. All the data in the column will be lost.
  - Added the required column `position` to the `ProjectRecord` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProjectRecord" DROP CONSTRAINT "ProjectRecord_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectRecord" DROP CONSTRAINT "ProjectRecord_stakeholderId_fkey";

-- AlterTable
ALTER TABLE "ProjectRecord" DROP COLUMN "projectId",
DROP COLUMN "stakeholderId",
ADD COLUMN     "position" INTEGER NOT NULL;
