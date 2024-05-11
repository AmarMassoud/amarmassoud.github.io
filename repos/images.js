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

export async function getImages() {
    const images = await prisma.Image.findMany();
    await disconnect();
    return images;
}

export async function addImage(body) {
    const image = await prisma.Image.create(
        {
            data:
                {...body}
        });
    await disconnect();
    return image;
}