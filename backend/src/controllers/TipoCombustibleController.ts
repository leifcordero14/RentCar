import type { Estado } from "@prisma/client"
import { Request, Response } from "express"
import TipoCombustibleService from "../services/TipoCombustibleService"

export default class TipoCombustibleController {
	static async getAll(req: Request, res: Response) {
		const { estado } = req.query
		const query = estado ? ((estado as string).toUpperCase() as Estado) : undefined
		const tiposCombustibles = await TipoCombustibleService.getAll({ estado: query })
		res.status(200).json({ success: true, data: tiposCombustibles })
	}

	static async getById(req: Request, res: Response) {
		const { id } = req.params
		const tipoCombustible = await TipoCombustibleService.getById(Number(id))
		res.status(200).json({ success: true, data: tipoCombustible })
	}

	static async create(req: Request, res: Response) {
		const { descripcion, estado } = req.body
		await TipoCombustibleService.create({ descripcion, estado })
		res.status(201).json({
			success: true,
			message: ["Tipo de combustible creado correctamente"],
		})
	}

	static async update(req: Request, res: Response) {
		const { id } = req.params
		const { descripcion, estado } = req.body
		await TipoCombustibleService.update(Number(id), { descripcion, estado })
		res.status(200).json({
			success: true,
			message: ["Tipo de combustible actualizado correctamente"],
		})
	}

	static async deleteById(req: Request, res: Response) {
		const { id } = req.params
		await TipoCombustibleService.deleteById(Number(id))
		res.status(200).json({
			success: true,
			message: ["Tipo de combustible eliminado correctamente"],
		})
	}
}
