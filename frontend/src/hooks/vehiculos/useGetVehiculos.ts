import { useQuery } from "@tanstack/react-query"
import { VehiculoEstado } from "../../interfaces"
import { getVehiculos } from "../../services/api/vehiculo"

const useGetVehiculos = (estado?: VehiculoEstado) => {
	const vehiculosQuery = useQuery({
		queryKey: ["vehiculos", estado],
		queryFn: () => getVehiculos(estado),
	})

	return {
		vehiculosQuery,
	}
}

export default useGetVehiculos
