import CreateButton from "../../../components/ui/CreateButton"
import FormErrorMessage from "../../../components/ui/FormErrorMessage"
import HeadingTitle from "../../../components/ui/HeadingTitle"
import ReturnLink from "../../../components/ui/ReturnLink"
import useEditCliente from "../../../hooks/clientes/useEditCliente"
import { validarCedula } from "../../../utils/validarCedula"

const EditClienteForm = () => {
	const { register, handleSubmit, errors } = useEditCliente()

	return (
		<>
			<HeadingTitle>Editar Cliente</HeadingTitle>
			<form
				className="flex flex-col gap-4 max-w-[60%] bg-gray-800 p-5 mx-auto"
				onSubmit={handleSubmit}>
				<div className="flex gap-3">
					<div className="space-y-2 text-lg w-1/2">
						<label htmlFor="nombre" className="text-white">
							Nombre
						</label>
						<input
							type="text"
							id="nombre"
							className="p-2 w-full outline-none"
							placeholder="Ej: John Doe"
							{...register("nombre", {
								required: { value: true, message: "El nombre es requerido" },
								minLength: {
									value: 2,
									message: "La descripción debe tener al menos 2 caracteres",
								},
							})}
						/>
						{errors.nombre && (
							<FormErrorMessage>{errors.nombre.message as string}</FormErrorMessage>
						)}
					</div>

					<div className="space-y-2 text-lg w-1/2">
						<label htmlFor="cedula" className="text-white">
							Cédula
						</label>
						<input
							type="text"
							id="cedula"
							className="p-2 w-full outline-none"
							placeholder="Ej: 40100000000"
							{...register("cedula", {
								required: { value: true, message: "La cédula es requerida" },
								validate: value => {
									const isValid = validarCedula(value)
									if (!isValid) return "Cédula inválida"
									return true
								},
							})}
						/>
						{errors.cedula && (
							<FormErrorMessage>{errors.cedula.message as string}</FormErrorMessage>
						)}
					</div>
				</div>

				<div className="flex gap-3">
					<div className="space-y-2 text-lg w-1/2">
						<label htmlFor="numTarjetaCredito" className="text-white">
							No. de Tarjeta de Crédito
						</label>
						<input
							type="text"
							id="numTarjetaCredito"
							className="p-2 w-full outline-none"
							placeholder="Ej: 1234567890123456"
							{...register("numTarjetaCredito", {
								required: {
									value: true,
									message: "El no. de tarjeta de crédito es requerido",
								},
								pattern: {
									value: /^[0-9]*$/,
									message: "El no. de tarjeta de crédito solo puede contener números",
								},
								minLength: {
									value: 16,
									message:
										"El no. de tarjeta de crédito debe tener exactamente 16 caracteres",
								},
								maxLength: {
									value: 16,
									message:
										"El no. de tarjeta de crédito debe tener exactamente 16 caracteres",
								},
							})}
						/>
						{errors.numTarjetaCredito && (
							<FormErrorMessage>
								{errors.numTarjetaCredito.message as string}
							</FormErrorMessage>
						)}
					</div>

					<div className="space-y-2 text-lg w-1/2">
						<label htmlFor="limiteCredito" className="text-white">
							Límite de Crédito
						</label>
						<input
							type="number"
							id="limiteCredito"
							className="p-2 w-full outline-none"
							placeholder="0"
							{...register("limiteCredito", {
								required: { value: true, message: "El limite de crédito es requerido" },
								min: { value: 0, message: "El límite de crédito no puede ser negativo" },
							})}
						/>
						{errors.limiteCredito && (
							<FormErrorMessage>
								{errors.limiteCredito.message as string}
							</FormErrorMessage>
						)}
					</div>
				</div>

				<div className="flex gap-3">
					<div className="space-y-2 text-lg w-1/2">
						<label htmlFor="tipoPersona" className="text-white">
							Tipo de Persona
						</label>
						<select
							id="tipoPersona"
							className="p-2 w-full outline-none"
							defaultValue=""
							{...register("tipoPersona", {
								required: { value: true, message: "El tipo de persona es requerido" },
							})}>
							<option value="" disabled>
								- Seleccione el tipo de persona -
							</option>
							<option value="FISICA">Física</option>
							<option value="JURIDICA">Jurídica</option>
						</select>
						{errors.tipoPersona && (
							<FormErrorMessage>{errors.tipoPersona.message as string}</FormErrorMessage>
						)}
					</div>
					<div className="space-y-2 text-lg w-1/2">
						<label htmlFor="estado" className="text-white">
							Estado
						</label>
						<select
							id="estado"
							className="p-2 w-full outline-none"
							defaultValue=""
							{...register("estado", {
								required: { value: true, message: "El estado es requerido" },
							})}>
							<option value="" disabled>
								- Seleccione un estado -
							</option>
							<option value="ACTIVO">Activo</option>
							<option value="INACTIVO">Inactivo</option>
						</select>
						{errors.estado && (
							<FormErrorMessage>{errors.estado.message as string}</FormErrorMessage>
						)}
					</div>
				</div>

				<div className="flex align-center justify-between mt-3">
					<ReturnLink to="/admin/clientes" />
					<CreateButton />
				</div>
			</form>
		</>
	)
}

export default EditClienteForm
