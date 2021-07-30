import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { User } from "./User";

@Entity("relations")
export class Relation {
    @PrimaryColumn()
    relation_id:string;

    @Column()
    user_to:string;

    @ManyToOne(() => User, user => user.followers)
    @JoinColumn({ name: "user_to"})
    user_follower: User;
    
    @Column()
    user_from:string;

    @ManyToOne(() => User, user => user.following)
    @JoinColumn({ name:"user_from" })
    user_following: User;

    constructor() {
        if(!this.relation_id) {
            this.relation_id = uuid();
        }
    }
}