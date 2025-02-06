import type { Draft, Estado, MutationResponse, TipoCombustible } from "../../interfaces"
import {
	TipoCombustibleListSchema,
	TipoCombustibleSchema,
} from "../../schemas/tipoCombustible"
import httpClient from "./httpClient"

export const getTiposCombustibles = async (
	estado?: Estado
): Promise<TipoCombustible[]> => {
	const { data: response } = await httpClient.get(
		`/tipos-combustibles?estado=${estado ? estado : ""}`
	)
	const validationResult = TipoCombustibleListSchema.safeParse(response.data)
	if (validationResult.success) return validationResult.data
	throw new Error("Error al conseguir los tipos de combustibles")
}

export const getTipoCombustibleById = async (
	id: TipoCombustible["id"]
): Promise<TipoCombustible> => {
	const { data: response } = await httpClient.get(`/tipos-combustibles/${id}`)
	const validationResult = TipoCombustibleSchema.safeParse(response.data)
	if (validationResult.success) return validationResult.data
	throw new Error("Error al conseguir el tipo de combustible")
}

export const createTipoCombustible = async (payload: Draft<TipoCombustible>) => {
	const { data: response } = await httpClient.post<MutationResponse>(
		"/tipos-combustibles",
		payload
	)
	return response
}

export const updateTipoCombustible = async (
	id: TipoCombustible["id"],
	payload: Draft<TipoCombustible>
) => {
	const { data: response } = await httpClient.put<MutationResponse>(
		`/tipos-combustibles/${id}`,
		payload
	)
	return response
}

export const deleteTipoCombustible = async (id: TipoCombustible["id"]) => {
	const { data: response } = await httpClient.delete<MutationResponse>(
		`/tipos-combustibles/${id}`
	)
	return response
}
