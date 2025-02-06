import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { Marca } from "../../interfaces"
import { deleteMarca } from "../../services/api/marca"
import { displayErrorToast } from "../../utils/displayErrorToast"
import { displaySuccessToast } from "../../utils/displaySuccessToast"

const useDeleteMarca = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: (id: Marca["id"]) => deleteMarca(id),
		onSuccess: response => {
			const queryKeysToInvalidate = ["marcas", "modelos", "vehiculos"]
			queryKeysToInvalidate.forEach(queryKey => {
				queryClient.invalidateQueries({ queryKey: [queryKey] })
			})
			displaySuccessToast(response.message)
		},
		onError: error => {
			displayErrorToast(error)
		},
	})

	const deleteMarcaMutation = async (id: Marca["id"]) => {
		await mutation.mutateAsync(id)
	}

	return {
		deleteMarcaMutation,
	}
}

export default useDeleteMarca
