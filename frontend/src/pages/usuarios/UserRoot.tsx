import { Outlet } from "react-router-dom"

const UserRoot = () => {
	return (
		<div className="min-h-dvh flex flex-col justify-center items-center bg-gray-600">
			<Outlet />
		</div>
	)
}

export default UserRoot
