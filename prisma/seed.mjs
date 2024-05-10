import {PrismaClient} from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

const seed = async () => {
    try {
        const data = fs.readFileSync("./public/data/users.json", "utf8");
        const users = JSON.parse(data);
        for (let user of users) {
            const bank = user.bank;
            const bankSchema = await prisma.bank.create({
                data: {
                    ...bank,
                },
            });
            console.log("loading users");

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
                    id: user.id.toString(),
                },
            });

            console.log("loading addresses");
            const addresses = user.addresses;
            for (let address of addresses) {
                await prisma.address.create({
                    data: {
                        name: address.name,
                        userId: user.id.toString(),
                        address: address.address.address,
                        city: address.address.city,
                        postalCode: address.address.postalCode,
                        state: address.address.state,
                    },
                });
            } // trying seeding again
        }
        console.log("loading products");

        const productsData = fs.readFileSync('./public/data/products.json', 'utf8');
        const products = JSON.parse(productsData);
        for (const product of products) {
            await prisma.product.create({
                data: {
                    id: product.id.toString(),
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    rating: product.rating,
                    stock: product.stock,
                    brand: product.brand,
                    category: product.category,
                    thumbnail: product.thumbnail,
                    sellerId: product.seller.id.toString(),
                }
            })
            for (const image of product.images) {
                await prisma.image.create({
                    data: {
                        url: image,
                        productId: product.id.toString()
                    }
                })
            }
        }

                console.log("loading comments");
            const commentsData = fs.readFileSync("./public/data/comments.json", "utf8");
            const comments = JSON.parse(commentsData);
            for (let comment of comments) {
                await prisma.comment.create({
                    data: {
                        // id: comment.id.toString(),
                        body: comment.body,
                        userId: (comment.user.id - 1).toString(),
                        productId: comment.productId.toString(),
                        timestamp: comment.timestamp,
                    },
                });

        }
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
