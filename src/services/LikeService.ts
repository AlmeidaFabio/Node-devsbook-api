import { getCustomRepository, Repository } from "typeorm";
import { Like } from "../models/Like";
import { LikeRepository } from "../repositories/LikeRepository";

export class LikeService {
    private likesRepository: Repository<Like>;

    constructor() {
        this.likesRepository = getCustomRepository(LikeRepository);
    }

    async getLikeByPostAndUserId(post_id:string, user_id:string) {
        try {
            const like = await this.likesRepository.find({
                where:[{
                    post_id,
                    user_id
                }]
            })

            return like;

        } catch (error) {
            return error;
        }
    }

    async removeLike(id:string) {
        try {
            await this.likesRepository.delete(id);

            return;
        } catch (error) {
            return error;
        }
    }

    async setLike(post_id:string, user_id:string) {
        try {
            const like = this.likesRepository.create({
                post_id,
                user_id
            });

            await this.likesRepository.save(like);

            return like;
        } catch (error) {
            return error;
        }
    }
}