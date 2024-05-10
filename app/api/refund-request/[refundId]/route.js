import * as refunds from '@/repos/refunds';



export async function DELETE(request, {params}) {
    try {
        const refundId = params.refundId;
        const refund = await refunds.deleteRefund(refundId)
        return Response.json(await refund);
    } catch (e) {
        console.error(e)
        return Response.json({error: e})
    }

}