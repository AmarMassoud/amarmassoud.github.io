import prisma from './prisma.js';
import * as deals from './deals.js';


export async function disconnect() {
    try {
        await prisma.$disconnect();
    } catch (e) {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    }
}

export async function getPurchases() {
    const purchases = await prisma.purchase.findMany({
        include: {
            deals: true,
        },
    });
    await disconnect();
    return purchases;
}

export async function addPurchase(body) {
    const purchase = await prisma.Purchase.create(
        {
            data:
                {

                    total_price: body.total_price,
                    timeStamp: body.timeStamp
                }
        })
    body.deals.forEach(async (dealId) => {
        await deals.updateDeal(dealId, {purchaseId: purchase.id});
    });

    await disconnect();
    return purchase;
}