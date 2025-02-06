import { Router } from "express"
import TipoVehiculoController from "../controllers/TipoVehiculoController"
import { validateId } from "../middleware/validateId"
import { validatePostData } from "../middleware/validatePostData"
import { validatePutData } from "../middleware/validatePutData"
import { catchAsync } from "../utils/catchAsync"

const tiposVehiculosRoutes = Router()

tiposVehiculosRoutes
	.route("/")
	.get(catchAsync(TipoVehiculoController.getAll))
	.post(validatePostData, catchAsync(TipoVehiculoController.create))

tiposVehiculosRoutes
	.route("/:id")
	.get(validateId, catchAsync(TipoVehiculoController.getById))
	.put(validateId, validatePutData, catchAsync(TipoVehiculoController.update))
	.delete(validateId, catchAsync(TipoVehiculoController.deleteById))

export default tiposVehiculosRoutes
