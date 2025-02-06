import { Router } from "express"
import ModeloController from "../controllers/ModeloController"
import { validatePostData } from "../middleware/modelo/validatePostData"
import { validateId } from "../middleware/validateId"
import { catchAsync } from "../utils/catchAsync"
import { validatePutData } from "./../middleware/modelo/validatePutData"

const modeloRoutes = Router()

modeloRoutes
	.route("/")
	.get(catchAsync(ModeloController.getAll))
	.post(validatePostData, catchAsync(ModeloController.create))

modeloRoutes
	.route("/:id")
	.get(validateId, catchAsync(ModeloController.getById))
	.put(validateId, validatePutData, catchAsync(ModeloController.update))
	.delete(validateId, catchAsync(ModeloController.deleteById))

export default modeloRoutes
