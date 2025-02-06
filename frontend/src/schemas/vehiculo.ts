import { z } from "zod"
import { MarcaSchema } from "./marca"
import { TipoCombustibleSchema } from "./tipoCombustible"
import { TipoVehiculoSchema } from "./tipoVehiculo"

export const VehiculoSchema = z.object({
	id: z.number(),
	descripcion: z.string(),
	numChasis: z.string(),
	numMotor: z.string(),
	numPlaca: z.string(),
	estado: z.enum(["RENTADO", "DISPONIBLE", "SOLICITADO"]),
	marca: MarcaSchema,
	modelo: z.object({
		id: z.number(),
		descripcion: z.string(),
		marcaId: z.number(),
		estado: z.enum(["ACTIVO", "INACTIVO"]),
	}),
	tipoCombustible: TipoCombustibleSchema,
	tipoVehiculo: TipoVehiculoSchema,
})

export const VehiculoListSchema = z.array(VehiculoSchema)
