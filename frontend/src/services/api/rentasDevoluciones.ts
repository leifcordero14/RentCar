import type {
	MutationResponse,
	PDFPayload,
	RentaDevolucion,
	RentaDevolucionFilter,
	RentaDevolucionPayload,
} from "../../interfaces"
import {
	RentaDevolucionListSchema,
	RentaDevolucionSchema,
} from "../../schemas/rentaDevolucion"
import httpClient from "./httpClient"

export const getRentasDevoluciones = async (
	filter: RentaDevolucionFilter
): Promise<RentaDevolucion[]> => {
	const { clienteId, fechaRenta, vehiculoId } = filter
	const { data: response } = await httpClient.get("/rentas-devoluciones", {
		params: {
			clienteId: clienteId ? clienteId : "",
			fechaRenta: fechaRenta ? fechaRenta : "",
			vehiculoId: vehiculoId ? vehiculoId : "",
		},
	})
	const validationResult = RentaDevolucionListSchema.safeParse(response.data)
	if (validationResult.success) return validationResult.data
	throw new Error("Error al conseguir las rentas y devoluciones")
}

export const getRentaDevolucionById = async (
	id: RentaDevolucion["numRenta"]
): Promise<RentaDevolucion> => {
	const { data: response } = await httpClient.get(`/rentas-devoluciones/${id}`)
	const validationResult = RentaDevolucionSchema.safeParse(response.data)
	if (validationResult.success) return validationResult.data
	throw new Error("Error al conseguir la renta y devolución")
}

export const createRentaDevolucion = async (payload: RentaDevolucionPayload) => {
	const { data: response } = await httpClient.post<MutationResponse>(
		"/rentas-devoluciones",
		payload
	)
	return response
}

export const updateRentaDevolucion = async (
	id: RentaDevolucion["numRenta"],
	payload: RentaDevolucionPayload
) => {
	const { data: response } = await httpClient.put<MutationResponse>(
		`/rentas-devoluciones/${id}`,
		payload
	)
	return response
}

export const deleteRentaDevolucion = async (id: RentaDevolucion["numRenta"]) => {
	const { data: response } = await httpClient.delete<MutationResponse>(
		`/rentas-devoluciones/${id}`
	)
	return response
}

export const downloadPDF = async (filters: PDFPayload) => {
	const { fechaRenta, fechaDevolucion, tipoVehiculoId } = filters
	const { data: response } = await httpClient.get("/rentas-devoluciones/report", {
		params: {
			tipoVehiculoId: tipoVehiculoId ? tipoVehiculoId : "",
			fechaRenta: fechaRenta ? fechaRenta : "",
			fechaDevolucion: fechaDevolucion ? fechaDevolucion : "",
		},
		responseType: "blob",
	})
	return response
}
