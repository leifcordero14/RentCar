import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "./index.css"
import router from "./router"

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
})

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
			<ToastContainer theme="dark" pauseOnHover={false} pauseOnFocusLoss={false} stacked/>
			<ReactQueryDevtools initialIsOpen />
		</QueryClientProvider>
	</StrictMode>
)
