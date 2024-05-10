import * as addresses from '../../../repos/address.js';


export async function GET(request) {
    try {
        return Response.json(await addresses.getAddresses(), {status: 200});
    } catch (e) {
        console.error(e)
        return Response.json({error: e})

    }

}

export async function POST(request) {
    try {
        const body = await request.json();
        return Response.json(await addresses.addAddress(body))
    } catch (e) {
        console.error(e)
        return Response.json({error: e})
    }
}