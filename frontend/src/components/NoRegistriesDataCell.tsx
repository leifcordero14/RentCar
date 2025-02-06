import { FC } from "react"
import TableDataCell from "./TableDataCell"

interface NoRegistriesDataCellProps {
	colspan: number
}

const NoRegistriesDataCell: FC<NoRegistriesDataCellProps> = ({ colspan }) => {
	return (
		<tr className="bg-gray-900">
			<TableDataCell className="font-medium text-white py-6" colspan={colspan}>
				No hay registros
			</TableDataCell>
		</tr>
	)
}

export default NoRegistriesDataCell
