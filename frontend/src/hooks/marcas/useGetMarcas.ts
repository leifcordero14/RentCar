import { useQuery } from "@tanstack/react-query"
import { getMarcas } from "../../services/api/marca"
import { Estado } from "../../interfaces"

const useGetMarcas = (estado?: Estado) => {
	const marcasQuery = useQuery({
		queryKey: ["marcas"],
		queryFn:() => getMarcas(estado),
	})

	return {
		marcasQuery,
	}
}

export default useGetMarcas
