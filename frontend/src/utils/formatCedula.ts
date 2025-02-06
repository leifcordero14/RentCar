export const formatCedula = (cedula: string) => {
	const cedulaArray = cedula.split("")
	const cedulaArrayFormatted = cedulaArray.map((char, index) => {
		if (index === 3 || index === 10) return `-${char}`
		return char
	})
	return cedulaArrayFormatted.join("")
}
