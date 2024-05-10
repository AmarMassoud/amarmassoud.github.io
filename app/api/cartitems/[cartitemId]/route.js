import * as cartItems from '../../../../repos/cartitems.js';



export async function GET(request, {params}) {
    try {
        const cartItemId = params.cartitemId;
        return Response.json(await cartItems.getCartItem(cartItemId))
    } catch (e) {
        console.error(e)
        return Response.json({error: e})
    }
}

export async function PATCH(request, {params}) {
    try {
        const body = await request.json();
        const cartItemId = params.cartitemId;
        return Response.json(await cartItems.updateCartItem(cartItemId, body))
    } catch (e) {
        console.error(e)
        return Response.json({error: e})
    }
}

export async function DELETE(request, {params}) {
    try {
        const cartItemId = params.cartitemId;
        return Response.json(await cartItems.deleteCartItem(cartItemId))
    } catch (e) {
        console.error(e)
        return Response.json({error: e})
    }
}