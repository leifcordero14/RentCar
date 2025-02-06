import { z } from "zod"

export const EmpleadoSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  cedula: z.string(),
  porcientoComision: z.number(),
  fechaIngreso: z.string(),
  tandaLaboral: z.enum(["MATUTINA", "VESPERTINA", "NOCTURNA"]),
  estado: z.enum(["ACTIVO", "INACTIVO"]),
})

export const EmpleadoListSchema = z.array(EmpleadoSchema)
