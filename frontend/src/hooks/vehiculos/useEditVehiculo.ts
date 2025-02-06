import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import type { VehiculoEstado, VehiculoPayload } from "../../interfaces"
import { updateVehiculo } from "../../services/api/vehiculo"
import { displayErrorToast } from "../../utils/displayErrorToast"
import { displaySuccessToast } from "../../utils/displaySuccessToast"
import useGetVehiculoById from "./useGetVehiculoById"

const useEditVehiculo = () => {
	const { id } = useParams<{ id: string }>()
	const queryClient = useQueryClient()
	const navigate = useNavigate()

	const { data: vehiculo } = useGetVehiculoById(Number(id))

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<VehiculoPayload>({
		defaultValues: {
			descripcion: "",
			modeloId: "",
			marcaId: "",
			tipoCombustibleId: "",
			tipoVehiculoId: "",
			numChasis: "",
			numMotor: "",
			numPlaca: "",
			estado: "" as VehiculoEstado,
		},
	})

	useEffect(() => {
		if (vehiculo) {
			setValue("descripcion", vehiculo.descripcion)
			setValue("modeloId", String(vehiculo.modelo.id))
			setValue("marcaId", String(vehiculo.marca.id))
			setValue("tipoCombustibleId", String(vehiculo.tipoCombustible.id))
			setValue("tipoVehiculoId", String(vehiculo.tipoVehiculo.id))
			setValue("numChasis", vehiculo.numChasis)
			setValue("numMotor", vehiculo.numMotor)
			setValue("numPlaca", vehiculo.numPlaca)
			setValue("estado", vehiculo.estado)
		}
	}, [vehiculo, setValue])

	const mutation = useMutation({
		mutationFn: (data: VehiculoPayload) => updateVehiculo(Number(id), data),
		onSuccess: response => {
			const queryKeysToInvalidate = ["vehiculos", "rentasDevoluciones"]
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

	const onSubmit: SubmitHandler<VehiculoPayload> = async data => {
		await mutation.mutateAsync(data)
	}

	return {
		handleSubmit: handleSubmit(onSubmit),
		register,
		errors,
	}
}

export default useEditVehiculo
