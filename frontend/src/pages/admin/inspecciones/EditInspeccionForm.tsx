import CreateButton from "../../../components/ui/CreateButton"
import FormErrorMessage from "../../../components/ui/FormErrorMessage"
import HeadingTitle from "../../../components/ui/HeadingTitle"
import ReturnLink from "../../../components/ui/ReturnLink"
import useGetClientes from "../../../hooks/clientes/useGetClientes"
import useGetEmpleados from "../../../hooks/empleados/useGetEmpleados"
import useEditInspeccion from "../../../hooks/inspecciones/useEditInspeccion"
import useGetVehiculos from "../../../hooks/vehiculos/useGetVehiculos"

const EditInspeccionForm = () => {
	const { register, handleSubmit, errors } = useEditInspeccion()
	const { empleadosQuery } = useGetEmpleados()
	const { vehiculosQuery } = useGetVehiculos()
	const { clientesQuery } = useGetClientes()

	return (
		<>
			<HeadingTitle>Editar Inspección</HeadingTitle>
			<form
				className="flex flex-col gap-4 max-w-[80%] bg-gray-800 p-5 mx-auto"
				onSubmit={handleSubmit}>
				<div className="flex gap-3">
					<div className="space-y-2 text-lg w-1/2">
						<label htmlFor="vehiculo" className="text-white">
							Vehículo
						</label>
						<select
							id="vehiculo"
							className="p-2 w-full outline-none"
							defaultValue=""
							{...register("vehiculoId", {
								required: {
									value: true,
									message: "El vehículo es requerido",
								},
							})}>
							<option value="" disabled>
								- Seleccione un vehículo -
							</option>
							{vehiculosQuery.data?.map(vehiculo => (
								<option key={vehiculo.id} value={vehiculo.id}>
									{vehiculo.descripcion}
								</option>
							))}
						</select>
						{errors.vehiculoId && (
							<FormErrorMessage>{errors.vehiculoId.message as string}</FormErrorMessage>
						)}
					</div>

					<div className="space-y-2 text-lg w-1/2">
						<label htmlFor="empleado" className="text-white">
							Empleado
						</label>
						<select
							id="empleado"
							className="p-2 w-full outline-none"
							defaultValue=""
							{...register("empleadoId", {
								required: {
									value: true,
									message: "El empleado es requerido",
								},
							})}>
							<option value="" disabled>
								- Seleccione un empleado -
							</option>
							{empleadosQuery.data?.map(empleado => (
								<option key={empleado.id} value={empleado.id}>
									{empleado.nombre}
								</option>
							))}
						</select>
						{errors.empleadoId && (
							<FormErrorMessage>{errors.empleadoId.message as string}</FormErrorMessage>
						)}
					</div>
				</div>

				<div className="flex gap-3">
					<div className="space-y-2 text-lg w-1/2">
						<label htmlFor="cliente" className="text-white">
							Cliente
						</label>
						<select
							id="cliente"
							className="p-2 w-full outline-none"
							defaultValue=""
							{...register("clienteId", {
								required: {
									value: true,
									message: "El cliente es requerido",
								},
							})}>
							<option value="" disabled>
								- Seleccione un cliente -
							</option>
							{clientesQuery.data?.map(cliente => (
								<option key={cliente.id} value={cliente.id}>
									{cliente.nombre}
								</option>
							))}
						</select>
						{errors.clienteId && (
							<FormErrorMessage>{errors.clienteId.message as string}</FormErrorMessage>
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

				<div className="flex gap-3">
					<div className="space-y-2 text-lg w-1/2">
						<label htmlFor="cantidadCombustible" className="text-white">
							Cantidad de combustible
						</label>
						<select
							id="cantidadCombustible"
							className="p-2 w-full outline-none"
							defaultValue=""
							{...register("cantidadCombustible", {
								required: {
									value: true,
									message: "La cantidad de combustible es requerida",
								},
							})}>
							<option value="" disabled>
								- Seleccione una cantidad de combustible -
							</option>
							<option value="Lleno">Lleno</option>
							<option value="3/4">3/4</option>
							<option value="1/2">1/2</option>
							<option value="1/4">1/4</option>
						</select>
						{errors.cantidadCombustible && (
							<FormErrorMessage>
								{errors.cantidadCombustible.message as string}
							</FormErrorMessage>
						)}
					</div>

					<div className="space-y-2 text-lg w-1/2">
						<label htmlFor="fecha" className="text-white">
							Fecha
						</label>
						<input
							type="date"
							id="fecha"
							className="p-2 w-full outline-none"
							{...register("fecha", {
								required: {
									value: true,
									message: "La fecha es requerida",
								},
								validate: value => {
									const fechaRenta = value === "" ? "" : new Date(value)
									if (fechaRenta > new Date()) {
										return "La fecha no puede ser posterior a la fecha actual"
									}
									return true
								},
							})}
						/>
						{errors.fecha && (
							<FormErrorMessage>{errors.fecha.message as string}</FormErrorMessage>
						)}
					</div>
				</div>
				<div className="text-white flex justify-between">
					<div className="flex gap-3">
						<label htmlFor="ralladuras">Tiene ralladuras:</label>
						<input type="checkbox" id="ralladuras" {...register("tieneRalladuras")} />
					</div>
					<div className="flex gap-3">
						<label htmlFor="gomaRepuesto">Tiene goma de repuesto:</label>
						<input type="checkbox" id="gomaRepuesto" {...register("tieneGomaRepuesto")} />
					</div>
					<div className="flex gap-3">
						<label htmlFor="tieneGato">Tiene gato:</label>
						<input type="checkbox" id="tieneGato" {...register("tieneGato")} />
					</div>
					<div className="flex gap-3">
						<label htmlFor="tieneRoturasCristal">Tiene roturas en el cristal:</label>
						<input
							type="checkbox"
							id="tieneRoturasCristal"
							{...register("tieneRoturasCristal")}
						/>
					</div>
				</div>
				<div className="text-white flex gap-5">
					<fieldset className="flex gap-3 border border-solid p-3">
						<legend className="font-bold">Estado de gomas delanteras</legend>
						<div className="flex gap-3">
							<label htmlFor="goma1">Goma izquierda está bien:</label>
							<input type="checkbox" id="goma1" {...register("goma1")} />
						</div>
						<div className="flex gap-3">
							<label htmlFor="goma2">Goma derecha está bien:</label>
							<input type="checkbox" id="goma2" {...register("goma2")} />
						</div>
					</fieldset>
					<fieldset className="flex gap-3 border border-solid p-3">
						<legend className="font-bold">Estado de gomas traseras</legend>
						<div className="flex gap-3">
							<label htmlFor="goma3">Goma izquierda está bien:</label>
							<input type="checkbox" id="goma3" {...register("goma3")} />
						</div>
						<div className="flex gap-3">
							<label htmlFor="goma4">Goma derecha está bien:</label>
							<input type="checkbox" id="goma4" {...register("goma4")} />
						</div>
					</fieldset>
				</div>
				<div className="flex align-center justify-between mt-3">
					<ReturnLink to="/admin/inspecciones" />
					<CreateButton />
				</div>
			</form>
		</>
	)
}

export default EditInspeccionForm
