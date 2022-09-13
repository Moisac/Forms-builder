/*
  Warnings:

  - You are about to drop the column `fromId` on the `Response` table. All the data in the column will be lost.
  - The `duration` column on the `Response` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `formId` to the `Response` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_fromId_fkey";

-- AlterTable
ALTER TABLE "Response" DROP COLUMN "fromId",
ADD COLUMN     "formId" TEXT NOT NULL,
DROP COLUMN "duration",
ADD COLUMN     "duration" INTEGER;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE CASCADE ON UPDATE CASCADE;
