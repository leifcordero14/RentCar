import type { Inspeccion } from "@prisma/client"
import type { Draft, UpdateData } from "../interfaces"
import { prisma } from "../lib/prisma"
import APIError from "../utils/APIError"
import ClienteService from "./ClienteService"
import EmpleadoService from "./EmpleadoService"
import VehiculoService from "./VehiculoService"

export default class InspeccionService {
	static async getAll() {
		const inspecciones = await prisma.inspeccion.findMany({
			include: { empleado: true, cliente: true, vehiculo: true },
			omit: { vehiculoId: true, empleadoId: true, clienteId: true },
		})
		return inspecciones
	}

	static async getById(id: Inspeccion["id"]) {
		const inspeccion = await prisma.inspeccion.findUnique({
			where: { id },
			include: { empleado: true, cliente: true, vehiculo: true },
			omit: { vehiculoId: true, empleadoId: true, clienteId: true },
		})
		if (!inspeccion) throw new APIError("No se encontró la inspección", 404)
		return inspeccion
	}

	static async create(payload: Draft<Inspeccion>) {
		const { empleadoId, clienteId, vehiculoId } = payload

		await Promise.all([
			EmpleadoService.getById(empleadoId),
			ClienteService.getById(clienteId),
			VehiculoService.getById(vehiculoId),
		])

		await prisma.inspeccion.create({ data: payload })
		return
	}

	static async update(id: Inspeccion["id"], payload: UpdateData<Inspeccion>) {
		const { empleadoId, clienteId, vehiculoId } = payload

		await Promise.all([
			empleadoId && EmpleadoService.getById(empleadoId),
			clienteId && ClienteService.getById(clienteId),
			vehiculoId && VehiculoService.getById(vehiculoId),
		])

		await this.getById(id)
		await prisma.inspeccion.update({ where: { id }, data: payload })
		return
	}

	static async deleteById(id: Inspeccion["id"]) {
		await this.getById(id)
		await prisma.inspeccion.delete({ where: { id } })
		return
	}
}
