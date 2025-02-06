import CreateButton from "../../../components/ui/CreateButton"
import FormErrorMessage from "../../../components/ui/FormErrorMessage"
import HeadingTitle from "../../../components/ui/HeadingTitle"
import ReturnLink from "../../../components/ui/ReturnLink"
import useGetMarcas from "../../../hooks/marcas/useGetMarcas"
import useEditModelo from "../../../hooks/modelos/useEditModelo"

const EditModeloForm = () => {
	const { handleSubmit, register, errors } = useEditModelo()
	const { marcasQuery } = useGetMarcas()

	return (
		<>
			<HeadingTitle>Editar Modelo</HeadingTitle>
			<form
				className="flex flex-col gap-4 max-w-[40%] bg-gray-800 p-5 mx-auto"
				onSubmit={handleSubmit}>
				<div className="space-y-2 text-lg">
					<label htmlFor="descripcion" className="text-white">
						Descripción
					</label>
					<input
						type="text"
						id="descripcion"
						className="p-2 w-full outline-none"
						placeholder="Ej: Toyota"
						{...register("descripcion", {
							required: { value: true, message: "La descripción es requerida" },
							minLength: {
								value: 3,
								message: "La descripción debe tener al menos 3 caracteres",
							},
						})}
					/>
					{errors.descripcion && (
						<FormErrorMessage>{errors.descripcion.message as string}</FormErrorMessage>
					)}
				</div>

				<div className="space-y-2 text-lg">
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

				<div className="space-y-2 text-lg">
					<label htmlFor="marca" className="text-white">
						Marca
					</label>
					<select
						id="marca"
						className="p-2 w-full outline-none"
						defaultValue=""
						{...register("marcaId", {
							required: { value: true, message: "La marca es requerida" },
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

				<div className="flex align-center justify-between mt-3">
					<ReturnLink to="/admin/modelos" />
					<CreateButton />
				</div>
			</form>
		</>
	)
}

export default EditModeloForm
