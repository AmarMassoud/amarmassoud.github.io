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



export async function getComments() {
    const comments = await prisma.Comment.findMany();
    await disconnect();
    return comments;
}

export async function addComment(body) {
    const comment = await prisma.Comment.create({data: {...body}})
    await disconnect();
    return comment;
}

export async function getProductComments(id) {
    const comments = await prisma.Comment.findMany({
        where: {
            productId: id
        }
    });
    await disconnect();
    return comments;
}