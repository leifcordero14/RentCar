import { FC } from "react"

interface VehicleFilterProps {
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const VehicleFilter: FC<VehicleFilterProps> = ({ onChange }) => {
	return (
		<div>
			<label htmlFor="filtro" className="text-white inline-block mr-4">
				Filtrar Vehículos:
			</label>
			<select name="estado" id="filtro" className="p-2" onChange={onChange}>
				<option value="">Sin filtro</option>
				<option value="DISPONIBLE">Disponibles</option>
				<option value="RENTADO">Rentados</option>
				<option value="SOLICITADO">Solicitados</option>
			</select>
		</div>
	)
}

export default VehicleFilter
