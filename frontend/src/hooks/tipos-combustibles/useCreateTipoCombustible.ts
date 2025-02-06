import { useMutation, useQueryClient } from "@tanstack/react-query"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import type { Draft, TipoCombustible } from "../../interfaces"
import { createTipoCombustible } from "../../services/api/tipoCombustible"
import { displayErrorToast } from "../../utils/displayErrorToast"
import { displaySuccessToast } from "../../utils/displaySuccessToast"

const useCreateTipoCombustible = () => {
	const queryClient = useQueryClient()
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Draft<TipoCombustible>>()

	const mutation = useMutation({
		mutationFn: (data: Draft<TipoCombustible>) => createTipoCombustible(data),
		onSuccess: response => {
			queryClient.invalidateQueries({ queryKey: ["tiposCombustibles"] })
			displaySuccessToast(response.message)
			navigate(-1)
		},
		onError: error => {
			displayErrorToast(error)
		},
	})

	const onSubmit: SubmitHandler<Draft<TipoCombustible>> = async data => {
		await mutation.mutateAsync(data)
	}

	return {
		handleSubmit: handleSubmit(onSubmit),
		register,
		errors,
	}
}

export default useCreateTipoCombustible
