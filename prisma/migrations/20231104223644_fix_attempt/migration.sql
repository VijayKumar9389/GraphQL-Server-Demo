/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Stakeholder` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[packageId]` on the table `Stakeholder` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Stakeholder" ADD COLUMN     "packageId" INTEGER;

-- CreateTable
CREATE TABLE "ProjectRecord" (
    "id" SERIAL NOT NULL,
    "tract" TEXT NOT NULL,
    "pin" TEXT NOT NULL,
    "structure" TEXT NOT NULL,
    "interest" TEXT NOT NULL,
    "stakeholderStatus" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "streetAddress" TEXT NOT NULL,
    "mailingAddress" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "occupants" TEXT NOT NULL,
    "worksLand" TEXT NOT NULL,
    "contacted" TEXT NOT NULL,
    "attempts" INTEGER NOT NULL,
    "consultation" TEXT NOT NULL,
    "followUp" TEXT NOT NULL,
    "tractComments" TEXT NOT NULL,
    "pageNo" TEXT NOT NULL,
    "keepDelete" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "Commodity" TEXT NOT NULL,
    "pipelineStatus" TEXT NOT NULL,
    "stakeholderId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
    "tractRecordId" INTEGER NOT NULL,

    CONSTRAINT "ProjectRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Delivery" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "Delivery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Package" (
    "id" SERIAL NOT NULL,
    "packageTypeId" INTEGER,
    "deliveryId" INTEGER NOT NULL,
    "stakeholderId" INTEGER NOT NULL,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PackageType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PackageType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PackageItem" (
    "id" SERIAL NOT NULL,
    "packageTypeId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "PackageItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Log" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "details" JSONB NOT NULL,
    "stakeholderId" INTEGER,
    "deliveryId" INTEGER,
    "packageId" INTEGER NOT NULL,
    "tractRecordId" INTEGER,
    "itemId" INTEGER,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stakeholder_id_key" ON "Stakeholder"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Stakeholder_packageId_key" ON "Stakeholder"("packageId");

-- AddForeignKey
ALTER TABLE "ProjectRecord" ADD CONSTRAINT "ProjectRecord_stakeholderId_fkey" FOREIGN KEY ("stakeholderId") REFERENCES "Stakeholder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectRecord" ADD CONSTRAINT "ProjectRecord_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectRecord" ADD CONSTRAINT "ProjectRecord_tractRecordId_fkey" FOREIGN KEY ("tractRecordId") REFERENCES "TractRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_packageTypeId_fkey" FOREIGN KEY ("packageTypeId") REFERENCES "PackageType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_deliveryId_fkey" FOREIGN KEY ("deliveryId") REFERENCES "Delivery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_id_fkey" FOREIGN KEY ("id") REFERENCES "Stakeholder"("packageId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackageItem" ADD CONSTRAINT "PackageItem_packageTypeId_fkey" FOREIGN KEY ("packageTypeId") REFERENCES "PackageType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackageItem" ADD CONSTRAINT "PackageItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_stakeholderId_fkey" FOREIGN KEY ("stakeholderId") REFERENCES "Stakeholder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_deliveryId_fkey" FOREIGN KEY ("deliveryId") REFERENCES "Delivery"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_tractRecordId_fkey" FOREIGN KEY ("tractRecordId") REFERENCES "TractRecord"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;
