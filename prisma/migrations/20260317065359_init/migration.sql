/*
  Warnings:

  - You are about to drop the `Gost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Korisnik` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rezervacija` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Soba` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Rezervacija" DROP CONSTRAINT "Rezervacija_gostId_fkey";

-- DropForeignKey
ALTER TABLE "Rezervacija" DROP CONSTRAINT "Rezervacija_sobaId_fkey";

-- DropTable
DROP TABLE "Gost";

-- DropTable
DROP TABLE "Korisnik";

-- DropTable
DROP TABLE "Rezervacija";

-- DropTable
DROP TABLE "Soba";
