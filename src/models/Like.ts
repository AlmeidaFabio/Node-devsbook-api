import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Post } from "./Post";

@Entity("likes")
export class Like {
    @PrimaryColumn()
    like_id:string;

    @Column()
    user_id:string;

    @Column()
    post_id:string;

    @CreateDateColumn({ default:Date.now() })
    created_at:Date;

    @ManyToOne(() => Post, post => post.likes)
    @JoinColumn({ name:"post_id" })
    post: Post;

    constructor() {
        if(!this.like_id) {
            this.like_id = uuid();
        }
    }
}