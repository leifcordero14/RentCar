import { useQuery } from "@tanstack/react-query"
import { getEmpleados } from "../../services/api/empleado"
import { Estado } from "../../interfaces"

const useGetEmpleados = (estado?: Estado) => {
	const empleadosQuery = useQuery({
		queryKey: ["empleados"],
		queryFn: () => getEmpleados(estado),
	})

	return {
		empleadosQuery,
	}
}

export default useGetEmpleados
