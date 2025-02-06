import { useQuery } from "@tanstack/react-query"
import { Empleado } from "../../interfaces"
import { getEmpleadoById } from "../../services/api/empleado"

const useGetEmpleadoById = (id: Empleado["id"]) => {
	const { data } = useQuery({
		queryKey: ["empleados", id],
		queryFn: () => getEmpleadoById(id),
	})

	return {
		data,
	}
}

export default useGetEmpleadoById
