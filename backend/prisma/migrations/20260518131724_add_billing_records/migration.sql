-- CreateTable
CREATE TABLE "BillingRecord" (
    "id" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "usageDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "BillingRecord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BillingRecord" ADD CONSTRAINT "BillingRecord_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
