-- DropForeignKey
ALTER TABLE `inspeccion` DROP FOREIGN KEY `Inspeccion_clienteId_fkey`;

-- DropForeignKey
ALTER TABLE `inspeccion` DROP FOREIGN KEY `Inspeccion_empleadoId_fkey`;

-- DropForeignKey
ALTER TABLE `inspeccion` DROP FOREIGN KEY `Inspeccion_vehiculoId_fkey`;

-- DropForeignKey
ALTER TABLE `modelo` DROP FOREIGN KEY `Modelo_marcaId_fkey`;

-- DropForeignKey
ALTER TABLE `rentadevolucion` DROP FOREIGN KEY `RentaDevolucion_clienteId_fkey`;

-- DropForeignKey
ALTER TABLE `rentadevolucion` DROP FOREIGN KEY `RentaDevolucion_empleadoId_fkey`;

-- DropForeignKey
ALTER TABLE `rentadevolucion` DROP FOREIGN KEY `RentaDevolucion_vehiculoId_fkey`;

-- DropForeignKey
ALTER TABLE `vehiculo` DROP FOREIGN KEY `Vehiculo_marcaId_fkey`;

-- DropForeignKey
ALTER TABLE `vehiculo` DROP FOREIGN KEY `Vehiculo_modeloId_fkey`;

-- DropForeignKey
ALTER TABLE `vehiculo` DROP FOREIGN KEY `Vehiculo_tipoCombustibleId_fkey`;

-- DropForeignKey
ALTER TABLE `vehiculo` DROP FOREIGN KEY `Vehiculo_tipoVehiculoId_fkey`;

-- DropIndex
DROP INDEX `Inspeccion_clienteId_fkey` ON `inspeccion`;

-- DropIndex
DROP INDEX `Inspeccion_empleadoId_fkey` ON `inspeccion`;

-- DropIndex
DROP INDEX `Inspeccion_vehiculoId_fkey` ON `inspeccion`;

-- DropIndex
DROP INDEX `Modelo_marcaId_fkey` ON `modelo`;

-- DropIndex
DROP INDEX `RentaDevolucion_clienteId_fkey` ON `rentadevolucion`;

-- DropIndex
DROP INDEX `RentaDevolucion_empleadoId_fkey` ON `rentadevolucion`;

-- DropIndex
DROP INDEX `RentaDevolucion_vehiculoId_fkey` ON `rentadevolucion`;

-- DropIndex
DROP INDEX `Vehiculo_marcaId_fkey` ON `vehiculo`;

-- DropIndex
DROP INDEX `Vehiculo_modeloId_fkey` ON `vehiculo`;

-- DropIndex
DROP INDEX `Vehiculo_tipoCombustibleId_fkey` ON `vehiculo`;

-- DropIndex
DROP INDEX `Vehiculo_tipoVehiculoId_fkey` ON `vehiculo`;

-- AddForeignKey
ALTER TABLE `Modelo` ADD CONSTRAINT `Modelo_marcaId_fkey` FOREIGN KEY (`marcaId`) REFERENCES `Marca`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vehiculo` ADD CONSTRAINT `Vehiculo_tipoVehiculoId_fkey` FOREIGN KEY (`tipoVehiculoId`) REFERENCES `TipoVehiculo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vehiculo` ADD CONSTRAINT `Vehiculo_marcaId_fkey` FOREIGN KEY (`marcaId`) REFERENCES `Marca`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vehiculo` ADD CONSTRAINT `Vehiculo_modeloId_fkey` FOREIGN KEY (`modeloId`) REFERENCES `Modelo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vehiculo` ADD CONSTRAINT `Vehiculo_tipoCombustibleId_fkey` FOREIGN KEY (`tipoCombustibleId`) REFERENCES `TipoCombustible`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inspeccion` ADD CONSTRAINT `Inspeccion_vehiculoId_fkey` FOREIGN KEY (`vehiculoId`) REFERENCES `Vehiculo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inspeccion` ADD CONSTRAINT `Inspeccion_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inspeccion` ADD CONSTRAINT `Inspeccion_empleadoId_fkey` FOREIGN KEY (`empleadoId`) REFERENCES `Empleado`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RentaDevolucion` ADD CONSTRAINT `RentaDevolucion_empleadoId_fkey` FOREIGN KEY (`empleadoId`) REFERENCES `Empleado`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RentaDevolucion` ADD CONSTRAINT `RentaDevolucion_vehiculoId_fkey` FOREIGN KEY (`vehiculoId`) REFERENCES `Vehiculo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RentaDevolucion` ADD CONSTRAINT `RentaDevolucion_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
