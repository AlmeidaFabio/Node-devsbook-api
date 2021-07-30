import { EntityRepository, Repository } from "typeorm";
import { Avatar } from "../models/Avatar";

@EntityRepository(Avatar)
export class AvatarRepository extends Repository<Avatar>{}