import * as products from 'repos/products.js';


export async function GET(request) {
    try {
        const body = await request.json();
        return Response.json(await products.getProduct(body))
    } catch (e) {
        console.error(e)
        return Response.json({error: e})
    }
}
