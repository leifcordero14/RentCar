import NoRegistriesDataCell from "../../../components/NoRegistriesDataCell"
import Table from "../../../components/Table"
import TableDataCell from "../../../components/TableDataCell"
import TableHead from "../../../components/TableHead"
import AddLink from "../../../components/ui/AddLink"
import DeleteButton from "../../../components/ui/DeleteButton"
import EditLink from "../../../components/ui/EditLink"
import HeadingTitle from "../../../components/ui/HeadingTitle"
import useDeleteTipoVehiculo from "../../../hooks/tipos-vehiculos/useDeleteTipoVehiculo"
import useGetTiposVehiculos from "../../../hooks/tipos-vehiculos/useGetTiposVehiculos"

const columns = ["descripción", "estado"]

const TiposCombustibles = () => {
	const { tiposVehiculosQuery } = useGetTiposVehiculos()
	const { deleteTipoVehiculoMutation } = useDeleteTipoVehiculo()

	return (
		<>
			<HeadingTitle>Gestión de Tipos de Vehículos</HeadingTitle>
			<AddLink />
			<Table>
				<TableHead columns={columns} />
				<tbody>
					{tiposVehiculosQuery.data?.length === 0 ? (
						<NoRegistriesDataCell colspan={columns.length + 1} />
					) : (
						tiposVehiculosQuery.data?.map(tipoVehiculo => (
							<tr
								key={tipoVehiculo.id}
								className="odd:bg-gray-900 even:bg-gray-800 border-b border-gray-700">
								<TableDataCell className="text-white">
									{tipoVehiculo.descripcion}
								</TableDataCell>
								<TableDataCell className="text-white">
									{tipoVehiculo.estado}
								</TableDataCell>
								<TableDataCell className="space-x-4">
									<EditLink to={`${tipoVehiculo.id}/edit`} />
									<DeleteButton
										onClick={() => deleteTipoVehiculoMutation(tipoVehiculo.id)}
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

export default TiposCombustibles
