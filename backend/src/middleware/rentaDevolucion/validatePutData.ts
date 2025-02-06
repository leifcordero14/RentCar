import { NextFunction, Request, Response } from "express"
import { body, validationResult } from "express-validator"
import APIError from "../../utils/APIError"
import { getErrorMessages } from "../../utils/getErrorMessages"

export const validatePutData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("comentario")
    .optional()
    .trim()
    .isString().withMessage("La descripción debe ser un texto")
    .run(req)

  await body("empleadoId")
    .optional()
    .notEmpty().withMessage("El ID del empleado no puede estar vacío")
    .toInt()
    .isInt({ min: 1 }).withMessage("ID del empleado es inválido")
    .run(req)

  await body("vehiculoId")
    .optional()
    .notEmpty().withMessage("El ID del vehículo no puede estar vacío")
    .toInt()
    .isInt({ min: 1 }).withMessage("ID del vehículo es inválido")
    .run(req)

  await body("clienteId")
    .optional()
    .notEmpty().withMessage("El ID del cliente no puede estar vacío")
    .toInt()
    .isInt({ min: 1 }).withMessage("ID del cliente es inválido")
    .run(req)

  await body("fechaRenta")
    .optional()
    .notEmpty().withMessage("La fecha de renta no puede estar vacía")
    .isISO8601().withMessage("El formato de la fecha de renta es inválido")
    .run(req)

  await body("fechaDevolucion")
    .optional()
    .notEmpty().withMessage("La fecha de devolución no puede estar vacía")
    .isISO8601().withMessage("El formato de la fecha de devolución es inválido")
    .run(req);

  await body("montoPorDia")
    .optional()
    .notEmpty().withMessage("El monto por día no puede estar vacío")
    .toInt()
    .isInt().withMessage("El monto por día debe ser un número")
    .run(req)

  await body("cantidadDias")
    .optional()
    .notEmpty().withMessage("La cantidad de días no puede estar vacía")
    .toInt()
    .isInt().withMessage("La cantidad de días debe ser un número")
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
