import * as pruchases from '../../../repos/purchases.js';



export async function GET(request) {
    try {
        return Response.json(await pruchases.getPurchases(), {status: 200});
    } catch (e) {
        console.error(e)
        return Response.json({error: e})

    }
}


export async function POST(request) {
    try {
        const body = await request.json();
        return Response.json(await pruchases.addPurchase(body))
    } catch (e) {
        console.error(e)
        return Response.json({error: e})
    }
}