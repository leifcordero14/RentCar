import NoRegistriesDataCell from "../../../components/NoRegistriesDataCell"
import Table from "../../../components/Table"
import TableDataCell from "../../../components/TableDataCell"
import TableHead from "../../../components/TableHead"
import AddLink from "../../../components/ui/AddLink"
import DeleteButton from "../../../components/ui/DeleteButton"
import EditLink from "../../../components/ui/EditLink"
import HeadingTitle from "../../../components/ui/HeadingTitle"
import useDeleteCliente from "../../../hooks/clientes/useDeleteCliente"
import useGetClientes from "../../../hooks/clientes/useGetClientes"
import { formatCedula } from "../../../utils/formatCedula"
import { formatCurrency } from "../../../utils/formatCurrency"

const columns = [
	"nombre",
	"cédula",
	"no. tarjeta de crédito",
	"límite de crédito",
	"tipo de persona",
	"estado",
]

const Clientes = () => {
	const { clientesQuery } = useGetClientes()
	const { deleteClienteMutation } = useDeleteCliente()

	return (
		<>
			<HeadingTitle>Gestión de Clientes</HeadingTitle>
			<AddLink />
			<Table>
				<TableHead columns={columns} />
				<tbody>
					{clientesQuery.data?.length === 0 ? (
						<NoRegistriesDataCell colspan={columns.length + 1} />
					) : (
						clientesQuery.data?.map(cliente => (
							<tr
								key={cliente.id}
								className="odd:dark:bg-gray-900 even:dark:bg-gray-800 border-b border-gray-700">
								<TableDataCell className="text-white">{cliente.nombre}</TableDataCell>
								<TableDataCell className="text-white">
									{formatCedula(cliente.cedula)}
								</TableDataCell>
								<TableDataCell className="text-white">
									{cliente.numTarjetaCredito}
								</TableDataCell>
								<TableDataCell className="text-white">
									{formatCurrency(cliente.limiteCredito)}
								</TableDataCell>
								<TableDataCell className="text-white">
									{cliente.tipoPersona}
								</TableDataCell>
								<TableDataCell className="text-white">{cliente.estado}</TableDataCell>
								<TableDataCell className="space-x-4">
									<EditLink to={`${cliente.id}/edit`} />
									<DeleteButton onClick={() => deleteClienteMutation(cliente.id)} />
								</TableDataCell>
							</tr>
						))
					)}
				</tbody>
			</Table>
		</>
	)
}

export default Clientes
