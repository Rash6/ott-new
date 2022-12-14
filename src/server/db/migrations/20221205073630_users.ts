import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users',(table)=>{
                table
                .uuid('user_id')
                .defaultTo(knex.raw('gen_random_uuid()'))
                .primary()
                .notNullable()
                table.string('email').notNullable().unique()
                table.enu('plan',['basic','premium']).defaultTo('basic')
                table.enu('role',['user','admin']).defaultTo('user')
                table.string('token').nullable().defaultTo(null)
            })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users')
}

