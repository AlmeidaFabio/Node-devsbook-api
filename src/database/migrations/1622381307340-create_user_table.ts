import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUserTable1622381307340 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"users",
                columns: [
                    {
                        name:"id",
                        type:"varchar",
                        isPrimary:true,
                        generationStrategy:"uuid",
                        isUnique:true
                    },
                    {
                        name:"name",
                        type:"varchar"
                    },
                    {
                        name:"lastname",
                        type:"varchar"
                    },
                    {
                        name:"email",
                        type:"varchar",
                        isUnique:true
                    },
                    {
                        name:"password",
                        type:"varchar"
                    },
                    {
                        name:"birthdate",
                        type:"timestamp"
                    },
                    {
                        name:"city",
                        type:"varchar",
                        isNullable:true
                    },
                    {
                        name:"work",
                        type:"varchar",
                        isNullable:true
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
