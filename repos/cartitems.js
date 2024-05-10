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
    const cartItems = await prisma.CartItem.findMany();
    await disconnect();
    return cartItems;
}

export async function getCartItem(cartItemId) {
    const cartItem = await prisma.CartItem.findUnique({
        where: {
            id: cartItemId
        }
    });
    await disconnect();
    return cartItem;
}

export async function addCartItem(body) {
    const cartItem = await prisma.CartItem.create({data: {...body}})
    await disconnect();
    return cartItem;
}


export async function deleteCartItem(id) {
    const cartItem = await prisma.CartItem.delete({
        where: {
            id: id
        }

    });
    await disconnect();
    return cartItem;
}

export async function updateCartItem(body) {
    const cartItem = await prisma.CartItem.update({
        where: {
            id: body.id
        },
        data: {...body}
    });
    await disconnect();
    return cartItem;
}