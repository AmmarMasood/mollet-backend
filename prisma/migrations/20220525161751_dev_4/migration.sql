/*
  Warnings:

  - You are about to drop the column `portfolio_id` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[portfolio_type]` on the table `portfolios` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `beta` to the `portfolios` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_portfolio_id_fkey";

-- AlterTable
ALTER TABLE "portfolios" ADD COLUMN     "beta" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "portfolio_id",
ADD COLUMN     "portfolio_type" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "portfolios_portfolio_type_key" ON "portfolios"("portfolio_type");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_portfolio_type_fkey" FOREIGN KEY ("portfolio_type") REFERENCES "portfolios"("id") ON DELETE SET NULL ON UPDATE CASCADE;
