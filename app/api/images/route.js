import * as imagesRepo from '../../../repos/images.js';

export async function POST(request) {
    try {
        const body = await request.json();


        return Response.json(await imagesRepo.addImage(body))
    } catch (e) {
        console.error(e)
        return Response.json({error: e})
    }
}