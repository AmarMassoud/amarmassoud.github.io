import prisma from './prisma.js';



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
    const purchases = await prisma.purchase.findMany();
    await disconnect();
    return purchases;
}

export async function addPurchase(body) {
    const purchase = await prisma.Purchase.create({data: {...body}})
    await disconnect();
    return purchase;
}