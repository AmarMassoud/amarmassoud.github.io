import * as cartItems from 'repos/cartitems.js';



export async function GET(request, {params}) {
    try {
        const cartItemId = params.cartitemId;
        return Response.json(await cartItems.getCartItem(cartItemId))
    } catch (e) {
        console.error(e)
        return Response.json({error: e})
    }
}