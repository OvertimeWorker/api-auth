import { PrismaClient } from "@prisma/client"
import { mockDeep, mockReset, type DeepMockProxy } from "jest-mock-extended"

const prismaMock = mockDeep<PrismaClient>()

const prisma = prismaMock as unknown as DeepMockProxy<PrismaClient>

beforeEach(() => {
  mockReset(prismaMock)
})

export { prisma }
