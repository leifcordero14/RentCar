import { SubmitHandler, useForm } from "react-hook-form"
import { PDFPayload } from "../../interfaces"
import { downloadPDF } from "../../services/api/rentasDevoluciones"

export const useDownloadPDF = () => {
	const handleDownload = async (filters: PDFPayload) => {
		const response = await downloadPDF(filters)
		const blob = new Blob([response], { type: "application/pdf" })
		const url = window.URL.createObjectURL(blob)

		const link = document.createElement("a")
		link.href = url
		link.download = "reporte_rentas.pdf"
		link.click()
		window.URL.revokeObjectURL(url)
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<PDFPayload>()

	const onSubmit: SubmitHandler<PDFPayload> = async data => {
		handleDownload(data)
	}

	return {
		handleSubmit: handleSubmit(onSubmit),
		register,
		errors,
		watch,
	}
}
