import { Router } from "express"
import EmpleadoController from "../controllers/EmpleadoController"
import { validatePostData } from "../middleware/empleado/validatePostData"
import { validatePutData } from "../middleware/empleado/validatePutData"
import { validateId } from "../middleware/validateId"
import { catchAsync } from "../utils/catchAsync"

const empleadoRoutes = Router()

empleadoRoutes
	.route("/")
	.get(catchAsync(EmpleadoController.getAll))
	.post(validatePostData, catchAsync(EmpleadoController.create))

empleadoRoutes
	.route("/:id")
	.get(validateId, catchAsync(EmpleadoController.getById))
	.put(validateId, validatePutData, catchAsync(EmpleadoController.update))
	.delete(validateId, catchAsync(EmpleadoController.deleteById))

export default empleadoRoutes
