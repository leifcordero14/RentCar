import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import type { Draft, Empleado, Estado, TandaLaboral } from "../../interfaces"
import { updateEmpleado } from "../../services/api/empleado"
import { displayErrorToast } from "../../utils/displayErrorToast"
import { displaySuccessToast } from "../../utils/displaySuccessToast"
import { formatDate } from "../../utils/formatDate"
import useGetEmpleadoById from "./useGetEmpleadoById"

const useEditEmpleado = () => {
	const { id } = useParams<{ id: string }>()
	const queryClient = useQueryClient()
	const navigate = useNavigate()

	const { data: empleado } = useGetEmpleadoById(Number(id))

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<Draft<Empleado>>({
		defaultValues: {
			nombre: "",
			cedula: "",
			porcientoComision: 1,
			fechaIngreso: "",
			tandaLaboral: "" as TandaLaboral,
			estado: "" as Estado,
		},
	})

	useEffect(() => {
		if (empleado) {
			setValue("nombre", empleado.nombre)
			setValue("cedula", empleado.cedula)
			setValue("porcientoComision", empleado.porcientoComision)
			setValue("fechaIngreso", formatDate(empleado.fechaIngreso))
			setValue("tandaLaboral", empleado.tandaLaboral)
			setValue("estado", empleado.estado)
		}
	}, [empleado, setValue])

	const mutation = useMutation({
		mutationFn: (data: Draft<Empleado>) => updateEmpleado(Number(id), data),
		onSuccess: response => {
			const queryKeysToInvalidate = ["empleados", "rentasDevoluciones"]
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

export default useEditEmpleado
