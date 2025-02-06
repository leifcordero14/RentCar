import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { TipoCombustible } from "../../interfaces"
import { deleteTipoCombustible } from "../../services/api/tipoCombustible"
import { displayErrorToast } from "../../utils/displayErrorToast"
import { displaySuccessToast } from "../../utils/displaySuccessToast"

const useDeleteTipoCombustible = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: (id: TipoCombustible["id"]) => deleteTipoCombustible(id),
		onSuccess: response => {
			const queryKeysToInvalidate = ["tiposCombustibles", "vehiculos"]
			queryKeysToInvalidate.forEach(queryKey => {
				queryClient.invalidateQueries({ queryKey: [queryKey] })
			})
			displaySuccessToast(response.message)
		},
		onError: error => {
			displayErrorToast(error)
		},
	})

	const deleteTipoCombustibleMutation = async (id: TipoCombustible["id"]) => {
		await mutation.mutateAsync(id)
	}

	return {
		deleteTipoCombustibleMutation,
	}
}

export default useDeleteTipoCombustible
