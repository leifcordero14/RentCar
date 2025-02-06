import { Router } from "express"
import ClienteController from "../controllers/ClienteController"
import { validatePostData } from "../middleware/cliente/validatePostData"
import { validatePutData } from "../middleware/cliente/validatePutData"
import { validateId } from "../middleware/validateId"
import { catchAsync } from "../utils/catchAsync"

const clienteRoutes = Router()

clienteRoutes
	.route("/")
	.get(catchAsync(ClienteController.getAll))
	.post(validatePostData, catchAsync(ClienteController.create))

clienteRoutes
	.route("/:id")
	.get(validateId, catchAsync(ClienteController.getById))
	.put(validateId, validatePutData, catchAsync(ClienteController.update))
	.delete(validateId, catchAsync(ClienteController.deleteById))

export default clienteRoutes
