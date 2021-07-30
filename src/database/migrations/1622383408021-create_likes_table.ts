import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createLikesTable1622383408021 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"likes",
                columns: [
                    {
                        name:"like_id",
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
                        name:"post_id",
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
                        name:"FKUserLike",
                        columnNames:["user_id"],
                        referencedColumnNames:["id"],
                        referencedTableName:"users",
                        onDelete:"CASCADE",
                        onUpdate:"CASCADE"
                    },
                    {
                        name:"FKPostLike",
                        columnNames:["post_id"],
                        referencedColumnNames:["post_id"],
                        referencedTableName:"posts",
                        onDelete:"CASCADE",
                        onUpdate:"CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("likes");
    }

}
