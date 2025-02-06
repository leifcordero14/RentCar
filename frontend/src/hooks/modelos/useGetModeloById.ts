import { useQuery } from "@tanstack/react-query"
import { Modelo } from "../../interfaces"
import { getModeloById } from "../../services/api/modelo"

const useGetModeloById = (id: Modelo["id"]) => {
	const { data } = useQuery({
		queryKey: ["modelos", id],
		queryFn: () => getModeloById(id),
	})

	return {
		data,
	}
}

export default useGetModeloById
