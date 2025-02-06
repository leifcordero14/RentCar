import CreateButton from "../../../components/ui/CreateButton"
import FormErrorMessage from "../../../components/ui/FormErrorMessage"
import HeadingTitle from "../../../components/ui/HeadingTitle"
import ReturnLink from "../../../components/ui/ReturnLink"
import useGetMarcas from "../../../hooks/marcas/useGetMarcas"
import useGetModelos from "../../../hooks/modelos/useGetModelos"
import useGetTiposCombustibles from "../../../hooks/tipos-combustibles/useGetTiposCombustibles"
import useGetTiposVehiculos from "../../../hooks/tipos-vehiculos/useGetTiposVehiculos"
import useCreateVehiculo from "../../../hooks/vehiculos/useCreateVehiculo"

const CreateVehiculoForm = () => {
	const { register, handleSubmit, errors } = useCreateVehiculo()
	const { marcasQuery } = useGetMarcas("ACTIVO")
	const { modelosQuery } = useGetModelos("ACTIVO")
	const { tiposVehiculosQuery } = useGetTiposVehiculos("ACTIVO")
	const { tiposCombustiblesQuery } = useGetTiposCombustibles("ACTIVO")

	return (
		<>
			<HeadingTitle>Crear Vehículo</HeadingTitle>
			<form
				className="flex flex-col gap-3 max-w-[70%] bg-gray-800 p-5 mx-auto"
				onSubmit={handleSubmit}>
				<div className="flex gap-3">
					<div className="space-y-2 text-lg w-1/2">
						<label htmlFor="descripcion" className="text-white">
							Descripción
						</label>
						<input
							type="text"
							id="descripcion"
							className="p-2 w-full outline-none"
							placeholder="Ej: Suzuki Vitara 2010 Negro"
							{...register("descripcion", {
								required: { value: true, message: "La descripción es requerida" },
							})}
						/>
						{errors.descripcion && (
							<FormErrorMessage>{errors.descripcion.message as string}</FormErrorMessage>
						)}
					</div>

					<div className="space-y-2 text-lg w-1/2">
						<label htmlFor="marca" className="text-white">
							Marca
						</label>
						<select
							id="marca"
							className="p-2 w-full outline-none"
							defaultValue=""
							{...register("marcaId", {
								required: {
									value: true,
									message: "La marca es requerida",
								},
							})}>
							<option value="" disabled>
								- Seleccione una marca -
							</option>
							{marcasQuery.data?.map(marca => (
								<option key={marca.id} value={marca.id}>
									{marca.descripcion}
								</option>
							))}
						</select>
						{errors.marcaId && (
							<FormErrorMessage>{errors.marcaId.message as string}</FormErrorMessage>
						)}
					</div>
				</div>

				<div className="flex gap-3">
					<div className="space-y-2 text-lg w-1/2">
						<label htmlFor="modelo" className="text-white">
							Modelo
						</label>
						<select
							id="modelo"
							className="p-2 w-full outline-none"
							defaultValue=""
							{...register("modeloId", {
								required: {
									value: true,
									message: "El modelo es requerido",
								},
							})}>
							<option value="" disabled>
								- Seleccione un modelo -
							</option>
							{modelosQuery.data?.map(marca => (
								<option key={marca.id} value={marca.id}>
									{marca.descripcion}
								</option>
							))}
						</select>
						{errors.modeloId && (
							<FormErrorMessage>{errors.modeloId.message as string}</FormErrorMessage>
						)}
					</div>

					<div className="space-y-2 text-lg w-1/2">
						<label htmlFor="tipo-combustible" className="text-white">
							Tipo de Combustible
						</label>
						<select
							id="tipo-combustible"
							className="p-2 w-full outline-none"
							defaultValue=""
							{...register("tipoCombustibleId", {
								required: {
									value: true,
									message: "El tipo de combustible es requerido",
								},
							})}>
							<option value="" disabled>
								- Seleccione un tipo de combustible -
							</option>
							{tiposCombustiblesQuery.data?.map(marca => (
								<option key={marca.id} value={marca.id}>
									{marca.descripcion}
								</option>
							))}
						</select>
						{errors.modeloId && (
							<FormErrorMessage>{errors.modeloId.message as string}</FormErrorMessage>
						)}
					</div>
				</div>

				<div className="flex gap-3">
					<div className="space-y-2 text-lg w-1/2">
						<label htmlFor="tipo-vehiculo" className="text-white">
							Tipo de Vehículo
						</label>
						<select
							id="tipo-vehiculo"
							className="p-2 w-full outline-none"
							defaultValue=""
							{...register("tipoVehiculoId", {
								required: {
									value: true,
									message: "El tipo de vehículo es requerido",
								},
							})}>
							<option value="" disabled>
								- Seleccione un tipo de vehículo -
							</option>
							{tiposVehiculosQuery.data?.map(marca => (
								<option key={marca.id} value={marca.id}>
									{marca.descripcion}
								</option>
							))}
						</select>
						{errors.modeloId && (
							<FormErrorMessage>{errors.modeloId.message as string}</FormErrorMessage>
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
							<option value="DISPONIBLE">Disponible</option>
							<option value="SOLICITADO">Solicitado</option>
							<option value="RENTADO">Rentado</option>
						</select>
						{errors.estado && (
							<FormErrorMessage>{errors.estado.message as string}</FormErrorMessage>
						)}
					</div>
				</div>

				<div className="flex gap-3">
					<div className="space-y-2 text-lg w-1/3">
						<label htmlFor="numMotor" className="text-white">
							No. de Motor
						</label>
						<input
							type="text"
							id="numMotor"
							className="p-2 w-full outline-none"
							placeholder="Ej: MTR123456"
							{...register("numMotor", {
								required: { value: true, message: "El no. de motor es requerido" },
							})}
						/>
						{errors.numMotor && (
							<FormErrorMessage>{errors.numMotor.message as string}</FormErrorMessage>
						)}
					</div>
					<div className="space-y-2 text-lg w-1/3">
						<label htmlFor="numPlaca" className="text-white">
							No. de Placa
						</label>
						<input
							type="text"
							id="numPlaca"
							className="p-2 w-full outline-none"
							placeholder="Ej: LWYRUP"
							{...register("numPlaca", {
								required: { value: true, message: "El no. de placa es requerida" },
							})}
						/>
						{errors.numPlaca && (
							<FormErrorMessage>{errors.numPlaca.message as string}</FormErrorMessage>
						)}
					</div>
					<div className="space-y-2 text-lg w-1/3">
						<label htmlFor="numChasis" className="text-white">
							No. de Chasis
						</label>
						<input
							type="text"
							id="numChasis"
							className="p-2 w-full outline-none"
							placeholder="Ej: 1JDKEI49F"
							{...register("numChasis", {
								required: { value: true, message: "El no. de chasis es requerido" },
							})}
						/>
						{errors.numChasis && (
							<FormErrorMessage>{errors.numChasis.message as string}</FormErrorMessage>
						)}
					</div>
				</div>
  
				<div className="flex align-center justify-between mt-3">
					<ReturnLink to="/admin/vehiculos" />
					<CreateButton />
				</div>
			</form>
		</>
	)
}

export default CreateVehiculoForm
