import NoRegistriesDataCell from "../../../components/NoRegistriesDataCell"
import Table from "../../../components/Table"
import TableDataCell from "../../../components/TableDataCell"
import TableHead from "../../../components/TableHead"
import AddLink from "../../../components/ui/AddLink"
import DeleteButton from "../../../components/ui/DeleteButton"
import EditLink from "../../../components/ui/EditLink"
import HeadingTitle from "../../../components/ui/HeadingTitle"
import useDeleteTipoCombustible from "../../../hooks/tipos-combustibles/useDeleteTipoCombustible"
import useGetTiposCombustibles from "../../../hooks/tipos-combustibles/useGetTiposCombustibles"

const columns = ["descripción", "estado"]

const TiposCombustibles = () => {
	const { tiposCombustiblesQuery } = useGetTiposCombustibles()
	const { deleteTipoCombustibleMutation } = useDeleteTipoCombustible()

	return (
		<>
			<HeadingTitle>Gestión de Tipos de Combustibles</HeadingTitle>
			<AddLink />
			<Table>
				<TableHead columns={columns} />
				<tbody>
					{tiposCombustiblesQuery.data?.length === 0 ? (
						<NoRegistriesDataCell colspan={columns.length + 1} />
					) : (
						tiposCombustiblesQuery.data?.map(tipoCombustible => (
							<tr
								key={tipoCombustible.id}
								className="odd:bg-gray-900 even:bg-gray-800 border-b border-gray-700">
								<TableDataCell className="text-white">
									{tipoCombustible.descripcion}
								</TableDataCell>
								<TableDataCell className="text-white">
									{tipoCombustible.estado}
								</TableDataCell>
								<TableDataCell className="space-x-4">
									<EditLink to={`${tipoCombustible.id}/edit`} />
									<DeleteButton
										onClick={() => deleteTipoCombustibleMutation(tipoCombustible.id)}
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
