/*
  Warnings:

  - You are about to drop the `address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `bank` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cartitem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `deal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `purchase` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to alter the column `timeStamp` on the `refundrequest` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.
  - Added the required column `productId` to the `refundrequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `refundrequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `refundrequest` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "address";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "bank";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "cartitem";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "comment";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "deal";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "image";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "product";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "purchase";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "user";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Deal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sellerId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "cartItems" INTEGER NOT NULL,
    "purchaseId" TEXT,
    "userId" TEXT,
    "refundrequestId" TEXT,
    CONSTRAINT "Deal_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Deal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Deal_refundrequestId_fkey" FOREIGN KEY ("refundrequestId") REFERENCES "refundrequest" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Cartitem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "dealId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "customer" TEXT NOT NULL,
    CONSTRAINT "Cartitem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Cartitem_dealId_fkey" FOREIGN KEY ("dealId") REFERENCES "Deal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Bank" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cardExpire" TEXT NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "cardType" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "iban" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Purchase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "total_price" REAL NOT NULL,
    "timeStamp" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "body" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comment_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    CONSTRAINT "Image_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "bankId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "refundRequestId" TEXT,
    CONSTRAINT "User_bankId_fkey" FOREIGN KEY ("bankId") REFERENCES "Bank" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "discountPercentage" REAL NOT NULL,
    "rating" REAL NOT NULL,
    "stock" INTEGER NOT NULL,
    "brand" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    CONSTRAINT "Product_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_refundrequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "totalPrice" REAL NOT NULL,
    "timeStamp" DATETIME NOT NULL,
    "purchaseId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "cartItemId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "refundrequest_cartItemId_fkey" FOREIGN KEY ("cartItemId") REFERENCES "Cartitem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "refundrequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "refundrequest_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_refundrequest" ("body", "cartItemId", "id", "purchaseId", "reason", "timeStamp") SELECT "body", "cartItemId", "id", "purchaseId", "reason", "timeStamp" FROM "refundrequest";
DROP TABLE "refundrequest";
ALTER TABLE "new_refundrequest" RENAME TO "refundrequest";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
