import { getCustomRepository, Repository } from "typeorm";
import { Comment } from "../models/Comment";
import { CommentRepository } from "../repositories/CommentRepository";

export class CommentService {
    private commentsRepository: Repository<Comment>;

    constructor() {
        this.commentsRepository = getCustomRepository(CommentRepository);
    }

    async setComment(body:string, user_id:string, post_id:string) {
        try {
            const comment = this.commentsRepository.create({
                body,
                user_id,
                post_id
            })

            await this.commentsRepository.save(comment);

            return comment;
        } catch (error) {
            return error;
        }
    }

    async getCommentsByPostId(post_id:string) {
        try {
            const comments = await this.commentsRepository.find({
                where:[{
                    post_id
                }]
            }) 

            return comments;
        } catch (error) {
            return error;
        }
    }
}