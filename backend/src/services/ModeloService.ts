import type { Estado, Modelo } from "@prisma/client"
import { Draft, UpdateData } from "../interfaces"
import { prisma } from "../lib/prisma"
import APIError from "../utils/APIError"
import MarcaService from "./MarcaService"

export default class ModeloService {
	static async getAll(query: { estado?: Estado }) {
		const { estado } = query
		const modelos = await prisma.modelo.findMany({
			where: { ...(estado && { estado }) },
			include: { marca: true },
			omit: { marcaId: true },
		})
		return modelos
	}

	static async getById(id: Modelo["id"]) {
		const modelo = await prisma.modelo.findUnique({
			where: { id },
			include: { marca: true },
			omit: { marcaId: true },
		})
		if (!modelo) throw new APIError("No se encontró el modelo", 404)
		return modelo
	}

	static async create(payload: Draft<Modelo>) {
		const { marcaId, descripcion } = payload
		await MarcaService.getById(marcaId)
		await this.findModeloConConflicto(descripcion)
		await prisma.modelo.create({ data: payload })
		return
	}

	static async update(id: Modelo["id"], payload: UpdateData<Modelo>) {
		const { marcaId, descripcion } = payload
		if (marcaId) await MarcaService.getById(marcaId)
		await this.getById(id)
		if (descripcion) await this.findModeloConConflicto(descripcion, id)
		await prisma.modelo.update({ where: { id }, data: payload })
		return
	}

	static async deleteById(id: Modelo["id"]) {
		await this.getById(id)
		await prisma.modelo.delete({ where: { id } })
		return
	}

	private static async findModeloConConflicto(
		descripcion: Modelo["descripcion"],
		id?: Modelo["id"]
	) {
		const modelo = await prisma.modelo.findFirst({
			where: { descripcion, ...(id && { id: { not: id } }) },
		})
		if (modelo) throw new APIError("El modelo ya existe", 409)
		return
	}
}
