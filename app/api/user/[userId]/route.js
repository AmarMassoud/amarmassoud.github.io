import * as users from "../../../../repos/users";

export async function GET(request, {params}) {
    const userId = params.userId;
    const user = await users.getUser(userId);
    return Response.json(user)

}

export async function PATCH(request, {params}) {
    try {
        const userId = params.userId;
        const body = await request.json();
        const user = await users.updateUser(userId, body);
        return Response.json(user)
    }
    catch (e) {
        console.error(e)
        return Response.json({error: e})
    }
}