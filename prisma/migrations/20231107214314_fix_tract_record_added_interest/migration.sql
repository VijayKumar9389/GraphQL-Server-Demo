/*
  Warnings:

  - You are about to drop the column `interest` on the `Stakeholder` table. All the data in the column will be lost.
  - Added the required column `interest` to the `TractRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stakeholder" DROP COLUMN "interest";

-- AlterTable
ALTER TABLE "TractRecord" ADD COLUMN     "interest" TEXT NOT NULL;
