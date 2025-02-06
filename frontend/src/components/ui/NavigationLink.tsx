import { FC } from "react"
import { NavLink } from "react-router-dom"

interface NavigationLinkProps {
	href: string
	label: string
}

const NavigationLink: FC<NavigationLinkProps> = ({ href, label }) => {
	return (
		<li>
			<NavLink
				to={href}
				className={({ isActive }) =>
					`inline-block w-full p-2 ${isActive && "bg-blue-500"} hover:underline`
				}>
				{label}
			</NavLink>
		</li>
	)
}

export default NavigationLink
