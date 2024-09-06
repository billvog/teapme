-- CreateTable
CREATE TABLE "Teap" (
    "id" TEXT NOT NULL,
    "message" TEXT,
    "price" INTEGER NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "receiverId" TEXT NOT NULL,

    CONSTRAINT "Teap_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Teap" ADD CONSTRAINT "Teap_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
