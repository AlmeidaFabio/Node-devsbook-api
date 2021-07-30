import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Comment } from "./Comment";
import { Like } from "./Like";
import { User } from "./User";

@Entity("posts")
export class Post {
    @PrimaryColumn()
    post_id:string;

    @Column()
    user_id:string;

    @ManyToOne(() => User, user => user.posts)
    @JoinColumn({ name:"user_id" })
    user:User;

    @Column()
    type:string;

    @Column()
    body:string;

    @CreateDateColumn({ default:Date.now() })
    created_at:Date;

    @OneToMany(() => Comment, comments => comments.post)
    comments: Comment[];

    @OneToMany(() => Like, likes => likes.post)
    likes: Like[];

    constructor() {
        if(!this.post_id) {
            this.post_id = uuid();
        }
    }

}