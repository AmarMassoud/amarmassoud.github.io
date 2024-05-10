-- CreateTable
CREATE TABLE "deal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customer" TEXT NOT NULL,
    "cartItems" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "cartitem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "customer" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "bank" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "cardExpire" TEXT NOT NULL,
    "iban" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "refundrequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cartItemId" TEXT NOT NULL,
    "purchaseId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "timeStamp" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "purchase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dealId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "total_price" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "comment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "customer" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "date" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "image" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "balance" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "bank" TEXT NOT NULL,
    "addressId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "refundRequestId" TEXT
);

-- CreateTable
CREATE TABLE "product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quantity" INTEGER NOT NULL,
    "seller" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,
    "brand" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL
);
