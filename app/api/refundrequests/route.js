import * as refunds from '../../../repos/refunds';

export async function GET(request) {
    try {
        return Response.json(await refunds.getRefunds(), {status: 200});
    } catch (e) {
        console.error(e)
        return Response.json({error: e})

    }
}


export async function POST(request) {
    try {
        const body = await request.json();
        return Response.json(await refunds.addRefund(body))
    } catch (e) {
        console.error(e)
        return Response.json({error: e})
    }
}



