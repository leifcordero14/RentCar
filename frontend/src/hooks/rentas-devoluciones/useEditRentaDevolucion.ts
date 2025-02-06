import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import type { RentaDevolucionPayload } from "../../interfaces"
import { updateRentaDevolucion } from "../../services/api/rentasDevoluciones"
import { displayErrorToast } from "../../utils/displayErrorToast"
import { displaySuccessToast } from "../../utils/displaySuccessToast"
import { formatDate } from "../../utils/formatDate"
import useGetRentaDevolucionById from "./useGetRentaDevolucionById"

const useEditRentaDevolucion = () => {
	const { id } = useParams<{ id: string }>()
	const queryClient = useQueryClient()
	const navigate = useNavigate()

	const { data: rentaDevolucion } = useGetRentaDevolucionById(Number(id))

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
		watch,
	} = useForm<RentaDevolucionPayload>({
		defaultValues: {
			vehiculoId: "",
			clienteId: "",
			empleadoId: "",
			fechaRenta: "",
			fechaDevolucion: "",
			montoPorDia: "",
			cantidadDias: "",
			comentario: "",
		},
	})

	useEffect(() => {
		if (rentaDevolucion) {
			setValue("vehiculoId", String(rentaDevolucion.vehiculo.id))
			setValue("clienteId", String(rentaDevolucion.cliente.id))
			setValue("empleadoId", String(rentaDevolucion.empleado.id))
			setValue("fechaRenta", formatDate(rentaDevolucion.fechaRenta))
			setValue("fechaDevolucion", formatDate(rentaDevolucion.fechaDevolucion))
			setValue("montoPorDia", String(rentaDevolucion.montoPorDia))
			setValue("cantidadDias", String(rentaDevolucion.cantidadDias))
			setValue("comentario", rentaDevolucion.comentario || "")
		}
	}, [rentaDevolucion, setValue])

	const mutation = useMutation({
		mutationFn: (data: RentaDevolucionPayload) => updateRentaDevolucion(Number(id), data),
		onSuccess: response => {
			const queryKeysToInvalidate = ["rentasDevoluciones"]
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

export default useEditRentaDevolucion
