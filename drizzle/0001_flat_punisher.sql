CREATE TABLE IF NOT EXISTS "category" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"title" varchar(255) NOT NULL,
	"tags" json DEFAULT '[]'::json NOT NULL,
	"icon" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tool" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"title" varchar(255) NOT NULL,
	"descriptionShort" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"url" varchar(255) NOT NULL,
	"repositoryUrl" varchar(255),
	"registryUrl" varchar(255),
	"tags" json DEFAULT '[]'::json NOT NULL,
	"icon" uuid,
	"backgroundImage" uuid,
	"hasFreeVersion" boolean DEFAULT false NOT NULL,
	"hasPaidVersion" boolean DEFAULT false NOT NULL,
	"isOpenSource" boolean DEFAULT false NOT NULL,
	"hydratedAt" timestamp with time zone DEFAULT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"deletedAt" timestamp with time zone DEFAULT NULL,
	"language" json DEFAULT '[]'::json NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tool_snapshots" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"toolId" uuid NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"stars" integer DEFAULT 0 NOT NULL,
	"openIssues" integer DEFAULT 0 NOT NULL,
	"forks" integer DEFAULT 0 NOT NULL,
	"numberOfReleases" integer DEFAULT 0 NOT NULL,
	"latestRelease" varchar(255),
	"latestReleaseUrl" varchar(255),
	"repositoryData" json DEFAULT '{}'::json NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" RENAME TO "user";