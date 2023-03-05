import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.alterTable("user_coaches", (t) => {
    t.foreign("coach_id").references("id").inTable("users");
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.alterTable("user_coaches", (t) => {
    t.dropForeign("coach_id");
  });
}
