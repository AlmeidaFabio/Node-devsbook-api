import dotenv from 'dotenv';
import { api } from './Api'
import 'reflect-metadata';
import './database';

dotenv.config();

api.listen(process.env.PORT || 3333, () => {
    console.log(`Server is running in: ${process.env.BASE_URL}:${process.env.PORT}`);
});