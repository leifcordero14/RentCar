import { useQuery } from "@tanstack/react-query"
import { getInspecciones } from "../../services/api/inspeccion"

const useGetInspecciones = () => {
	const inspeccionesQuery = useQuery({
		queryKey: ["inspecciones"],
		queryFn: () => getInspecciones(),
	})

	return {
		inspeccionesQuery,
	}
}

export default useGetInspecciones
