ALTER TABLE "tool" RENAME COLUMN "language" TO "languages";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tool_snapshots" ADD CONSTRAINT "tool_snapshots_toolId_tool_id_fk" FOREIGN KEY ("toolId") REFERENCES "public"."tool"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
