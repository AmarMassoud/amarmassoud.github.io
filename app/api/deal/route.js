import * as deals from '../../../repos/deals.js';

export async function GET(request) {
    try {
        return Response.json(await deals.getDeals(), {status: 200});
    } catch (e) {
        console.error(e)
        return Response.json({error: e})

    }
}


export async function POST(request) {
    try {
        const body = await request.json();
        return Response.json(await deals.addDeal(body))
    } catch (e) {
        console.error(e)
        return Response.json({error: e})
    }
}