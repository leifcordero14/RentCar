export const formatDate = (dateTime: Date) => {
	const date = dateTime.toISOString().split("T")[0]
	return date
}

export const deleteHoursFromDateTime = (dateTime: string) => {
	const date = new Date(dateTime)
	date.setHours(0, 0, 0, 0)
	return dateTime
}
