import NoRegistriesDataCell from "../../../components/NoRegistriesDataCell"
import Table from "../../../components/Table"
import TableDataCell from "../../../components/TableDataCell"
import TableHead from "../../../components/TableHead"
import AddLink from "../../../components/ui/AddLink"
import DeleteButton from "../../../components/ui/DeleteButton"
import EditLink from "../../../components/ui/EditLink"
import HeadingTitle from "../../../components/ui/HeadingTitle"
import useDeleteInspeccion from "../../../hooks/inspecciones/useDeleteInspeccion"
import useGetInspecciones from "../../../hooks/inspecciones/useGetInspecciones"
import { displayEstadoGomas } from "../../../utils/displayEstadoGomas"
import { formatDate } from "../../../utils/formatDate"

const columns = [
	"vehiculo",
	"cliente",
	"ralladuras",
	"cantidad combustible",
	"goma de repuesto",
	"gato",
	"roturas cristal",
	"estado gomas",
	"fecha",
	"empleado",
	"estado",
]

const Inspecciones = () => {
	const { inspeccionesQuery } = useGetInspecciones()
	const { deleteInspeccionMutation } = useDeleteInspeccion()

	return (
		<>
			<HeadingTitle>Gestión de Inspecciones</HeadingTitle>
			<AddLink />
			<Table>
				<TableHead columns={columns} />
				<tbody>
					{inspeccionesQuery.data?.length === 0 ? (
						<NoRegistriesDataCell colspan={columns.length + 1} />
					) : (
						inspeccionesQuery.data?.map(inspeccion => (
							<tr
								key={inspeccion.id}
								className="odd:dark:bg-gray-900 even:dark:bg-gray-800 border-b border-gray-700">
								<TableDataCell className="text-white">
									{inspeccion.vehiculo.descripcion}
								</TableDataCell>
								<TableDataCell className="text-white">
									{inspeccion.cliente.nombre}
								</TableDataCell>
								<TableDataCell className="text-white">
									{inspeccion.tieneRalladuras ? "Sí" : "No"}
								</TableDataCell>
								<TableDataCell className="text-white">
									{inspeccion.cantidadCombustible}
								</TableDataCell>
								<TableDataCell className="text-white">
									{inspeccion.tieneGomaRepuesto ? "Sí" : "No"}
								</TableDataCell>
								<TableDataCell className="text-white">
									{inspeccion.tieneGato ? "Sí" : "No"}
								</TableDataCell>
								<TableDataCell className="text-white">
									{inspeccion.tieneRoturasCristal ? "Sí" : "No"}
								</TableDataCell>
								<TableDataCell className="text-white">
									{displayEstadoGomas(inspeccion.estadoGomas)}
								</TableDataCell>
								<TableDataCell className="text-white">
									{formatDate(inspeccion.fecha)}
								</TableDataCell>
								<TableDataCell className="text-white">
									{inspeccion.empleado.nombre}
								</TableDataCell>
								<TableDataCell className="text-white">{inspeccion.estado}</TableDataCell>
								<TableDataCell className="space-x-4">
									<EditLink to={`${inspeccion.id}/edit`} />
									<DeleteButton onClick={() => deleteInspeccionMutation(inspeccion.id)} />
								</TableDataCell>
							</tr>
						))
					)}
				</tbody>
			</Table>
		</>
	)
}

export default Inspecciones
