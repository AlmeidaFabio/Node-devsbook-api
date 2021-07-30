import * as multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const uploadFolder = (fieldname:string) => {
    return path.resolve(__dirname, '..', '..', 'public', 'images', `${fieldname}s`);
}

const storageTypes = {
    local:multer.diskStorage({
        destination: (req, file:Express.Multer.File, cb) => {
            cb(null, uploadFolder(file.fieldname));
        },
        filename: (req, file:Express.Multer.File, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if(err) cb(null, err.message)

                file.filename = `${hash.toString('hex')}${file.mimetype.replace('image/', '.')}`

                cb(null, file.filename)
            })
        }
    })
}

const uploadCover =  {
    dest: path.resolve(__dirname, '..', '..', 'public', 'images', 'covers'),
    storage: storageTypes[process.env.STORAGE_TYPES],
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            "image/jpeg",
            "image/jpg",
            "image/png"
        ]
        if(allowedMimes.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error("invalid file type."))
        }
    }
}

const uploadAvatar =  {
    dest: path.resolve(__dirname, '..', '..', 'public', 'images', 'avatars'),
    storage: storageTypes[process.env.STORAGE_TYPES],
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            "image/jpeg",
            "image/jpg",
            "image/png"
        ]
        if(allowedMimes.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error("invalid file type."))
        }
    }
}

const uploadPhoto =  {
    dest: path.resolve(__dirname, '..', '..', 'public', 'images', 'photos'),
    storage: storageTypes[process.env.STORAGE_TYPES],
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            "image/jpeg",
            "image/jpg",
            "image/png"
        ]
        if(allowedMimes.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error("invalid file type."))
        }
    }
}

export { uploadCover, uploadAvatar, uploadPhoto }