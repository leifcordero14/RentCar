import { NextFunction, Request, Response } from "express"
import { body, validationResult } from "express-validator"
import APIError from "../../utils/APIError"
import { getErrorMessages } from "../../utils/getErrorMessages"

export const validatePutData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("nombre")
    .optional()
    .trim()
    .notEmpty().withMessage("El nombre no puede estar vacío")
    .isString().withMessage("El nombre debe ser un texto")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
    .withMessage("El nombre no debe contener números ni caracteres especiales")
    .run(req)

  await body("cedula")
    .optional()
    .trim()
    .notEmpty().withMessage("La cédula no puede estar vacía")
    .isString().withMessage("La cédula debe ser un texto")
    .isNumeric().withMessage("La cédula debe contener solo números")
    .isLength({ min: 11, max: 11 }).withMessage("La cédula debe tener exactamente 11 caracteres")
    .run(req)

  await body("numTarjetaCredito")
    .optional()
    .trim()
    .notEmpty().withMessage("El no. de tarjeta de crédito no puede estar vacío")
    .isNumeric().withMessage("El no. de tarjeta de crédito debe contener solo números")
    .isString().withMessage("El no. de tarjeta de crédito debe ser un texto")
    .isLength({ min: 16, max: 16 }).withMessage("El no. de tarjeta de crédito debe tener exactamente 16 caracteres")
    .run(req)

  await body("limiteCredito")
    .optional()
    .notEmpty().withMessage("El límite de crédito no puede estar vacío")
    .isInt({ min: 1 }).withMessage("El límite de crédito debe ser un número positivo")
    .run(req)

  await body("tipoPersona")
    .optional()
    .trim()
    .notEmpty().withMessage("El tipo de persona no puede estar vacío")
    .isIn(["FISICA", "JURIDICA"]).withMessage("El tipo de persona debe ser 'FISICA' o 'JURIDICA'")
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