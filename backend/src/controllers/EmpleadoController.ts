import { Estado } from "@prisma/client"
import { Request, Response } from "express"
import EmpleadoService from "../services/EmpleadoService"

export default class EmpleadoController {
	static async getAll(req: Request, res: Response) {
		const { estado } = req.query
		const query = estado ? ((estado as string).toUpperCase() as Estado) : undefined
		const empleados = await EmpleadoService.getAll({ estado: query })
		res.status(200).json({ success: true, data: empleados })
	}

	static async getById(req: Request, res: Response) {
		const { id } = req.params
		const cliente = await EmpleadoService.getById(Number(id))
		res.status(200).json({ success: true, data: cliente })
	}

	static async create(req: Request, res: Response) {
		await EmpleadoService.create(req.body)
		res.status(201).json({ success: true, message: ["Empleado creado correctamente"] })
	}

	static async update(req: Request, res: Response) {
		const { id } = req.params
		await EmpleadoService.update(Number(id), req.body)
		res
			.status(200)
			.json({ success: true, message: ["Empleado actualizado correctamente"] })
	}

	static async deleteById(req: Request, res: Response) {
		const { id } = req.params
		await EmpleadoService.deleteById(Number(id))
		res.status(200).json({ success: true, message: ["Empleado eliminado correctamente"] })
	}
}
