import type { Estado, TipoCombustible } from "@prisma/client"
import type { Draft, UpdateData } from "../interfaces"
import { prisma } from "../lib/prisma"
import APIError from "../utils/APIError"

export default class TipoCombustibleService {
	static async getAll(query: { estado?: Estado }) {
		const { estado } = query
		const tiposCombustibles = await prisma.tipoCombustible.findMany({
			where: { ...(estado && { estado }) },
		})
		return tiposCombustibles
	}

	static async getById(id: TipoCombustible["id"]) {
		const tipoCombustible = await prisma.tipoCombustible.findUnique({ where: { id } })
		if (!tipoCombustible) throw new APIError("No se encontró el tipo de combustible", 404)
		return tipoCombustible
	}

	static async create(payload: Draft<TipoCombustible>) {
		const { descripcion } = payload
		await this.findTipoCombustibleConConflicto(descripcion)
		await prisma.tipoCombustible.create({ data: payload })
		return
	}

	static async update(id: TipoCombustible["id"], payload: UpdateData<TipoCombustible>) {
		await this.getById(id)
		const { descripcion } = payload
		if (descripcion) await this.findTipoCombustibleConConflicto(descripcion, id)
		await prisma.tipoCombustible.update({ where: { id }, data: payload })
		return
	}

	static async deleteById(id: TipoCombustible["id"]) {
		await this.getById(id)
		await prisma.tipoCombustible.delete({ where: { id } })
		return
	}

	private static async findTipoCombustibleConConflicto(
		descripcion: TipoCombustible["descripcion"],
		id?: TipoCombustible["id"]
	) {
		const tipoCombustible = await prisma.tipoCombustible.findFirst({
			where: { descripcion, ...(id && { id: { not: id } }) },
		})
		if (tipoCombustible) throw new APIError("El tipo de combustible ya existe", 409)
		return
	}
}
