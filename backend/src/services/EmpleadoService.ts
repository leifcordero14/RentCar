import type { Empleado, Estado } from "@prisma/client"
import type { Draft, UpdateData } from "../interfaces"
import { prisma } from "../lib/prisma"
import APIError from "../utils/APIError"

export default class EmpleadoService {
	static async getAll(query: { estado?: Estado }) {
		const { estado } = query
		const empleados = await prisma.empleado.findMany({
			where: { ...(estado && { estado }) },
		})
		return empleados
	}

	static async getById(id: Empleado["id"]) {
		const empleado = await prisma.empleado.findUnique({ where: { id } })
		if (!empleado) throw new APIError("No se encontró el empleado", 404)
		return empleado
	}

	static async create(payload: Draft<Empleado>) {
		const { cedula } = payload
		await this.findEmpleadoConConflicto(cedula)
		await prisma.empleado.create({ data: payload })
		return
	}

	static async update(id: Empleado["id"], payload: UpdateData<Empleado>) {
		await this.getById(id)
		const { cedula } = payload
		if (cedula) await this.findEmpleadoConConflicto(cedula, id)
		await prisma.empleado.update({ where: { id }, data: payload })
		return
	}

	static async deleteById(id: Empleado["id"]) {
		await this.getById(id)
		await prisma.empleado.delete({ where: { id } })
		return
	}

	private static async findEmpleadoConConflicto(
		cedula: Empleado["cedula"],
		id?: Empleado["id"]
	) {
		const empleado = await prisma.empleado.findFirst({
			where: { cedula, ...(id && { id: { not: id } }) },
		})
		if (empleado) throw new APIError("Ya hay otro empleado con esa cédula", 409)
		return
	}
}
