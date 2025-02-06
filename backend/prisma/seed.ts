import { prisma } from "../src/lib/prisma"
import * as data from "./data"

async function main() {
	await prisma.marca.createMany({ data: data.marcas })
	await prisma.modelo.createMany({ data: data.modelos })
	await prisma.tipoVehiculo.createMany({ data: data.tiposVehiculos })
	await prisma.tipoCombustible.createMany({ data: data.tiposCombustibles })
	await prisma.vehiculo.createMany({ data: data.vehiculos })
	await prisma.cliente.createMany({ data: data.clientes })
	await prisma.empleado.createMany({ data: data.empleados })
	await prisma.inspeccion.createMany({ data: data.inspecciones })
	await prisma.rentaDevolucion.createMany({ data: data.rentasDevoluciones })
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
