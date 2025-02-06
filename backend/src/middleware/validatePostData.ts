import { NextFunction, Request, Response } from "express"
import { body, validationResult } from "express-validator"
import APIError from "../utils/APIError"
import { getErrorMessages } from "../utils/getErrorMessages"

export const validatePostData = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	await body("descripcion")
		.trim()
		.notEmpty().withMessage("La descripción no puede estar vacía")
		.isString().withMessage("La descripción debe ser un texto")
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
