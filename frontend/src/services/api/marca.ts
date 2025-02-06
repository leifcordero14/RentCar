import type { Draft, Estado, Marca, MutationResponse } from "../../interfaces"
import { MarcaListSchema, MarcaSchema } from "../../schemas/marca"
import httpClient from "./httpClient"

export const getMarcas = async (estado?: Estado): Promise<Marca[]> => {
	const { data: response } = await httpClient.get(
		`/marcas?estado=${estado ? estado : ""}`
	)
	const validationResult = MarcaListSchema.safeParse(response.data)
	if (validationResult.success) return validationResult.data
	throw new Error("Error al conseguir las marcas")
}

export const getMarcaById = async (id: Marca["id"]): Promise<Marca> => {
	const { data: response } = await httpClient.get(`/marcas/${id}`)
	const validationResult = MarcaSchema.safeParse(response.data)
	if (validationResult.success) return validationResult.data
	throw new Error("Error al conseguir la marca")
}

export const createMarca = async (payload: Draft<Marca>) => {
	const { data: response } = await httpClient.post<MutationResponse>("/marcas", payload)
	return response
}

export const updateMarca = async (id: Marca["id"], payload: Draft<Marca>) => {
	const { data: response } = await httpClient.put<MutationResponse>(
		`/marcas/${id}`,
		payload
	)
	return response
}

export const deleteMarca = async (id: Marca["id"]) => {
	const { data: response } = await httpClient.delete<MutationResponse>(`/marcas/${id}`)
	return response
}
