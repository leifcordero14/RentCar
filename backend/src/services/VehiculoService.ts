import type { Vehiculo, VehiculoEstado } from "@prisma/client"
import type { Draft, UpdateData } from "../interfaces"
import { prisma } from "../lib/prisma"
import APIError from "../utils/APIError"
import MarcaService from "./MarcaService"
import ModeloService from "./ModeloService"
import TipoCombustibleService from "./TipoCombustibleService"
import TipoVehiculoService from "./TipoVehiculoService"

export default class VehiculoService {
	static async getAll(query: { estado?: VehiculoEstado }) {
		const { estado } = query
		const vehiculos = await prisma.vehiculo.findMany({
			where: { ...(estado && { estado }) },
			include: { marca: true, modelo: true, tipoCombustible: true, tipoVehiculo: true },
			omit: {
				marcaId: true,
				modeloId: true,
				tipoCombustibleId: true,
				tipoVehiculoId: true,
			},
		})
		return vehiculos
	}

	static async getById(id: Vehiculo["id"]) {
		const vehiculo = await prisma.vehiculo.findUnique({
			where: { id },
			include: {
				marca: true,
				modelo: true,
				tipoCombustible: true,
				tipoVehiculo: true,
				RentaDevolucion: true
			},
			omit: {
				marcaId: true,
				modeloId: true,
				tipoCombustibleId: true,
				tipoVehiculoId: true,
			},
		})
		if (!vehiculo) throw new APIError("No se encontró el vehículo", 404)
		return vehiculo
	}

	static async create(payload: Draft<Vehiculo>) {
		const { marcaId, modeloId, tipoCombustibleId, tipoVehiculoId } = payload

		await Promise.all([
			MarcaService.getById(marcaId),
			ModeloService.getById(modeloId),
			TipoVehiculoService.getById(tipoVehiculoId),
			TipoCombustibleService.getById(tipoCombustibleId),
		])

		const { numChasis, numMotor, numPlaca } = payload

		await this.findVehiculoConConflicto(numChasis, numMotor, numPlaca)

		await prisma.vehiculo.create({ data: payload })
		return
	}

	static async update(id: Vehiculo["id"], payload: UpdateData<Vehiculo>) {
		const { marcaId, modeloId, tipoCombustibleId, tipoVehiculoId } = payload

		await Promise.all([
			marcaId && MarcaService.getById(marcaId),
			modeloId && ModeloService.getById(modeloId),
			tipoVehiculoId && TipoVehiculoService.getById(tipoVehiculoId),
			tipoCombustibleId && TipoCombustibleService.getById(tipoCombustibleId),
		])

		await this.getById(id)

		const { numChasis, numMotor, numPlaca } = payload

		if (numChasis || numMotor || numPlaca) {
			await this.findVehiculoConConflicto(numChasis, numMotor, numPlaca, id)
		}

		await prisma.vehiculo.update({ where: { id }, data: payload })
		return
	}

	static async deleteById(id: Vehiculo["id"]) {
		await this.getById(id)
		await prisma.vehiculo.delete({ where: { id } })
		return
	}

	private static async findVehiculoConConflicto(
		numChasis?: Vehiculo["numChasis"],
		numMotor?: Vehiculo["numMotor"],
		numPlaca?: Vehiculo["numPlaca"],
		id?: Vehiculo["id"]
	) {
		const vehiculoConConflicto = await prisma.vehiculo.findFirst({
			where: {
				OR: [{ numChasis }, { numMotor }, { numPlaca }],
				...(id && { id: { not: id } }),
			},
		})
		if (vehiculoConConflicto) {
			throw new APIError("Ya hay un vehículo con ese no. de chasis, motor o placa", 409)
		}
		return
	}
}
