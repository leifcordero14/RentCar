import type { Estado, Marca } from "@prisma/client"
import type { Draft, UpdateData } from "../interfaces"
import { prisma } from "../lib/prisma"
import APIError from "../utils/APIError"

export default class MarcaService {
	static async getAll(query: { estado?: Estado }) {
		const { estado } = query
		const marcas = await prisma.marca.findMany({ where: { ...(estado && { estado }) } })
		return marcas
	}

	static async getById(id: Marca["id"]) {
		const marca = await prisma.marca.findUnique({ where: { id } })
		if (!marca) throw new APIError("No se encontró la marca", 404)
		return marca
	}

	static async create(payload: Draft<Marca>) {
		await this.findMarcaConConflicto(payload.descripcion)
		await prisma.marca.create({ data: payload })
		return
	}

	static async update(id: Marca["id"], payload: UpdateData<Marca>) {
		await this.getById(id)
		const { descripcion } = payload
		if (descripcion) await this.findMarcaConConflicto(descripcion, id)
		await prisma.marca.update({ where: { id }, data: payload })
		return
	}

	static async deleteById(id: Marca["id"]) {
		await this.getById(id)
		await prisma.marca.delete({ where: { id } })
		return
	}

	private static async findMarcaConConflicto(
		descripcion: Marca["descripcion"],
		id?: Marca["id"]
	) {
		const marcaConConflicto = await prisma.marca.findFirst({
			where: { descripcion, ...(id && { id: { not: id } }) },
		})
		if (marcaConConflicto) throw new APIError("La marca ya existe", 409)
		return
	}
}
