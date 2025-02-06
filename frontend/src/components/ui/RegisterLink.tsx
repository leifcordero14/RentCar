import { Link } from "react-router-dom"

const RegisterLink = () => {
	return (
		<Link
			to="/usuarios/register"
			className="inline-block text-lg text-white bg-green-500 px-4 py-2 hover:bg-green-600 transition-colors">
			Registrarse
		</Link>
	)
}

export default RegisterLink
