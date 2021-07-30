import { getCustomRepository, Repository } from "typeorm";
import { Post } from "../models/Post";
import { PostRepository } from "../repositories/PostRepository";

export class PostService {
    private postsRepository: Repository<Post>;

    constructor() {
        this.postsRepository = getCustomRepository(PostRepository);
    }

    async createPost(user_id:string, type:string, body:string) {
        try {
            const post = this.postsRepository.create({
                user_id,
                type,
                body
            })

            await this.postsRepository.save(post);

            return post;
        } catch (error) {
            return error;
        }
    }

    async findPostById(id:string) {
        try {
            const post = await this.postsRepository.findOne(id, {
                relations:["user", "user.avatar", "likes", "comments"]
            });

            return post;
        } catch (error) {
            return error;
        }
    }

    async listPostsById(id?:string, page?:string, limit?:string) {
        try {
            const postList = await this.postsRepository.find({
                where:[{
                    user_id: id
                }],
                relations:["user", "user.avatar", "likes", "comments"],
                order: {created_at: "DESC"},
                take: (parseInt(limit) * 1),
                skip:((parseInt(page) - 1 ) * parseInt(limit))
            })

            const count = postList.length;

            return {postList, count};          

        } catch (error) {
            return error;
        }
    }

    async listPostsWhereTypeIsPhotoByUserId(id?:string, page?:string, limit?:string) {
        try {
            const postList = await this.postsRepository.find({
                where:[{
                    user_id: id,
                    type: 'photo'
                }],
                relations:["user", "user.avatar", "likes", "comments"],
                order: {created_at: "DESC"},
                take: (parseInt(limit) * 1),
                skip:((parseInt(page) - 1 ) * parseInt(limit))
            })

            const photos = postList.map(post => post.body);
            const likes = postList.map(post => post.likes.map(like => like.user_id));
            const comments = postList.map(post => post.comments.map(comment => comment.body))

            const photocount = photos.length;

            return {photos, likes, comments, photocount};

        } catch (error) {
            return error;
        }
    }
}