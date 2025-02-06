import { NextFunction, Request, Response } from "express"
import { body, validationResult } from "express-validator"
import APIError from "../../utils/APIError"
import { getErrorMessages } from "../../utils/getErrorMessages"

export const validatePostData = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	await body("nombre")
		.trim()
		.notEmpty().withMessage("El nombre no puede estar vacío")
		.isString().withMessage("El nombre debe ser un texto")
		.matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
		.withMessage("El nombre no debe contener números ni caracteres especiales")
		.run(req)

	await body("cedula")
		.trim()
		.notEmpty().withMessage("La cédula no puede estar vacía")
		.isString().withMessage("La cédula debe ser un texto")
		.isNumeric().withMessage("La cédula debe contener solo números")
		.isLength({ min: 11, max: 11 }).withMessage("La cédula debe tener exactamente 11 caracteres")
		.run(req)

	await body("tandaLaboral")
		.trim()
		.notEmpty().withMessage("La tanda laboral no puede estar vacía")
		.isIn(["MATUTINA", "VESPERTINA", "NOCTURNA"]).withMessage("La tanda laboral debe ser 'MATUTINA', 'VESPERTINA' o 'NOCTURNA'")
		.run(req)

	await body("porcientoComision")
		.notEmpty().withMessage("El porcentaje de comisión no puede estar vacío")
		.toFloat()
		.isFloat({ min: 1, max: 15 })
		.withMessage("El % de comisión debe ser un valor entre 1 y 15")
		.run(req)

	await body("fechaIngreso")
		.notEmpty().withMessage("La fecha de ingreso no puede estar vacía")
		.isISO8601().withMessage("La fecha de ingreso tiene un formato inválido")
		.custom(value => {
			const fecha = new Date(value)
			const hoy = new Date()
			if (fecha > hoy) throw new Error("La fecha de ingreso no puede ser una fecha futura")
			return true
		})
		.run(req)

	await body("estado")
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
