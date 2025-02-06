import { z } from "zod"
import { MarcaSchema } from "./marca"

export const ModeloSchema = z.object({
	id: z.number(),
	descripcion: z.string(),
	estado: z.enum(["ACTIVO", "INACTIVO"]),
	marca: MarcaSchema,
})

export const ModeloListSchema = z.array(ModeloSchema)
