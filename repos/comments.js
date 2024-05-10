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
    const comments = await prisma.Comment.findMany({
        include: {
            user: true,
            product: true
        },
    });
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
        },
        include: {
            user: true,
            product: true
        },
    });
    await disconnect();
    return comments;
}
export async function getSellerComments(id) {
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
        return comments;
    } catch (e) {
        console.error(e);
        return "repo error";
    }
}