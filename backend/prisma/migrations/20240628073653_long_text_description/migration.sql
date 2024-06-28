/*
  Warnings:

  - Made the column `description` on table `photo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `photo` MODIFY `description` TEXT NOT NULL;
