const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function test() {
  console.log("Keys in content model:", Object.keys(prisma.content.fields || {}));
}
test().catch(console.error).finally(() => prisma.$disconnect());
