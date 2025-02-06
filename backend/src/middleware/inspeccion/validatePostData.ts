import { NextFunction, Request, Response } from "express"
import { body, validationResult } from "express-validator"
import APIError from "../../utils/APIError"
import { deleteHoursFromDateTime, formatDate } from "../../utils/formatDate"
import { getErrorMessages } from "../../utils/getErrorMessages"

export const validatePostData = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	await body("clienteId")
		.notEmpty()
		.withMessage("El ID del cliente no puede estar vacío")
		.toInt()
		.isInt({ min: 1 })
		.withMessage("ID del cliente es inválido")
		.run(req)

	await body("vehiculoId")
		.notEmpty()
		.withMessage("El ID del vehículo no puede estar vacío")
		.toInt()
		.isInt({ min: 1 })
		.withMessage("ID del vehículo es inválido")
		.run(req)

	await body("empleadoId")
		.notEmpty()
		.withMessage("El ID del empleado no puede estar vacío")
		.toInt()
		.isInt({ min: 1 })
		.withMessage("ID del empleado es inválido")
		.run(req)

	await body("tieneRalladuras")
		.notEmpty()
		.withMessage("El campo de ralladuras no puede estar vacío")
		.isBoolean()
		.withMessage("El campo de ralladuras debe ser un booleano")
		.run(req)

	await body("cantidadCombustible")
		.trim()
		.notEmpty()
		.withMessage("El campo de cantidad de combustible no puede estar vacío")
		.isIn(["1/4", "1/2", "3/4", "Lleno"])
		.withMessage(
			"El campo de cantidad de combustible debe ser '1/4', '1/2', '3/4' o 'Lleno'"
		)
		.run(req)

	await body("tieneGomaRepuesto")
		.notEmpty()
		.withMessage("El campo de goma de repuesto no puede estar vacío")
		.isBoolean()
		.withMessage("El campo de goma de repuesto debe ser un booleano")
		.run(req)

	await body("tieneGato")
		.notEmpty()
		.withMessage("El campo de gato no puede estar vacío")
		.isBoolean()
		.withMessage("El campo de gato debe ser un booleano")
		.run(req)

	await body("tieneRoturasCristal")
		.notEmpty()
		.withMessage("El campo de rotura de cristal no puede estar vacío")
		.isBoolean()
		.withMessage("El campo de rotura de cristal debe ser un booleano")
		.run(req)

	await body("fecha")
		.notEmpty()
		.withMessage("La fecha no puede estar vacía")
		.isISO8601()
		.withMessage("El formato de la fecha es inválido")
		.custom(value => {
			const fechaInspeccion = deleteHoursFromDateTime(formatDate(new Date(value)))
			const currentDate = deleteHoursFromDateTime(formatDate(new Date()))
			if (fechaInspeccion < currentDate) {
				throw new Error("La fecha de inspección no puede ser anterior a la fecha actual")
			}
			return true
		})
		.run(req)

	await body("estado")
		.trim()
		.notEmpty()
		.withMessage("El estado no puede estar vacío")
		.isIn(["ACTIVO", "INACTIVO"])
		.withMessage("El estado debe ser 'ACTIVO' o 'INACTIVO'")
		.run(req)

	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		const errorMessages = getErrorMessages(errors.array())
		next(new APIError(JSON.stringify(errorMessages), 400))
		return
	}

	next()
}
