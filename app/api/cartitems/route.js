import * as cartItems from '../../../repos/cartitems.js';


export async function GET(request) {
    try {
        return Response.json(await cartItems.getCartItems(), {status: 200});
    } catch (e) {
        console.error(e)
        return Response.json({error: e})

    }

}

export async function POST(request) {
    try {
        const body = await request.json();
        return Response.json(await cartItems.addCartItem(body))
    } catch (e) {
        console.error(e)
        return Response.json({error: e})
    }
}

