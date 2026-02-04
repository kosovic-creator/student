/*
  Warnings:

  - You are about to drop the column `godine` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `pol` on the `Student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "godine",
DROP COLUMN "pol";

-- DropEnum
DROP TYPE "Pol";
