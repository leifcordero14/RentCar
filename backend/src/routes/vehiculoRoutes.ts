import { Router } from "express"
import VehiculoController from "../controllers/VehiculoController"
import { validateId } from "../middleware/validateId"
import { validatePostData } from "../middleware/vehiculo/validatePostData"
import { validatePutData } from "../middleware/vehiculo/validatePutData"
import { catchAsync } from "../utils/catchAsync"

const vehiculoRoutes = Router()

vehiculoRoutes
	.route("/")
	.get(catchAsync(VehiculoController.getAll))
	.post(validatePostData, catchAsync(VehiculoController.create))

vehiculoRoutes
	.route("/:id")
	.get(validateId, catchAsync(VehiculoController.getById))
	.put(validateId, validatePutData, catchAsync(VehiculoController.update))
	.delete(validateId, catchAsync(VehiculoController.deleteById))

export default vehiculoRoutes
