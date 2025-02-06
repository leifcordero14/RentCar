import { Router } from "express"
import MarcaController from "../controllers/MarcaController"
import { validateId } from "../middleware/validateId"
import { validatePostData } from "../middleware/validatePostData"
import { validatePutData } from "../middleware/validatePutData"
import { catchAsync } from "../utils/catchAsync"

const marcaRoutes = Router()

marcaRoutes
	.route("/")
	.get(catchAsync(MarcaController.getAll))
	.post(validatePostData, catchAsync(MarcaController.create))

marcaRoutes
	.route("/:id")
	.get(validateId, catchAsync(MarcaController.getById))
	.put(validateId, validatePutData, catchAsync(MarcaController.update))
	.delete(validateId, catchAsync(MarcaController.deleteById))

export default marcaRoutes
