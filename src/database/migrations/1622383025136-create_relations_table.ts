import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createRelationsTable1622383025136 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"relations",
                columns: [
                    {
                        name:"relation_id",
                        type:"varchar",
                        isPrimary:true,
                        generationStrategy:"uuid",
                        isUnique:true
                    },
                    {
                        name:"user_from",
                        type:"varchar"
                    },
                    {
                        name:"user_to",
                        type:"varchar"
                    }
                ],
                foreignKeys:[
                    {
                        name:"FKUserFollow",
                        columnNames:["user_to"],
                        referencedColumnNames:["id"],
                        referencedTableName:"users",
                        onDelete:"CASCADE",
                        onUpdate:"CASCADE"
                    },
                    {
                        name:"FKUserFollowing",
                        columnNames:["user_from"],
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
        await queryRunner.dropTable("relations");
    }

}
