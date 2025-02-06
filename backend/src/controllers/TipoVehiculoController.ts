import type { Estado } from "@prisma/client"
import { Request, Response } from "express"
import TipoVehiculoService from "../services/TipoVehiculoService"

export default class TipoVehiculoController {
	static async getAll(req: Request, res: Response) {
		const { estado } = req.query
		const query = estado ? ((estado as string).toUpperCase() as Estado) : undefined
		const tiposVehiculos = await TipoVehiculoService.getAll({ estado: query })
		res.status(200).json({ success: true, data: tiposVehiculos })
	}

	static async getById(req: Request, res: Response) {
		const { id } = req.params
		const tipoVehiculo = await TipoVehiculoService.getById(Number(id))
		res.status(200).json({ success: true, data: tipoVehiculo })
	}

	static async create(req: Request, res: Response) {
		const { descripcion, estado } = req.body
		await TipoVehiculoService.create({ descripcion, estado })
		res
			.status(201)
			.json({ success: true, message: ["Tipo de vehículo creado correctamente"] })
	}

	static async update(req: Request, res: Response) {
		const { id } = req.params
		const { descripcion, estado } = req.body
		await TipoVehiculoService.update(Number(id), { descripcion, estado })
		res
			.status(200)
			.json({ success: true, message: ["Tipo de vehículo actualizado correctamente"] })
	}

	static async deleteById(req: Request, res: Response) {
		const { id } = req.params
		await TipoVehiculoService.deleteById(Number(id))
		res
			.status(200)
			.json({ success: true, message: ["Tipo de vehículo eliminado correctamente"] })
	}
}
