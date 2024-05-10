/*
  Warnings:

  - You are about to drop the `refundrequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `refundRequestId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `refundrequestId` on the `Deal` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `Comment` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "refundrequest";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Refundrequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "purchaseId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "cartItemId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "timeStamp" DATETIME NOT NULL,
    CONSTRAINT "Refundrequest_cartItemId_fkey" FOREIGN KEY ("cartItemId") REFERENCES "Cartitem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Refundrequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "bankId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "User_bankId_fkey" FOREIGN KEY ("bankId") REFERENCES "Bank" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("balance", "bankId", "email", "firstName", "id", "image", "lastName", "password", "role") SELECT "balance", "bankId", "email", "firstName", "id", "image", "lastName", "password", "role" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_bankId_key" ON "User"("bankId");
CREATE TABLE "new_Deal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sellerId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "cartItems" INTEGER NOT NULL,
    "purchaseId" TEXT,
    "userId" TEXT,
    CONSTRAINT "Deal_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Deal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Deal" ("cartItems", "customerId", "id", "purchaseId", "sellerId", "userId") SELECT "cartItems", "customerId", "id", "purchaseId", "sellerId", "userId" FROM "Deal";
DROP TABLE "Deal";
ALTER TABLE "new_Deal" RENAME TO "Deal";
CREATE TABLE "new_Comment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "body" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comment_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Comment" ("body", "id", "productId", "timestamp", "userId") SELECT "body", "id", "productId", "timestamp", "userId" FROM "Comment";
DROP TABLE "Comment";
ALTER TABLE "new_Comment" RENAME TO "Comment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Refundrequest_cartItemId_key" ON "Refundrequest"("cartItemId");
