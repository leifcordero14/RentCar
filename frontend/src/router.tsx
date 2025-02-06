import {
	createBrowserRouter,
	createRoutesFromElements,
	Navigate,
	Route,
} from "react-router-dom"
import AdminRoot from "./pages/admin/AdminRoot"
import Clientes from "./pages/admin/clientes/Clientes"
import CreateClienteForm from "./pages/admin/clientes/CreateClienteForm"
import EditClienteForm from "./pages/admin/clientes/EditClienteForm"
import CreateEmpleadoForm from "./pages/admin/empleados/CreateEmpleadoForm"
import EditEmpleadoForm from "./pages/admin/empleados/EditEmpleadoForm"
import Empleados from "./pages/admin/empleados/Empleados"
import CreateInspeccionForm from "./pages/admin/inspecciones/CreateInspeccionForm"
import EditInspeccionForm from "./pages/admin/inspecciones/EditInspeccionForm"
import Inspecciones from "./pages/admin/inspecciones/Inspecciones"
import CreateMarcaForm from "./pages/admin/marcas/CreateMarcaForm"
import EditMarcaForm from "./pages/admin/marcas/EditMarcaForm"
import Marcas from "./pages/admin/marcas/Marcas"
import CreateModeloForm from "./pages/admin/modelos/CreateModeloForm"
import EditModeloForm from "./pages/admin/modelos/EditModeloForm"
import Modelos from "./pages/admin/modelos/Modelos"
import ConsultaRentas from "./pages/admin/rentas-devoluciones/ConsultaRentas"
import CreateRentaDevolucionForm from "./pages/admin/rentas-devoluciones/CreateRentaDevolucionForm"
import EditRentaDevolucionForm from "./pages/admin/rentas-devoluciones/EditRentaDevolucionForm"
import RentasDevoluciones from "./pages/admin/rentas-devoluciones/RentasDevoluciones"
import CreateTipoCombustibleForm from "./pages/admin/tipos-combustibles/CreateTipoCombustibleForm"
import EditTipoCombustibleForm from "./pages/admin/tipos-combustibles/EditTipoCombustibleForm"
import TiposCombustibles from "./pages/admin/tipos-combustibles/TiposCombustibles"
import CreateTipoVehiculoForm from "./pages/admin/tipos-vehiculos/CreateTipoVehiculoForm"
import EditTipoVehiculoForm from "./pages/admin/tipos-vehiculos/EditTipoVehiculoForm"
import TiposVehiculos from "./pages/admin/tipos-vehiculos/TiposVehiculos"
import CreateVehiculoForm from "./pages/admin/vehiculos/CreateVehiculoForm"
import EditVehiculoForm from "./pages/admin/vehiculos/EditVehiculoForm"
import Vehiculos from "./pages/admin/vehiculos/Vehiculos"
import Login from "./pages/usuarios/Login"
import Register from "./pages/usuarios/Register"
import UserRoot from "./pages/usuarios/UserRoot"

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<Navigate to="/usuarios/login" />}></Route>
			<Route path="/usuarios" element={<UserRoot />}>
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
			</Route>
			<Route path="/admin" element={<AdminRoot />}>
				<Route path="marcas" element={<Marcas />} />
				<Route path="marcas/create" element={<CreateMarcaForm />} />
				<Route path="marcas/:id/edit" element={<EditMarcaForm />} />
				<Route path="modelos" element={<Modelos />} />
				<Route path="modelos/create" element={<CreateModeloForm />} />
				<Route path="modelos/:id/edit" element={<EditModeloForm />} />
				<Route path="tipos-combustibles" element={<TiposCombustibles />} />
				<Route path="tipos-combustibles/create" element={<CreateTipoCombustibleForm />} />
				<Route path="tipos-combustibles/:id/edit" element={<EditTipoCombustibleForm />} />
				<Route path="tipos-vehiculos" element={<TiposVehiculos />} />
				<Route path="tipos-vehiculos/create" element={<CreateTipoVehiculoForm />} />
				<Route path="tipos-vehiculos/:id/edit" element={<EditTipoVehiculoForm />} />
				<Route path="clientes" element={<Clientes />} />
				<Route path="clientes/create" element={<CreateClienteForm />} />
				<Route path="clientes/:id/edit" element={<EditClienteForm />} />
				<Route path="empleados" element={<Empleados />} />
				<Route path="empleados/create" element={<CreateEmpleadoForm />} />
				<Route path="empleados/:id/edit" element={<EditEmpleadoForm />} />
				<Route path="vehiculos" element={<Vehiculos />} />
				<Route path="vehiculos/create" element={<CreateVehiculoForm />} />
				<Route path="vehiculos/:id/edit" element={<EditVehiculoForm />} />
				<Route path="inspecciones" element={<Inspecciones />} />
				<Route path="inspecciones/create" element={<CreateInspeccionForm />} />
				<Route path="inspecciones/:id/edit" element={<EditInspeccionForm />} />
				<Route path="rentas-devoluciones" element={<RentasDevoluciones />} />
				<Route
					path="rentas-devoluciones/create"
					element={<CreateRentaDevolucionForm />}
				/>
				<Route
					path="rentas-devoluciones/:id/edit"
					element={<EditRentaDevolucionForm />}
				/>
				<Route path="reporte-rentas" element={<ConsultaRentas />} />
			</Route>
		</>
	)
)

export default router
