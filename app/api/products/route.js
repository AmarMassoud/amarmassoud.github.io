import * as products from '../../../repos/products.js';


export async function GET(request) {
    try {
        return Response.json(await products.getProducts(), {status: 200});
    } catch (e) {
        console.error(e)
        return Response.json({error: e})

    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        return Response.json(await products.addProduct(body))
    }
    catch (e) {
        console.error(e)
        return Response.json({error: e})
    }
}




