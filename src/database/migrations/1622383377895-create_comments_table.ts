import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createCommentsTable1622383377895 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"comments",
                columns: [
                    {
                        name:"comment_id",
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
                        name:"body",
                        type:"text"
                    },
                    {
                        name:"created_at",
                        type:"timestamp",
                        default:"now()"
                    }
                ],
                foreignKeys:[
                    {
                        name:"FKUserComment",
                        columnNames:["user_id"],
                        referencedColumnNames:["id"],
                        referencedTableName:"users",
                        onDelete:"CASCADE",
                        onUpdate:"CASCADE"
                    },
                    {
                        name:"FKPostComment",
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
        await queryRunner.dropTable("comments");
    }

}
