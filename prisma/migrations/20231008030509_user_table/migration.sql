-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
