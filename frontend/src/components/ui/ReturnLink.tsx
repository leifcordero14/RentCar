import { FC } from "react"
import { Link } from "react-router-dom"

interface ReturnLinkProps {
	to: string
	text?: string
}

const ReturnLink: FC<ReturnLinkProps> = ({ to, text }) => {
	return (
		<Link
			to={to}
			className="inline-block text-lg text-white bg-red-500 px-4 py-2 hover:bg-red-600 transition-colors">
			{text ? text : "Volver"}
		</Link>
	)
}

export default ReturnLink
