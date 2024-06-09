-- CreateEnum
CREATE TYPE "OperationType" AS ENUM ('Sum', 'Multiply');

-- CreateTable
CREATE TABLE "Operation" (
    "id" SERIAL NOT NULL,
    "a" INTEGER NOT NULL,
    "b" INTEGER NOT NULL,
    "answer" INTEGER NOT NULL,
    "type" "OperationType" NOT NULL,

    CONSTRAINT "Operation_pkey" PRIMARY KEY ("id")
);
