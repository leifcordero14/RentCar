import { Router } from "express"
import TipoCombustibleController from "../controllers/TipoCombustibleController"
import { validateId } from "../middleware/validateId"
import { validatePostData } from "../middleware/validatePostData"
import { validatePutData } from "../middleware/validatePutData"
import { catchAsync } from "../utils/catchAsync"

const tiposCombustiblesRoutes = Router()

tiposCombustiblesRoutes
	.route("/")
	.get(catchAsync(TipoCombustibleController.getAll))
	.post(validatePostData, catchAsync(TipoCombustibleController.create))

tiposCombustiblesRoutes
	.route("/:id")
	.get(validateId, catchAsync(TipoCombustibleController.getById))
	.put(validateId, validatePutData, catchAsync(TipoCombustibleController.update))
	.delete(validateId, catchAsync(TipoCombustibleController.deleteById))

export default tiposCombustiblesRoutes
