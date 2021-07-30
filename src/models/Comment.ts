import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Post } from "./Post";

@Entity("comments")
export class Comment {
    @PrimaryColumn()
    comment_id:string;

    @Column()
    user_id:string;

    @Column()
    post_id:string;

    @ManyToOne(() => Post, post => post.comments)
    @JoinColumn({ name:"post_id" })
    post: Post;

    @Column()
    body:string;

    @CreateDateColumn({ default:Date.now() })
    created_at:Date;

    constructor() {
        if(!this.comment_id) {
            this.comment_id = uuid();
        }
    }
}