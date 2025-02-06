import { Request, Response } from "express"
import UserService from "../services/UserService"

export default class UserController {
	static async register(req: Request, res: Response) {
		const token = await UserService.register(req.body)
		res
			.status(201)
			.json({ success: true, message: ["Se ha registrado correctamente"], token })
	}

	static async login(req: Request, res: Response) {
		const token = await UserService.login(req.body)
		res
			.status(200)
			.json({ success: true, message: ["Ha iniciado sesión correctamente"], token })
	}
}
