import { useQuery } from "@tanstack/react-query"
import { RentaDevolucion } from "../../interfaces"
import { getRentaDevolucionById } from "../../services/api/rentasDevoluciones"

const useRentaDevolucionById = (id: RentaDevolucion["numRenta"]) => {
	const { data } = useQuery({
		queryKey: ["rentasDevoluciones", id],
		queryFn: () => getRentaDevolucionById(id),
	})

	return {
		data,
	}
}

export default useRentaDevolucionById
