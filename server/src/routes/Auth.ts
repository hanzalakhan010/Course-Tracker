import { loginService } from "../services/Auth.js";

import { Router } from "express";


export const AuthRouter = Router()


AuthRouter.post('/login', loginService)