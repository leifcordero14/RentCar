import { useState } from "react"
import NoRegistriesDataCell from "../../../components/NoRegistriesDataCell"
import Table from "../../../components/Table"
import TableDataCell from "../../../components/TableDataCell"
import TableHead from "../../../components/TableHead"
import AddLink from "../../../components/ui/AddLink"
import DeleteButton from "../../../components/ui/DeleteButton"
import EditLink from "../../../components/ui/EditLink"
import HeadingTitle from "../../../components/ui/HeadingTitle"
import VehicleFilter from "../../../components/VehicleFilter"
import useDeleteVehiculo from "../../../hooks/vehiculos/useDeleteVehiculo"
import useGetVehiculos from "../../../hooks/vehiculos/useGetVehiculos"
import { VehiculoEstado } from "../../../interfaces"

const columns = [
	"descripción",
	"marca",
	"modelo",
	"tipo de combustible",
	"tipo de vehículo",
	"No. de chasis",
	"No. de motor",
	"No. de placa",
	"estado",
]

const Vehiculos = () => {
	const [estado, setEstado] = useState<VehiculoEstado | undefined>(undefined)
	const { vehiculosQuery } = useGetVehiculos(estado)
	const { deleteVehiculoMutation } = useDeleteVehiculo()
	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setEstado(e.target.value as VehiculoEstado)
	}

	return (
		<>
			<HeadingTitle>Gestión de Vehículos</HeadingTitle>
			<div className="flex justify-between items-center">
				<AddLink />
				<VehicleFilter onChange={handleChange} />
			</div>

			<Table>
				<TableHead columns={columns} />
				<tbody>
					{vehiculosQuery.data?.length === 0 ? (
						<NoRegistriesDataCell colspan={columns.length + 1} />
					) : (
						vehiculosQuery.data?.map(vehiculo => (
							<tr
								key={vehiculo.id}
								className="odd:dark:bg-gray-900 even:dark:bg-gray-800 border-b border-gray-700">
								<TableDataCell className="text-white">
									{vehiculo.descripcion}
								</TableDataCell>
								<TableDataCell className="text-white">
									{vehiculo.marca.descripcion}
								</TableDataCell>
								<TableDataCell className="text-white">
									{vehiculo.modelo.descripcion}
								</TableDataCell>
								<TableDataCell className="text-white">
									{vehiculo.tipoCombustible.descripcion}
								</TableDataCell>
								<TableDataCell className="text-white">
									{vehiculo.tipoVehiculo.descripcion}
								</TableDataCell>
								<TableDataCell className="text-white">{vehiculo.numChasis}</TableDataCell>
								<TableDataCell className="text-white">{vehiculo.numMotor}</TableDataCell>
								<TableDataCell className="text-white">{vehiculo.numPlaca}</TableDataCell>
								<TableDataCell className="text-white">{vehiculo.estado}</TableDataCell>
								<TableDataCell className="space-x-4">
									<EditLink to={`${vehiculo.id}/edit`} />
									<DeleteButton onClick={() => deleteVehiculoMutation(vehiculo.id)} />
								</TableDataCell>
							</tr>
						))
					)}
				</tbody>
			</Table>
		</>
	)
}

export default Vehiculos
