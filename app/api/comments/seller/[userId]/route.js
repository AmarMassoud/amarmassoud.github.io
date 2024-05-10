import * as comments from '../../../../../repos/comments.js';


export async function GET(request, {params}) {
    const userId = params.userId;
    return Response.json(await comments.getSellerComments(userId))
}
