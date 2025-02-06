import CreateButton from "../../../components/ui/CreateButton"
import FormErrorMessage from "../../../components/ui/FormErrorMessage"
import HeadingTitle from "../../../components/ui/HeadingTitle"
import ReturnLink from "../../../components/ui/ReturnLink"
import useGetClientes from "../../../hooks/clientes/useGetClientes"
import useGetEmpleados from "../../../hooks/empleados/useGetEmpleados"
import useEditRentaDevolucion from "../../../hooks/rentas-devoluciones/useEditRentaDevolucion"
import useGetVehiculos from "../../../hooks/vehiculos/useGetVehiculos"

const CreateRentaDevolucionForm = () => {
	const { register, handleSubmit, errors, watch } = useEditRentaDevolucion()
	const { empleadosQuery } = useGetEmpleados()
	const { vehiculosQuery } = useGetVehiculos()
	const { clientesQuery } = useGetClientes()

	return (
		<>
			<HeadingTitle>Editar Renta y Devolución</HeadingTitle>
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
						{errors.empleadoId && (
							<FormErrorMessage>{errors.empleadoId.message as string}</FormErrorMessage>
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
						{errors.empleadoId && (
							<FormErrorMessage>{errors.empleadoId.message as string}</FormErrorMessage>
						)}
					</div>
					<div className="space-y-2 text-lg w-1/2">
						<label htmlFor="comentario" className="text-white">
							Comentario (opcional)
						</label>
						<textarea
							id="comentario"
							className="resize-none p-2 w-full outline-none"
							rows={1}
							{...register("comentario")}></textarea>
					</div>
				</div>

				<div className="flex gap-3">
					<div className="space-y-2 text-lg w-1/2">
						<label htmlFor="fechaRenta" className="text-white">
							Fecha de Renta
						</label>
						<input
							type="date"
							id="fechaRenta"
							className="p-2 w-full outline-none"
							{...register("fechaRenta", {
								required: {
									value: true,
									message: "La fecha de renta es requerida",
								},
								validate: value => {
									const fechaRenta = value === "" ? "" : new Date(value)
									const fechaDevolucion =
										watch("fechaDevolucion") === ""
											? ""
											: new Date(watch("fechaDevolucion"))
									if (fechaDevolucion && fechaRenta > fechaDevolucion) {
										return "La fecha de renta no puede ser posterior a la fecha de devolución"
									}
									return true
								},
							})}
						/>
						{errors.fechaRenta && (
							<FormErrorMessage>{errors.fechaRenta.message as string}</FormErrorMessage>
						)}
					</div>
					<div className="space-y-2 text-lg w-1/2">
						<label htmlFor="fechaDevolucion" className="text-white">
							Fecha de Devolución
						</label>
						<input
							type="date"
							id="fechaDevolucion"
							className="p-2 w-full outline-none"
							{...register("fechaDevolucion", {
								required: {
									value: true,
									message: "La fecha de devolución es requerida",
								},
								validate: value => {
									const fechaDevolucion = value === "" ? "" : new Date(value)
									const fechaRenta =
										watch("fechaRenta") === "" ? "" : new Date(watch("fechaRenta"))
									if (fechaRenta && fechaDevolucion < fechaRenta) {
										return "La fecha de devolución no puede ser antes de la fecha de renta"
									}
									return true
								},
							})}
						/>
						{errors.fechaDevolucion && (
							<FormErrorMessage>
								{errors.fechaDevolucion.message as string}
							</FormErrorMessage>
						)}
					</div>
				</div>

				<div className="flex gap-3">
					<div className="space-y-2 text-lg w-1/2">
						<label htmlFor="montoPorDia" className="text-white">
							Monto Por Día
						</label>
						<input
							type="number"
							id="montoPorDia"
							className="p-2 w-full outline-none"
							placeholder="1"
							min={1}
							{...register("montoPorDia", {
								required: { value: true, message: "El monto por día es requerido" },
								min: { value: 1, message: "El monto por día no puede ser menor a 1" },
							})}
						/>
						{errors.montoPorDia && (
							<FormErrorMessage>{errors.montoPorDia.message as string}</FormErrorMessage>
						)}
					</div>

					<div className="space-y-2 text-lg w-1/2">
						<label htmlFor="cantidadDias" className="text-white">
							Cantidad de Días
						</label>
						<input
							type="number"
							id="cantidadDias"
							className="p-2 w-full outline-none"
							placeholder="1"
							min={1}
							{...register("cantidadDias", {
								required: { value: true, message: "La cantidad de días es requerida" },
								min: { value: 1, message: "La cantidad de días no puede ser menor a 1" },
							})}
						/>
						{errors.cantidadDias && (
							<FormErrorMessage>{errors.cantidadDias.message as string}</FormErrorMessage>
						)}
					</div>
				</div>

				<div className="flex align-center justify-between mt-3">
					<ReturnLink to="/admin/rentas-devoluciones" />
					<CreateButton />
				</div>
			</form>
		</>
	)
}

export default CreateRentaDevolucionForm
