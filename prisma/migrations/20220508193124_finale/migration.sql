-- CreateEnum
CREATE TYPE "PORTFOLIO_TYPES" AS ENUM ('ABOVE_AVERAGE_RISK', 'AVERAGE_RISK', 'BELOW_AVERAGE_RISK', 'LOW_RISK', 'HIGH_RISK');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "phone_number" TEXT,
    "portfolio_type" "PORTFOLIO_TYPES",
    "risk_score" INTEGER,
    "invested_amount" INTEGER,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portfolios" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "portfolio_type" "PORTFOLIO_TYPES" NOT NULL,
    "beta" INTEGER NOT NULL,

    CONSTRAINT "portfolios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stocks" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "company_name" TEXT,
    "stock_name" TEXT NOT NULL,
    "expected_return" INTEGER NOT NULL,
    "portfolio_weight" INTEGER NOT NULL,
    "beta" INTEGER NOT NULL,

    CONSTRAINT "stocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PortfolioToStock" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "portfolios_portfolio_type_key" ON "portfolios"("portfolio_type");

-- CreateIndex
CREATE UNIQUE INDEX "stocks_stock_name_key" ON "stocks"("stock_name");

-- CreateIndex
CREATE UNIQUE INDEX "_PortfolioToStock_AB_unique" ON "_PortfolioToStock"("A", "B");

-- CreateIndex
CREATE INDEX "_PortfolioToStock_B_index" ON "_PortfolioToStock"("B");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_portfolio_type_fkey" FOREIGN KEY ("portfolio_type") REFERENCES "portfolios"("portfolio_type") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PortfolioToStock" ADD FOREIGN KEY ("A") REFERENCES "portfolios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PortfolioToStock" ADD FOREIGN KEY ("B") REFERENCES "stocks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
