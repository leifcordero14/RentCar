import { z } from "zod"

export const TipoVehiculoSchema = z.object({
  id: z.number(),
  descripcion: z.string(),
  estado: z.enum(["ACTIVO", "INACTIVO"]),
})

export const TipoVehiculoListSchema = z.array(TipoVehiculoSchema)
