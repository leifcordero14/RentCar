/*
  Warnings:

  - The values [MANTENIMIENTO] on the enum `Vehiculo_estado` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `vehiculo` MODIFY `estado` ENUM('DISPONIBLE', 'RENTADO') NOT NULL DEFAULT 'DISPONIBLE';
