import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { RentaDevolucion } from "../../interfaces"
import { deleteRentaDevolucion } from "../../services/api/rentasDevoluciones"
import { displayErrorToast } from "../../utils/displayErrorToast"
import { displaySuccessToast } from "../../utils/displaySuccessToast"

const useDeleteRentaDevolucion = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: (id: RentaDevolucion["numRenta"]) => deleteRentaDevolucion(id),
		onSuccess: response => {
			const queryKeysToInvalidate = ["rentasDevoluciones"]
			queryKeysToInvalidate.forEach(queryKey =>
				queryClient.invalidateQueries({ queryKey: [queryKey] })
			)
			displaySuccessToast(response.message)
		},
		onError: error => {
			displayErrorToast(error)
		},
	})

	const deleteRentaDevolucionMutation = async (id: RentaDevolucion["numRenta"]) => {
		await mutation.mutateAsync(id)
	}

	return {
		deleteRentaDevolucionMutation,
	}
}

export default useDeleteRentaDevolucion
