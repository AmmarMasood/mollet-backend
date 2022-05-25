/*
  Warnings:

  - The values [ABOVE_AVERAGE_RISK,AVERAGE_RISK,BELOW_AVERAGE_RISK,LOW_RISK,HIGH_RISK] on the enum `PORTFOLIO_TYPES` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `beta` on the `portfolios` table. All the data in the column will be lost.
  - You are about to drop the `_PortfolioToStock` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `yScore` to the `portfolios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PORTFOLIO_TYPES_new" AS ENUM ('AGGRESIVE', 'SEMI_AGGRESIVE', 'MODERATE', 'BELOW_AVERAGE', 'CONSERVATIVE');
ALTER TABLE "portfolios" ALTER COLUMN "portfolio_type" TYPE "PORTFOLIO_TYPES_new" USING ("portfolio_type"::text::"PORTFOLIO_TYPES_new");
ALTER TYPE "PORTFOLIO_TYPES" RENAME TO "PORTFOLIO_TYPES_old";
ALTER TYPE "PORTFOLIO_TYPES_new" RENAME TO "PORTFOLIO_TYPES";
DROP TYPE "PORTFOLIO_TYPES_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "_PortfolioToStock" DROP CONSTRAINT "_PortfolioToStock_A_fkey";

-- DropForeignKey
ALTER TABLE "_PortfolioToStock" DROP CONSTRAINT "_PortfolioToStock_B_fkey";

-- AlterTable
ALTER TABLE "portfolios" DROP COLUMN "beta",
ADD COLUMN     "yScore" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "_PortfolioToStock";
