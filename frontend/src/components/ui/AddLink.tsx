import { Link } from "react-router-dom"

const AddLink = () => {
	return (
		<Link
			to="create"
			className=" inline-block text-lg text-white bg-blue-500 px-4 py-2 hover:bg-blue-600 transition-colors">
			Agregar
		</Link>
	)
}

export default AddLink
