import type { Cliente, Estado } from "@prisma/client"
import { Draft, UpdateData } from "../interfaces"
import { prisma } from "../lib/prisma"
import APIError from "../utils/APIError"

export default class ClienteService {
	static async getAll(query: { estado?: Estado }) {
		const { estado } = query
		const clientes = await prisma.cliente.findMany({
			where: { ...(estado && { estado }) },
		})
		return clientes
	}

	static async getById(id: Cliente["id"]) {
		const cliente = await prisma.cliente.findUnique({ where: { id } })
		if (!cliente) throw new APIError("No se encontró el cliente", 404)
		return cliente
	}

	static async create(payload: Draft<Cliente>) {
		await this.findClienteConConflicto(payload.cedula)
		await prisma.cliente.create({ data: payload })
		return
	}

	static async update(id: Cliente["id"], payload: UpdateData<Cliente>) {
		await this.getById(id)
		const { cedula } = payload
		if (cedula) await this.findClienteConConflicto(cedula, id)
		await prisma.cliente.update({ where: { id }, data: payload })
		return
	}

	static async deleteById(id: Cliente["id"]) {
		await this.getById(id)
		await prisma.cliente.delete({ where: { id } })
		return
	}

	private static async findClienteConConflicto(
		cedula: Cliente["cedula"],
		id?: Cliente["id"]
	) {
		const cliente = await prisma.cliente.findFirst({
			where: { cedula, ...(id && { id: { not: id } }) },
		})
		if (cliente) throw new APIError("Ya hay otro cliente con esa cédula", 409)
		return
	}
}
