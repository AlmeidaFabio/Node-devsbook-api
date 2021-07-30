import { Request, Response } from "express";
import { LikeService } from "../services/LikeService";
import jwt from 'jsonwebtoken';
import { PostService } from "../services/PostService";
import { UploadImageService } from "../services/UploadImageService";
import { CommentService } from "../services/CommentService";

export class PostController {
    async create(request:Request, response:Response) {
        const postService = new PostService();
        const upImageService = new UploadImageService();

        let { type, body } = request.body;
        
        const token = request.headers.authorization;

        try {
            const loggedUser = jwt.decode(token);

            if(request.file && type === 'photo') {
                const { originalname, filename, fieldname } = request.file;

                const img = {
                    originalname,
                    filename,
                    url: `${process.env.BASE_URL}:${process.env.PORT}/images/${fieldname}s/${filename}`
                }

                const photo = await upImageService.uploadPhoto(img, loggedUser['id']);

                body = photo.url;

                const post = await postService.createPost(loggedUser['id'], type, body);

                return response.status(201).json(post);
            } else {
                const post = await postService.createPost(loggedUser['id'], type, body);

                return response.status(201).json(post);
            }
        } catch (error) {
            return response.status(400).json({error: error.message});
        }
    }

    async like(request:Request, response:Response) {
        const likeService = new LikeService();
        const postService = new PostService();
        const id = request.params.id;
        const token = request.headers.authorization;

        try {
            const loggedUser = jwt.decode(token);
            const post = await postService.findPostById(id);

            if(post) {
                const isLiked = await likeService.getLikeByPostAndUserId(post['post_id'], loggedUser['id']);

                if(isLiked.length > 0) {
                    const likeId = isLiked.map(lik => lik.like_id);

                    await likeService.removeLike(likeId);

                    return response.json({isLiked: false});

                } else {
                    await likeService.setLike(post['post_id'], loggedUser['id']);

                    return response.json({isLiked: true});
                }
            } else {
                return response.status(400).json({error: 'Post not found'});
            }

        } catch (error) {
            return response.status(400).json({error: error.message});
        }
    }

    async comment(request:Request, response:Response) {
        const commentService = new CommentService();
        const postService = new PostService();
        const id = request.params.id;
        const { body } = request.body;
        const token = request.headers.authorization;

        try {
            const loggedUser = jwt.decode(token);
            const post = await postService.findPostById(id);

            if(post) {
                if(body) {
                    const comment = await commentService.setComment(body, loggedUser['id'], post['post_id']);

                    return response.status(201).json(comment);
                } else {
                    return response.status(400).json({error: 'no text'});
                }
            } else {
                return response.status(400).json({error: 'Post not found'});
            }
        } catch (error) {
            return response.status(400).json({error: error.message});
        }
    }

    async comments(request:Request, response:Response) {
        const commentService = new CommentService();
        const postService = new PostService();
        const id = request.params.id;

        try {
            const post = await postService.findPostById(id);

            if(post) {
                const comments = await commentService.getCommentsByPostId(post['post_id']);

                return response.status(200).json(comments);
            } else {
                return response.status(400).json({error: 'Post not found'});
            }
        } catch (error) {
            return response.status(400).json({error: error.message});
        }
    }
}