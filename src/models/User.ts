import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Avatar } from "./Avatar";
import { Cover } from "./Cover";
import { Photo } from "./Photo";
import { Post } from "./Post";
import { Relation } from "./Relation";

@Entity("users")
export class User {
    @PrimaryColumn()
    id:string;

    @Column()
    name:string;

    @Column()
    lastname:string;

    @Column({ unique:true })
    email:string;

    @Column( {select:false} )
    password:string;

    @Column()
    birthdate:string;

    @Column()
    city:string;

    @Column()
    work:string;

    @OneToOne(() => Avatar, avatar => avatar.user)
    avatar:Avatar;

    @OneToOne(() => Cover, cover => cover.user)
    cover:Cover;

    @OneToMany(() => Post, posts => posts.user)
    posts: Post[];

    @OneToMany(() => Photo, photos => photos.user)
    photos: Photo[];

    @OneToMany(() => Relation, followers => followers.user_follower)
    followers: Relation[];

    @OneToMany(() => Relation, following => following.user_following)
    following: Relation[];

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}