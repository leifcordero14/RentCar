import { useQuery } from "@tanstack/react-query"
import { Vehiculo } from "../../interfaces"
import { getVehiculoById } from "../../services/api/vehiculo"

const useGetVehiculoById = (id: Vehiculo["id"]) => {
	const { data } = useQuery({
		queryKey: ["vehiculos", id],
		queryFn: () => getVehiculoById(id),
	})

	return {
		data,
	}
}

export default useGetVehiculoById
