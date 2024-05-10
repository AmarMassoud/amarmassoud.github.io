import { PrismaClient } from "@prisma/client";
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

      console.log(user);
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

    const commentsData = fs.readFileSync("./public/data/comments.json", "utf8");
    const comments = JSON.parse(commentsData);
    for (let comment of comments) {
      console.log(comment);

      await prisma.comment.create({
        data: {
          id: comment.id.toString(),
          body: comment.body,
          userId: comment.user.id.toString(),
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
