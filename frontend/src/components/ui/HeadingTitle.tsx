import { FC, ReactNode } from "react"

interface HeadingTitleProps {
	children: ReactNode
	className?: string
}

const HeadingTitle: FC<HeadingTitleProps> = ({ children, className }) => {
	return (
		<h1 className={`text-4xl font-bold text-center text-white mt-4 mb-8 ${className}`}>
			{children}
		</h1>
	)
}

export default HeadingTitle
