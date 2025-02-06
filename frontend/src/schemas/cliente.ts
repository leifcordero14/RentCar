import { z } from "zod"

export const ClienteSchema = z.object({
	id: z.number(),
	nombre: z.string(),
	cedula: z.string(),
	numTarjetaCredito: z.string(),
	limiteCredito: z.number(),
	tipoPersona: z.enum(["FISICA", "JURIDICA"]),
	estado: z.enum(["ACTIVO", "INACTIVO"]),
})

export const ClienteListSchema = z.array(ClienteSchema)
