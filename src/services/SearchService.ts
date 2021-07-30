import { getCustomRepository, Like } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";

export class SearchService {
    async search(txt: string) {
        const usersRepository = getCustomRepository(UserRepository);

        try {
            const result = await usersRepository.find({
                where:[{
                    name: Like(`${txt}%`)
                }],
                relations:["avatar"]
            })

            return result;

        } catch (error) {
            return error;
        }
    }
}