import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createAvatarsTable1622382201867 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"avatars",
                columns: [
                    {
                        name:"avatar_id",
                        type:"varchar",
                        isPrimary:true,
                        generationStrategy:"uuid",
                        isUnique:true
                    },
                    {
                        name:"user_id",
                        type:"varchar"
                    },
                    {
                        name:"filename",
                        type:"varchar"
                    },
                    {
                        name:"originalname",
                        type:"varchar"
                    },
                    {
                        name:"url",
                        type:"varchar"
                    },
                    {
                        name:"created_at",
                        type:"timestamp",
                        default:"now()"
                    }
                ],
                foreignKeys:[
                    {
                        name:"FKUserAvatar",
                        columnNames:["user_id"],
                        referencedColumnNames:["id"],
                        referencedTableName:"users",
                        onDelete:"CASCADE",
                        onUpdate:"CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("avatars");
    }

}
