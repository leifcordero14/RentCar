import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { Cliente } from "../../interfaces"
import { deleteCliente } from "../../services/api/cliente"
import { displayErrorToast } from "../../utils/displayErrorToast"
import { displaySuccessToast } from "../../utils/displaySuccessToast"

const useDeleteCliente = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: (id: Cliente["id"]) => deleteCliente(id),
		onSuccess: response => {
			const queryKeysToInvalidate = ["clientes", "rentasDevoluciones"]
			queryKeysToInvalidate.forEach(queryKey => {
				queryClient.invalidateQueries({ queryKey: [queryKey] })
			})
			displaySuccessToast(response.message)
		},
		onError: error => {
			displayErrorToast(error)
		},
	})

	const deleteClienteMutation = async (id: Cliente["id"]) => {
		await mutation.mutateAsync(id)
	}

	return {
		deleteClienteMutation,
	}
}

export default useDeleteCliente
