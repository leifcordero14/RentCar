import { FC } from "react"

interface TableHeadProps {
	columns: string[]
}

const TableHead: FC<TableHeadProps> = ({ columns }) => {
	return (
		<thead className="text-white uppercase bg-gray-700 sticky top-0">
			<tr>
				{columns.map(col => (
					<th key={col} className="p-3">
						{col}
					</th>
				))}
				<th className="px-4 py-3">Acciones</th>
			</tr>
		</thead>
	)
}

export default TableHead
