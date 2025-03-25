// import { PrismaClient } from "@prisma/client";

// const prismaClientSingleton = () => {
//   return new PrismaClient();
// };

// declare global {
//   var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
// }

// const prisma = globalThis.prisma ?? prismaClientSingleton();

// export default prisma;

// if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Use a type alias or interface for the global scope
interface CustomGlobal{
  prisma?: ReturnType<typeof prismaClientSingleton>;
}

// Cast globalThis to your custom interface
const globalWithPrisma = globalThis as CustomGlobal;

const prisma = globalWithPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") {
  globalWithPrisma.prisma = prisma;
}