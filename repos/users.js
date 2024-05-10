import prisma from './prisma.js';
import bcrypt from 'bcryptjs';


export const disconnect = async () => {
    try {
        await prisma.$disconnect();
    } catch (e) {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    }
}
export const getUserByEmail = async (email) => {
    const user = await prisma.user.findUnique({
        where: { email: email },
    });
    await disconnect();
    return user;
};

export const validatePassword = async (userPassword, storedPassword) => {
    return bcrypt.compare(userPassword, storedPassword);
};

export const addUser = async (body) => {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user =  await prisma.user.create({
        data: {
            ...body
        },
    });
    await disconnect();
    return user;
}

export const getUser = async (id
) => {
    const user = await prisma.user.findUnique({
        where: { id: id },
    });
    await disconnect();
    return user
}
export const deleteUser = async (id) => {
    const user = await prisma.user.delete({
        where: { id: id },
    });
    await disconnect();
    return user;
}

export const updateUser = async (id, body) => {
    const user = await prisma.user.update({
        where: { id: id },
        data: { ...body },
    });
    await disconnect();
    return user;
}
export const getUsers = async () => {
    const users = await prisma.user.findMany({
        include: {
            addresses: true,
            bank: true
        },
    });
    await disconnect();
    return users;
}
