import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import type { Inspeccion, InspeccionPayload } from "../../interfaces"
import { updateInspeccion } from "../../services/api/inspeccion"
import { displayErrorToast } from "../../utils/displayErrorToast"
import { displaySuccessToast } from "../../utils/displaySuccessToast"
import { formatDate } from "../../utils/formatDate"
import useGetInspeccionById from "./useGetInspeccionById"

const useEditInspeccion = () => {
	const { id } = useParams<{ id: string }>()
	const queryClient = useQueryClient()
	const navigate = useNavigate()

	const { data: inspeccion } = useGetInspeccionById(Number(id))

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<InspeccionPayload>({
		defaultValues: {
			clienteId: "",
			vehiculoId: "",
			tieneRalladuras: false,
			cantidadCombustible: "" as Inspeccion["cantidadCombustible"],
			tieneGomaRepuesto: false,
			tieneGato: false,
			tieneRoturasCristal: false,
			estadoGomas: "",
			fecha: "",
			empleadoId: "",
			estado: "" as Inspeccion["estado"],
		},
	})

	useEffect(() => {
		if (inspeccion) {
			const { estadoGomas } = inspeccion
			const gomas = estadoGomas.split(" ")

      setValue("goma1", gomas[0] === "Bien")
      setValue("goma2", gomas[1] === "Bien")
      setValue("goma3", gomas[2] === "Bien")
      setValue("goma4", gomas[3] === "Bien")
			setValue("vehiculoId", String(inspeccion.vehiculo.id))
			setValue("clienteId", String(inspeccion.cliente.id))
			setValue("empleadoId", String(inspeccion.empleado.id))
			setValue("tieneRalladuras", inspeccion.tieneRalladuras)
			setValue("cantidadCombustible", inspeccion.cantidadCombustible)
			setValue("tieneGomaRepuesto", inspeccion.tieneGomaRepuesto)
			setValue("tieneGato", inspeccion.tieneGato)
			setValue("tieneRoturasCristal", inspeccion.tieneRoturasCristal)
			setValue("fecha", formatDate(inspeccion.fecha))
			setValue("estado", inspeccion.estado)
		}
	}, [inspeccion, setValue])

	const mutation = useMutation({
		mutationFn: (data: InspeccionPayload) => updateInspeccion(Number(id), data),
		onSuccess: response => {
			const queryKeysToInvalidate = ["inspecciones"]
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

export default useEditInspeccion
