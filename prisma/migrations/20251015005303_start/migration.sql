-- CreateTable
CREATE TABLE "appointments" (
    "id" TEXT NOT NULL,
    "tutor" TEXT NOT NULL,
    "pet" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "scheduleAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);
