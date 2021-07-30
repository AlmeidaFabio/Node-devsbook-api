import { EntityRepository, Repository } from "typeorm";
import { Cover } from "../models/Cover";

@EntityRepository(Cover)
export class CoverRepository extends Repository<Cover>{}