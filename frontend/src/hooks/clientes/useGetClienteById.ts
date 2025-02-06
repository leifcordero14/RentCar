import { useQuery } from "@tanstack/react-query"
import { Cliente } from "../../interfaces"
import { getClienteById } from "../../services/api/cliente"

const useGetClienteById = (id: Cliente["id"]) => {
	const { data } = useQuery({
		queryKey: ["clientes", id],
		queryFn: () => getClienteById(id),
	})

	return {
		data,
	}
}

export default useGetClienteById
