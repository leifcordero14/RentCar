import { useQuery } from "@tanstack/react-query"
import { TipoCombustible } from "../../interfaces"
import { getTipoCombustibleById } from "../../services/api/tipoCombustible"

const useGetTipoCombustibleById = (id: TipoCombustible["id"]) => {
	const { data } = useQuery({
		queryKey: ["tiposCombustibles", id],
		queryFn: () => getTipoCombustibleById(id),
	})

	return {
		data,
	}
}

export default useGetTipoCombustibleById
