import { AxiosError } from "axios"
import { toast } from "react-toastify"

export const displayErrorToast = (errors: unknown) => {
	if (errors instanceof AxiosError) {
		errors.response?.data.message.forEach((message: string) => {
			toast.error(message)
		})
	}
}
