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

export async function getAddresses() {
    const addresses = await prisma.Address.findMany({
        include: {
            user: true,
        },
    });
    await disconnect();
    return addresses;
}

export async function addAddress(body) {
    const address = await prisma.Address.create({data: {...body}})
    await disconnect();
    return address;
}