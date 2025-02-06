import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import type { Cliente, Draft, Estado, TipoPersona } from "../../interfaces"
import { updateCliente } from "../../services/api/cliente"
import { displayErrorToast } from "../../utils/displayErrorToast"
import { displaySuccessToast } from "../../utils/displaySuccessToast"
import useGetClienteById from "./useGetClienteById"

const useEditCliente = () => {
	const { id } = useParams<{ id: string }>()
	const queryClient = useQueryClient()
	const navigate = useNavigate()

	const { data: cliente } = useGetClienteById(Number(id))

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<Draft<Cliente>>({
		defaultValues: {
			nombre: "",
			cedula: "",
			numTarjetaCredito: "",
			limiteCredito: 1,
			tipoPersona: "" as TipoPersona,
			estado: "" as Estado,
		},
	})

	useEffect(() => {
		if (cliente) {
			setValue("nombre", cliente.nombre)
			setValue("cedula", cliente.cedula)
			setValue("numTarjetaCredito", cliente.numTarjetaCredito)
			setValue("limiteCredito", cliente.limiteCredito)
			setValue("tipoPersona", cliente.tipoPersona)
			setValue("estado", cliente.estado)
		}
	}, [cliente, setValue])

	const mutation = useMutation({
		mutationFn: (data: Draft<Cliente>) => updateCliente(Number(id), data),
		onSuccess: response => {
			const queryKeysToInvalidate = ["clientes", "rentasDevoluciones"]
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

	const onSubmit: SubmitHandler<Draft<Cliente>> = async data => {
		await mutation.mutateAsync(data)
	}

	return {
		handleSubmit: handleSubmit(onSubmit),
		register,
		errors,
	}
}

export default useEditCliente
