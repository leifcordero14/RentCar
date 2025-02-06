import { Estado, TandaLaboral, TipoPersona, VehiculoEstado } from "@prisma/client"

export const marcas = [
	{ descripcion: "Toyota", estado: Estado.ACTIVO },
	{ descripcion: "Honda", estado: Estado.ACTIVO },
	{ descripcion: "Ford", estado: Estado.ACTIVO },
]

export const modelos = [
	{ descripcion: "Corolla", marcaId: 1, estado: Estado.ACTIVO },
	{ descripcion: "Civic", marcaId: 2, estado: Estado.ACTIVO },
	{ descripcion: "F-150", marcaId: 3, estado: Estado.ACTIVO },
]

export const tiposVehiculos = [
	{ descripcion: "Sedan", estado: Estado.ACTIVO },
	{ descripcion: "SUV", estado: Estado.ACTIVO },
	{ descripcion: "Pickup", estado: Estado.ACTIVO },
]

export const tiposCombustibles = [
	{ descripcion: "Gasolina", estado: Estado.ACTIVO },
	{ descripcion: "Diesel", estado: Estado.ACTIVO },
	{ descripcion: "Eléctrico", estado: Estado.ACTIVO },
]

export const vehiculos = [
	{
		descripcion: "Toyota Corolla Negra 2010",
		numChasis: "123456789",
		numMotor: "ABC12345",
		numPlaca: "A123BC",
		tipoVehiculoId: 1,
		marcaId: 1,
		modeloId: 1,
		tipoCombustibleId: 1,
		estado: VehiculoEstado.RENTADO,
	},
	{
		descripcion: "Honda Civic Rojo 2012",
		numChasis: "987654321",
		numMotor: "XYZ98765",
		numPlaca: "B987ZY",
		tipoVehiculoId: 1,
		marcaId: 2,
		modeloId: 2,
		tipoCombustibleId: 2,
		estado: VehiculoEstado.RENTADO,
	},
	{
		descripcion: "Honda Civic Azul 2014",
		numChasis: "asd87654321",
		numMotor: "abc98765",
		numPlaca: "erB987ZY",
		tipoVehiculoId: 1,
		marcaId: 2,
		modeloId: 2,
		tipoCombustibleId: 2,
		estado: VehiculoEstado.SOLICITADO,
	},
]

export const clientes = [
	{
		nombre: "Juan Pérez",
		cedula: "40200700681",
		numTarjetaCredito: "1234567891011121",
		limiteCredito: 5000,
		tipoPersona: TipoPersona.FISICA,
		estado: Estado.ACTIVO,
	},
	{
		nombre: "Empresa XYZ",
		cedula: "00121523654",
		numTarjetaCredito: "4321876510112112",
		limiteCredito: 20000,
		tipoPersona: TipoPersona.JURIDICA,
		estado: Estado.ACTIVO,
	},
]

export const empleados = [
	{
		nombre: "María Gómez",
		cedula: "03121984732",
		tandaLaboral: TandaLaboral.MATUTINA,
		porcientoComision: 5.0,
		fechaIngreso: new Date("2023-01-15"),
		estado: Estado.ACTIVO,
	},
	{
		nombre: "Pedro López",
		cedula: "40212973669",
		tandaLaboral: TandaLaboral.VESPERTINA,
		porcientoComision: 10.0,
		fechaIngreso: new Date("2022-07-20"),
		estado: Estado.ACTIVO,
	},
]

export const inspecciones = [
	{
		clienteId: 1,
		vehiculoId: 1,
		tieneRalladuras: true,
		cantidadCombustible: "1/2",
		tieneGomaRepuesto: true,
		tieneGato: true,
		tieneRoturasCristal: false,
		estadoGomas: "Bien Mal Bien Mal",
		fecha: new Date("2024-01-10"),
		empleadoId: 1,
		estado: Estado.ACTIVO,
	},
	{
		clienteId: 2,
		vehiculoId: 2,
		tieneRalladuras: false,
		cantidadCombustible: "1/4",
		tieneGomaRepuesto: true,
		tieneGato: false,
		tieneRoturasCristal: true,
		estadoGomas: "Bien Bien Bien Bien",
		fecha: new Date("2024-01-12"),
		empleadoId: 2,
		estado: Estado.ACTIVO,
	},
]

export const rentasDevoluciones = [
	{
		empleadoId: 1,
		vehiculoId: 1,
		clienteId: 1,
		fechaRenta: new Date("2024-01-01"),
		fechaDevolucion: new Date("2024-01-07"),
		montoPorDia: 1000,
		cantidadDias: 7,
		comentario: "Renta sin inconvenientes.",
		estado: Estado.ACTIVO,
	},
	{
		empleadoId: 2,
		vehiculoId: 2,
		clienteId: 2,
		fechaRenta: new Date("2024-01-03"),
		fechaDevolucion: new Date("2024-01-10"),
		montoPorDia: 1500,
		cantidadDias: 7,
		comentario: "Renta con daños en el cristal.",
		estado: Estado.ACTIVO,
	},
]
