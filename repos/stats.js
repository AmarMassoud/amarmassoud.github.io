import prisma from "@/repos/prisma";
import {disconnect} from "@/repos/deals";

export async function getTotalSalesForUser(id) {
    try {


        const totalSales = await prisma.$queryRaw`
            SELECT SUM("Cartitem"."quantity" * "Product"."price") as "totalSales"
            FROM "Deal"
            INNER JOIN "Cartitem" ON "Deal"."id" = "Cartitem"."dealId"
            INNER JOIN "Product" ON "Cartitem"."productId" = "Product"."id"
            WHERE "Deal"."sellerId" = ${"5"};
        `;
        return totalSales[0].totalSales;


    } catch (e) {
    console.error(e);
        await disconnect()

        return "repo error";
}
}

export async function getCountUniqueCustomers(currentUser) {
    try {
        const uniqueCustomerCount = await prisma.deal.findMany({
                    where: {
                sellerId: "1"
            },
            select: {
                customerId: true
            },
            distinct: ['customerId']
        })

        return uniqueCustomerCount.length;
    } catch (e) {
        console.error(e);
        return "repo error";
    }
}

export async function getDealCount(currentUser) {
    try {
        const dealCount = await prisma.deal.findMany({
            where: {
                sellerId: currentUser.toString()
            }
        })

        return dealCount.length;
    } catch (e) {
        console.error(e);
        return "repo error";
    }
}

export async function getProductsCount(currentUser) {
    try {
        const productCount = await prisma.product.findMany({
            where: {
                sellerId: currentUser.toString()
            }
        })

        return productCount.length;
    } catch (e) {
        console.error(e);
        return "repo error";
    }
}

export async function getSellerCommentsCount(id) {
    try {
        // Get the products for the seller
        const products = await prisma.Product.findMany({
            where: {
                sellerId: id
            },
            select: {
                id: true
            }
        });
        const productIds = products.map(product => product.id);

        // Get the comments for the products
        const comments = await prisma.Comment.findMany({
            where: {
                productId: {
                    in: productIds
                }
            },
            include: {
                user: true,
                product: true
            },
        });

        await disconnect();
        return comments.length;
    } catch (e) {
        console.error(e);
        return "repo error";
    }
}

export async function getPossibleRevenueForUser(id) {
    try {
        const possibleRevenue = await prisma.$queryRaw`
            SELECT SUM("Product"."price" *"Product"."stock" ) as "possibleRevenue"
            FROM "Product"
            WHERE "Product"."sellerId" = ${id};
        `;
        return possibleRevenue[0].possibleRevenue;
    } catch (e) {
        console.error(e);
        await disconnect()
        return "repo error";
    }
}




