/*
  Warnings:

  - A unique constraint covering the columns `[node_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "node_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_node_id_key" ON "User"("node_id");
