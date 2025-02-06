import { z } from "zod"

export const MarcaSchema = z.object({
	id: z.number(),
	descripcion: z.string(),
	estado: z.enum(["ACTIVO", "INACTIVO"]),
})

export const MarcaListSchema = z.array(MarcaSchema)
