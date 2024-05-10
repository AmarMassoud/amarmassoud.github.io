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