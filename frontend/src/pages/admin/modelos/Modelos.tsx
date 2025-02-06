import NoRegistriesDataCell from "../../../components/NoRegistriesDataCell"
import Table from "../../../components/Table"
import TableDataCell from "../../../components/TableDataCell"
import TableHead from "../../../components/TableHead"
import AddLink from "../../../components/ui/AddLink"
import DeleteButton from "../../../components/ui/DeleteButton"
import EditLink from "../../../components/ui/EditLink"
import HeadingTitle from "../../../components/ui/HeadingTitle"
import useDeleteModelo from "../../../hooks/modelos/useDeleteModelo"
import useGetModelos from "../../../hooks/modelos/useGetModelos"

const columns = ["descripción", "marca", "estado"]

const Modelos = () => {
	const { modelosQuery } = useGetModelos()
	const { deleteModeloMutation } = useDeleteModelo()

	return (
		<>
			<HeadingTitle>Gestión de Modelos</HeadingTitle>
			<AddLink />
			<Table>
				<TableHead columns={columns} />
				<tbody>
					{modelosQuery.data?.length === 0 ? (
						<NoRegistriesDataCell colspan={columns.length + 1} />
					) : (
						modelosQuery.data?.map(modelo => (
							<tr
								key={modelo.id}
								className="odd:dark:bg-gray-900 even:dark:bg-gray-800 border-b border-gray-700">
								<TableDataCell className="text-white">{modelo.descripcion}</TableDataCell>
								<TableDataCell className="text-white">
									{modelo.marca.descripcion}
								</TableDataCell>
								<TableDataCell className="text-white">{modelo.estado}</TableDataCell>
								<TableDataCell className="space-x-4">
									<EditLink to={`${modelo.id}/edit`} />
									<DeleteButton onClick={() => deleteModeloMutation(modelo.id)} />
								</TableDataCell>
							</tr>
						))
					)}
				</tbody>
			</Table>
		</>
	)
}

export default Modelos
