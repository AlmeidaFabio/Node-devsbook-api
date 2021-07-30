import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";
import { v4 as uuid } from 'uuid';

@Entity("avatars")
export class Avatar {
    @PrimaryColumn()
    avatar_id:string;

    @Column({ select:false })
    user_id:string;

    @OneToOne(() => User, user => user.avatar)
    @JoinColumn({ name:"user_id" })
    user:User;

    @Column({ select:false })
    filename:string;

    @Column({ select:false })
    originalname:string;

    @Column()
    url:string;

    @CreateDateColumn({ default:Date.now(), select:false })
    created_at:Date;

    constructor() {
        if(!this.avatar_id) {
            this.avatar_id = uuid();
        }
    }
}