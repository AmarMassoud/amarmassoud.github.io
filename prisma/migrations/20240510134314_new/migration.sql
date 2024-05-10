/*
  Warnings:

  - You are about to drop the column `userId` on the `Deal` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Deal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sellerId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "purchaseId" TEXT,
    CONSTRAINT "Deal_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Deal_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Deal_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Deal" ("customerId", "id", "purchaseId", "sellerId") SELECT "customerId", "id", "purchaseId", "sellerId" FROM "Deal";
DROP TABLE "Deal";
ALTER TABLE "new_Deal" RENAME TO "Deal";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
