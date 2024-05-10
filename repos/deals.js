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


export async function getDeals() {
    const deals = await prisma.Deal.findMany();
    await disconnect();
    return deals;
}

export async function addDeal(body) {
    const deal = await prisma.Deal.create({data: {...body}})
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