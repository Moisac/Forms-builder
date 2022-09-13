-- CreateTable
CREATE TABLE "Response" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fromId" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "content" JSONB NOT NULL,

    CONSTRAINT "Response_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "Form"("id") ON DELETE CASCADE ON UPDATE CASCADE;
