-- AlterTable
ALTER TABLE `empleado` MODIFY `fechaIngreso` DATE NOT NULL;

-- AlterTable
ALTER TABLE `inspeccion` MODIFY `fecha` DATE NOT NULL;

-- AlterTable
ALTER TABLE `rentadevolucion` MODIFY `fechaRenta` DATE NOT NULL,
    MODIFY `fechaDevolucion` DATE NOT NULL;
