import type { Estado, Modelo, ModeloPayload, MutationResponse } from "../../interfaces"
import { ModeloListSchema, ModeloSchema } from "../../schemas/modelo"
import httpClient from "./httpClient"

export const getModelos = async (estado?: Estado): Promise<Modelo[]> => {
	const { data: response } = await httpClient.get(
		`/modelos?estado=${estado ? estado : ""}`
	)
	const validationResult = ModeloListSchema.safeParse(response.data)
	if (validationResult.success) return validationResult.data
	throw new Error("Error al conseguir los modelos")
}

export const getModeloById = async (id: Modelo["id"]): Promise<Modelo> => {
	const { data: response } = await httpClient.get(`/modelos/${id}`)
	const validationResult = ModeloSchema.safeParse(response.data)
	if (validationResult.success) return validationResult.data
	throw new Error("Error al conseguir el modelo")
}

export const createModelo = async (payload: ModeloPayload) => {
	const { data: response } = await httpClient.post<MutationResponse>("/modelos", payload)
	return response
}

export const updateModelo = async (id: Modelo["id"], payload: ModeloPayload) => {
	const { data: response } = await httpClient.put<MutationResponse>(
		`/modelos/${id}`,
		payload
	)
	return response
}

export const deleteModelo = async (id: Modelo["id"]) => {
	const { data: response } = await httpClient.delete<MutationResponse>(`/modelos/${id}`)
	return response
}
