import { Router } from "express"
import RentaDevolucionController from "../controllers/RentaDevolucionController"
import { validatePostData } from "../middleware/rentaDevolucion/validatePostData"
import { validateId } from "../middleware/validateId"
import { catchAsync } from "../utils/catchAsync"
import { validatePutData } from "./../middleware/rentaDevolucion/validatePutData"

const rentaDevolucionRoutes = Router()

rentaDevolucionRoutes
	.route("/")
	.get(catchAsync(RentaDevolucionController.getAll))
	.post(validatePostData, catchAsync(RentaDevolucionController.create))

rentaDevolucionRoutes.get("/report", catchAsync(RentaDevolucionController.generateReport))

rentaDevolucionRoutes
	.route("/:id")
	.get(validateId, catchAsync(RentaDevolucionController.getById))
	.put(validateId, validatePutData, catchAsync(RentaDevolucionController.update))
	.delete(validateId, catchAsync(RentaDevolucionController.deleteById))

export default rentaDevolucionRoutes
