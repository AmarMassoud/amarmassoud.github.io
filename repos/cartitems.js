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

export async function getCartItems() {
    const cartItems = await prisma.Cartitem.findMany({
        include: {
            deal: true,
            product: true,
        },
    });
    await disconnect();
    return cartItems;
}

export async function getCartItem(cartItemId) {
    const cartItem = await prisma.Cartitem.findUnique({
        where: {
            id: cartItemId
        }
    });
    await disconnect();
    return cartItem;
}

export async function addCartItem(body) {
    const cartItem = await prisma.Cartitem.create(
        {
            data: {
                ...body
            }

        })
    await disconnect();
    return cartItem;
}


export async function deleteCartItem(id) {
    const cartItem = await prisma.Cartitem.delete({
        where: {
            id: id
        }

    });
    await disconnect();
    return cartItem;
}

export async function updateCartItem(cartItemId, body) {
    const cartItem = await prisma.Cartitem.update({
        where: {
            id: cartItemId
        },
        data: {...body}
    });
    await disconnect();
    return cartItem;
}