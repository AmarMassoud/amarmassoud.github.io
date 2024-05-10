import prisma from './prisma';

export async function disconnect() {
    try {
        await prisma.$disconnect();
    } catch (e) {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    }
}

export async function getRefunds() {
    const refunds = await prisma.Refundrequest.findMany({
        include: {
            cartItem: true,
            user: true
        },
    });
    await disconnect();
    return refunds;
}


export async function addRefund(body) {
    const refund = await prisma.Refundrequest.create({data: {...body}})
    await disconnect();
    return refund;
}

export async function deleteRefund(id) {
    const refund = await prisma.Refundrequest.delete({
        where: {
            id: id
        }

    });
    await disconnect();
    return refund;
}