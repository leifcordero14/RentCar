import { useQuery } from "@tanstack/react-query"
import { Marca } from "../../interfaces"
import { getMarcaById } from "../../services/api/marca"

const useGetMarcaById = (id: Marca["id"]) => {
	const { data } = useQuery({
		queryKey: ["marcas", id],
		queryFn: () => getMarcaById(id),
	})

	return {
		data,
	}
}

export default useGetMarcaById
