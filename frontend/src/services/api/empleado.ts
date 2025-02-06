import type { Draft, Empleado, Estado, MutationResponse } from "../../interfaces"
import { EmpleadoListSchema, EmpleadoSchema } from "../../schemas/empleado"
import httpClient from "./httpClient"

export const getEmpleados = async (estado?: Estado): Promise<Empleado[]> => {
	const { data: response } = await httpClient.get("/empleados", {
		params: {
			estado: estado ? estado : "",
		},
	})
	const validationResult = EmpleadoListSchema.safeParse(response.data)
	if (validationResult.success) return validationResult.data
	throw new Error("Error al conseguir los empleados")
}

export const getEmpleadoById = async (id: Empleado["id"]): Promise<Empleado> => {
	const { data: response } = await httpClient.get(`/empleados/${id}`)
	const validationResult = EmpleadoSchema.safeParse(response.data)
	if (validationResult.success) return validationResult.data
	throw new Error("Error al conseguir el empleado")
}

export const createEmpleado = async (payload: Draft<Empleado>) => {
	const { data: response } = await httpClient.post<MutationResponse>(
		"/empleados",
		payload
	)
	return response
}

export const updateEmpleado = async (id: Empleado["id"], payload: Draft<Empleado>) => {
	const { data: response } = await httpClient.put<MutationResponse>(
		`/empleados/${id}`,
		payload
	)
	return response
}

export const deleteEmpleado = async (id: Empleado["id"]) => {
	const { data: response } = await httpClient.delete<MutationResponse>(`/empleados/${id}`)
	return response
}
