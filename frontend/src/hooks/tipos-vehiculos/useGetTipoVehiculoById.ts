import { useQuery } from "@tanstack/react-query"
import { TipoVehiculo } from "../../interfaces"
import { getTipoVehiculoById } from "../../services/api/tipoVehiculo"

const useGetTipoVehiculoById = (id: TipoVehiculo["id"]) => {
	const { data } = useQuery({
		queryKey: ["tiposVehiculos", id],
		queryFn: () => getTipoVehiculoById(id),
	})

	return {
		data,
	}
}

export default useGetTipoVehiculoById
