import { useMutation, useQueryClient } from "@tanstack/react-query"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import type { Draft, TipoVehiculo } from "../../interfaces"
import { createTipoVehiculo } from "../../services/api/tipoVehiculo"
import { displayErrorToast } from "../../utils/displayErrorToast"
import { displaySuccessToast } from "../../utils/displaySuccessToast"

const useCreateTipoVehiculo = () => {
	const queryClient = useQueryClient()
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Draft<TipoVehiculo>>()

	const mutation = useMutation({
		mutationFn: (data: Draft<TipoVehiculo>) => createTipoVehiculo(data),
		onSuccess: response => {
			queryClient.invalidateQueries({ queryKey: ["tiposVehiculos"] })
			displaySuccessToast(response.message)
			navigate(-1)
		},
		onError: error => {
			displayErrorToast(error)
		},
	})

	const onSubmit: SubmitHandler<Draft<TipoVehiculo>> = async data => {
		await mutation.mutateAsync(data)
	}

	return {
		handleSubmit: handleSubmit(onSubmit),
		register,
		errors,
	}
}

export default useCreateTipoVehiculo
