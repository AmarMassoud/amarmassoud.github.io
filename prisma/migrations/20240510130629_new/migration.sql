-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cartitem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "dealId" TEXT,
    "quantity" INTEGER NOT NULL,
    "customer" TEXT NOT NULL,
    CONSTRAINT "Cartitem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Cartitem_dealId_fkey" FOREIGN KEY ("dealId") REFERENCES "Deal" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Cartitem" ("customer", "dealId", "id", "productId", "quantity") SELECT "customer", "dealId", "id", "productId", "quantity" FROM "Cartitem";
DROP TABLE "Cartitem";
ALTER TABLE "new_Cartitem" RENAME TO "Cartitem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
