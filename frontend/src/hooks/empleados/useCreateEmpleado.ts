import { useMutation, useQueryClient } from "@tanstack/react-query"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import type { Draft, Empleado } from "../../interfaces"
import { createEmpleado } from "../../services/api/empleado"
import { displayErrorToast } from "../../utils/displayErrorToast"
import { displaySuccessToast } from "../../utils/displaySuccessToast"

const useCreateCliente = () => {
	const queryClient = useQueryClient()
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Draft<Empleado>>()

	const mutation = useMutation({
		mutationFn: (data: Draft<Empleado>) => createEmpleado(data),
		onSuccess: response => {
			queryClient.invalidateQueries({ queryKey: ["empleados"] })
			displaySuccessToast(response.message)
			navigate(-1)
		},
		onError: error => {
			displayErrorToast(error)
		},
	})

	const onSubmit: SubmitHandler<Draft<Empleado>> = async data => {
		const transformedData = {
			...data,
			fechaIngreso: new Date(data.fechaIngreso).toISOString(),
		}
		await mutation.mutateAsync(transformedData)
	}

	return {
		handleSubmit: handleSubmit(onSubmit),
		register,
		errors,
	}
}

export default useCreateCliente
