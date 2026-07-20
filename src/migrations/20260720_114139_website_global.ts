import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "website" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_bild_id" integer,
  	"ueber_bild_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "website" ADD CONSTRAINT "website_hero_bild_id_media_id_fk" FOREIGN KEY ("hero_bild_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "website" ADD CONSTRAINT "website_ueber_bild_id_media_id_fk" FOREIGN KEY ("ueber_bild_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "website_hero_bild_idx" ON "website" USING btree ("hero_bild_id");
  CREATE INDEX "website_ueber_bild_idx" ON "website" USING btree ("ueber_bild_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "website" CASCADE;`)
}
