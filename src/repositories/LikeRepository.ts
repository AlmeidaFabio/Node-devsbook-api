import { EntityRepository, Repository } from "typeorm";
import { Like } from "../models/Like";

@EntityRepository(Like)
export class LikeRepository extends Repository<Like>{}