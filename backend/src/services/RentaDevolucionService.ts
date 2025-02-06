import { Estado, RentaDevolucion } from "@prisma/client"
import { Draft, UpdateData } from "../interfaces"
import { prisma } from "../lib/prisma"
import APIError from "../utils/APIError"
import ClienteService from "./ClienteService"
import EmpleadoService from "./EmpleadoService"
import VehiculoService from "./VehiculoService"

export default class RentaDevolucionService {
	static async getAll(filters: {
		clienteId?: number
		fechaRenta?: Date
		fechaDevolucion?: Date
		vehiculoId?: number
		tipoVehiculoId?: number
	}) {
		const { clienteId, fechaRenta, fechaDevolucion, vehiculoId, tipoVehiculoId } = filters

		const rentasDevoluciones = await prisma.rentaDevolucion.findMany({
			where: {
				AND: [
					...(clienteId ? [{ clienteId }] : []),
					...(fechaRenta && !fechaDevolucion ? [{ fechaRenta }] : []),
					...(fechaRenta && fechaDevolucion
						? [
								{
									fechaRenta: { gte: fechaRenta },
									fechaDevolucion: { lte: fechaDevolucion },
								},
						  ]
						: []),
					...(vehiculoId ? [{ vehiculoId }] : []),
					...(tipoVehiculoId ? [{ vehiculo: { tipoVehiculoId } }] : []),
				],
			},
			include: {
				empleado: true,
				cliente: true,
				vehiculo: { include: { tipoVehiculo: true } },
			},
			omit: { empleadoId: true, clienteId: true, vehiculoId: true },
		})
		return rentasDevoluciones
	}

	static async getById(id: RentaDevolucion["numRenta"]) {
		const rentaDevolucion = await prisma.rentaDevolucion.findUnique({
			where: { numRenta: id },
			include: {
				empleado: true,
				cliente: true,
				vehiculo: { include: { tipoVehiculo: true } },
			},
			omit: { empleadoId: true, clienteId: true, vehiculoId: true },
		})
		if (!rentaDevolucion) throw new APIError("No se encontró la renta y devolución", 404)
		return rentaDevolucion
	}

	static async create(payload: Draft<RentaDevolucion>) {
		const { empleadoId, clienteId, vehiculoId } = payload

		await Promise.all([
			EmpleadoService.getById(empleadoId),
			ClienteService.getById(clienteId),
			VehiculoService.getById(vehiculoId),
		])

		await this.findVehiculoRentado(vehiculoId)

		await prisma.rentaDevolucion.create({ data: payload })
		await VehiculoService.update(vehiculoId, { estado: "RENTADO" })
		return
	}

	static async update(
		id: RentaDevolucion["numRenta"],
		payload: UpdateData<RentaDevolucion>
	) {
		const { empleadoId, clienteId, vehiculoId, fechaRenta, fechaDevolucion } = payload

		await Promise.all([
			empleadoId && EmpleadoService.getById(empleadoId),
			clienteId && ClienteService.getById(clienteId),
			vehiculoId && VehiculoService.getById(vehiculoId),
		])

		const rentaDevolucion = await this.getById(id)
		if (vehiculoId) await this.findVehiculoRentado(rentaDevolucion.numRenta, vehiculoId)

		if (
			fechaRenta &&
			!fechaDevolucion &&
			rentaDevolucion.fechaDevolucion < new Date(fechaRenta)
		) {
			throw new APIError(
				"La fecha de renta no puede ser después de la fecha de devolución",
				422
			)
		}

		if (
			fechaDevolucion &&
			!fechaRenta &&
			rentaDevolucion.fechaRenta > new Date(fechaDevolucion)
		) {
			throw new APIError(
				"La fecha de devolución no puede ser antes a la fecha de renta",
				422
			)
		}

		if (
			fechaRenta &&
			fechaDevolucion &&
			new Date(fechaRenta) > new Date(fechaDevolucion)
		) {
			throw new APIError(
				"La fecha de renta no puede ser después de la fecha de devolución",
				422
			)
		}

		if (fechaDevolucion) {
			const isPast = new Date(fechaDevolucion) < new Date()
			payload.estado = isPast ? Estado.INACTIVO : Estado.ACTIVO
			await VehiculoService.update(rentaDevolucion.vehiculo.id, {
				estado: isPast ? "DISPONIBLE" : "RENTADO",
			})
		}	

		await prisma.rentaDevolucion.update({ where: { numRenta: id }, data: payload })
		return
	}

	static async deleteById(id: RentaDevolucion["numRenta"]) {
		const rentaDevolucion = await this.getById(id)
		await prisma.rentaDevolucion.delete({ where: { numRenta: id } })
		await VehiculoService.update(rentaDevolucion.vehiculo.id, { estado: "DISPONIBLE" })
		return
	}

	private static async findVehiculoRentado(
		vehiculoId: RentaDevolucion["vehiculoId"],
		rentaDevolucionId?: RentaDevolucion["numRenta"],
	) {
		const vehiculo = await VehiculoService.getById(vehiculoId)
		const vehiculoIncludesRenta = vehiculo.RentaDevolucion.some(
			rentaDevolucion => rentaDevolucion.numRenta === rentaDevolucionId
		)
		if (vehiculo?.estado === "RENTADO" && !vehiculoIncludesRenta) {
			throw new APIError("El vehiculo se encuentra rentado", 409)
		}
		return
	}
}
