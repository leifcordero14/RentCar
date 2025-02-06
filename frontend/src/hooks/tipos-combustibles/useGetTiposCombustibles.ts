import { useQuery } from "@tanstack/react-query"
import { Estado } from "../../interfaces"
import { getTiposCombustibles } from "../../services/api/tipoCombustible"

const useGetTiposCombustibles = (estado?: Estado) => {
	const tiposCombustiblesQuery = useQuery({
		queryKey: ["tiposCombustibles"],
		queryFn: () => getTiposCombustibles(estado),
	})

	return {
		tiposCombustiblesQuery,
	}
}

export default useGetTiposCombustibles
