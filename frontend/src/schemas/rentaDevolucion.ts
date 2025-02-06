import { z } from "zod"
import { ClienteSchema } from "./cliente"
import { EmpleadoSchema } from "./empleado"

export const RentaDevolucionSchema = z.object({
	numRenta: z.number(),
	fechaRenta: z.string(),
	fechaDevolucion: z.string(),
	montoPorDia: z.number(),
	cantidadDias: z.number(),
	comentario: z.string().nullable(),
	estado: z.enum(["ACTIVO", "INACTIVO"]),
	empleado: EmpleadoSchema,
	cliente: ClienteSchema,
	vehiculo: z.object({
		id: z.number(),
		descripcion: z.string(),
		numChasis: z.string(),
		numMotor: z.string(),
		numPlaca: z.string(),
		tipoVehiculoId: z.number(),
		marcaId: z.number(),
		modeloId: z.number(),
		tipoCombustibleId: z.number(),
		estado: z.enum(["RENTADO", "DISPONIBLE", "SOLICITADO"]),
	}),
})

export const RentaDevolucionListSchema = z.array(RentaDevolucionSchema)
