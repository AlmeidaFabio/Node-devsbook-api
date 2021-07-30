import { Request, Response } from "express";
import { UploadImageService } from "../services/UploadImageService";
import jwt from 'jsonwebtoken';

export class ImageController {
    async uploadImage(request:Request, response:Response) {
        const upImageService = new UploadImageService();

        const { originalname, filename, fieldname } = request.file;
        const token = request.headers.authorization;

        try {
            if(token) {
                const loggedUser = jwt.decode(token);

                const img = {
                    originalname,
                    filename,
                    url: `${process.env.BASE_URL}:${process.env.PORT}/images/${fieldname}s/${filename}`
                }

                if(request.file.fieldname === 'cover') {
                    const cover = await upImageService.findCoverByUserId(loggedUser['id']);

                    if(cover.length > 0) {
                        const coverId = cover.map(c => c.cover_id);

                        await upImageService.deleteCover(coverId);

                        const newCover = await upImageService.uploadCover(img, loggedUser['id']);

                        return response.status(200).json(newCover);

                    } else {
                        const newCover = await upImageService.uploadCover(img, loggedUser['id']);

                        return response.status(200).json(newCover);
                    }                       

                }

                if(request.file.fieldname === 'avatar') {
                    const avatar = await upImageService.findAvatarByUserId(loggedUser['id']);

                    if(avatar.length > 0 ) {
                        const avatarId = avatar.map(a => a.avatar_id);

                        await upImageService.deleteAvatar(avatarId);

                        const newavatar = await upImageService.uploadAvatar(img, loggedUser['id']);

                        return response.status(201).json(newavatar);

                    } else {
                        const newavatar = await upImageService.uploadAvatar(img, loggedUser['id']);

                        return response.status(201).json(newavatar);
                    }
                    
                }

                if(request.file.fieldname === 'photo') {
                    const photo = await upImageService.uploadPhoto(img, loggedUser['id']);

                    return response.status(201).json(photo); 
                }
            }
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    }
}