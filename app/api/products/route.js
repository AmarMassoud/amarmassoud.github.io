import * as products from '@/repos/products.js';


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
export async function DELETE(request, {params}) {
    try {
        const productId = params.productId;
        const product = await products.deleteProduct(productId)
        return Response.json(await product);
    }
    catch (e) {
        return Response.json({error: e})
    }
}

export async function PATCH(request, {params}) {
    try {
        const productId = params.productId;
        const body = await request.json();
        const product = await products.updateProduct(productId, body);
        return Response.json(product, {status: 201});
    } catch (e) {
        return Response.json({error: e})
    }

}

