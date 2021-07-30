
import express, { json, urlencoded } from 'express';
import cors from 'cors';
import { router } from './routes';
import path from 'path';

const api = express();

api.use(cors());
api.use(json());
api.use(urlencoded({ extended:true }));
api.use(express.static(path.resolve(__dirname, '..', 'public')));

api.use(router);

export { api };