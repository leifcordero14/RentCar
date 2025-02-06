/*
  Warnings:

  - A unique constraint covering the columns `[numChasis]` on the table `Vehiculo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[numMotor]` on the table `Vehiculo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[numPlaca]` on the table `Vehiculo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Vehiculo_numChasis_key` ON `Vehiculo`(`numChasis`);

-- CreateIndex
CREATE UNIQUE INDEX `Vehiculo_numMotor_key` ON `Vehiculo`(`numMotor`);

-- CreateIndex
CREATE UNIQUE INDEX `Vehiculo_numPlaca_key` ON `Vehiculo`(`numPlaca`);
