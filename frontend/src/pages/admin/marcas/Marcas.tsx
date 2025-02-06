import NoRegistriesDataCell from "../../../components/NoRegistriesDataCell"
import Table from "../../../components/Table"
import TableDataCell from "../../../components/TableDataCell"
import TableHead from "../../../components/TableHead"
import AddLink from "../../../components/ui/AddLink"
import DeleteButton from "../../../components/ui/DeleteButton"
import EditLink from "../../../components/ui/EditLink"
import HeadingTitle from "../../../components/ui/HeadingTitle"
import useDeleteMarca from "../../../hooks/marcas/useDeleteMarca"
import useGetMarcas from "../../../hooks/marcas/useGetMarcas"

const columns = ["descripción", "estado"]

const Marcas = () => {
	const { marcasQuery } = useGetMarcas()
	const { deleteMarcaMutation } = useDeleteMarca()

	return (
		<>
			<HeadingTitle>Gestión de Marcas</HeadingTitle>
			<AddLink />
			<Table>
				<TableHead columns={columns} />
				<tbody>
					{marcasQuery.data?.length === 0 ? (
						<NoRegistriesDataCell colspan={columns.length + 1} />
					) : (
						marcasQuery.data?.map(marca => (
							<tr
								key={marca.id}
								className="odd:dark:bg-gray-900 even:dark:bg-gray-800 border-b border-gray-700">
								<TableDataCell className="text-white">{marca.descripcion}</TableDataCell>
								<TableDataCell className="text-white">{marca.estado}</TableDataCell>
								<TableDataCell className="space-x-4">
									<EditLink to={`${marca.id}/edit`} />
									<DeleteButton onClick={() => deleteMarcaMutation(marca.id)} />
								</TableDataCell>
							</tr>
						))
					)}
				</tbody>
			</Table>
		</>
	)
}

export default Marcas
