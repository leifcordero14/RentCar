import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { Vehiculo } from "../../interfaces"
import { deleteVehiculo } from "../../services/api/vehiculo"
import { displayErrorToast } from "../../utils/displayErrorToast"
import { displaySuccessToast } from "../../utils/displaySuccessToast"

const useDeleteVehiculo = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: (id: Vehiculo["id"]) => deleteVehiculo(id),
		onSuccess: response => {
			const queryKeysToInvalidate = ["vehiculos", "rentasDevoluciones"]
			queryKeysToInvalidate.forEach(queryKey => {
				queryClient.invalidateQueries({ queryKey: [queryKey] })
			})
			displaySuccessToast(response.message)
		},
		onError: error => {
			displayErrorToast(error)
		},
	})

	const deleteVehiculoMutation = async (id: Vehiculo["id"]) => {
		await mutation.mutateAsync(id)
	}

	return {
		deleteVehiculoMutation,
	}
}

export default useDeleteVehiculo
