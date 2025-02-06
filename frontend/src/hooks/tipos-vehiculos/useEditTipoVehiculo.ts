import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import type { Draft, Estado, TipoVehiculo } from "../../interfaces"
import { updateTipoVehiculo } from "../../services/api/tipoVehiculo"
import { displayErrorToast } from "../../utils/displayErrorToast"
import { displaySuccessToast } from "../../utils/displaySuccessToast"
import useGetTipoVehiculoById from "./useGetTipoVehiculoById"

const useEditTipoCombustible = () => {
	const { id } = useParams<{ id: string }>()
	const queryClient = useQueryClient()
	const navigate = useNavigate()

	const { data: tipoVehiculo } = useGetTipoVehiculoById(Number(id))

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<Draft<TipoVehiculo>>({
		defaultValues: {
			descripcion: "",
			estado: "" as Estado,
		},
	})

	useEffect(() => {
		if (tipoVehiculo) {
			setValue("descripcion", tipoVehiculo.descripcion)
			setValue("estado", tipoVehiculo.estado)
		}
	}, [tipoVehiculo, setValue])

	const mutation = useMutation({
		mutationFn: (data: Draft<TipoVehiculo>) => updateTipoVehiculo(Number(id), data),
		onSuccess: response => {
			const queryKeysToInvalidate = ["tiposVehiculos", "vehiculos"]
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

	const onSubmit: SubmitHandler<Draft<TipoVehiculo>> = async data => {
		await mutation.mutateAsync(data)
	}

	return {
		handleSubmit: handleSubmit(onSubmit),
		register,
		errors,
	}
}

export default useEditTipoCombustible
