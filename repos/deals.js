import prisma from './prisma.js';
import * as cartItems from './cartitems.js';

export async function disconnect() {
    try {
        await prisma.$disconnect();
    } catch (e) {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    }
}


export async function getDeals() {
    const deals = await prisma.Deal.findMany({
        include: {
            purchase: true,
            items: true,
            customer: true,
            seller: true
        },
    });
    await disconnect();
    return deals;
}

export async function addDeal(body) {
    const deal = await prisma.Deal.create(
        {
            data:
                {customerId: body.customerId, sellerId: body.sellerId
                }})
        body.cartItems.forEach(async (cartItem) => {
            await cartItems.updateCartItem(cartItem.id, {dealId: deal.id});
        });
    await disconnect();
    return deal;
}

export async function deleteDeal(id) {
    const deal = await prisma.Deal.delete({
        where: {
            id: id
        }

    });
    await disconnect();
    return deal;
}

export async function getDeal(id) {
    const deal = await prisma.Deal.findUnique({
        where: {
            id: id
        }
    });
    await disconnect();
    return deal;
}

export async function updateDeal(dealId, body) {
    const deal = await prisma.Deal.update({
        where: {
            id: dealId
        },
        data: {...body}
    });
    await disconnect();
    return deal;
}