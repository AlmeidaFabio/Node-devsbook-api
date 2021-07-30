import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";
import { v4 as uuid } from 'uuid';

@Entity("covers")
export class Cover {
    @PrimaryColumn()
    cover_id:string;

    @Column({ select:false })
    user_id:string;

    @OneToOne(() => User, user => user.cover)
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
        if(!this.cover_id) {
            this.cover_id = uuid();
        }
    }
}