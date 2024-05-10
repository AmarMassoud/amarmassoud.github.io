import * as addresses from '../../../../repos/address.js';



export async function PATCH(request, {params}) {
    try {
        const addressId = params.addressId;
        const body = await request.json();
        return Response.json(await addresses.editAddress(addressId, body))
    } catch (e) {
        console.error(e)
        return Response.json({error: e})
    }
}