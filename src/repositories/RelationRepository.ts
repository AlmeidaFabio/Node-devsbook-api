import { EntityRepository, Repository } from "typeorm";
import { Relation } from "../models/Relation";

@EntityRepository(Relation)
export class Relationrepository extends Repository<Relation>{}