import * as users from "../../../../repos/users";

export async function GET(request, {params}) {
    const userId = params.userId;
    const user = await users.getUser(userId);
    return Response.json(user)

}
