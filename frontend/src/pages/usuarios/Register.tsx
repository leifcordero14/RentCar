import CreateButton from "../../components/ui/CreateButton"
import FormErrorMessage from "../../components/ui/FormErrorMessage"
import HeadingTitle from "../../components/ui/HeadingTitle"
import ReturnLink from "../../components/ui/ReturnLink"
import useRegisterUsuario from "../../hooks/usuarios/useRegisterUsuario"

const Register = () => {
	const { registerForm, handleSubmit, errors } = useRegisterUsuario()

	return (
		<>
			<HeadingTitle>Registrar Administrador</HeadingTitle>
			<form
				className="flex flex-col gap-4 max-w-[40%] bg-gray-800 p-5 mx-auto"
				onSubmit={handleSubmit}>
				<div className="space-y-2 text-lg">
					<label htmlFor="username" className="text-white">
						Nombre de Usuario
					</label>
					<input
						type="text"
						id="username"
						className="p-2 w-full outline-none"
						{...registerForm("username", {
							required: { value: true, message: "El nombre de usuario es requerido" },
						})}
					/>
					{errors.username && (
						<FormErrorMessage>{errors.username.message as string}</FormErrorMessage>
					)}
				</div>

				<div className="space-y-2 text-lg">
					<label htmlFor="password" className="text-white">
						Contraseña
					</label>
					<input
						type="password"
						id="password"
						className="p-2 w-full outline-none"
						{...registerForm("password", {
							required: { value: true, message: "La contraseña es requerida" },
						})}
					/>
					{errors.password && (
						<FormErrorMessage>{errors.password.message as string}</FormErrorMessage>
					)}
				</div>
				<div className="flex align-center justify-between mt-3">
					<ReturnLink to="/usuarios/login" text="Volver a login"/>
					<CreateButton text="Registrarse" />
				</div>
			</form>
		</>
	)
}

export default Register
