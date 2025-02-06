import { FC } from "react"

interface CreateButtonProps {
	text?: string
}

const CreateButton: FC<CreateButtonProps> = ({ text }) => {
	return (
		<button
			type="submit"
			className="inline-block text-lg text-white bg-blue-500 px-4 py-2 hover:bg-blue-600 transition-colors">
			{text ? text : "Enviar"}
		</button>
	)
}

export default CreateButton
