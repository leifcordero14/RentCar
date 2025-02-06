import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { Empleado } from "../../interfaces"
import { deleteEmpleado } from "../../services/api/empleado"
import { displayErrorToast } from "../../utils/displayErrorToast"
import { displaySuccessToast } from "../../utils/displaySuccessToast"

const useDeleteEmpleado = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: (id: Empleado["id"]) => deleteEmpleado(id),
		onSuccess: response => {
			const queryKeysToInvalidate = ["empleados", "rentasDevoluciones"]
			queryKeysToInvalidate.forEach(queryKey => {
				queryClient.invalidateQueries({ queryKey: [queryKey] })
			})
			displaySuccessToast(response.message)
		},
		onError: error => {
			displayErrorToast(error)
		},
	})

	const deleteEmpleadoMutation = async (id: Empleado["id"]) => {
		await mutation.mutateAsync(id)
	}

	return {
		deleteEmpleadoMutation,
	}
}

export default useDeleteEmpleado
