-- CreateTable
CREATE TABLE "Photo" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "comments" TEXT[],

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);
