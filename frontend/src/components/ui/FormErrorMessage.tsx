import { FC, ReactNode } from "react"

interface ErrorMessageProps {
	children: ReactNode
}

const FormErrorMessage: FC<ErrorMessageProps> = ({ children }) => {
	return <span className="text-red-500 text-sm">{children}</span>
}

export default FormErrorMessage
