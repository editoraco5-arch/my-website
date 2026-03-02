const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
console.log("Keys in prisma:", Object.keys(prisma).filter(k => !k.startsWith('_')));
