import { Estado } from "@prisma/client"
import { Request, Response } from "express"
import ClienteService from "../services/ClienteService"

export default class ClienteController {
	static async getAll(req: Request, res: Response) {
		const { estado } = req.query
		const query = estado ? ((estado as string).toUpperCase() as Estado) : undefined
		const clientes = await ClienteService.getAll({ estado: query })
		res.status(200).json({ success: true, data: clientes })
	}

	static async getById(req: Request, res: Response) {
		const { id } = req.params
		const cliente = await ClienteService.getById(Number(id))
		res.status(200).json({ success: true, data: cliente })
	}

	static async create(req: Request, res: Response) {
		await ClienteService.create(req.body)
		res.status(201).json({ success: true, message: ["Cliente creado correctamente"] })
	}

	static async update(req: Request, res: Response) {
		const { id } = req.params
		await ClienteService.update(Number(id), req.body)
		res
			.status(200)
			.json({ success: true, message: ["Cliente actualizado correctamente"] })
	}

	static async deleteById(req: Request, res: Response) {
		const { id } = req.params
		await ClienteService.deleteById(Number(id))
		res.status(200).json({ success: true, message: ["Cliente eliminado correctamente"] })
	}
}
