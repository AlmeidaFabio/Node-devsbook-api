import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";
import { v4 as uuid } from 'uuid';

@Entity("photos")
export class Photo {
    @PrimaryColumn()
    photo_id:string;

    @Column({ select:false })
    user_id:string;

    @ManyToOne(() => User, user => user.photos)
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
        if(!this.photo_id) {
            this.photo_id = uuid();
        }
    }
}