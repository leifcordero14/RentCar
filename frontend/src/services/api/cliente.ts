import type { Cliente, Draft, Estado, MutationResponse } from "../../interfaces"
import { ClienteListSchema, ClienteSchema } from "../../schemas/cliente"
import httpClient from "./httpClient"

export const getClientes = async (estado?: Estado): Promise<Cliente[]> => {
	const { data: response } = await httpClient.get("/clientes", {
		params: {
			estado: estado ? estado : "",
		},
	})
	const validationResult = ClienteListSchema.safeParse(response.data)
	if (validationResult.success) return validationResult.data
	throw new Error("Error al conseguir los clientes")
}

export const getClienteById = async (id: Cliente["id"]): Promise<Cliente> => {
	const { data: response } = await httpClient.get(`/clientes/${id}`)
	const validationResult = ClienteSchema.safeParse(response.data)
	if (validationResult.success) return validationResult.data
	throw new Error("Error al conseguir el cliente")
}

export const createCliente = async (payload: Draft<Cliente>) => {
	const { data: response } = await httpClient.post<MutationResponse>("/clientes", payload)
	return response
}

export const updateCliente = async (id: Cliente["id"], payload: Draft<Cliente>) => {
	const { data: response } = await httpClient.put<MutationResponse>(
		`/clientes/${id}`,
		payload
	)
	return response
}

export const deleteCliente = async (id: Cliente["id"]) => {
	const { data: response } = await httpClient.delete<MutationResponse>(`/clientes/${id}`)
	return response
}
