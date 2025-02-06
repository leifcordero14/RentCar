/*
  Warnings:

  - A unique constraint covering the columns `[cedula]` on the table `Cliente` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cedula]` on the table `Empleado` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[descripcion]` on the table `Marca` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[descripcion]` on the table `Modelo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[descripcion]` on the table `TipoCombustible` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[descripcion]` on the table `TipoVehiculo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Cliente_cedula_key` ON `Cliente`(`cedula`);

-- CreateIndex
CREATE UNIQUE INDEX `Empleado_cedula_key` ON `Empleado`(`cedula`);

-- CreateIndex
CREATE UNIQUE INDEX `Marca_descripcion_key` ON `Marca`(`descripcion`);

-- CreateIndex
CREATE UNIQUE INDEX `Modelo_descripcion_key` ON `Modelo`(`descripcion`);

-- CreateIndex
CREATE UNIQUE INDEX `TipoCombustible_descripcion_key` ON `TipoCombustible`(`descripcion`);

-- CreateIndex
CREATE UNIQUE INDEX `TipoVehiculo_descripcion_key` ON `TipoVehiculo`(`descripcion`);
