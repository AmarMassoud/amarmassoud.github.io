
import * as stats from '../../../../../repos/stats.js';

export async function GET(request, {params}) {

    try {
        const userId = params.userId;
        // console.log(userId)
        const user = await stats.getPossibleRevenueForUser(userId);
        return Response.json(user)
    } catch (error) {
        // return "Internal error"
        return Response.json({message: "Internal errorxx"}, {status: 500});
    }

}
