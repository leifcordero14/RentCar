import { useMutation } from "@tanstack/react-query"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import type { UserPayload } from "../../interfaces"
import { register } from "../../services/api/usuario"
import { displayErrorToast } from "../../utils/displayErrorToast"
import { displaySuccessToast } from "../../utils/displaySuccessToast"

const useRegisterUsuario = () => {
	const navigate = useNavigate()
	const {
		register: registerForm,
		handleSubmit,
		formState: { errors },
	} = useForm<UserPayload>()

	const mutation = useMutation({
		mutationFn: (data: UserPayload) => register(data),
		onSuccess: response => {
			displaySuccessToast(response.message)
			navigate("/admin/marcas")
		},
		onError: error => {
			displayErrorToast(error)
		},
	})

	const onSubmit: SubmitHandler<UserPayload> = async data => {
		await mutation.mutateAsync(data)
	}

	return {
		handleSubmit: handleSubmit(onSubmit),
		registerForm,
		errors,
	}
}

export default useRegisterUsuario
