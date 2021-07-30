import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserController {
    async create(request:Request, response:Response) {
        const userService = new UserService();
        const { 
            name,
            lastname,
            email,
            password,
            birthdate
        } = request.body;

        try {
            const userExists = await userService.findUserByEmail(email);

            if(userExists) {
                return response.status(400).json({error: 'User already exists'});
            }

            const hash = await bcrypt.hash(password.toString(), 10);

            const data = {
                name,
                lastname,
                email,
                password:hash,
                birthdate
            }

            const user = await userService.createUser(data);

            return response.status(201).json(user);
            
        } catch (error) {
            return response.status(400).json(error.message);
        }
    }

    async read(request:Request, response:Response) {
        const userService = new UserService();
        let id = request.params.id;
        const token = request.headers.authorization;

        try {
            const loggedUser = jwt.decode(token);

            if(id) {
                const user = await userService.findUserById(id);

                return response.status(200).json(user);
            } else {
                const user = await userService.findUserById(loggedUser['id']);

                return response.status(200).json(user);
            }
        } catch (error) {
            return response.status(400).json(error.message);
        }
    }
}