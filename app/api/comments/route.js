import * as comments from '../../../repos/comments.js';

export async function GET(request) {
    try {
        return Response.json(await comments.getComments(), {status: 200});
    } catch (e) {
        console.error(e)
        return Response.json({error: e})

    }

}

export async function POST(request) {
    try {
        const body = await request.json();
        return Response.json(await comments.addComment(body))
    } catch (e) {
        console.error(e)
        return Response.json({error: e})
    }
}