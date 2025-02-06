import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { Inspeccion } from "../../interfaces"
import { deleteInspeccion } from "../../services/api/inspeccion"
import { displayErrorToast } from "../../utils/displayErrorToast"
import { displaySuccessToast } from "../../utils/displaySuccessToast"

const useDeleteInspeccion = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: (id: Inspeccion["id"]) => deleteInspeccion(id),
		onSuccess: response => {
			const queryKeysToInvalidate = ["inspecciones"]
			queryKeysToInvalidate.forEach(queryKey => {
				queryClient.invalidateQueries({ queryKey: [queryKey] })
			})
			displaySuccessToast(response.message)
		},
		onError: error => {
			displayErrorToast(error)
		},
	})

	const deleteInspeccionMutation = async (id: Inspeccion["id"]) => {
		await mutation.mutateAsync(id)
	}

	return {
		deleteInspeccionMutation,
	}
}

export default useDeleteInspeccion
