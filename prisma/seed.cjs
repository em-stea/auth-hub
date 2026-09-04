const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("123456", 12);

  await prisma.user.upsert({
    where: { email: "admin@test.com" },
    update: { password, name: "Admin" },
    create: {
      email: "admin@test.com",
      name: "Admin",
      password,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
