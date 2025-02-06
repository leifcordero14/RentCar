import { FC } from "react"
import { MdEditSquare } from "react-icons/md"
import { Link } from "react-router-dom"

interface EditLinkProps {
	to: string
}

const EditLink: FC<EditLinkProps> = ({ to }) => {
	return (
		<Link to={to} className="inline-block text-2xl text-green-600">
			<MdEditSquare />
		</Link>
	)
}

export default EditLink
