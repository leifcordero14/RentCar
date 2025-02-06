import { Link } from "react-router-dom"
import Logo from "./ui/Logo"
import NavigationLink from "./ui/NavigationLink"

const links = [
	{
		href: "/admin/marcas",
		label: "Marcas",
	},
	{
		href: "/admin/modelos",
		label: "Modelos",
	},
	{
		href: "/admin/tipos-vehiculos",
		label: "Tipos de Vehículos",
	},
	{
		href: "/admin/tipos-combustibles",
		label: "Tipos de Combustibles",
	},
	{
		href: "/admin/vehiculos",
		label: "Vehículos",
	},
	{
		href: "/admin/clientes",
		label: "Clientes",
	},
	{
		href: "/admin/empleados",
		label: "Empleados",
	},
	{
		href: "/admin/inspecciones",
		label: "Inspecciones",
	},
	{
		href: "/admin/rentas-devoluciones",
		label: "Rentas y Devoluciones",
	},
	{
		href: "/admin/reporte-rentas",
		label: "Reporte de Rentas",
	},
]

const AdminNavbar = () => {
	return (
		<nav className="flex flex-col gap-6 p-4 bg-black text-white shrink-0">
			<Logo />
			<ul className="flex flex-col">
				{links.map(link => (
					<NavigationLink key={link.href} {...link} />
				))}
			</ul>
			<Link to="/usuarios/login" className="inline-block w-full p-2 mt-auto hover:underline">
				Cerrar Sesión
			</Link>
		</nav>
	)
}

export default AdminNavbar
