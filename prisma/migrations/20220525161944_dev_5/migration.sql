/*
  Warnings:

  - You are about to drop the column `portfolio_type` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_portfolio_type_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "portfolio_type",
ADD COLUMN     "portfolio_id" INTEGER;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_portfolio_id_fkey" FOREIGN KEY ("portfolio_id") REFERENCES "portfolios"("id") ON DELETE SET NULL ON UPDATE CASCADE;
