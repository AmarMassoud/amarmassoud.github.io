import * as users from '../../../repos/users.js';

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        const user = await users.getUserByEmail(email);
        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }

        const isValid = password === user.password
        if (!isValid) {
            return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });
        }

        return new Response(JSON.stringify({ message: "Login successful", userId: user.id }), { status: 200 });

    } catch (e) {
        console.error(e);
        return new Response(JSON.stringify({ error: 'Failed to process request' }), { status: 500 });
    }
}