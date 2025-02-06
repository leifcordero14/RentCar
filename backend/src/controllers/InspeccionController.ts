import { Request, Response } from "express"
import InspeccionService from "../services/InspeccionService"

export default class InspeccionController {
	static async getAll(req: Request, res: Response) {
		const inspecciones = await InspeccionService.getAll()
		res.status(200).json({ success: true, data: inspecciones })
	}

	static async getById(req: Request, res: Response) {
		const { id } = req.params
		const inspeccion = await InspeccionService.getById(Number(id))
		res.status(200).json({ success: true, data: inspeccion })
	}

	static async create(req: Request, res: Response) {
		await InspeccionService.create(req.body)
		res.status(201).json({ success: true, message: ["Inspección creada correctamente"] })
	}

	static async update(req: Request, res: Response) {
		const { id } = req.params
		await InspeccionService.update(Number(id), req.body)
		res
			.status(200)
			.json({ success: true, message: ["Inspección actualizada correctamente"] })
	}

	static async deleteById(req: Request, res: Response) {
		const { id } = req.params
		await InspeccionService.deleteById(Number(id))
		res
			.status(200)
			.json({ success: true, message: ["Inspección eliminada correctamente"] })
	}
}
