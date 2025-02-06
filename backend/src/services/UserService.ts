import { User } from "@prisma/client"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { Draft } from "../interfaces"
import { prisma } from "../lib/prisma"
import APIError from "../utils/APIError"

const JWT_SECRET = "SECRET"

export default class UserService {
	static async register(user: Draft<User>) {
		const { username, password } = user

		const existingUser = await prisma.user.findUnique({ where: { username } })
		if (existingUser) throw new APIError("El usuario ya existe", 409)

		const hashedPassword = await bcrypt.hash(password, 10)

		await prisma.user.create({
			data: { username, password: hashedPassword },
		})

		const token = jwt.sign({ username }, JWT_SECRET)
		return token
	}

	static async login(user: Draft<User>) {
		const { username, password } = user

		const existingUser = await prisma.user.findUnique({ where: { username } })
		if (!existingUser) throw new APIError("El usuario no existe", 404)

		const isPasswordValid = await bcrypt.compare(password, existingUser.password)
		if (!isPasswordValid) throw new APIError("Credenciales inválidas", 401)

		const token = jwt.sign({ username }, JWT_SECRET)
		return token
	}
}
