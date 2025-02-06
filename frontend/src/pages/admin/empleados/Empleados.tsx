import NoRegistriesDataCell from "../../../components/NoRegistriesDataCell"
import Table from "../../../components/Table"
import TableDataCell from "../../../components/TableDataCell"
import TableHead from "../../../components/TableHead"
import AddLink from "../../../components/ui/AddLink"
import DeleteButton from "../../../components/ui/DeleteButton"
import EditLink from "../../../components/ui/EditLink"
import HeadingTitle from "../../../components/ui/HeadingTitle"
import useDeleteEmpleado from "../../../hooks/empleados/useDeleteEmpleado"
import useGetEmpleados from "../../../hooks/empleados/useGetEmpleados"
import { formatCedula } from "../../../utils/formatCedula"
import { formatDate } from "../../../utils/formatDate"

const columns = [
	"nombre",
	"cédula",
	"tanda laboral",
	"% de comisión",
	"fecha de ingreso",
	"estado",
]

const Empleados = () => {
	const { empleadosQuery } = useGetEmpleados()
	const { deleteEmpleadoMutation } = useDeleteEmpleado()

	return (
		<>
			<HeadingTitle>Gestión de Empleados</HeadingTitle>
			<AddLink />
			<Table>
				<TableHead columns={columns} />
				<tbody>
					{empleadosQuery.data?.length === 0 ? (
						<NoRegistriesDataCell colspan={columns.length + 1} />
					) : (
						empleadosQuery.data?.map(empleado => (
							<tr
								key={empleado.id}
								className="odd:dark:bg-gray-900 even:dark:bg-gray-800 border-b border-gray-700">
								<TableDataCell className="text-white">{empleado.nombre}</TableDataCell>
								<TableDataCell className="text-white">
									{formatCedula(empleado.cedula)}
								</TableDataCell>
								<TableDataCell className="text-white">
									{empleado.tandaLaboral}
								</TableDataCell>
								<TableDataCell className="text-white">
									{empleado.porcientoComision}%
								</TableDataCell>
								<TableDataCell className="text-white">
									{formatDate(empleado.fechaIngreso)}
								</TableDataCell>
								<TableDataCell className="text-white">{empleado.estado}</TableDataCell>
								<TableDataCell className="space-x-4">
									<EditLink to={`${empleado.id}/edit`} />
									<DeleteButton onClick={() => deleteEmpleadoMutation(empleado.id)} />
								</TableDataCell>
							</tr>
						))
					)}
				</tbody>
			</Table>
		</>
	)
}

export default Empleados
