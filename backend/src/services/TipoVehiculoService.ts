import type { Estado, TipoVehiculo } from "@prisma/client"
import { Draft, UpdateData } from "../interfaces"
import { prisma } from "../lib/prisma"
import APIError from "../utils/APIError"

export default class TipoVehiculoService {
	static async getAll(query: { estado?: Estado }) {
		const { estado } = query
		const tiposVehiculos = await prisma.tipoVehiculo.findMany({
			where: { ...(estado && { estado }) },
		})
		return tiposVehiculos
	}

	static async getById(id: TipoVehiculo["id"]) {
		const tipoVehiculo = await prisma.tipoVehiculo.findUnique({ where: { id } })
		if (!tipoVehiculo) throw new APIError("No se encontró el tipo de vehículo", 404)
		return tipoVehiculo
	}

	static async create(payload: Draft<TipoVehiculo>) {
		const { descripcion } = payload
		await this.findTipoVehiculoConConflicto(descripcion)
		await prisma.tipoVehiculo.create({ data: payload })
		return
	}

	static async update(id: TipoVehiculo["id"], payload: UpdateData<TipoVehiculo>) {
		await this.getById(id)
		const { descripcion } = payload
		if (descripcion) await this.findTipoVehiculoConConflicto(descripcion, id)
		await prisma.tipoVehiculo.update({ where: { id }, data: payload })
		return
	}

	static async deleteById(id: TipoVehiculo["id"]) {
		await this.getById(id)
		await prisma.tipoVehiculo.delete({ where: { id } })
		return
	}

	private static async findTipoVehiculoConConflicto(
		descripcion: TipoVehiculo["descripcion"],
		id?: TipoVehiculo["id"]
	) {
		const tipoVehiculo = await prisma.tipoVehiculo.findFirst({
			where: { descripcion, ...(id && { id: { not: id } }) },
		})
		if (tipoVehiculo) throw new APIError("El tipo de vehículo ya existe", 409)
		return
	}
}
