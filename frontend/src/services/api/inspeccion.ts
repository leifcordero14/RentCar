import type { Inspeccion, InspeccionPayload, MutationResponse } from "../../interfaces"
import { InspeccionListSchema, InspeccionSchema } from "../../schemas/inspeccion"
import httpClient from "./httpClient"

export const getInspecciones = async (): Promise<Inspeccion[]> => {
	const { data: response } = await httpClient.get("/inspecciones")
	const validationResult = InspeccionListSchema.safeParse(response.data)
	if (validationResult.success) return validationResult.data
	throw new Error("Error al conseguir las inspecciones")
}

export const getInspeccionById = async (id: Inspeccion["id"]): Promise<Inspeccion> => {
	const { data: response } = await httpClient.get(`/inspecciones/${id}`)
	const validationResult = InspeccionSchema.safeParse(response.data)
	if (validationResult.success) return validationResult.data
	throw new Error("Error al conseguir la inspección")
}

export const createInspeccion = async (payload: InspeccionPayload) => {
	const { data: response } = await httpClient.post<MutationResponse>(
		"/inspecciones",
		payload
	)
	return response
}

export const updateInspeccion = async (
	id: Inspeccion["id"],
	payload: InspeccionPayload
) => {
	const { data: response } = await httpClient.put<MutationResponse>(
		`/inspecciones/${id}`,
		payload
	)
	return response
}

export const deleteInspeccion = async (id: Inspeccion["id"]) => {
	const { data: response } = await httpClient.delete<MutationResponse>(
		`/inspecciones/${id}`
	)
	return response
}
