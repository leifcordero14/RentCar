import type { Estado } from "@prisma/client"
import { Request, Response } from "express"
import MarcaService from "../services/MarcaService"

export default class MarcaController {
	static async getAll(req: Request, res: Response) {
		const { estado } = req.query
		const query = estado ? (estado as string).toUpperCase() as Estado : undefined
		const marcas = await MarcaService.getAll({ estado: query })
		res.status(200).json({ success: true, data: marcas })
	}

	static async getById(req: Request, res: Response) {
		const { id } = req.params
		const marca = await MarcaService.getById(Number(id))
		res.status(200).json({ success: true, data: marca })
	}

	static async create(req: Request, res: Response) {
		const { descripcion, estado } = req.body
		await MarcaService.create({ descripcion, estado })
		res.status(201).json({ success: true, message: ["Marca creada correctamente"] })
	}

	static async update(req: Request, res: Response) {
		const { id } = req.params
		const { descripcion, estado } = req.body
		await MarcaService.update(Number(id), { descripcion, estado })
		res.status(200).json({ success: true, message: ["Marca actualizada correctamente"] })
	}

	static async deleteById(req: Request, res: Response) {
		const { id } = req.params
		await MarcaService.deleteById(Number(id))
		res.status(200).json({ success: true, message: ["Marca eliminada correctamente"] })
	}
}
