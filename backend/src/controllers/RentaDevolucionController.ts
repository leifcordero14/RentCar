import { Request, Response } from "express"
import PdfPrinter from "pdfmake"
import RentaDevolucionService from "../services/RentaDevolucionService"
import { formatDate } from "../utils/formatDate"

const fonts = {
	Roboto: {
		normal: "fonts/Roboto-Regular.ttf",
		bold: "fonts/Roboto-Bold.ttf",
		italics: "fonts/Roboto-Italic.ttf",
		bolditalics: "fonts/Roboto-BoldItalic.ttf",
	},
}

export default class RentaDevolucionController {
	static async getAll(req: Request, res: Response) {
		const { clienteId, fechaRenta, vehiculoId } = req.query

		const filters = {
			clienteId: clienteId ? Number(clienteId) : undefined,
			fechaRenta: fechaRenta ? new Date(String(fechaRenta)) : undefined,
			vehiculoId: vehiculoId ? Number(vehiculoId) : undefined,
		}

		const rentasDevoluciones = await RentaDevolucionService.getAll(filters)
		res.status(200).json({ success: true, data: rentasDevoluciones })
	}

	static async getById(req: Request, res: Response) {
		const { id } = req.params
		const rentaDevolucion = await RentaDevolucionService.getById(Number(id))
		res.status(200).json({ success: true, data: rentaDevolucion })
	}

	static async create(req: Request, res: Response) {
		await RentaDevolucionService.create(req.body)
		res.status(201).json({
			success: true,
			message: ["Renta y devolución creadas correctamente"],
		})
	}

	static async update(req: Request, res: Response) {
		const { id } = req.params
		await RentaDevolucionService.update(Number(id), req.body)
		res
			.status(200)
			.json({ success: true, message: ["Renta y devolución actualizadas correctamente"] })
	}

	static async deleteById(req: Request, res: Response) {
		const { id } = req.params
		await RentaDevolucionService.deleteById(Number(id))
		res.status(200).json({
			success: true,
			message: ["Renta y devolución eliminadas correctamente"],
		})
	}

	static async generateReport(req: Request, res: Response) {
		const { fechaRenta, fechaDevolucion, tipoVehiculoId } = req.query

		const filters = {
			fechaRenta: fechaRenta ? new Date(String(fechaRenta)) : undefined,
			fechaDevolucion: fechaDevolucion ? new Date(String(fechaDevolucion)) : undefined,
			tipoVehiculoId: tipoVehiculoId ? Number(tipoVehiculoId) : undefined,
		}

		const rentasDevoluciones = await RentaDevolucionService.getAll(filters)

		const tableBody = [
			[
				"Vehículo",
				"Tipo de Vehículo",
				"Cliente",
				"Empleado",
				"Fecha de Renta",
				"Fecha de Devolución",
			],
			...rentasDevoluciones.map(rentaDevolucion => [
				rentaDevolucion.vehiculo.descripcion,
				rentaDevolucion.vehiculo.tipoVehiculo.descripcion,
				rentaDevolucion.cliente.nombre,
				rentaDevolucion.empleado.nombre,
				formatDate(rentaDevolucion.fechaRenta),
				formatDate(rentaDevolucion.fechaDevolucion),
			]),
		]

		const printer = new PdfPrinter(fonts)
		const docDefinition = {
			content: [
				{ text: "Lista de Rentas y Devoluciones" },
				{
					table: {
						headerRows: 1,
						body: tableBody,
					},
				},
			],
			defaultStyle: {
				font: "Roboto",
			},
		}

		const pdfDoc = printer.createPdfKitDocument(docDefinition)
		const chunks: Uint8Array[] = []

		pdfDoc.on("data", (chunk: Uint8Array) => {
			chunks.push(chunk)
		})

		pdfDoc.on("end", () => {
			const pdfBuffer = Buffer.concat(chunks)

			res.setHeader("Content-Type", "application/pdf")
			res.setHeader("Content-Disposition", "attachment; filename=reporte_rentas.pdf")
			res.status(200).send(pdfBuffer)
		})

		pdfDoc.on("error", err => {
			console.error("Error al generar el PDF:", err)
			res.status(500).json({ success: false, message: "Error al generar el PDF" })
		})

		pdfDoc.end()
	}
}
