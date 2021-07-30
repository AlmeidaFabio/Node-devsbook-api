import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export class ConfigController {
    async updateUserInfos(request:Request, response:Response) {
        const userService = new UserService();
        const token = request.headers.authorization;
        const {
            name,
            lastname,
            birthdate,
            city,
            work
        } = request.body;

        try {
            const loggedUser = jwt.decode(token);
            const data = {
                name,
                lastname,
                birthdate,
                city,
                work
            }
            
            await userService.update(loggedUser['id'], data);
            
            return response.status(200).json({sucess: 'User successfuly updated'});
        } catch (error) {
            return response.status(400).json({error:error.message});
        }
    }

    async updatePassword(request:Request, response:Response) {
        const userService = new UserService();
        const token = request.headers.authorization;
        const { password, password_confirm } = request.body;

        try {
            const loggedUser = jwt.decode(token);

            if(password === password_confirm) {
                const hash = await bcrypt.hash(password.toString(), 10);

                await userService.changePassword(loggedUser['id'], hash);

                return response.status(200).json({sucess: 'User password successfuly updated'});
            } else {
                return response.status(400).json({error: 'passwords do not match'});
            }
            
        } catch (error) {
            return response.status(400).json({error: error.message});
        }
    }
}