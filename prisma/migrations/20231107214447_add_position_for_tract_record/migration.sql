/*
  Warnings:

  - Added the required column `position` to the `TractRecord` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `tract` on the `TractRecord` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "TractRecord" ADD COLUMN     "position" INTEGER NOT NULL,
DROP COLUMN "tract",
ADD COLUMN     "tract" INTEGER NOT NULL;
