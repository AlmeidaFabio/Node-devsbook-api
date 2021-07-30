import { EntityRepository, Repository } from "typeorm";
import { Photo } from "../models/Photo";

@EntityRepository(Photo)
export class PhotosRepository extends Repository<Photo>{}