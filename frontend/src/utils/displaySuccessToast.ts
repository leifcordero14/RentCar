import { toast } from "react-toastify"

export const displaySuccessToast = (messages: string[]) => {
	messages.forEach(message => toast.success(message))
}
