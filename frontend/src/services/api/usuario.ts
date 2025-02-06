import { UserPayload, UserResponse } from "../../interfaces"
import httpClient from "./httpClient"

export const register = async (payload: UserPayload) => {
	const { data: response } = await httpClient.post<UserResponse>(
		"/usuarios/register",
		payload
	)
	return response
}

export const login = async (payload: UserPayload) => {
	const { data: response } = await httpClient.post<UserResponse>(
		"/usuarios/login",
		payload
	)
	return response
}
