import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { TipoVehiculo } from "../../interfaces"
import { deleteTipoVehiculo } from "../../services/api/tipoVehiculo"
import { displayErrorToast } from "../../utils/displayErrorToast"
import { displaySuccessToast } from "../../utils/displaySuccessToast"

const useDeleteTipoVehiculo = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: (id: TipoVehiculo["id"]) => deleteTipoVehiculo(id),
		onSuccess: response => {
			const queryKeysToInvalidate = ["tiposVehiculos", "vehiculos"]
			queryKeysToInvalidate.forEach(queryKey => {
				queryClient.invalidateQueries({ queryKey: [queryKey] })
			})
			displaySuccessToast(response.message)
		},
		onError: error => {
			displayErrorToast(error)
		},
	})

	const deleteTipoVehiculoMutation = async (id: TipoVehiculo["id"]) => {
		await mutation.mutateAsync(id)
	}

	return {
		deleteTipoVehiculoMutation,
	}
}

export default useDeleteTipoVehiculo
