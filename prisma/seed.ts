import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // clean up
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash('password', 12);

  // ダミー画像
  const dummyImage = [
    'https://picsum.photos/seed/post1/600/400',
    'https://picsum.photos/seed/post2/600/400',
  ];

  // ユーザー作成
  const user = await prisma.user.create({
    data: {
      name: 'Test User',
      email: 'test@test.com',
      password: hashedPassword,
      posts: {
        create: [
          {
            title: '初めてのブログ投稿',
            content: 'これは最初のブログ投稿です。',
            topImage: dummyImage[0],
            published: true,
          },
          {
            title: '2番目の投稿',
            content: 'これは2つ目のブログ投稿です。',
            topImage: dummyImage[1],
            published: true,
          },
        ]
      }
    }
  })
  console.log({user: user});
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }
  );