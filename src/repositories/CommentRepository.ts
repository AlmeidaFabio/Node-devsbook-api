import { EntityRepository, Repository } from "typeorm";
import { Comment } from "../models/Comment";

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment>{}