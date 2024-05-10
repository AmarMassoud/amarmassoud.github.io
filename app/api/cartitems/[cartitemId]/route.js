import * as cartItems from 'repos/cartitems.js';



export async function GET(request) {
    try {
        const body = await request.json();
        return Response.json(await cartItems.getCartItem(body))
    } catch (e) {
        console.error(e)
        return Response.json({error: e})
    }
}