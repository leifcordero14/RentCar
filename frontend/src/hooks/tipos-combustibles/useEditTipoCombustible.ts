import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import type { Draft, Estado, TipoCombustible } from "../../interfaces"
import { updateTipoCombustible } from "../../services/api/tipoCombustible"
import { displayErrorToast } from "../../utils/displayErrorToast"
import { displaySuccessToast } from "../../utils/displaySuccessToast"
import useGetTipoCombustibleById from "./useGetTipoCombustibleById"

const useEditTipoCombustible = () => {
	const { id } = useParams<{ id: string }>()
	const queryClient = useQueryClient()
	const navigate = useNavigate()

	const { data: tipoCombustible } = useGetTipoCombustibleById(Number(id))

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<Draft<TipoCombustible>>({
		defaultValues: {
			descripcion: "",
			estado: "" as Estado,
		},
	})

	useEffect(() => {
		if (tipoCombustible) {
			setValue("descripcion", tipoCombustible.descripcion)
			setValue("estado", tipoCombustible.estado)
		}
	}, [tipoCombustible, setValue])

	const mutation = useMutation({
		mutationFn: (data: Draft<TipoCombustible>) => updateTipoCombustible(Number(id), data),
		onSuccess: response => {
			const queryKeysToInvalidate = ["tiposCombustibles", "vehiculos"]
			queryKeysToInvalidate.forEach(queryKey =>
				queryClient.invalidateQueries({ queryKey: [queryKey] })
			)
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

export default useEditTipoCombustible
