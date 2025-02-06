import type { Draft, Estado, MutationResponse, TipoVehiculo } from "../../interfaces"
import { TipoVehiculoListSchema, TipoVehiculoSchema } from "../../schemas/tipoVehiculo"
import httpClient from "./httpClient"

export const getTiposVehiculos = async (estado?: Estado): Promise<TipoVehiculo[]> => {
	const { data: response } = await httpClient.get(
		`/tipos-vehiculos?estado=${estado ? estado : ""}`
	)
	const validationResult = TipoVehiculoListSchema.safeParse(response.data)
	if (validationResult.success) return validationResult.data
	throw new Error("Error al conseguir los tipos de vehículos")
}

export const getTipoVehiculoById = async (
	id: TipoVehiculo["id"]
): Promise<TipoVehiculo> => {
	const { data: response } = await httpClient.get(`/tipos-vehiculos/${id}`)
	const validationResult = TipoVehiculoSchema.safeParse(response.data)
	if (validationResult.success) return validationResult.data
	throw new Error("Error al conseguir el tipo de vehículo")
}

export const createTipoVehiculo = async (payload: Draft<TipoVehiculo>) => {
	const { data: response } = await httpClient.post<MutationResponse>(
		"/tipos-vehiculos",
		payload
	)
	return response
}

export const updateTipoVehiculo = async (
	id: TipoVehiculo["id"],
	payload: Draft<TipoVehiculo>
) => {
	const { data: response } = await httpClient.put<MutationResponse>(
		`/tipos-vehiculos/${id}`,
		payload
	)
	return response
}

export const deleteTipoVehiculo = async (id: TipoVehiculo["id"]) => {
	const { data: response } = await httpClient.delete<MutationResponse>(
		`/tipos-vehiculos/${id}`
	)
	return response
}
