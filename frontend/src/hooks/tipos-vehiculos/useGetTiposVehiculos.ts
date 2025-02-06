import { useQuery } from "@tanstack/react-query"
import { Estado } from "../../interfaces"
import { getTiposVehiculos } from "../../services/api/tipoVehiculo"

const useGetTiposVehiculos = (estado?: Estado) => {
	const tiposVehiculosQuery = useQuery({
		queryKey: ["tiposVehiculos"],
		queryFn: () => getTiposVehiculos(estado),
	})

	return {
		tiposVehiculosQuery,
	}
}

export default useGetTiposVehiculos
