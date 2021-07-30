import { getCustomRepository, Repository } from "typeorm";
import { Avatar } from "../models/Avatar";
import { Cover } from "../models/Cover";
import { Photo } from "../models/Photo";
import { AvatarRepository } from "../repositories/AvatarRepository";
import { CoverRepository } from "../repositories/CoverRepository";
import { PhotosRepository } from "../repositories/PhotosRepository";

type Image = {
    originalname:string;
    filename:string;
    url:string;
}

export class UploadImageService {
    private coversRepository: Repository<Cover>;
    private avatarsRepository: Repository<Avatar>;
    private photosRepository: Repository<Photo>;

    constructor() {
        this.coversRepository = getCustomRepository(CoverRepository);
        this.avatarsRepository = getCustomRepository(AvatarRepository);
        this.photosRepository = getCustomRepository(PhotosRepository);
    }

    async uploadCover(img:Image, userId:string) {
        try {
            const cover = this.coversRepository.create({
                originalname: img.originalname,
                filename: img.filename,
                url: img.url,
                user_id: userId
            });
            
            await this.coversRepository.save(cover);

            return cover;
        } catch (error) {
            return error;
        }
    }

    async findCoverByUserId(userId:string) {
        try {
            const cover = await this.coversRepository.find({
                where: [
                    {user_id: userId}
                ]
            })

            return cover;

        } catch (error) {
            return error;
        }
    }

    async deleteCover(id:string) {
        try {
           await this.coversRepository.delete(id); 

           return;
        } catch (error) {
            return error;
        }
    }

    async uploadAvatar(img:Image, userId:string) {
        try {
            const avatar = this.avatarsRepository.create({
                originalname: img.originalname,
                filename: img.filename,
                url: img.url,
                user_id: userId
            }); 

            await this.avatarsRepository.save(avatar);

            return avatar;
        } catch (error) {
            return error;
        }
    }

    async findAvatarByUserId(userId:string) {
        try {
            const avatar = this.avatarsRepository.find({
                where:[{
                    user_id: userId
                }]
            })

            return avatar;

        } catch (error) {
            return error
        }
    }

    async deleteAvatar(id:string) {
        try {
            await this.avatarsRepository.delete(id);

            return;
        } catch (error) {
            return error;
        }
    }

    async uploadPhoto(img:Image, userId:string) {
        try {
            const photo = this.photosRepository.create({
                originalname: img.originalname,
                filename: img.filename,
                url: img.url,
                user_id: userId
            }); 

            await this.photosRepository.save(photo);

            return photo;
        } catch (error) {
            return error;
        }
    }
}