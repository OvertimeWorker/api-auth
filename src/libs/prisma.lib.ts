import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const connectionString = process.env["DATABASE_URL"]
const useSsl = process.env["NODE_ENV"] !== "development"

const adapter = new PrismaPg({
  connectionString,
  ...(useSsl ? { ssl: { rejectUnauthorized: false } } : {}),
})

const prisma = new PrismaClient({ adapter })

process.on("beforeExit", async () => {
  await prisma.$disconnect()
})

export { prisma }
