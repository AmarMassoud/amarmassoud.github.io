import * as products from 'repos/products.js';


export async function GET(request, {params}) {
    try {
        const productId = params.productId;
        return Response.json(await products.getProduct(productId))
    } catch (e) {
        console.error(e)
        return Response.json({error: e})
    }
}
