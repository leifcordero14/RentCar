import { FC, ReactNode } from "react"

interface TableDataCellProps {
	children: ReactNode
	className?: string
	colspan?: number
}

const TableDataCell: FC<TableDataCellProps> = ({ children, className, colspan }) => {
	return (
		<td className={`px-1 py-2 text-sm ${className}`} colSpan={colspan}>
			{children}
		</td>
	)
}

export default TableDataCell
