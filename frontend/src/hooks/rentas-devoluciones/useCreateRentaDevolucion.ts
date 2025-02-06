import { useMutation, useQueryClient } from "@tanstack/react-query"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import type { RentaDevolucionPayload } from "../../interfaces"
import { createRentaDevolucion } from "../../services/api/rentasDevoluciones"
import { displayErrorToast } from "../../utils/displayErrorToast"
import { displaySuccessToast } from "../../utils/displaySuccessToast"

const useCreateRentaDevolucion = () => {
	const queryClient = useQueryClient()
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<RentaDevolucionPayload>()

	const mutation = useMutation({
		mutationFn: (data: RentaDevolucionPayload) => createRentaDevolucion(data),
		onSuccess: response => {
			queryClient.invalidateQueries({ queryKey: ["rentasDevoluciones"] })
			displaySuccessToast(response.message)
			navigate(-1)
		},
		onError: error => {
			displayErrorToast(error)
		},
	})

	const onSubmit: SubmitHandler<RentaDevolucionPayload> = async data => {
		const transformedData = {
			...data,
			fechaRenta: new Date(data.fechaRenta).toISOString(),
			fechaDevolucion: new Date(data.fechaDevolucion).toISOString(),
		}
		await mutation.mutateAsync(transformedData)
	}

	return {
		handleSubmit: handleSubmit(onSubmit),
		register,
		errors,
		watch,
	}
}

export default useCreateRentaDevolucion
