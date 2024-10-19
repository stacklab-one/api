ALTER TABLE "user" ALTER COLUMN "auth_level" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "tool" ADD COLUMN "license" varchar(255);--> statement-breakpoint
ALTER TABLE "tool" ADD COLUMN "license_url" varchar(255);