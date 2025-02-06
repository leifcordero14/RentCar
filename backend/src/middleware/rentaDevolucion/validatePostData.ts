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
	await body("comentario")
		.optional()
		.trim()
		.isString()
		.withMessage("El comentario debe ser un texto")
		.run(req)

	await body("empleadoId")
		.notEmpty()
		.withMessage("El ID del empleado no puede estar vacío")
		.toInt()
		.isInt({ min: 1 })
		.withMessage("ID del empleado es inválido")
		.run(req)

	await body("vehiculoId")
		.notEmpty()
		.withMessage("El ID del vehículo no puede estar vacío")
		.toInt()
		.isInt({ min: 1 })
		.withMessage("ID del vehículo es inválido")
		.run(req)

	await body("clienteId")
		.notEmpty()
		.withMessage("El ID del cliente no puede estar vacío")
		.toInt()
		.isInt({ min: 1 })
		.withMessage("ID del cliente es inválido")
		.run(req)

	await body("fechaRenta")
		.notEmpty()
		.withMessage("La fecha de renta no puede estar vacía")
		.isISO8601()
		.withMessage("El formato de la fecha de renta es inválido")
		.custom(value => {
			const fechaRenta = deleteHoursFromDateTime(formatDate(new Date(value)))
			const currentDate = deleteHoursFromDateTime(formatDate(new Date()))
			if (fechaRenta < currentDate) {
				throw new Error("La fecha de renta no puede ser anterior a la fecha actual")
			}
			return true
		})
		.run(req)

	await body("fechaDevolucion")
		.notEmpty()
		.withMessage("La fecha de devolución no puede estar vacía")
		.isISO8601()
		.withMessage("El formato de la fecha de devolución es inválido")
		.custom((value, { req }) => {
			const fechaRenta = new Date(req.body.fechaRenta)
			const fechaDevolucion = new Date(value)
			if (fechaDevolucion <= fechaRenta) {
				throw new Error("La fecha de devolución debe ser posterior a la fecha de renta")
			}
			return true
		})
		.run(req)

	await body("montoPorDia")
		.notEmpty()
		.withMessage("El monto por día no puede estar vacío")
		.toInt()
		.isInt()
		.withMessage("El monto por día debe ser un número")
		.run(req)

	await body("cantidadDias")
		.notEmpty()
		.withMessage("La cantidad de días no puede estar vacía")
		.toInt()
		.isInt()
		.withMessage("La cantidad de días debe ser un número")
		.run(req)

	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		const errorMessages = getErrorMessages(errors.array())
		next(new APIError(JSON.stringify(errorMessages), 400))
		return
	}

	next()
}
