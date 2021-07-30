import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class AuthController {
    async login(request:Request, response:Response) {
        const userService = new UserService();
        const { email, password } = request.body;

        try {
            const loggedUser = await userService.login(email, password.toString());

            return response.status(200).json(loggedUser);
        } catch (error) {
            return response.status(400).json({error: error.message});
        }
    }
}