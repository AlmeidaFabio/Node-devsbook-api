import { getCustomRepository, Repository } from "typeorm"
import { User } from "../models/User"
import { UserRepository } from "../repositories/UserRepository";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface UserData {
    name?:string;
    lastname?:string;
    email?:string;
    password?:string;
    birthdate?:string;
    city?:string;
    work?:string;
}

export class UserService {
    private usersRepository: Repository<User>;

    constructor() {
        this.usersRepository = getCustomRepository(UserRepository);
    }

    async findUserByEmail(email:string) {
        try {
            const user = await this.usersRepository.findOne({email});

            return user;
        } catch (error) {
            return error;
        }
    }

    async findUserById(id:string) {
        try {
            const user = await this.usersRepository.findOne({id}, {
                relations:["avatar", "cover", "posts", "posts.likes", "posts.comments", "followers", "following"]
            });

            return user;
        } catch (error) {
            return error;
        }
    }

    async findUsersById(id:string) {
        try {
            const users = await this.usersRepository.find({
                where:[{
                    id: id
                }],
                relations:["avatar", "cover", "posts", "posts.likes", "posts.comments", "followers", "foolowing"]
            })

            return users;
        } catch (error) {
            return error;
        }
    }

    async createUser(data:UserData) {
        try {
            const user = this.usersRepository.create({
                name: data.name,
                lastname: data.lastname,
                email: data.email,
                password: data.password,
                birthdate: data.birthdate
            });
            
            await this.usersRepository.save(user);

            return user;

        } catch (error) {
            return error;
        }
    }

    async login(email:string, password:string) {
        try {
            const user = await this.usersRepository.findOne({ email }, {
                select:["id", "email", "password"]
            });

            if(!user) {
                return {error: 'User does not exists!'};
            }

            if(!await bcrypt.compare(password, user.password)) {
                return {error: 'Invalid password!'};
            }

            const token = jwt.sign({ id:user.id }, process.env.SECRET, {
                expiresIn:86400
            });

            return {id:user.id, token};
        } catch (error) {
            return error;
        }
    }

    async update(id:string, data:UserData) {
        try {
           await this.usersRepository.update(id, {
            name: data.name,
            lastname: data.lastname,
            birthdate: data.birthdate,
            city: data.city,
            work: data.work,
           }) 

           return;
        } catch (error) {
            return error;
        }
    }

    async changePassword(id:string, password:string) {
        try {
            await this.usersRepository.update(id, {
                password
            })
            return;
        } catch (error) {
            return error;
        }
    }
}