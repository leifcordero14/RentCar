import type { ValidationError } from "express-validator"

export const getErrorMessages = (errors: ValidationError[]) => {
	return errors.map(error => error.msg)
}
