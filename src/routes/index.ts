import { Request, Response, Router } from "express";
import multer from 'multer';
import { AuthController } from "../controllers/AuthController";
import { ConfigController } from "../controllers/ConfigController";
import { FeedController } from "../controllers/FeedController";
import { ImageController } from "../controllers/ImageController";
import { PostController } from "../controllers/PostController";
import { RelationController } from "../controllers/RelationController";
import { SearchController } from "../controllers/SearchController";
import { UserController } from "../controllers/UserController";
import { Auth } from "../middlewares/Auth";
import { uploadCover, uploadAvatar, uploadPhoto } from '../middlewares/Upload'

const router = Router();

const auth = new Auth();
const authController = new AuthController();
const userController = new UserController();
const uploadImage = new ImageController();
const relationController = new RelationController();
const postsController = new PostController();
const feedController = new FeedController();
const searchController = new SearchController();
const configController = new ConfigController();

router.get('/', (request:Request, response:Response) => {
    response.send("Devsbook Api");
});

router.post('/api/login', authController.login);

router.get('/api/feed', auth.private, feedController.read);

router.post('/api/user', userController.create);

router.post('/api/user/cover', auth.private, multer(uploadCover).single("cover"), uploadImage.uploadImage);
router.post('/api/user/avatar', auth.private, multer(uploadAvatar).single("avatar"), uploadImage.uploadImage);

router.post('/api/user/post', auth.private, multer(uploadPhoto).single("photo"), postsController.create);

router.get('/api/user/feed', auth.private, feedController.userFeed);
router.get('/api/user/feed/:id', auth.private, feedController.userFeed);

router.get('/api/user/photos', auth.private, feedController.userPhotos);
router.get('/api/user/photos/:id', auth.private, feedController.userPhotos);


router.get('/api/user', auth.private, userController.read);
router.get('/api/user/:id', auth.private, userController.read);

router.get('/api/user/follow/:id', auth.private, relationController.follow);

router.get('/api/user/followers', auth.private, relationController.followers);
router.get('/api/user/followers/:id', auth.private, relationController.followers);

router.post('/api/post/like/:id', auth.private, postsController.like);

router.post('/api/post/comment/:id', auth.private, postsController.comment);

router.get('/api/post/comments/:id', auth.private, postsController.comments);

router.get('/api/search', auth.private, searchController.search);

router.put('/api/user/config', auth.private, configController.updateUserInfos);
router.put('/api/user/change-password', auth.private, configController.updatePassword);

export { router };