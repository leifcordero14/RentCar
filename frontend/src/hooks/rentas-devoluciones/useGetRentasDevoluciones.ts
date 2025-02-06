import { useQuery } from "@tanstack/react-query"
import { RentaDevolucionFilter } from "../../interfaces"
import { getRentasDevoluciones } from "../../services/api/rentasDevoluciones"

const useGetRentasDevoluciones = (filter: RentaDevolucionFilter) => {
	const rentasDevolucionesQuery = useQuery({
		queryKey: ["rentasDevoluciones", JSON.stringify(filter)],
		queryFn: () => getRentasDevoluciones(filter),
	})

	return {
		rentasDevolucionesQuery,
	}
}

export default useGetRentasDevoluciones
