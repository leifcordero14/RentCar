import FormErrorMessage from '../../../components/ui/FormErrorMessage'
import CreateButton from '../../../components/ui/CreateButton'
import HeadingTitle from '../../../components/ui/HeadingTitle'
import ReturnLink from '../../../components/ui/ReturnLink'
import useEditEmpleado from '../../../hooks/empleados/useEditEmpleado'

const EditEmpleadoForm = () => {
  const { register, handleSubmit, errors } = useEditEmpleado()

  return (
    <>
			<HeadingTitle>Editar Empleado</HeadingTitle>
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
									message: "El nombre debe tener al menos 2 caracteres",
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
						<label htmlFor="fechaIngreso" className="text-white">
							Fecha de Ingreso
						</label>
						<input
							type="date"
							id="fechaIngreso"
							className="p-2 w-full outline-none"
							{...register("fechaIngreso", {
								required: {
									value: true,
									message: "La fecha de ingreso es requerida",
								},
								validate: value => {
									const fechaIngreso = new Date(value)
									return fechaIngreso <= new Date()
										? true
										: "La fecha de ingreso no puede ser posterior a la fecha actual"
								},
							})}
						/>
						{errors.fechaIngreso && (
							<FormErrorMessage>{errors.fechaIngreso.message as string}</FormErrorMessage>
						)}
					</div>

					<div className="space-y-2 text-lg w-1/2">
						<label htmlFor="porcientoComision" className="text-white">
							% de comisión
						</label>
						<input
							type="number"
							id="porcientoComision"
							className="p-2 w-full outline-none"
							placeholder="1"
							min={1}
							{...register("porcientoComision", {
								required: { value: true, message: "El % de comisión es requerido" },
								min: { value: 1, message: "El % de comisión no puede ser menor a 1" },
								max: { value: 15, message: "El % de comisión no puede ser mayor a 15" },
							})}
						/>
						{errors.porcientoComision && (
							<FormErrorMessage>
								{errors.porcientoComision.message as string}
							</FormErrorMessage>
						)}
					</div>
				</div>

				<div className="flex gap-3">
					<div className="space-y-2 text-lg w-1/2">
						<label htmlFor="tandaLaboral" className="text-white">
							Tanda Laboral
						</label>
						<select
							id="tandaLaboral"
							className="p-2 w-full outline-none"
							defaultValue=""
							{...register("tandaLaboral", {
								required: { value: true, message: "La tanda laboral es requerida" },
							})}>
							<option value="" disabled>
								- Seleccione la tanda laboral -
							</option>
							<option value="MATUTINA">Matutina</option>
							<option value="VESPERTINA">Vespertina</option>
							<option value="NOCTURNA">Nocturna</option>
						</select>
						{errors.tandaLaboral && (
							<FormErrorMessage>{errors.tandaLaboral.message as string}</FormErrorMessage>
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
					<ReturnLink to="/admin/empleados" />
					<CreateButton />
				</div>
			</form>
		</>
  )
}

export default EditEmpleadoForm