import cors from "cors"
import express, { NextFunction, Request, Response } from "express"
import clienteRoutes from "./routes/clienteRoutes"
import empleadoRoutes from "./routes/empleadoRoutes"
import inspeccionRoutes from "./routes/inspeccionRoutes"
import marcaRoutes from "./routes/marcaRoutes"
import modeloRoutes from "./routes/modeloRoutes"
import rentasDevolucionesRoutes from "./routes/rentasDevolucionesRoutes"
import tiposCombustiblesRoutes from "./routes/tipoCombustibleRoutes"
import tiposVehiculosRoutes from "./routes/tipoVehiculoRoutes"
import userRoutes from "./routes/userRoutes"
import vehiculoRoutes from "./routes/vehiculoRoutes"
import APIError from "./utils/APIError"

const app = express()

app
	.use(cors())
	.disable("x-powered-by")
	.use(express.json())

app
	.use("/api/usuarios", userRoutes)
	.use("/api/marcas", marcaRoutes)
	.use("/api/modelos", modeloRoutes)
	.use("/api/tipos-vehiculos", tiposVehiculosRoutes)
	.use("/api/tipos-combustibles", tiposCombustiblesRoutes)
	.use("/api/clientes", clienteRoutes)
	.use("/api/empleados", empleadoRoutes)
	.use("/api/vehiculos", vehiculoRoutes)
	.use("/api/inspecciones", inspeccionRoutes)
	.use("/api/rentas-devoluciones", rentasDevolucionesRoutes)


app.all("*", (req: Request, res: Response, next: NextFunction) => {
	next(new APIError("Recurso no encontrado", 404))
})

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof APIError) {
		const error = err.status === 400 ? JSON.parse(err.message) : [err.message]
		res.status(err.status).json({ success: false, message: error })
		return
	}
	res.status(500).json({ success: false, message: ["Error interno del servidor"] })
	return
})

export default app
