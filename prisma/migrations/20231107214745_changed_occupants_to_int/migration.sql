/*
  Warnings:

  - Changed the type of `occupants` on the `TractRecord` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "TractRecord" DROP COLUMN "occupants",
ADD COLUMN     "occupants" INTEGER NOT NULL;
