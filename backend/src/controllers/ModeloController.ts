import type { Estado } from "@prisma/client"
import { Request, Response } from "express"
import ModeloService from "../services/ModeloService"

export default class ModeloController {
	static async getAll(req: Request, res: Response) {
		const { estado } = req.query
		const query = estado ? ((estado as string).toUpperCase() as Estado) : undefined
		const modelos = await ModeloService.getAll({ estado: query })
		res.status(200).json({ success: true, data: modelos })
	}

	static async getById(req: Request, res: Response) {
		const { id } = req.params
		const modelo = await ModeloService.getById(Number(id))
		res.status(200).json({ success: true, data: modelo })
	}

	static async create(req: Request, res: Response) {
		const { marcaId, descripcion, estado } = req.body
		await ModeloService.create({ marcaId, descripcion, estado })
		res.status(201).json({ success: true, message: ["Modelo creado correctamente"] })
	}

	static async update(req: Request, res: Response) {
		const { id } = req.params
		const { marcaId, descripcion, estado } = req.body
		await ModeloService.update(Number(id), { marcaId, descripcion, estado })
		res.status(200).json({ success: true, message: ["Modelo actualizado correctamente"] })
	}

	static async deleteById(req: Request, res: Response) {
		const { id } = req.params
		await ModeloService.deleteById(Number(id))
		res.status(200).json({ success: true, message: ["Modelo eliminado correctamente"] })
	}
}
