-- CreateTable
CREATE TABLE "UserChats" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "chats" JSONB NOT NULL,

    CONSTRAINT "UserChats_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserChats" ADD CONSTRAINT "UserChats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
