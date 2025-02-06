import { useState } from "react"
import NoRegistriesDataCell from "../../../components/NoRegistriesDataCell"
import Table from "../../../components/Table"
import TableDataCell from "../../../components/TableDataCell"
import TableHead from "../../../components/TableHead"
import AddLink from "../../../components/ui/AddLink"
import DeleteButton from "../../../components/ui/DeleteButton"
import EditLink from "../../../components/ui/EditLink"
import HeadingTitle from "../../../components/ui/HeadingTitle"
import useGetClientes from "../../../hooks/clientes/useGetClientes"
import useDeleteRentaDevolucion from "../../../hooks/rentas-devoluciones/useDeleteRentaDevolucion"
import useGetRentasDevoluciones from "../../../hooks/rentas-devoluciones/useGetRentasDevoluciones"
import useGetVehiculos from "../../../hooks/vehiculos/useGetVehiculos"
import { RentaDevolucionFilter } from "../../../interfaces"
import { formatCurrency } from "../../../utils/formatCurrency"
import { formatDate } from "../../../utils/formatDate"

const columns = [
	"no. renta",
	"vehiculo",
	"cliente",
	"empleado",
	"fecha de renta",
	"fecha de devolución",
	"cantidad de días",
	"monto por día",
	"comentario",
	"estado",
]

const RentasDevoluciones = () => {
	const [filter, setFilter] = useState<RentaDevolucionFilter>({
		clienteId: "",
		fechaRenta: "",
		vehiculoId: "",
	})
	const { rentasDevolucionesQuery } = useGetRentasDevoluciones(filter)
	const { clientesQuery } = useGetClientes()
	const { vehiculosQuery } = useGetVehiculos()
	const { deleteRentaDevolucionMutation } = useDeleteRentaDevolucion()

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
		const { name, value } = e.target
		setFilter(prevFilter => ({ ...prevFilter, [name]: value }))
	}

	return (
		<>
			<HeadingTitle>Gestión de Rentas y Devoluciones</HeadingTitle>
			<div className="flex justify-between items-center">
				<AddLink />
				<div className="grow"></div>
				<div className="flex space-x-2 items-center">
					<div>
						<label htmlFor="fechaRenta" className="text-white mr-2">
							Fecha de Renta:
						</label>
						<input
							type="date"
							id="fechaRenta"
							name="fechaRenta"
							className="outline-none p-1"
							onChange={handleChange}
						/>
					</div>
					<div>
						<label htmlFor="vehiculo" className="text-white inline-block mr-4">
							Vehículo:
						</label>
						<select
							name="vehiculoId"
							id="vehiculo"
							className="p-2"
							onChange={handleChange}>
							<option value="">Sin filtro</option>
							{vehiculosQuery.data?.map(vehiculo => (
								<option key={vehiculo.id} value={vehiculo.id}>
									{vehiculo.descripcion}
								</option>
							))}
						</select>
					</div>
					<div>
						<label htmlFor="cliente" className="text-white inline-block mr-4">
							Cliente:
						</label>
						<select name="clienteId" id="cliente" className="p-2" onChange={handleChange}>
							<option value="">Sin filtro</option>
							{clientesQuery.data?.map(cliente => (
								<option key={cliente.id} value={cliente.id}>
									{cliente.nombre}
								</option>
							))}
						</select>
					</div>
				</div>
			</div>
			<Table>
				<TableHead columns={columns} />
				<tbody>
					{rentasDevolucionesQuery.data?.length === 0 ? (
						<NoRegistriesDataCell colspan={columns.length + 1} />
					) : (
						rentasDevolucionesQuery.data?.map(rentaDevolucion => (
							<tr
								key={rentaDevolucion.numRenta}
								className="odd:dark:bg-gray-900 even:dark:bg-gray-800 border-b border-gray-700">
								<TableDataCell className="text-white">
									{rentaDevolucion.numRenta}
								</TableDataCell>
								<TableDataCell className="text-white">
									{rentaDevolucion.vehiculo.descripcion}
								</TableDataCell>
								<TableDataCell className="text-white">
									{rentaDevolucion.cliente.nombre}
								</TableDataCell>
								<TableDataCell className="text-white">
									{rentaDevolucion.empleado.nombre}
								</TableDataCell>
								<TableDataCell className="text-white">
									{formatDate(rentaDevolucion.fechaRenta)}
								</TableDataCell>
								<TableDataCell className="text-white">
									{formatDate(rentaDevolucion.fechaDevolucion)}
								</TableDataCell>
								<TableDataCell className="text-white">
									{rentaDevolucion.cantidadDias}
								</TableDataCell>
								<TableDataCell className="text-white">
									{formatCurrency(rentaDevolucion.montoPorDia)}
								</TableDataCell>
								<TableDataCell className="text-white">
									{rentaDevolucion.comentario ? rentaDevolucion.comentario : "-"}
								</TableDataCell>
								<TableDataCell className="text-white">
									{rentaDevolucion.estado}
								</TableDataCell>
								<TableDataCell className="space-x-4">
									<EditLink to={`${rentaDevolucion.numRenta}/edit`} />
									<DeleteButton
										onClick={() =>
											deleteRentaDevolucionMutation(rentaDevolucion.numRenta)
										}
									/>
								</TableDataCell>
							</tr>
						))
					)}
				</tbody>
			</Table>
		</>
	)
}

export default RentasDevoluciones
