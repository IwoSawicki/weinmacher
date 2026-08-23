import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_weine_weinart" ADD VALUE 'traubensaft' BEFORE 'sonstiges';
  ALTER TYPE "public"."enum_weine_weinart" ADD VALUE 'alkoholfrei' BEFORE 'sonstiges';
  ALTER TABLE "events" ADD COLUMN "karten_link" varchar;
  ALTER TABLE "weine" DROP COLUMN "jahrgang";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "weine" ALTER COLUMN "weinart" SET DATA TYPE text;
  DROP TYPE "public"."enum_weine_weinart";
  CREATE TYPE "public"."enum_weine_weinart" AS ENUM('weisswein', 'rotwein', 'rose', 'sekt', 'sonstiges');
  ALTER TABLE "weine" ALTER COLUMN "weinart" SET DATA TYPE "public"."enum_weine_weinart" USING "weinart"::"public"."enum_weine_weinart";
  ALTER TABLE "weine" ADD COLUMN "jahrgang" numeric;
  ALTER TABLE "events" DROP COLUMN "karten_link";`)
}
