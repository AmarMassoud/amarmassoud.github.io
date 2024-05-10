import * as deals from '../../../../repos/deals.js';


export async function DELETE(request, {params}) {
    try {
        const dealId = params.dealId;
        const deal = await deals.deleteDeal(dealId);
        return Response.json(deal);
    } catch (e) {
        console.error(e)
        return Response.json({error: e})
    }

}

export async function PATCH(request, {params}) {
    try {
        const dealId = params.dealId;
        const body = await request.json();
        const deal = await deals.updateDeal(dealId, body);
        return Response.json(deal, {status: 201});
    } catch (e) {
        return Response.json({error: e});
    }
}

export async function GET(request, {params}) {
    try {
        const dealId = params.dealId;
        return Response.json(await deals.getDeal(dealId))
    } catch (e) {
        console.error(e)
        return Response.json({error: e})
    }
}