import { z } from "zod"

export const TipoCombustibleSchema = z.object({
	id: z.number(),
	descripcion: z.string(),
	estado: z.enum(["ACTIVO", "INACTIVO"]),
})

export const TipoCombustibleListSchema = z.array(TipoCombustibleSchema)
