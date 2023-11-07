/*
  Warnings:

  - Added the required column `isPerson` to the `ProjectRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stakeholderComments` to the `ProjectRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProjectRecord" ADD COLUMN     "isPerson" TEXT NOT NULL,
ADD COLUMN     "stakeholderComments" TEXT NOT NULL;
