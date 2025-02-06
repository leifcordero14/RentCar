import type {
	MutationResponse,
	Vehiculo,
	VehiculoEstado,
	VehiculoPayload,
} from "../../interfaces"
import { VehiculoListSchema, VehiculoSchema } from "../../schemas/vehiculo"
import httpClient from "./httpClient"

export const getVehiculos = async (estado?: VehiculoEstado): Promise<Vehiculo[]> => {
	const { data: response } = await httpClient.get(
		`/vehiculos?estado=${estado ? estado : ""}`
	)
	const validationResult = VehiculoListSchema.safeParse(response.data)
	if (validationResult.success) return validationResult.data
	throw new Error("Error al conseguir los vehículos")
}

export const getVehiculoById = async (id: Vehiculo["id"]): Promise<Vehiculo> => {
	const { data: response } = await httpClient.get(`/vehiculos/${id}`)
	const validationResult = VehiculoSchema.safeParse(response.data)
	if (validationResult.success) return validationResult.data
	throw new Error("Error al conseguir el vehículo")
}

export const createVehiculo = async (payload: VehiculoPayload) => {
	const { data: response } = await httpClient.post<MutationResponse>(
		"/vehiculos",
		payload
	)
	return response
}

export const updateVehiculo = async (id: Vehiculo["id"], payload: VehiculoPayload) => {
	const { data: response } = await httpClient.put<MutationResponse>(
		`/vehiculos/${id}`,
		payload
	)
	return response
}

export const deleteVehiculo = async (id: Vehiculo["id"]) => {
	const { data: response } = await httpClient.delete<MutationResponse>(`/vehiculos/${id}`)
	return response
}
