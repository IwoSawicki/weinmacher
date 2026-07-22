import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media" ADD COLUMN "sizes_favicon_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_favicon_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_favicon_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_favicon_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_favicon_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_favicon_filename" varchar;
  ALTER TABLE "website" ADD COLUMN "logo_id" integer;
  ALTER TABLE "website" ADD CONSTRAINT "website_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "media_sizes_favicon_sizes_favicon_filename_idx" ON "media" USING btree ("sizes_favicon_filename");
  CREATE INDEX "website_logo_idx" ON "website" USING btree ("logo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "website" DROP CONSTRAINT "website_logo_id_media_id_fk";
  
  DROP INDEX "media_sizes_favicon_sizes_favicon_filename_idx";
  DROP INDEX "website_logo_idx";
  ALTER TABLE "media" DROP COLUMN "sizes_favicon_url";
  ALTER TABLE "media" DROP COLUMN "sizes_favicon_width";
  ALTER TABLE "media" DROP COLUMN "sizes_favicon_height";
  ALTER TABLE "media" DROP COLUMN "sizes_favicon_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_favicon_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_favicon_filename";
  ALTER TABLE "website" DROP COLUMN "logo_id";`)
}
