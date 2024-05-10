import * as users from "@/repos/users";

export async function GET(request) {
    try {
        return Response.json(await users.getUsers(), {status: 200});
    } catch (e) {
        console.error(e)
        return Response.json({error: e})

    }
}



export async function POST(request) {
    try {
        const body = await request.json();
        return Response.json(await users.addUser(body))
    } catch (e) {
        console.error(e)
        return Response.json({error: e})
    }
}
