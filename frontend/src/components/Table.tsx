import { FC, ReactNode } from "react"

interface TableProps {
	children: ReactNode
	className?: string
}

const Table: FC<TableProps> = ({ children, className }) => {
	return (
		<div className={`max-h-[450px] overflow-y-auto mt-5 ${className}`}>
			<table className="w-full mx-auto text-base bg-gray-500 text-center">
				{children}
			</table>
		</div>
	)
}

export default Table
