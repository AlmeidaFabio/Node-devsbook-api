import { getCustomRepository, Repository } from "typeorm";
import { Relation } from "../models/Relation";
import { Relationrepository } from "../repositories/RelationRepository";

export class RelationService {
    private relationsRepository: Repository<Relation>;

    constructor() {
        this.relationsRepository = getCustomRepository(Relationrepository);
    }

    async getUserRelation(user_from:string, user_to:string) {
        try {
            const relation = await this.relationsRepository.find({
                where:[{
                    user_from,
                    user_to
                }]
            });

            return relation;

        } catch (error) {
            return error;
        }
    }

    async createRelation(user_from:string, user_to:string) {
        try {
            const relation = this.relationsRepository.create({
                user_from,
                user_to
            }) 

            await this.relationsRepository.save(relation);

            return relation;
        } catch (error) {
            return error;
        }
    }

    async deleteRelation(id:string) {
        try {
            await this.relationsRepository.delete(id);

            return;
        } catch (error) {
            return error;
        }
    }

    async getFollowers(id:string) {
        try {
            const followers = await this.relationsRepository.find({
                where:[{
                    user_to: id
                }],
                relations:["user_follower"]
            })
    
            return followers;
        } catch (error) {
            return error;
        }
    }

    async getFollowings(id:string) {
        try {
            const followings = await this.relationsRepository.find({
                where:[{
                    user_from: id
                }],
                relations:["user_following"]
            })

            return followings;
        } catch (error) {
            return error;
        }
    }
}