import * as comments from '../../../..//repos/comments.js';


export async function GET(request, {params}) {
    const productId = params.productId;
    return Response.json(await comments.getProductComments(productId))
}