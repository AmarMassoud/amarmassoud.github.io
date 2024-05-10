import {PrismaClient} from "@prisma/client";
import fs from 'fs';

const prisma = new PrismaClient();

const seed = async () => {
    try {
        const data = fs.readFileSync('./public/data/users.json', 'utf8');
        const users = JSON.parse(data);
        for (let user of users) {
            const bank = user.bank;
            const bankSchema = await prisma.bank.create({
                data: {
                    ...bank
                }
            })


            await prisma.user.create({
                data: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    password: user.password,
                    image: user.image,
                    role: user.role,
                    balance: user.balance,
                    bankId: bankSchema.id,
                    id: user.id.toString()
                }
            })

            console.log(user)
            const addresses = user.addresses;
            for (let address of addresses) {
                await prisma.address.create({
                    data: {
                        name: address.name,
                        userId: user.id.toString(),
                        address: address.address.address,
                        city: address.address.city,
                        postalCode: address.address.postalCode,
                        state: address.address.state
                    }

                })

            } // trying seeding again

        }





            // await prisma.user.create({
            //     data: {
            //         firstName: user.firstName,
            //         lastName: user.lastName,
            //         email: user.email,
            //         password: user.password,
            //         image: user.image,
            //         bank: {
            //             create: {
            //                 cardExpire: user.bank.cardExpire,
            //                 cardNumber: user.bank.cardNumber,
            //                 cardType: user.bank.cardType,
            //                 currency: user.bank.currency,
            //                 iban: user.bank.iban,
            //             }
            //
            //         },
            //         role: user.role,
            //         balance: user.balance,
            //         addresses: [
            //             user.addresses.map(address => {
            //                 return {
            //                     create: {
            //                         address: address.address,
            //                         city: address.city,
            //                         postalCode: address.postalCode,
            //                         state: address.state,
            //                         name: address.name,
            //
            //                     }
            //                 }
            //             })
            //         ],
            //     }
            // });

    } catch (err) {
        console.error(err);
    }
};

try {
    await seed();
    await prisma.$disconnect();
} catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
}