import { Outlet } from "react-router-dom"
import AdminNavbar from "../../components/AdminNavbar"

const AdminRoot = () => {
	return (
		<div className="min-h-dvh flex">
			<AdminNavbar />
			<main className="p-2 grow bg-gray-600">
				<Outlet />
			</main>
		</div>
	)
}

export default AdminRoot
