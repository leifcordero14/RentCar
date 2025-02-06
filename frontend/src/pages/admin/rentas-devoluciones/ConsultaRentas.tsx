import FormErrorMessage from "../../../components/ui/FormErrorMessage"
import HeadingTitle from "../../../components/ui/HeadingTitle"
import { useDownloadPDF } from "../../../hooks/rentas-devoluciones/useDownloadPDF"
import useGetTiposVehiculos from "../../../hooks/tipos-vehiculos/useGetTiposVehiculos"

const ConsultaRentas = () => {
	const { handleSubmit, register, errors, watch } = useDownloadPDF()
	const { tiposVehiculosQuery } = useGetTiposVehiculos()

	return (
		<>
			<HeadingTitle>Consultar Rentas</HeadingTitle>
			<form
				className="flex flex-col gap-4 max-w-[40%] bg-gray-800 p-5 mx-auto"
				onSubmit={handleSubmit}>
				<div className="space-y-2 text-lg">
					<label htmlFor="tipo-vehiculo" className="text-white">
						Tipo de Vehículo (opcional)
					</label>
					<select
						id="tipo-vehiculo"
						className="p-2 w-full outline-none"
						defaultValue=""
						{...register("tipoVehiculoId")}>
						<option value="">- Sin filtros -</option>
						{tiposVehiculosQuery.data?.map(marca => (
							<option key={marca.id} value={marca.id}>
								{marca.descripcion}
							</option>
						))}
					</select>
				</div>

				<div className="space-y-2 text-lg">
					<label htmlFor="fechaRenta" className="text-white">
						Fecha de Renta (opcional)
					</label>
					<input
						type="date"
						id="fechaRenta"
						className="p-2 w-full outline-none"
						{...register("fechaRenta", {
							validate: value => {
								const fechaRenta = value === "" ? "" : new Date(value)
								const fechaDevolucion =
									watch("fechaDevolucion") === ""
										? ""
										: new Date(watch("fechaDevolucion"))
								if (fechaDevolucion && fechaRenta > fechaDevolucion) {
									return "La fecha de renta no puede ser posterior a la fecha de devolución"
								}
								if (!fechaDevolucion && fechaRenta > new Date()) {
									return "La fecha de renta no puede ser posterior a la fecha actual"
								}
								if (!fechaDevolucion && fechaRenta) {
									return "Debe seleccionar una fecha de devolución si selecciona una fecha de renta"
								}
								return true
							},
						})}
					/>
					{errors.fechaRenta && (
						<FormErrorMessage>{errors.fechaRenta.message as string}</FormErrorMessage>
					)}
				</div>

				<div className="space-y-2 text-lg">
					<label htmlFor="fechaDevolucion" className="text-white">
						Fecha de Devolución (opcional)
					</label>
					<input
						type="date"
						id="fechaDevolucion"
						className="p-2 w-full outline-none"
						{...register("fechaDevolucion", {
							validate: value => {
								const fechaDevolucion = value === "" ? "" : new Date(value)
								const fechaRenta =
									watch("fechaRenta") === "" ? "" : new Date(watch("fechaRenta"))
								if (fechaRenta && fechaDevolucion < fechaRenta) {
									return "La fecha de devolución no puede ser antes de la fecha de renta"
								}
								if (!fechaRenta && fechaDevolucion > new Date()) {
									return "La fecha de devolución no puede ser posterior a la fecha actual"
								}
								if (!fechaRenta && fechaDevolucion) {
									return "Debe seleccionar una fecha de renta si selecciona una fecha de devolución"
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

				<button
					type="submit"
					className="text-white text-lg px-4 py-2 mt-2 border-none bg-green-500 hover:bg-green-600 w-full transition-colors">
					Descargar PDF
				</button>
			</form>
		</>
	)
}

export default ConsultaRentas
