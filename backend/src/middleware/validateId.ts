import { NextFunction, Request, Response } from "express"
import { param, validationResult } from "express-validator"
import APIError from "../utils/APIError"
import { getErrorMessages } from "../utils/getErrorMessages";

export const validateId = async (
	req: Request, 
	res: Response, 
	next: NextFunction
) => {
	await param("id")
    .trim()
		.isInt({ min: 1 }).withMessage("ID inválido")
    .notEmpty().withMessage("El ID es obligatorio")
    .run(req)

	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		const errorMessages = getErrorMessages(errors.array())
		next(new APIError(JSON.stringify(errorMessages), 400))
		return
	}

	next()
};
