import { useQuery } from "@tanstack/react-query"
import { Estado } from "../../interfaces"
import { getModelos } from "../../services/api/modelo"

const useGetModelos = (estado?: Estado) => {
	const modelosQuery = useQuery({
		queryKey: ["modelos"],
		queryFn: () => getModelos(estado),
	})

	return {
		modelosQuery,
	}
}

export default useGetModelos
