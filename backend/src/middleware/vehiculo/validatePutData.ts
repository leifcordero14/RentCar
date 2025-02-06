import { NextFunction, Request, Response } from "express"
import { body, validationResult } from "express-validator"
import APIError from "../../utils/APIError"
import { getErrorMessages } from "../../utils/getErrorMessages"

export const validatePutData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("descripcion")
    .optional()
    .trim()
    .notEmpty().withMessage("La descripción no puede estar vacía")
    .isString().withMessage("La descripción debe ser un texto")
    .run(req)

  await body("numChasis")
    .optional()
    .trim()
    .notEmpty().withMessage("El no. de chasis no puede estar vacío")
    .isString().withMessage("El no. de chasis debe ser un texto")
    .run(req)

  await body("numMotor")
    .optional()
    .trim()
    .notEmpty().withMessage("El no. de motor no puede estar vacío")
    .isString().withMessage("El no. de motor debe ser un texto")
    .run(req)

  await body("numPlaca")
    .optional()
    .trim()
    .notEmpty().withMessage("El no. de placa no puede estar vacío")
    .isString().withMessage("El no. de placa debe ser un texto")
    .run(req)

  await body("tipoVehiculoId")
    .optional()
		.notEmpty().withMessage("El ID del vehículo no puede estar vacío")
    .toInt()
    .isInt({ min: 1 }).withMessage("ID del vehículo es inválido")
    .run(req)

  await body("marcaId")
    .optional()
		.notEmpty().withMessage("El ID de la marca no puede estar vacío")
    .toInt()
    .isInt({ min: 1 }).withMessage("ID de la marca es inválido")
    .run(req)

  await body("modeloId")
    .optional()
		.notEmpty().withMessage("El ID del modelo no puede estar vacío")
    .toInt()
    .isInt({ min: 1 }).withMessage("ID del modelo es inválido")
    .run(req)

  await body("tipoCombustibleId")
    .optional()
		.notEmpty().withMessage("El ID del tipo de combustible no puede estar vacío")
    .toInt()
    .isInt({ min: 1 }).withMessage("ID del tipo de combustible es inválido")
    .run(req)

  await body("estado")
    .optional()
    .trim()
    .notEmpty().withMessage("El estado no puede estar vacío")
		.isIn(["DISPONIBLE", "RENTADO", "SOLICITADO"]).withMessage("El estado debe ser 'SOLICITADO', 'DISPONIBLE' o 'RENTADO'")
    .run(req)

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const errorMessages = getErrorMessages(errors.array())
    next(new APIError(JSON.stringify(errorMessages), 400))
    return
  }

  next()
}
