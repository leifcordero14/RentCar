import { FC } from "react"
import { MdDelete } from "react-icons/md"

interface DeleteButtonProps {
	onClick: () => Promise<void>
}

const DeleteButton: FC<DeleteButtonProps> = ({ onClick }) => {
	return (
		<button
			className="inline-block text-2xl text-red-600 cursor-pointer"
			onClick={onClick}>
			<MdDelete />
		</button>
	)
}

export default DeleteButton
