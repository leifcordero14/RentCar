import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import type { Draft, Estado, Marca } from "../../interfaces"
import { updateMarca } from "../../services/api/marca"
import { displayErrorToast } from "../../utils/displayErrorToast"
import { displaySuccessToast } from "../../utils/displaySuccessToast"
import useGetMarcaById from "./useGetMarcaById"

const useEditMarca = () => {
	const { id } = useParams<{ id: string }>()
	const queryClient = useQueryClient()
	const navigate = useNavigate()

	const { data: marca } = useGetMarcaById(Number(id))

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<Draft<Marca>>({
		defaultValues: {
			descripcion: "",
			estado: "" as Estado,
		},
	})

	useEffect(() => {
		if (marca) {
			setValue("descripcion", marca.descripcion)
			setValue("estado", marca.estado)
		}
	}, [marca, setValue])

	const mutation = useMutation({
		mutationFn: (data: Draft<Marca>) => updateMarca(Number(id), data),
		onSuccess: response => {
			const queryKeysToInvalidate = ["marcas", "modelos", "vehiculos"]
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

	const onSubmit: SubmitHandler<Draft<Marca>> = async data => {
		await mutation.mutateAsync(data)
	}

	return {
		handleSubmit: handleSubmit(onSubmit),
		register,
		errors,
	}
}

export default useEditMarca
