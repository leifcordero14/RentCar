import { NextFunction, Request, Response } from "express"
import { body, validationResult } from "express-validator"
import APIError from "../../utils/APIError"
import { getErrorMessages } from "../../utils/getErrorMessages"

export const validatePutData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("clienteId")
    .optional()
    .notEmpty().withMessage("El ID del cliente no puede estar vacío")
    .toInt()
    .isInt({ min: 1 }).withMessage("ID del cliente es inválido")
    .run(req)

  await body("vehiculoId")
    .optional()
    .notEmpty().withMessage("El ID del vehículo no puede estar vacío")
    .toInt()
    .isInt({ min: 1 }).withMessage("ID del vehículo es inválido")
    .run(req)

  await body("empleadoId")
    .optional()
    .notEmpty().withMessage("El ID del empleado no puede estar vacío")
    .toInt()
    .isInt({ min: 1 }).withMessage("ID del empleado es inválido")
    .run(req)

  await body("tieneRalladuras")
    .optional()
    .notEmpty().withMessage("El campo de ralladuras no puede estar vacío")
    .isBoolean().withMessage("El campo de ralladuras debe ser un booleano")
    .run(req)

  await body("cantidadCombustible")
    .optional()
    .trim()
    .notEmpty().withMessage("El campo de cantidad de combustible no puede estar vacío")
    .isIn(["1/4", "1/2", "3/4", "Lleno"]).withMessage("El campo de cantidad de combustible debe ser '1/4', '1/2', '3/4' o 'Lleno'")
    .run(req)

  await body("tieneGomaRepuesto")
    .optional()
    .notEmpty().withMessage("El campo de goma de repuesto no puede estar vacío")
    .isBoolean().withMessage("El campo de goma de repuesto debe ser un booleano")
    .run(req)

  await body("tieneGato")
    .optional()
    .notEmpty().withMessage("El campo de gato no puede estar vacío")
    .isBoolean().withMessage("El campo de gato debe ser un booleano")
    .run(req)
  
  await body("tieneRoturasCristal")
    .optional()
    .notEmpty().withMessage("El campo de rotura de cristal no puede estar vacío")
    .isBoolean().withMessage("El campo de rotura de cristal debe ser un booleano")
    .run(req)

  await body("fecha")
    .optional()
    .notEmpty().withMessage("La fecha no puede estar vacía")
    .isISO8601().withMessage("El formato de la fecha es inválido")
    .run(req)

  await body("estado")
    .optional()
    .trim()
    .notEmpty().withMessage("El estado no puede estar vacío")
    .isIn(["ACTIVO", "INACTIVO"]).withMessage("El estado debe ser 'ACTIVO' o 'INACTIVO'")
    .run(req)

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const errorMessages = getErrorMessages(errors.array())
    next(new APIError(JSON.stringify(errorMessages), 400))
    return
  }

  next()
}
