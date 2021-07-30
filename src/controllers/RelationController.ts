import { Request, Response } from "express";
import { RelationService } from "../services/RelationService";
import jwt from 'jsonwebtoken';
import { UserService } from "../services/UserService";

export class RelationController {
    async follow(request:Request, response:Response) {
        const relationService = new RelationService();
        const id = request.params.id;
        const token = request.headers.authorization;

        try {
            const loggedUser = jwt.decode(token);

            if(id === loggedUser['id']) {
                return response.status(400).json({ error: 'Cannot follow yourself' });
            }

            const relation = await relationService.getUserRelation(loggedUser['id'], id);

            if(relation.length > 0) {
                const relationId = relation.map(rel => rel.relation_id);

                await relationService.deleteRelation(relationId);

                return response.status(200).json({isFollowing: false})

            } else {
                await relationService.createRelation(loggedUser['id'], id);

                return response.status(200).json({isFollowing: true})
                
            }

        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    }

    async followers(request:Request, response:Response) {
        const relationService = new RelationService();
        const userService = new UserService();
        let id = request.params.id;
        const token = request.headers.authorization;

        try {
            const loggedUser = jwt.decode(token);
            
            if(!id) {
                id = loggedUser['id'];
            }

            const followers = [];
            const following = [];

            const userExists = await userService.findUserById(id);

            if(userExists) {
                const followersList = await relationService.getFollowers(id);
                const followingList = await relationService.getFollowings(id);

                followersList.map(item => {
                    followers.push(item.user_from);
                });

                followingList.map(item => {
                    following.push(item.user_to);
                });

                return response.status(200).json({followers, following});
                               
            } else {
                return response.status(400).json({error: 'User not found'});
            }
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    }
}