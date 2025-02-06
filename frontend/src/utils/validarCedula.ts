export function validarCedula(cedula: string): boolean {
	let verificador = 0
	let digito = 0
	let digitoVerificador = 0
	let digitoImpar = 0
	let sumaPar = 0
	let sumaImpar = 0

	if (!/^\d{11}$/.test(cedula)) return false

	digitoVerificador = parseInt(cedula.substring(10, 11))

	for (let i = 9; i >= 0; i--) {
		digito = parseInt(cedula[i])

		if (i % 2 !== 0) {
			digitoImpar = digito * 2
			if (digitoImpar >= 10) {
				digitoImpar -= 9
			}
			sumaImpar += digitoImpar
		} else {
			sumaPar += digito
		}
	}

	verificador = 10 - ((sumaPar + sumaImpar) % 10)

	return (
		(verificador === 10 && digitoVerificador === 0) || verificador === digitoVerificador
	)
}
