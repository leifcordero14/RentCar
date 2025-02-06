import { Router } from "express"
import InspeccionController from "../controllers/InspeccionController"
import { validatePostData } from "../middleware/inspeccion/validatePostData"
import { validatePutData } from "../middleware/inspeccion/validatePutData"
import { validateId } from "../middleware/validateId"
import { catchAsync } from "../utils/catchAsync"

const inspeccionRoutes = Router()

inspeccionRoutes
	.route("/")
	.get(catchAsync(InspeccionController.getAll))
	.post(validatePostData, catchAsync(InspeccionController.create))

inspeccionRoutes
	.route("/:id")
	.get(validateId, catchAsync(InspeccionController.getById))
	.put(validateId, validatePutData, catchAsync(InspeccionController.update))
	.delete(validateId, catchAsync(InspeccionController.deleteById))

export default inspeccionRoutes
