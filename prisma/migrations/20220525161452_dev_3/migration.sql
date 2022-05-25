/*
  Warnings:

  - You are about to drop the column `beta` on the `portfolios` table. All the data in the column will be lost.
  - You are about to drop the column `beta` on the `stocks` table. All the data in the column will be lost.
  - You are about to drop the column `expected_return` on the `stocks` table. All the data in the column will be lost.
  - You are about to drop the column `portfolio_weight` on the `stocks` table. All the data in the column will be lost.
  - You are about to drop the column `portfolio_type` on the `users` table. All the data in the column will be lost.
  - Added the required column `weight` to the `stocks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_portfolio_type_fkey";

-- DropIndex
DROP INDEX "portfolios_portfolio_type_key";

-- AlterTable
ALTER TABLE "portfolios" DROP COLUMN "beta";

-- AlterTable
ALTER TABLE "stocks" DROP COLUMN "beta",
DROP COLUMN "expected_return",
DROP COLUMN "portfolio_weight",
ADD COLUMN     "weight" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "portfolio_type",
ADD COLUMN     "portfolio_id" INTEGER;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_portfolio_id_fkey" FOREIGN KEY ("portfolio_id") REFERENCES "portfolios"("id") ON DELETE SET NULL ON UPDATE CASCADE;
