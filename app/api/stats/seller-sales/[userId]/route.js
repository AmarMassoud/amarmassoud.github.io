import * as users from "../../../../../repos/users";
import * as deals from '../../../../../repos/deals.js';

import * as stats from '../../../../../repos/stats.js';

export async function GET(request, {params}) {
    try {
        const userId = params.userId;
        const user = await stats.getTotalSalesForUser(userId);
        return Response.json(user)
    } catch (error) {
        return Response.json({message: "Internal error"}, {status: 500});
    }
}
