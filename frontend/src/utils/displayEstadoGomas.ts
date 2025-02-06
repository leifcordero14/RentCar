export const displayEstadoGomas = (estados: string) => {
	const estadoGomas = estados.split(" ")
	const countBien = estadoGomas.filter(estado => estado === "Bien").length
	const countMal = estadoGomas.filter(estado => estado === "Mal").length

	if (countBien === 4) return "Bien"
	if (countMal === 4 || countMal === 3) return "Mal"
	if (countMal === 1 || countMal === 2) return "Regular"
}
