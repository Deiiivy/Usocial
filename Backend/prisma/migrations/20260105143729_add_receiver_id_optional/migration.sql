/*
  Warnings:

  - You are about to drop the column `name` on the `Friends` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,friendId]` on the table `Friends` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `friendId` to the `Friends` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Friends" DROP COLUMN "name",
ADD COLUMN     "friendId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Messages" ADD COLUMN     "receiverId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Friends_userId_friendId_key" ON "Friends"("userId", "friendId");

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
