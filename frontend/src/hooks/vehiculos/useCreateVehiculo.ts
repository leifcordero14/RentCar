import { useMutation, useQueryClient } from "@tanstack/react-query"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import type { Draft, VehiculoPayload } from "../../interfaces"
import { createVehiculo } from "../../services/api/vehiculo"
import { displayErrorToast } from "../../utils/displayErrorToast"
import { displaySuccessToast } from "../../utils/displaySuccessToast"

const useCreateVehiculo = () => {
	const queryClient = useQueryClient()
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Draft<VehiculoPayload>>()

	const mutation = useMutation({
		mutationFn: (data: Draft<VehiculoPayload>) => createVehiculo(data),
		onSuccess: response => {
			queryClient.invalidateQueries({ queryKey: ["vehiculos"] })
			displaySuccessToast(response.message)
			navigate(-1)
		},
		onError: error => {
			displayErrorToast(error)
		},
	})

	const onSubmit: SubmitHandler<Draft<VehiculoPayload>> = async data => {
		await mutation.mutateAsync(data)
	}

	return {
		handleSubmit: handleSubmit(onSubmit),
		register,
		errors,
	}
}

export default useCreateVehiculo
