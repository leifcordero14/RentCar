import { Router } from "express"
import UserController from "../controllers/UserController"
import { catchAsync } from "../utils/catchAsync"

const userRoutes = Router()

userRoutes.post("/login", catchAsync(UserController.login))

userRoutes.post("/register", catchAsync(UserController.register))

export default userRoutes
