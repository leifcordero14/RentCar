import { z } from "zod"
import { ClienteSchema } from "./cliente"
import { EmpleadoSchema } from "./empleado"

export const InspeccionSchema = z.object({
	id: z.number(),
	tieneRalladuras: z.boolean(),
	cantidadCombustible: z.enum(["1/2", "Lleno", "1/4", "3/4"]),
	tieneGomaRepuesto: z.boolean(),
	tieneGato: z.boolean(),
	tieneRoturasCristal: z.boolean(),
	estadoGomas: z.string(),
	fecha: z.string(),
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

export const InspeccionListSchema = z.array(InspeccionSchema)
