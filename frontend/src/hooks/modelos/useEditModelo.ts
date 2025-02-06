import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import type { Estado, ModeloPayload } from "../../interfaces"
import { updateModelo } from "../../services/api/modelo"
import { displayErrorToast } from "../../utils/displayErrorToast"
import { displaySuccessToast } from "../../utils/displaySuccessToast"
import useGetModeloById from "./useGetModeloById"

const useEditModelo = () => {
	const { id } = useParams<{ id: string }>()
	const queryClient = useQueryClient()
	const navigate = useNavigate()

	const { data: modelo } = useGetModeloById(Number(id))

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<ModeloPayload>({
		defaultValues: {
			descripcion: "",
			estado: "" as Estado,
			marcaId: "",
		},
	})

	useEffect(() => {
		if (modelo) {
			setValue("descripcion", modelo.descripcion)
			setValue("estado", modelo.estado)
			setValue("marcaId", String(modelo.marca.id))
		}
	}, [modelo, setValue])

	const mutation = useMutation({
		mutationFn: (data: ModeloPayload) => updateModelo(Number(id), data),
		onSuccess: response => {
			const queryKeysToInvalidate = ["modelos", "vehiculos"]
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

	const onSubmit: SubmitHandler<ModeloPayload> = async data => {
		console.log(data)
		await mutation.mutateAsync(data)
	}

	return {
		handleSubmit: handleSubmit(onSubmit),
		register,
		errors,
	}
}

export default useEditModelo
