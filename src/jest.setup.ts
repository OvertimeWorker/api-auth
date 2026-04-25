import "dotenv/config"
import { jest } from "@jest/globals"
import { prisma } from "./mocks/prisma.mock.js"

jest.mock("./libs/prisma.lib.js", () => ({
  __esModule: true,
  prisma: prisma,
}))

beforeEach(() => {
  jest.clearAllMocks()
})
