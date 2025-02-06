import { z } from "zod"
import { ClienteSchema } from "../schemas/cliente"
import { EmpleadoSchema } from "../schemas/empleado"
import { InspeccionSchema } from "../schemas/inspeccion"
import { MarcaSchema } from "../schemas/marca"
import { ModeloSchema } from "../schemas/modelo"
import { RentaDevolucionSchema } from "../schemas/rentaDevolucion"
import { TipoCombustibleSchema } from "../schemas/tipoCombustible"
import { TipoVehiculoSchema } from "../schemas/tipoVehiculo"
import { VehiculoSchema } from "../schemas/vehiculo"

export type Draft<T> = Omit<T, "id" | "numRenta">

export type Marca = z.infer<typeof MarcaSchema>

export type Modelo = z.infer<typeof ModeloSchema>

export interface ModeloPayload {
	marcaId: string
	descripcion: string
	estado: Modelo["estado"]
}

export interface VehiculoPayload {
	descripcion: string
	modeloId: string
	marcaId: string
	tipoCombustibleId: string
	tipoVehiculoId: string
	numChasis: string
	numMotor: string
	numPlaca: string
	estado: Vehiculo["estado"]
}

export interface RentaDevolucionPayload {
	clienteId: string
	fechaRenta: string
	vehiculoId: string
	empleadoId: string
	fechaDevolucion: string
	montoPorDia: string
	cantidadDias: string
	comentario: string | null
}

export type TipoCombustible = z.infer<typeof TipoCombustibleSchema>

export type TipoVehiculo = z.infer<typeof TipoVehiculoSchema>

export type Cliente = z.infer<typeof ClienteSchema>

export type Empleado = z.infer<typeof EmpleadoSchema>

export type Vehiculo = z.infer<typeof VehiculoSchema>

export type RentaDevolucion = z.infer<typeof RentaDevolucionSchema>

export interface RentaDevolucionFilter {
	clienteId: string
	fechaRenta: string
	vehiculoId: string
}

export type TipoPersona = "FISICA" | "JURIDICA"

export type TandaLaboral = "MATUTINA" | "VESPERTINA" | "NOCTURNA"

export type Estado = "ACTIVO" | "INACTIVO"

export type VehiculoEstado = "RENTADO" | "DISPONIBLE" | "SOLICITADO"

export interface UserPayload {
	username: string
	password: string
}

export interface PDFPayload {
	tipoVehiculoId: string
	fechaRenta: string
	fechaDevolucion: string
}

export interface MutationResponse {
	success: boolean
	message: string[]
}

export type Inspeccion = z.infer<typeof InspeccionSchema>

export interface InspeccionPayload {
	clienteId: string
	vehiculoId: string
	tieneRalladuras: boolean
	cantidadCombustible: Inspeccion["cantidadCombustible"]
	tieneGomaRepuesto: boolean
	tieneGato: boolean
	tieneRoturasCristal: boolean
	estadoGomas: string
	goma1?: boolean
	goma2?: boolean
	goma3?: boolean
	goma4?: boolean
	fecha: string
	empleadoId: string
	estado: Inspeccion["estado"]
}

export interface UserResponse extends MutationResponse {
	token: string
}
