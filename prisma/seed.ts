import { PrismaClient } from '@prisma/client';
import { log } from 'node:console';

        const prisma = new PrismaClient();
        const initalPosts: PostCreateInput[] = [
                {
                    title: "First Post",
                    slug: "first-post",
                    content: "This is my first post",
                    author: {
                        connectOrCreate: {
                            where: { email: "arjunjaiswal4242@gmail.com" },
                            create: {
                                email: "arjunjaiswal4242@gmail.com",
                                hashedPassword: "password123",
                            },
                        },
                    },
                },
            ]

        async function main() {
            console.log("Seeding database...");
            for (const postData of initalPosts) {
                const post = await prisma.post.create({
                    data: postData,
                });
            }
        }

        main()
          .catch((e) => {
            console.error(e);
            process.exit(1);
          })
          .then(async () => {
            await prisma.$disconnect();
          });
          