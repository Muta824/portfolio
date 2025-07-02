/*
  Warnings:

  - You are about to drop the column `avatar_url` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `bio` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `blog` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `collaborators` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `company` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `disk_usage` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `events_url` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `followers` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `followers_url` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `following` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `following_url` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `gists_url` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `gravatar_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `html_url` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `node_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `notification_email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `organizations_url` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `plan` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `public_gists` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `public_repos` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `received_events_url` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `repos_url` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `site_admin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `starred_url` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptions_url` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `twitter_username` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `two_factor_authentication` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_view_type` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_node_id_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatar_url",
DROP COLUMN "bio",
DROP COLUMN "blog",
DROP COLUMN "collaborators",
DROP COLUMN "company",
DROP COLUMN "disk_usage",
DROP COLUMN "events_url",
DROP COLUMN "followers",
DROP COLUMN "followers_url",
DROP COLUMN "following",
DROP COLUMN "following_url",
DROP COLUMN "gists_url",
DROP COLUMN "gravatar_id",
DROP COLUMN "html_url",
DROP COLUMN "location",
DROP COLUMN "node_id",
DROP COLUMN "notification_email",
DROP COLUMN "organizations_url",
DROP COLUMN "plan",
DROP COLUMN "public_gists",
DROP COLUMN "public_repos",
DROP COLUMN "received_events_url",
DROP COLUMN "repos_url",
DROP COLUMN "site_admin",
DROP COLUMN "starred_url",
DROP COLUMN "subscriptions_url",
DROP COLUMN "twitter_username",
DROP COLUMN "two_factor_authentication",
DROP COLUMN "type",
DROP COLUMN "url",
DROP COLUMN "user_view_type";
