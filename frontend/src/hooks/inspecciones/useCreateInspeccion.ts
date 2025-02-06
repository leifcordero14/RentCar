import { useMutation, useQueryClient } from "@tanstack/react-query"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import type { InspeccionPayload } from "../../interfaces"
import { createInspeccion } from "../../services/api/inspeccion"
import { displayErrorToast } from "../../utils/displayErrorToast"
import { displaySuccessToast } from "../../utils/displaySuccessToast"

const useCreateInspeccion = () => {
	const queryClient = useQueryClient()
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<InspeccionPayload>()

	const mutation = useMutation({
		mutationFn: (data: InspeccionPayload) => createInspeccion(data),
		onSuccess: response => {
			queryClient.invalidateQueries({ queryKey: ["inspecciones"] })
			displaySuccessToast(response.message)
			navigate(-1)
		},
		onError: error => {
			displayErrorToast(error)
		},
	})

	const onSubmit: SubmitHandler<InspeccionPayload> = async data => {
		const { goma1, goma2, goma3, goma4, ...rest } = data
		const estadoGomas = [goma1, goma2, goma3, goma4]
			.map(goma => (goma ? "Bien" : "Mal"))
			.join(" ")

		const transformedData = {
			...rest,
			fecha: new Date(rest.fecha).toISOString(),
			estadoGomas,
		}
		await mutation.mutateAsync(transformedData)
	}

	return {
		handleSubmit: handleSubmit(onSubmit),
		register,
		errors,
	}
}

export default useCreateInspeccion
