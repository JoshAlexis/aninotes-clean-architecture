-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "userName" STRING,
    "email" STRING NOT NULL,
    "password" STRING NOT NULL,
    "refreshToken" STRING,

    CONSTRAINT "primary" PRIMARY KEY ("id")
);
