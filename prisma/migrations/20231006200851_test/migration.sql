-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "surveyLink" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stakeholder" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "streetAddress" TEXT NOT NULL,
    "mailingAddress" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "interest" TEXT NOT NULL,
    "isPerson" TEXT NOT NULL,
    "stakeholderComments" TEXT NOT NULL,
    "stakeholderStatus" TEXT NOT NULL,
    "contacted" TEXT NOT NULL,
    "consultation" TEXT NOT NULL,
    "attempts" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "followUp" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "Stakeholder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TractRecord" (
    "id" SERIAL NOT NULL,
    "tract" TEXT NOT NULL,
    "pin" TEXT NOT NULL,
    "structure" TEXT NOT NULL,
    "occupants" TEXT NOT NULL,
    "worksLand" TEXT NOT NULL,
    "tractComments" TEXT NOT NULL,
    "pipelineStatus" TEXT NOT NULL,
    "commodity" TEXT NOT NULL,
    "pageNumber" TEXT NOT NULL,
    "keepdelete" TEXT NOT NULL,
    "stakeholderName" TEXT NOT NULL,
    "stakeholderId" INTEGER NOT NULL,

    CONSTRAINT "TractRecord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Stakeholder" ADD CONSTRAINT "Stakeholder_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TractRecord" ADD CONSTRAINT "TractRecord_stakeholderId_fkey" FOREIGN KEY ("stakeholderId") REFERENCES "Stakeholder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
