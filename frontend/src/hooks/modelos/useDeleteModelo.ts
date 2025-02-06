import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { Modelo } from "../../interfaces"
import { deleteModelo } from "../../services/api/modelo"
import { displayErrorToast } from "../../utils/displayErrorToast"
import { displaySuccessToast } from "../../utils/displaySuccessToast"

const useDeleteModelo = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: (id: Modelo["id"]) => deleteModelo(id),
		onSuccess: response => {
			const queryKeysToInvalidate = ["modelos", "vehiculos"]
			queryKeysToInvalidate.forEach(queryKey =>
				queryClient.invalidateQueries({ queryKey: [queryKey] })
			)
			displaySuccessToast(response.message)
		},
		onError: error => {
			displayErrorToast(error)
		},
	})

	const deleteModeloMutation = async (id: Modelo["id"]) => {
		await mutation.mutateAsync(id)
	}

	return {
		deleteModeloMutation,
	}
}

export default useDeleteModelo
