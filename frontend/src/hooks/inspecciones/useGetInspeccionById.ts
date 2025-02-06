import { useQuery } from "@tanstack/react-query"
import { Inspeccion } from "../../interfaces"
import { getInspeccionById } from "../../services/api/inspeccion"

const useGetInspeccionById = (id: Inspeccion["id"]) => {
	const { data } = useQuery({
		queryKey: ["inspecciones", id],
		queryFn: () => getInspeccionById(id),
	})

	return {
		data,
	}
}

export default useGetInspeccionById
