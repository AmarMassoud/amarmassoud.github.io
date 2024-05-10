import prisma from "./prisma.js";


export async function disconnect() {
    try {
        await prisma.$disconnect();
    } catch (e) {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    }
}

export async function getProducts() {
    const products = await prisma.Product.findMany({
        include: {
            seller: true,
            images: true,
            comments: true
        },
    });
    await disconnect();
    return products;

}

export async function addProduct(body) {
    const product = await prisma.Product.create({data: {...body}})
    await disconnect();
    return product;
}


export async function deleteProduct(id) {
    const product = await prisma.Product.delete({
        where: {
            id: id
        }

    });
    await disconnect();
    return product;
}

export async function getProduct(id) {
    const product = await prisma.Product.findUnique({
        where: {
            id: id
        },
        include: {
            seller: true,
            images: true,
            comments: true
        },
    });
    await disconnect();
    return product;
}

export async function updateProduct(productId, body) {
    const product = await prisma.Product.update({
        where: {
            id: productId
        },
        data: {...body}
    });
    await disconnect();
    return product;
}
