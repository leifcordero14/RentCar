/*
  Warnings:

  - You are about to alter the column `estado` on the `vehiculo` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(9))` to `Enum(EnumId(4))`.

*/
-- AlterTable
ALTER TABLE `vehiculo` MODIFY `estado` ENUM('DISPONIBLE', 'RENTADO', 'MANTENIMIENTO') NOT NULL DEFAULT 'DISPONIBLE';
