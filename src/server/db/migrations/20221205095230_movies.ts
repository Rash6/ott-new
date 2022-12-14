import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('movies',(table)=>{
        table
        .uuid('movie_id')
        .defaultTo(knex.raw('gen_random_uuid()'))
        .primary()
        .notNullable()
        table.string('movie_name').notNullable().unique()
        table.string('genre').notNullable
        table.string('language').notNullable
        table.enu('access_plan',['basic','premium']).defaultTo('basic')

    })
}


export async function down(knex: Knex): Promise<void> {
}

