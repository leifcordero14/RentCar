import type { VehiculoEstado } from "@prisma/client"
import { Request, Response } from "express"
import VehiculoService from "../services/VehiculoService"

export default class VehiculoController {
	static async getAll(req: Request, res: Response) {
		const { estado } = req.query
		const query = estado
			? ((estado as string).toUpperCase() as VehiculoEstado)
			: undefined
		const vehiculos = await VehiculoService.getAll({ estado: query })
		res.status(200).json({ success: true, data: vehiculos })
	}

	static async getById(req: Request, res: Response) {
		const { id } = req.params
		const vehiculo = await VehiculoService.getById(Number(id))
		res.status(200).json({ success: true, data: vehiculo })
	}

	static async create(req: Request, res: Response) {
		await VehiculoService.create(req.body)
		res.status(201).json({ success: true, message: ["Vehículo creado correctamente"] })
	}

	static async update(req: Request, res: Response) {
		const { id } = req.params
		await VehiculoService.update(Number(id), req.body)
		res
			.status(200)
			.json({ success: true, message: ["Vehículo actualizado correctamente"] })
	}

	static async deleteById(req: Request, res: Response) {
		const { id } = req.params
		await VehiculoService.deleteById(Number(id))
		res.status(200).json({ success: true, message: ["Vehículo eliminado correctamente"] })
	}
}
