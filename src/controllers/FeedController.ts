import { Request, Response } from "express";
import { PostService } from "../services/PostService";
import { RelationService } from "../services/RelationService";
import jwt from 'jsonwebtoken';

export class FeedController {
    async read(request:Request, response:Response) {
        const postService = new PostService();
        const relationService = new RelationService();
        const token = request.headers.authorization;
        const { page = 1, limit = 16 } = request.query;

        try {
            const users = [];
            const loggedUser = jwt.decode(token);
            //pegar a lista de usuários que eu sigo. 
            const userList = await relationService.getFollowings(loggedUser['id']);

            userList.map(userItemm => {
                users.push(userItemm.user_to);
            });

            users.push(loggedUser['id']);
            
            for(let id of users) {
                const res = await postService.listPostsById(id, page.toString(), limit.toString());

                const postList = res.postList;
                const total = res.count;
                const pageCount = Math.ceil(total / parseInt(limit.toString()));

                return response.status(200).json({
                    posts: postList,
                    pageCount,
                    currentPage: page
                })
            }
            
        } catch (error) {
            return response.status(400).json({ error:error.message })
        }
    }

    async userFeed(request:Request, response:Response) {
        const postService = new PostService();
        let id = request.params.id;
        const token = request.headers.authorization;
        const { page = 1, limit = 16 } = request.query;

        try {
            const loggedUser = jwt.decode(token);
            
            if(!id) {
                id = loggedUser['id'];
            }

            const res = await postService.listPostsById(id, page.toString(), limit.toString());

            const postList = res.postList;
            const total = res.count;
            const pageCount = Math.ceil(total / parseInt(limit.toString()));

            return response.status(200).json({
                posts: postList,
                pageCount,
                currentPage: page
            });

        } catch (error) {
            return response.status(400).json({ error:error.message });
        }
    }

    async userPhotos(request:Request, response:Response) {
        const postService = new PostService();
        let id = request.params.id;
        const token = request.headers.authorization;
        const { page = 1, limit = 16 } = request.query;

        try {
            const loggedUser = jwt.decode(token);
            
            if(!id) {
                id = loggedUser['id'];
            }

            const res = await postService.listPostsWhereTypeIsPhotoByUserId(id, page.toString(), limit.toString());

            const total = res.photocount;
            const pageCount = Math.ceil(total / parseInt(limit.toString()));

            return response.status(200).json({
                photos: res.photos,
                photoCount: res.photocount,
                likes: res.likes,
                comments: res.comments,
                pageCount,
                currentPage: page
            });

        } catch (error) {
            return response.status(400).json({ error:error.message });
        }
    }
}