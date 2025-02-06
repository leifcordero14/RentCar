import { useQuery } from "@tanstack/react-query"
import { getClientes } from "../../services/api/cliente"
import { Estado } from "../../interfaces"

const useGetClientes = (estado?: Estado) => {
	const clientesQuery = useQuery({
		queryKey: ["clientes"],
		queryFn: () => getClientes(estado),
	})

	return {
		clientesQuery,
	}
}

export default useGetClientes
