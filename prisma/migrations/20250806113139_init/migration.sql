-- CreateTable
CREATE TABLE "public"."Dropshipper" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dropshipper_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Product" (
    "id" TEXT NOT NULL,
    "dropshipperId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "shopifyProductId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dropshipper_email_key" ON "public"."Dropshipper"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Dropshipper_shop_key" ON "public"."Dropshipper"("shop");

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_dropshipperId_fkey" FOREIGN KEY ("dropshipperId") REFERENCES "public"."Dropshipper"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
